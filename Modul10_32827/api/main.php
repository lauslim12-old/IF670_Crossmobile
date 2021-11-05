<?php
  // access headers
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  // database connection definitions
  define('DB_USER', 'root');
  define('DB_PASSWORD', '');
  define('DB_DATABASE', 'memories');
  define('DB_SERVER', 'localhost');

  // create global connection
  $db = null;
  try {
    $db = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_DATABASE, DB_USER, DB_PASSWORD);
  } catch (Exception $e) {
    echo "Connection error: " . $e->getMessage();
  }

  function getMemories($db) {
    $query = "SELECT * FROM memories";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $data = $stmt->fetchAll();
    $memories['data'] = [];
    foreach ($data as $row) {
      $memory = [
        'id' => $row['id'],
        'title' => $row['title'],
        'type' => $row['type'],
        'photo' => $row['photo'],
        'lat' => (float) $row['lat'],
        'lng' => (float) $row['lng'],
        'created' => $row['created'],
      ];

      array_push($memories['data'], $memory);
    }

    $memories['status'] = 'success';
    $memories['code'] = 200;

    http_response_code(200);
    echo json_encode($memories);
  }

  function createMemory($db) {
    $postedData = json_decode(file_get_contents("php://input"));

    if (!isset($_POST['title']) || 
        !isset($_POST['type']) ||
        !isset($_POST['lat']) ||
        !isset($_POST['lng'])
    ) {
      $response['status'] = 'error';
      $response['code'] = 400;
      http_response_code(400);
      echo json_encode($response);

      return;
    }

    // upload img
    $img = base64_decode($_POST['photo']);
    $filename = rand() . '.png';
    file_put_contents($filename, $img);

    $query = "INSERT INTO memories (title, type, photo, lat, lng) VALUES (?, ?, ?, ?, ?)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $_POST['title']);
    $stmt->bindParam(2, $_POST['type']);
    $stmt->bindParam(3, $filename);
    $stmt->bindParam(4, $_POST['lat']);
    $stmt->bindParam(5, $_POST['lng']);

    if ($stmt->execute()) {
      $response['status'] = 'success';
      $response['code'] = 200;
      http_response_code(200);
    } else {
      $response['status'] = 'error';
      $response['code'] = 500;
      http_response_code(500);
    }

    echo json_encode($response);
  }

  switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
      return getMemories($db);

    case 'POST':
      return createMemory($db);

    default:
      http_response_code(405);
  }
?>