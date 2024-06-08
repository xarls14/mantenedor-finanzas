<?php
header("Content-Type: application/json");
include '../db/db.php';

// comprobamos si la base de datos existe

$db_check_query = "SHOW DATABASES LIKE '$dbname'";
$db_check_result = $conn->query($db_check_query);

if ($db_check_result->num_rows == 0) {

    $create_db_query = "CREATE DATABASE $dbname";

    if ($conn->query($create_db_query) === TRUE) {
        echo "Database created successfully\n";
    } else {
        echo "Error creating database: " . $conn->error;
    }
}

// Seleccionar la base de datos
$conn->select_db($dbname);

// Verificar si la tabla `transactions` existe, si no, crearla
$table_check_query = "SHOW TABLES LIKE 'transactions'";
$table_check_result = $conn->query($table_check_query);

if ($table_check_result->num_rows == 0) {
    // Crear la tabla transactions
    $create_table_query = "CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('income', 'expense') NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL
    )";

    if ($conn->query($create_table_query) === TRUE) {
        echo "Table transactions created successfully\n";
    } else {
        echo "Error creating table: " . $conn->error;
    }
}

$sql = "SELECT * FROM transactions";
$result = $conn->query($sql);

$transactions = array();
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);
?>