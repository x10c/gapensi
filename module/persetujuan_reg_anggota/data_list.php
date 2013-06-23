<?php
	include('../../config/db_config.php');
	
	$user		= $_COOKIE['username'];
	
	try {
		$current_year = date('Y');
		$npwp	= $_REQUEST['npwp'];
		$nama	= $_REQUEST['nama'];
			$q = "
				SELECT		count(*) as total
				FROM		kta_badan_usaha 	AS A
						,	kta_proses_status	AS B
						,	kta_nomor_urut		AS Z
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			A.id_badan_usaha	= Z.id_badan_usaha
				AND			A.id_propinsi		= Z.id_propinsi
				AND			B.status 			= '1'
				AND			B.tipe_daftar			= '2'
				AND			B.tahun 			= $current_year
			";
			if ($nama){
				$q .= " AND A.nama like '%$nama%' ";
			}
			if ($npwp){
				$q .= " AND A.npwp = '$npwp' ";
			}

			$result	= $dbh->query($q)->fetchAll();

			foreach ($result as $row){
				$total	= $row['total'];
			}
			
			$start	= $_REQUEST['start']?$_REQUEST['start']:0;
			$limit	= 50;
			
			if (($total - $start < 50) && ($start != 0)) {
				$limit	= 50 - $total + $start;
			}
			
			// $limit	= $start + 50 - $limit;
			$q = "
				SELECT		A.id_badan_usaha	AS id_badan_usaha
						,	A.nama				AS nama
						,	A.alamat			AS alamat
						,	A.npwp				AS npwp
						,	A.bentuk_bu			AS bentuk_bu
						,	A.id_propinsi		AS id_propinsi
						,	A.id_jenis_usaha	AS jenis_usaha
						,	Z.id_nomor_urut_badan_usaha	AS no_kta
				FROM		kta_badan_usaha 	AS A
						,	kta_proses_status	AS B
						,	kta_nomor_urut		AS Z
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			A.id_badan_usaha	= Z.id_badan_usaha
				AND			A.id_propinsi		= Z.id_propinsi
				AND			B.status 			= '1'
				AND			B.tipe_daftar 			= '2'
				AND			B.tahun 			= $current_year
			";
			if ($nama){
				$q .= " AND A.nama like '%$nama%' ";
			}
			if ($npwp){
				$q .= " AND Z.npwp = '$npwp' ";
			}
			$q .= " LIMIT 		$start, $limit ";
			//echo "-$q--";
			$rows	= $dbh->query($q);

		

		$data	= array();
	
		foreach ($rows as $row) {
			$data[]	= array(
					"id_badan_usaha"	=> $row['id_badan_usaha']
				,	"nama"				=> $row['nama']
				,	"alamat"			=> $row['alamat']
				,	"npwp"				=> $row['npwp']
				,	"bentuk_bu"			=> $row['bentuk_bu']
				,	"id_propinsi"		=> $row['id_propinsi']
				,	"jenis_usaha"		=> $row['jenis_usaha']
				,	"no_kta"			=> $row['no_kta']
			);
		}
		
		$jsonobj["success"]	= 'true';
		$jsonobj["results"]	= $total;
		$jsonobj["data"]	= $data;
		
		echo json_encode($jsonobj);
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>