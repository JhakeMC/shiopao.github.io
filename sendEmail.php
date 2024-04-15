<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['photo'])) {
    $to = 'dandanmalon@gmail.com'; // Change to your email
    $subject = 'New Photo';
    $message = 'A new photo has been sent.';
    $headers = 'From: webmaster@example.com' . "\r\n" .
               'MIME-Version: 1.0' . "\r\n" .
               'Content-Type: multipart/mixed; boundary="----=_Part_12345"' . "\r\n";

    $file = $_FILES['photo'];
    $fileContent = file_get_contents($file['tmp_name']);
    $encodedFile = base64_encode($fileContent);
    $body = "------=_Part_12345\r\n".
            "Content-Type: application/octet-stream; name=\"photo.jpg\"\r\n".
            "Content-Transfer-Encoding: base64\r\n".
            "Content-Disposition: attachment; filename=\"photo.jpg\"\r\n\r\n".
            $encodedFile . "\r\n".
            "------=_Part_12345--";

    $fullMessage = $headers . "\r\n" . $message . "\r\n" . $body;

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo 'Photo sent successfully.';
    } else {
        echo 'Failed to send the photo.';
    }
} else {
    echo 'No photo uploaded.';
}
?>
