<?php
header("Content-Type: application/json");
include '../db/db.php';

$response = array("status" => "success");
echo json_encode($response);
?>