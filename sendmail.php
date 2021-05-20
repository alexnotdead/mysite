<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    
    
    $mail = new PHPMailer(true);
    
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('webmaster@alexnotdead.ru', 'Твой Сайт');
    $mail->addAddress('sam-mr-nobody@ya.ru');
    $mail->Subject = 'Сообщение с сайта';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Мыло:</strong>'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong>'.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    if(!$mail->send()){
        $message = 'error';
    } else {
        $message = 'all right';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>