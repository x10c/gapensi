<?php
	include('../../config/db_config.php');
	
	$dml_type		= $_REQUEST['dml_type'];
	$id_admin_user	= $_REQUEST['id_admin_user'];
	$mac_address	= $_REQUEST['mac_address'];
	
	$dbh->beginTransaction();
	
	try {
		switch($dml_type) {
			case "2" :
				$dbh->exec("
					insert into __komputer_user (id_admin_user, mac_address, status)
					values ('$id_admin_user', '$mac_address', '0')
				");

				break;
			case "3" :
				$dbh->exec("
					update	__komputer_user
					set		mac_address		= '$mac_address'
						,	status			= '0'
					where	id_admin_user	= '$id_admin_user'
				");
			
				break;
			case "4" :
				$dbh->exec("
					delete	from __komputer_user
					where	id_admin_user	= '$id_admin_user'
				");

				break;
			default	 :
				echo "{success:false, info:'DML tipe didak diketahui (".$dml_type."')}";
				return;
		}
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>