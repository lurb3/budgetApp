<?php

	require_once('connectDB.php');

	$currentDate = date("Y-m-d");
	
	$userData = json_decode(file_get_contents('php://input'), true);
    $userLoginTemp = $userData['userlogin'];
	$userEmailTemp = $userData['useremail'];
	
	$sql = "SELECT * FROM users WHERE email LIKE '$userEmailTemp'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	} else {
        $sqlInsert = "INSERT INTO users (login, insertdate, email) VALUES ('$userLoginTemp', '$currentDate', '$userEmailTemp')";
		$resultInsert = $conn->query($sqlInsert);
	}
	

?>
