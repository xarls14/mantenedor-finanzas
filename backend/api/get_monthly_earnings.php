<?php
require_once '../db/db.php';

// Fetch monthly summary of transactions
$query = "
    SELECT 
        DATE_FORMAT(date, '%Y-%m') AS month, 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_gain
    FROM transactions
    GROUP BY DATE_FORMAT(date, '%Y-%m')
    ORDER BY month DESC";

$result = $conn->query($query);

$summary = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $summary[] = $row;
    }
}

echo json_encode($summary);
?>
