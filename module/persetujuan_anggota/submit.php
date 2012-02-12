<?php
	include('../../config/db_config.php');
	
	$dml_type		= $_REQUEST['dml_type'];
	$id_badan_usaha	= $_REQUEST['id_badan_usaha'];
	$id_propinsi	= $_REQUEST['id_propinsi'];
	$nrbu			= $_REQUEST['nrbu'];
	
	$dbh->beginTransaction();
	
	try {
		// update table kta_badan_usaha set field nrbu
		$dbh->exec("
			update	kta_badan_usaha
			set		nrbu			= $nrbu
			where	id_badan_usaha	= $id_badan_usaha
		");

		// insert into table kta_nomor_urut
		$dbh->exec("
			insert into	kta_nomor_urut (
					id_badan_usaha
				,	id_propinsi
				,	masa_berlaku
				,	tgl_pengambilan
				,	nrbu
			)
			values (
					$id_badan_usaha
				,	$id_propinsi
				,	1
				,	now()
				,	$nrbu
			)
		");

		// update table kta_proses set status = '4' (Persetujuan)
		$dbh->exec("
			update	kta_proses
			set		status			= '4'
			where	id_badan_usaha	= $id_badan_usaha
		");
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>