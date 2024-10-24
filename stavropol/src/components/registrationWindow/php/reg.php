<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Разрешаем доступ с указанного домена
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Разрешаем методы
header("Access-Control-Allow-Headers: Content-Type"); // Разрешаем заголовки

// Обработка предзапроса (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Завершение предзапроса
}

// Обработка POST-запроса
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['dataUser '])) {
    // Здесь вы можете обработать данные регистрации
    // Например, сохранить их в базу данных
    echo json_encode(['status' => 'success', 'message' => 'Регистрация прошла успешно']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Нет данных']);
}
?>
