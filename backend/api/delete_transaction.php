<?php
header("Content-Type: application/json");
include '../db/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

$sql = "DELETE FROM transactions WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "error", "message" => $conn->error));
}
?>
