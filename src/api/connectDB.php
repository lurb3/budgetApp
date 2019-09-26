<?php
	header('Access-Control-Allow-Origin: *', 'Access-Control-Allow-Headers: *');
    $servername = "gustavomonteiro.pt";
    $username = "gustavom_budget";
    $password = "(xyK#pU?jTkR";
    $dbname="gustavom_budgetapp";

// Create connection
global $conn;
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
