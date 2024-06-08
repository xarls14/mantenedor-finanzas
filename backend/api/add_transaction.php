<?php
header("Content-Type: application/json");
include '../db/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$type = $data['type'];
$amount = $data['amount'];
$date = $data['date'];


$sql = "INSERT INTO transactions (type, amount, date) VALUES ('$type', '$amount', '$date')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "error", "message" => $conn->error));
}
?>
