<?php
	include('../../config/db_config.php');
	
	try {
		$data	= array();

		$rows	= $dbh->query("
			select		id_badan_usaha
					,	nama
					,	alamat
					,	npwp
					,	bentuk_bu
					,	id_propinsi
					,	ID_Jenis_Usaha	as jenis_usaha
			from		kta_badan_usaha
			order by	id_badan_usaha	desc
		");
		
		foreach ($rows as $row) {
			$data[]	= array(
					"id_badan_usaha"	=> $row['id_badan_usaha']
				,	"nama"				=> $row['nama']
				,	"alamat"			=> $row['alamat']
				,	"npwp"				=> $row['npwp']
				,	"bentuk_bu"			=> $row['bentuk_bu']
				,	"id_propinsi"		=> $row['id_propinsi']
				,	"jenis_usaha"		=> $row['jenis_usaha']
			);
		}

		$jsonobj["data"] = $data;
		
		echo json_encode($jsonobj);
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>