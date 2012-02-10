<?php
	include('../../config/db_config.php');
	
	setcookie("username", "", time() - $cookie_expired, $base_url);
	setcookie("nama_lengkap", "", time() - $cookie_expired, $base_url);

	echo "{success:true, info:'".$base_url."'}"; 
?>