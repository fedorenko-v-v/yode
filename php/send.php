<?php
//отправка письма
require_once "SendMailSmtpClass.php"; // подключаем класс  387964
$mailSMTP = new SendMailSmtpClass('info@yode.pro', '495j5jhj46j', 'ssl://smtp.yandex.ru', 'YODE.pro', 465);

	$data = $_POST;
	if (isset($data) && !empty($data)){
		$title = $data["title"];
		$to = 'marketing@yode.pro';
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= "Content-type: text/html; charset=utf-8 \r\n";
		$mess = '<html>
    <head>
   	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>'.$data["title"].'</title>
    </head>
	    <body>
	        <p><b>Контактный телефон:</b> '.$data["phone"].'</p>
	    </body>
		</html>';

		$from_name = "YODE.pro Site";


		$result =  $mailSMTP->send($to, $title, $mess, $headers, $from_name); // отправляем письмо
		if ($result === true) {echo "Наш сотрудник свяжется с Вами в ближайшее время, для уточнения Ваших потребностей и оформления коммерческого предложения.";}
			else {
		    		echo "При отправке сообщения возникли ошибки.";
			}
		//mail($to, $title, $mess, $headers);
		//echo $data["title"];
}
?>
