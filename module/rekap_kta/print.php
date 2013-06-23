<?php
	include('../../config/db_config.php');
	
	$tanggal_mulai = $_REQUEST['tanggal_mulai'];
	$tanggal_akhir = $_REQUEST['tanggal_akhir'];
	
	$dbh->beginTransaction();
	
	try {
		
		$query = "
			select a.nama DPD, b.nama DPC, 
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 1 and tanggal <= '$tanggal_akhir') grade1,
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 2 and tanggal <= '$tanggal_akhir') grade2,
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 3 and tanggal <= '$tanggal_akhir') grade3,
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 4 and tanggal <= '$tanggal_akhir') grade4,
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 5 and tanggal <= '$tanggal_akhir') grade5,
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 6 and tanggal <= '$tanggal_akhir') grade6,
				  (select count(c.id_badan_usaha) from kta_badan_usaha c, __print_log d where d.ID_BADAN_USAHA= c.ID_Badan_Usaha and c.ID_Propinsi = a.id_propinsi and c.ID_Kabupaten = b.id_kabupaten and gred = 7 and tanggal <= '$tanggal_akhir') grade7
			from kta_mstr_propinsi a
			, kta_mstr_kabupaten b
			where b.ID_Propinsi = a.ID_Propinsi
		";
		
		
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result)
		
		
		
		// print to excel...
		// code
		
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>