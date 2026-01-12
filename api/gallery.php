<?php
require_once 'config.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Route based on method
switch ($method) {
    case 'GET':
        handleGet();
        break;
    case 'POST':
        handlePost();
        break;
    case 'DELETE':
        handleDelete();
        break;
    default:
        sendError('Method not allowed', 405);
}

// Handle GET requests - Fetch gallery items
function handleGet() {
    $category = $_GET['category'] ?? null;
    $galleryData = readGalleryData();
    
    // Filter by category if provided
    if ($category && $category !== 'all') {
        $galleryData = array_filter($galleryData, function($item) use ($category) {
            return $item['category'] === $category;
        });
        $galleryData = array_values($galleryData); // Re-index array
    }
    
    sendResponse($galleryData);
}

// Handle POST requests - Upload new image
function handlePost() {
    // Validate required fields
    if (!isset($_POST['title']) || !isset($_POST['category'])) {
        sendError('Title and category are required');
    }
    
    // Validate file upload
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        sendError('Image upload failed');
    }
    
    $file = $_FILES['image'];
    
    // Validate file size
    if ($file['size'] > MAX_FILE_SIZE) {
        sendError('File size exceeds maximum allowed size (10MB)');
    }
    
    // Validate file extension
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($fileExtension, ALLOWED_EXTENSIONS)) {
        sendError('Invalid file type. Allowed: ' . implode(', ', ALLOWED_EXTENSIONS));
    }
    
    // Generate unique filename
    $uniqueId = uniqid() . '_' . time();
    $filename = $uniqueId . '.' . $fileExtension;
    $uploadPath = UPLOAD_DIR . $filename;
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        sendError('Failed to save uploaded file');
    }
    
    // Create gallery item
    $galleryItem = [
        'id' => $uniqueId,
        'title' => $_POST['title'],
        'description' => $_POST['description'] ?? '',
        'category' => $_POST['category'],
        'image' => '/api/uploads/' . $filename,
        'createdAt' => date('Y-m-d H:i:s')
    ];
    
    // Add to gallery data
    $galleryData = readGalleryData();
    $galleryData[] = $galleryItem;
    writeGalleryData($galleryData);
    
    sendResponse($galleryItem, 201);
}

// Handle DELETE requests - Remove image
function handleDelete() {
    // Get ID from query string
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        sendError('ID is required');
    }
    
    $galleryData = readGalleryData();
    $itemIndex = null;
    $item = null;
    
    // Find item by ID
    foreach ($galleryData as $index => $galleryItem) {
        if ($galleryItem['id'] === $id) {
            $itemIndex = $index;
            $item = $galleryItem;
            break;
        }
    }
    
    if ($itemIndex === null) {
        sendError('Item not found', 404);
    }
    
    // Delete physical file
    $imagePath = str_replace('/api/uploads/', UPLOAD_DIR, $item['image']);
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }
    
    // Remove from gallery data
    array_splice($galleryData, $itemIndex, 1);
    writeGalleryData($galleryData);
    
    sendResponse(['success' => true, 'message' => 'Item deleted successfully']);
}
