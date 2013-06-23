<?php
	include('../../config/db_config.php');
	
	$id_badan_usaha	= $_REQUEST['id_badan_usaha'];
	$id_propinsi	= $_REQUEST['id_propinsi'];
	$nrbu			= $_REQUEST['nrbu'];
	
	$dbh->beginTransaction();
	
	try {
		$current_year	= date('Y');
		$current_date	= date('d-m-Y');
		// update table kta_badan_usaha set field nrbu
		$dbh->exec("
			update	kta_badan_usaha
			set		nrbu			= $nrbu
			where	id_badan_usaha	= $id_badan_usaha
		");

		// update into table kta_nomor_urut
		$dbh->exec("
			update	kta_nomor_urut
				set 	masa_berlaku = 1
				,		tgl_pengambilan = now()
				,		nrbu = $nrbu
			where id_badan_usaha =	$id_badan_usaha
			and	 id_propinsi = '$id_propinsi'
		");

		// update table kta_proses set status = '4' (Persetujuan)
		$dbh->exec("
			update	kta_proses_status
			set		status			= '4'
			,		tgl_persetujuan = now()
			where	id_badan_usaha	= $id_badan_usaha
			and	tahun	= $current_year
		");
		
		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>