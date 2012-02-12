<?php
	include('../../config/db_config.php');
	
	$id_badan_usaha = $_REQUEST['id_badan_usaha'];
	
	try {
		$data	= array();
		
		$result	= $dbh->query("
			select	id_badan_usaha
				,	nama
				,	alamat
				,	kodepos
				,	telepon
				,	fax
				,	email
				,	website
				,	npwp
				,	bentuk_bu
				,	id_propinsi
				,	id_kabupaten
				,	gred
				,	pimpinan_bu
				,	id_jenis_usaha
			from	kta_badan_usaha
			where	id_badan_usaha = $id_badan_usaha
		")->fetchAll();
		
		if (count($result) == 0) {
			echo "{success:false, info:'Data Badan Usaha tidak ditemukan.'}";
			return;
		}

		foreach ($result as $row) {
			$data[]	= array(
					"id_badan_usaha"	=> $row['id_badan_usaha']
				,	"nama"				=> $row['nama']
				,	"alamat"			=> $row['alamat']
				,	"kodepos"			=> $row['kodepos']
				,	"telepon"			=> $row['telepon']
				,	"fax"				=> $row['fax']
				,	"email"				=> $row['email']
				,	"website"			=> $row['website']
				,	"npwp"				=> $row['npwp']
				,	"bentuk_bu"			=> $row['bentuk_bu']
				,	"id_propinsi"		=> $row['id_propinsi']
				,	"id_kabupaten"		=> $row['id_kabupaten']
				,	"gred"				=> $row['gred']
				,	"pimpinan_bu"		=> $row['pimpinan_bu']
				,	"id_jenis_usaha"	=> $row['id_jenis_usaha']
			);
		}
		
		$jsonobj["data"] = $data;
		
		echo json_encode($jsonobj);
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>