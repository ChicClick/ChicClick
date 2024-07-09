
<?php
$servername = "localhost";
$username = "root";  
$password = "";      
$dbname = "nail_salon";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lastName = $_POST['last_name'];
    $firstName = $_POST['first_name'];
    $contactNumber = $_POST['contact_number'];
    $emailAddress = $_POST['email_address'];
    $serviceName = $_POST['service_name'];
    $servicePrice = $_POST['service_price'];
    $serviceDescription = $_POST['service_description'];
    $designName = $_POST['design_name'];
    $designDescription = $_POST['design_description'];
    $designPrice = $_POST['design_price'];
    $bookingDate = $_POST['booking_date'];
    $bookingTime = $_POST['booking_time'];
    $termsAccepted = isset($_POST['terms']) ? 1 : 0;

    // Handle file upload
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["design_image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["design_image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($targetFile)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["design_image"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["design_image"]["tmp_name"], $targetFile)) {
            echo "The file ". htmlspecialchars(basename($_FILES["design_image"]["name"])). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }

    $imagePath = $uploadOk == 1 ? $targetFile : null;

    $sql = "INSERT INTO bookings (last_name, first_name, contact_number, email_address, service_name, service_price, service_description, design_name, design_description, design_price, booking_date, booking_time, terms_accepted, image_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdsdssdsssi", $lastName, $firstName, $contactNumber, $emailAddress, $serviceName, $servicePrice, $serviceDescription, $designName, $designDescription, $designPrice, $bookingDate, $bookingTime, $termsAccepted, $imagePath);

    if ($stmt->execute()) {
        echo "New booking created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
}

$conn->close();
?>
