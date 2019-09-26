<?php

	require_once('connectDB.php');

	$userid = json_decode(file_get_contents('php://input'), true);
	$useridTemp = $userid['userid'];
	$sql = "SELECT * from spends where userid like $useridTemp";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {

		while($row = $result->fetch_assoc()) {
			$fields = $row;
		}

		echo json_encode($fields);
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

?>
