<?php
	include('../../config/db_config.php');
	
	$dml_type	= $_REQUEST['dml_type'];
	$user		= $_REQUEST['user'];
	$grup_user	= $_REQUEST['grup_user'];
	$nama		= $_REQUEST['nama'];
	$email		= $_REQUEST['email'];
	$password	= $_REQUEST['password'];
	
	$dbh->beginTransaction();
	
	try {
		switch($dml_type) {
			case "2" :
				$dbh->exec("
					insert into admin_user (id_admin_user, id_grup, password, nama_lengkap, email, catatan)
					values ('$user', $grup_user, '$password', '$nama', '$email', '')
				");

				break;
			case "3" :
				$dbh->exec("
					update	admin_user
					set		id_grup			= $grup_user
						,	nama_lengkap	= '$nama'
						,	email			= '$email'
						,	password		= '$password'
					where	id_admin_user	= '$user'
				");
			
				break;
			case "4" :
				$dbh->exec("
					delete	from admin_user
					where	id_admin_user	= '$user'
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