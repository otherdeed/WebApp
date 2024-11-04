<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$pdo = new PDO("mysql:host=localhost;dbname=123123", "root", "root");


function isUnique($field, $value, $pdo) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE $field = :value");
    $stmt->execute(['value' => $value]);
    return $stmt->fetchColumn() == 0;
}

function isUniquePending($field, $value, $pdo) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM pending_users WHERE $field = :value");
    $stmt->execute(['value' => $value]);
    return $stmt->fetchColumn() == 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = trim($data['name']);
    $email = trim($data['email']);
    $phone = trim($data['phone']);
    $username = trim($data['username']);
    $tgId = trim($data['tgId']);

    if (!isUnique("email", $email, $pdo) || !isUnique("phone", $phone, $pdo) || !isUnique("username", $username, $pdo) ||
        !isUniquePending("email", $email, $pdo) || !isUniquePending("phone", $phone, $pdo) || 
        !isUniquePending("username", $username, $pdo) || !isUnique("tgId", $tgId, $pdo)) {
        echo json_encode(["status" => "error", "message" => "Почта, телефон или имя пользователя уже существуют"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO pending_users (name, email, phone, username, tgId) VALUES (:name, :email, :phone, :username, :tgId)");
    $stmt->execute(['name' => $name, 'email' => $email, 'phone' => $phone, 'username' => $username, 'tgId' => $tgId]);

    echo json_encode(["status" => "success", "message" => "Заявка на регистрацию отправлена. Ожидайте подтверждения"]);
}
?>
