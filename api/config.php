<?php
// Configuration file for PHP backend

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set content type to JSON
header('Content-Type: application/json');

// Define constants
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('DATA_DIR', __DIR__ . '/data/');
define('GALLERY_JSON', DATA_DIR . 'gallery.json');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// Create directories if they don't exist
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0777, true);
}
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0777, true);
}

// Initialize gallery.json if it doesn't exist
if (!file_exists(GALLERY_JSON)) {
    file_put_contents(GALLERY_JSON, json_encode([], JSON_PRETTY_PRINT));
}

// Helper function to read gallery data
function readGalleryData() {
    $data = file_get_contents(GALLERY_JSON);
    return json_decode($data, true) ?: [];
}

// Helper function to write gallery data
function writeGalleryData($data) {
    return file_put_contents(GALLERY_JSON, json_encode($data, JSON_PRETTY_PRINT));
}

// Helper function to send JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Helper function to send error response
function sendError($message, $statusCode = 400) {
    sendResponse(['error' => $message], $statusCode);
}
