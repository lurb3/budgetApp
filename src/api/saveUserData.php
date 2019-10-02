<?php

	require_once('connectDB.php');

	$income = json_decode(file_get_contents('php://input'), true);
	$incomeTemp = $income['income'];
	$sql = "INSERT INTO spends (name, amount, insertdate, quantity, userid) VALUES ('teste', $incomeTemp, '2019-09-26', 2, 1)";
	$result = $conn->query($sql);

?>
