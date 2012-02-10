<?php
	include('../../config/db_config.php');
	
	$user	= $_COOKIE['username'];
	$lama	= $_REQUEST['lama'];
	$baru	= $_REQUEST['baru'];
	
	$dbh->beginTransaction();
	
	try {
		$result = $dbh->query("
			select	id_admin_user
			from	admin_user
			where	id_admin_user	= '$user'
			and		password		= '$lama'
		")->fetchAll();
		
		if (count($result) == 0) {
			echo "{success:false, info:'Kata Kunci lama anda salah.'}";
			return;
		}
		
		$dbh->exec("
			update	admin_user
			set		password		= '$baru'
			where	id_admin_user	= '$user'
		");
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>