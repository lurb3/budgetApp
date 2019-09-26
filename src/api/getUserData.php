<?php

require_once('connectDB.php');


    $sql = "SELECT * from users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
            $fields = $row;
        }

    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    echo json_encode($fields);



?>
