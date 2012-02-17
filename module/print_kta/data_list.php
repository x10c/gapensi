<?php
	include('../../config/db_config.php');
	
	$load_type	= $_REQUEST['load_type'];
	$user		= $_COOKIE['username'];
	
	try {
		$data	= array();

		if ($load_type == 'all') {
			$rows	= $dbh->query("
				SELECT		A.id_badan_usaha	AS id_badan_usaha
						,	A.nama				AS nama
						,	A.alamat			AS alamat
						,	A.npwp				AS npwp
						,	A.bentuk_bu			AS bentuk_bu
						,	A.id_propinsi		AS id_propinsi
						,	A.id_jenis_usaha	AS jenis_usaha
				FROM		kta_badan_usaha 	AS A
						,	kta_proses 			AS B
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			B.status 			= '4'
				ORDER BY	A.id_badan_usaha	DESC
			");
		} else {
			$rows	= $dbh->query("
				SELECT		A.id_badan_usaha	AS id_badan_usaha
						,	A.nama				AS nama
						,	A.alamat			AS alamat
						,	A.npwp				AS npwp
						,	A.bentuk_bu			AS bentuk_bu
						,	A.id_propinsi		AS id_propinsi
						,	A.id_jenis_usaha	AS jenis_usaha
				FROM		kta_badan_usaha 	AS A
						,	kta_proses 			AS B
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			B.status 			= '4'
				AND			A.id_propinsi		in	(
														select	C.sektor
														from	admin_grup	as C
															,	admin_user	as D
														where	D.id_grup		= C.id_grup
														and		D.id_admin_user	= '$user'
													)
				ORDER BY	A.id_badan_usaha	DESC
			");
		}
		
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