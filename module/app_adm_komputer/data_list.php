<?php
	include('../../config/db_config.php');
	
	
	try {
		$data	= array();

		$rows	= $dbh->query("
			SELECT		id_admin_user
					,	mac_address
					,	status
			FROM		__komputer_user
			ORDER BY	id_admin_user	DESC
		");
		
		foreach ($rows as $row) {
			$data[]	= array(
					"id_admin_user"	=> $row['id_admin_user']
				,	"mac_address"	=> $row['mac_address']
				,	"status"		=> $row['status']
			);
		}

		$jsonobj["data"] = $data;
		
		echo json_encode($jsonobj);
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>