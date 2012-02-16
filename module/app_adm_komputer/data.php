<?php
	include('../../config/db_config.php');
	
	$id_admin_user = $_REQUEST['id_admin_user'];
	
	try {
		$data	= array();
		
		$result	= $dbh->query("
			SELECT		id_admin_user
					,	mac_address
					,	status
			FROM		__komputer_user
			WHERE		id_admin_user	= '$id_admin_user'
		")->fetchAll();
		
		if (count($result) == 0) {
			echo "{success:false, info:'Data Komputer Pengguna tidak ditemukan.'}";
			return;
		}

		foreach ($result as $row) {
			$data[]	= array(
					"id_admin_user"		=> $row['id_admin_user']
				,	"mac_address"		=> $row['mac_address']
				,	"status"			=> $row['status']
			);
		}
		
		$jsonobj["data"] = $data;
		
		echo json_encode($jsonobj);
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>