$(document).ready(function() {

	$(".phoneNumber").mask("+7 (999) 999-99-99");

	$('a[href^="#"]').on('click', function(event) {
		event.preventDefault();
		var sc = $(this).attr("href"),
				dn = $(sc).offset().top;
		$('html, body').animate({scrollTop: dn}, 1000);
	});

	$('.portfolioContent').on('click', function(event) {
		$('body').addClass('glass');
		$('.imgSlider').html($(this).find('.imagesForSlider').html());
		$('.imgSlider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false
		});
	});

	$('.closeGlass').on('click', function(event) {
		$('body').removeClass('glass');
		$('.imgSlider').slick('unslick');
		$('.imgSlider').empty();
	});

	$(document).mouseup(function (e){
		var div = $(".winPopup");
		if (!div.is(e.target)
				&& div.has(e.target).length === 0) {
				$('body').removeClass('glass');
				$('.imgSlider').slick('unslick');
				$('.imgSlider').empty();
		}
	});

	$('.EventBlock').on('click', function(){
		$(this).parent().addClass('focus');
	});

	$('.btnSendPhone').on('click enterKey', function(){
		$(this).parent().parent('.auditBlock').addClass('readySend');
		var titleOrder = $(this).parent().parent('.auditBlock').hasClass('win') ? 'Заявка на демо доступ' : 'Заявка на аудит';
		var phoneNumber = {'phone': $(this).siblings('.phoneNumber').val(), 'title': titleOrder};
		//console.log(phoneNumber);
		$.ajax({
			url: 'https://yode.pro/html/landing/php/send.php',
			type: 'POST',
			data: phoneNumber,
			success: function(res){
				console.log(res);
			}
		});
	});

	$(".phoneNumber").on('keyup', function () {
		if ($(this).val().indexOf('_') > -1)
    {
      $(this).parent().parent('.auditBlock').addClass('focus');
      $(this).parent().parent('.auditBlock').removeClass('ready');
    }
		else{
			if($(this).val() === ''){
				//console.log(1111);
			}else{
				$(this).parent().parent('.auditBlock').removeClass('focus');
				$(this).parent().parent('.auditBlock').addClass('ready');
				$(this).siblings('.btnSendPhone').focus();
			}
		}
	});

	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".EventBlock"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			$('.auditBlock').removeClass('focus');
			if ($('.phoneNumber').val() == '')
			{
				$('.auditBlock').removeClass('ready');
			}
			else{
				//console.log(2);
			}
		}
	});

	$('.mainWrap .sf1').ParalaxObject({step:5, LimitLeft: 300});
	$('.mainWrap .sf1_1').ParalaxObject({step:-5, LimitLeft: 300});
	$('.mainWrap .sf2').ParalaxObject({step:5, LimitLeft: 100});
	$('.mainWrap .sf3').ParalaxObject({step:4, LimitLeft: 50});
	$('.wordsP').ParalaxObject({step:-1, LimitLeft: 50});
});

(function($){
	$.ParalaxObject = function(elem,params){
		var defaults = {
			step : 2,
			LimitLeft : 20
		};
		this.o = $.extend(defaults,params || {});
		this.elem = $(elem);
		this.init();
	};
	$.ParalaxObject.fn = $.ParalaxObject.prototype = {ParalaxObject:'1.0'};
	$.ParalaxObject.fn.extend = $.ParalaxObject.extend = $.extend;
	$.ParalaxObject.fn.extend({
		init : function(){
			var   o = this.o
				, parent = this.elem
				, marginLeftMin = parseInt(parent.css('margin-top'), 10) - o.LimitLeft
				, marginLeftMax = parseInt(parent.css('margin-top'), 10) + o.LimitLeft
				, scrollToElem = parent.offset().top - $(window).height()
				, scrollTo = 0
			;
			$(window).scroll(function(e){
				var winScrollTop = $(this).scrollTop();
				if(winScrollTop > scrollToElem){
					var marginLeft = parseInt(parent.css('margin-top'), 10);
					if(scrollTo > winScrollTop){
						var Delta = marginLeft - o.step;
						if(Delta < marginLeftMin){
							parent.css('margin-top', marginLeftMin + 'px');
						}
						else{
							parent.css('margin-top', Delta + 'px');
						}
					}
					else{
						var Delta = marginLeft + o.step;
						if(Delta > marginLeftMax){
							parent.css('margin-top', marginLeftMax + 'px');
						}
						else{
							parent.css('margin-top', Delta + 'px');
						}
					}
					scrollTo = winScrollTop;
				}
			});
		}
	});
	$.fn.ParalaxObject = function(params){
		if(typeof params=='string'){
			var instance = $(this).data('ParalaxObject');
			var args = Array.prototype.slice.call(arguments,1);
			return instance[params].apply(instance,args);
		}
		else{
			return this.each(function(){
				var instance = $(this).data('ParalaxObject');
				if(instance){
					if(params){
						$.extend(instance.options,params);
					}
					instance.init();
				}
				else{
					$(this).data('ParalaxObject',new $.ParalaxObject(this,params));
				}
			});
		}
	};
})(jQuery);
