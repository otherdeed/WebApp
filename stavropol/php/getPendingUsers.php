<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$pdo = new PDO("mysql:host=localhost;dbname=123123", "root", "root");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->query("SELECT id, name, email, phone, username, created_at, tgId FROM pending_users");
$pendingUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["pendingUsers" => $pendingUsers]);
?>