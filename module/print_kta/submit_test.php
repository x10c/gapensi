<?php
	include('../../config/db_config.php');
	
	$id_admin_user = $_COOKIE['username'];
	$no_sert	= $_REQUEST['no_sert'];
	$no_blanko	= $_REQUEST['no_blanko'];
	$no_iujk	= $_REQUEST['no_iujk'];
	$id_badan_usaha	= $_REQUEST['id_badan_usaha'];
	$mac_address	= $_REQUEST['mac_address'];
	$now			= date("Y-m-d-H-i-s");
	
	$dbh->beginTransaction();
	
	try {
		$dbh->exec("
			insert into __print_test_log (no_sert, no_iujk, no_blanko, id_badan_usaha, id_user, mac_address,tanggal)
			values ('$no_sert', '$no_iujk', '$no_blanko', '$id_badan_usaha', '$id_admin_user', '$mac_address','$now')
		");
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>