<?php

	require_once('connectDB.php');

	date_default_timezone_set('Europe/Lisbon');
	$currentDate = date("Y-m-d");

	$userData = json_decode(file_get_contents('php://input'), true);

	$userDataEmail = $userData['email'];
	$userDataIncome = $userData['income'];
	$userDateOutcome = $userData['outcome'];
	$userDataTotalAmount = $userData['totalAmount'];

	$sql = "SELECT email FROM userdata WHERE email LIKE '$userDataEmail'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {

		$sql2 = "UPDATE userdata SET currentIncome = $userDataIncome, currentOutcome = $userDateOutcome, totalBudget = $userDataTotalAmount, updateDate = '$currentDate' WHERE email like '$userDataEmail'";

		$result = $conn->query($sql2);

	} else {
		$sql3 = "INSERT INTO userdata (currentIncome, currentOutcome, email, totalBudget, insertDate, updateDate) VALUES ($userDataIncome, $userDateOutcome, '$userDataEmail', $userDataTotalAmount, '$currentDate', '$currentDate')";

		$result = $conn->query($sql3);
	}





?>
