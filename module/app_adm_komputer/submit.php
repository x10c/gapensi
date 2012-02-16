<?php
	include('../../config/db_config.php');
	
	$id_admin_user	= $_REQUEST['id_admin_user'];
	$status			= $_REQUEST['status'];
	
	$dbh->beginTransaction();
	
	try {
		// update table __komputer_user set field status
		$dbh->exec("
			update	__komputer_user
			set		status			= '$status'
			where	id_admin_user	= '$id_admin_user'
		");
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>