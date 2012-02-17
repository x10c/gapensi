<?php
	include('../../config/db_config.php');
	
	$id_admin_user = $_COOKIE['username'];
	
	try {
		$ada	= 0;
		
		$data	= array();
		
		$result	= $dbh->query("
			select	mac_address
				,	status
			from	__komputer_user
			where	id_admin_user = '$id_admin_user'
		")->fetchAll();
		
		$ada = count($result);

		if ($ada == 0) {
			$data[]	= array(
					"id_admin_user"	=> $id_admin_user
				,	"mac_address"	=> ""
				,	"status"		=> "0"
				,	"ada"			=> $ada
			);
		} else {
			foreach ($result as $row) {
				$data[]	= array(
						"id_admin_user"	=> $id_admin_user
					,	"mac_address"	=> $row['mac_address']
					,	"status"		=> $row['status']
					,	"ada"			=> $ada
				);
			}
		}
		
		$jsonobj["data"] = $data;
		
		echo json_encode($jsonobj);
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>