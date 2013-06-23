<?php
	include ('config.php');
	$base_url 		= "/gapensi/";
	$cookie_expired = 60*60*24; // 1 day

	$database		= "gapensi";
	$username		= "gapensi";
	$password		= "gapens1";
	
	$link = mysql_connect('localhost', $username, $password);
	
	if (!$link){
		die('Could not connect : '.mysql_error());
	}
	
	$db = mysql_select_db($database, $link);
	
	if (!$db){
		die ('Can\'t use '.$database.' database : ' . mysql_error());
	}
	
	$dsn = 'mysql:dbname='.$database.';host=127.0.0.1';
	
	try {
		$dbh = new PDO($dsn, $username, $password);
		
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo 'Connection failed : '.$e->getMessage();
	}
?>