<?php
// Para trabajar en local cambiamos servername = localhost
// Para dejarlo para entrega cambiamos servername = db

    $servername = "db";//nombre del servicio en docker-compose.yml
    $username = "root";  // Cambia esto si tienes un usuario diferente
    $password = "123456789";  // Cambia esto si tienes una contraseña
    $dbname = "finanzas";

    $conn = new mysqli($servername, $username, $password, $dbname, 3306);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>