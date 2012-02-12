<?php
	include('../../config/db_config.php');
	
	$dml_type	= $_REQUEST['dml_type'];
	$id_grup	= $_REQUEST['id_grup'];
	$nama_grup	= $_REQUEST['nama_grup'];
	$catatan	= $_REQUEST['catatan'];
	
	$dbh->beginTransaction();
	
	try {
		switch($dml_type) {
			case "2" :
				$dbh->exec("
					insert into admin_grup (nama_grup, catatan, tgl_dibuat, tgl_perubahan, sektor, sektor_asosiasi, direktori_grup)
					values ('$nama_grup', '$catatan', now(), now(), '', '', '')
				");

				break;
			case "3" :
				$dbh->exec("
					update	admin_grup
					set		nama_grup		= '$nama_grup'
						,	catatan			= '$catatan'
						,	tgl_perubahan	= now()
					where	id_grup			= $id_grup
				");
			
				break;
			case "4" :
				$dbh->exec("
					delete	from __hak_akses
					where	id_grup	= $id_grup
				");
				
				$dbh->exec("
					delete	from admin_user
					where	id_grup	= $id_grup
				");
				
				$dbh->exec("
					delete	from admin_grup
					where	id_grup	= $id_grup
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