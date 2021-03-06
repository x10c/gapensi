<?php
	include('../../config/db_config.php');
	
	$load_type	= $_REQUEST['load_type'];
	$user		= $_COOKIE['username'];
	
	
	try {
		$nama	= $_REQUEST['nama'];
		$no_kta	= $_REQUEST['no_kta'];
		$current_year = date('Y');
		if ($load_type == 'all') {
			$q = "
				SELECT		count(*) as total
				FROM		kta_badan_usaha 	AS A
						,	kta_proses_status	AS B
						,	kta_nomor_urut		AS C
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			B.status 			= '4'
				AND			A.id_badan_usaha	= C.id_badan_usaha
				AND			A.id_propinsi		= C.id_propinsi
				AND			B.tahun		= $current_year
			";
			if ($nama){
				$q .= " AND A.nama like '%$nama%' ";
			}
			if ($no_kta){
				$q .= " AND C.id_nomor_urut_badan_usaha = '$no_kta' ";
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
			$q = "
				SELECT		A.id_badan_usaha	AS id_badan_usaha
						,	A.nama				AS nama
						,	A.alamat			AS alamat
						,	A.npwp				AS npwp
						,	A.bentuk_bu			AS bentuk_bu
						,	A.id_propinsi		AS id_propinsi
						,	A.id_jenis_usaha	AS jenis_usaha
						,	C.id_nomor_urut_badan_usaha	AS no_kta
				FROM		kta_badan_usaha 	AS A
						,	kta_proses_status	AS B
						,	kta_nomor_urut		AS C
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			B.status 			= '4'
				AND			A.id_badan_usaha	= C.id_badan_usaha
				AND			A.id_propinsi		= C.id_propinsi
				AND			B.tahun		= $current_year
			";
			if ($nama){
				$q .= " AND A.nama like '%$nama%' ";
			}
			if ($no_kta){
				$q .= " AND C.id_nomor_urut_badan_usaha = '$no_kta' ";
			}
			$q .= " LIMIT 		$start, $limit ";
			//echo "-$q--";
			$rows	= $dbh->query($q);

		} else {
			$q = "
				SELECT	COUNT(*)	as total
				FROM		kta_badan_usaha 	AS A
						,	kta_proses_status	AS B
						,	kta_nomor_urut		AS Z
				WHERE		A.id_badan_usaha	= B.id_badan_usaha
				AND			B.status 			= '4'
				AND			A.id_badan_usaha	= Z.id_badan_usaha
				AND			A.id_propinsi		= Z.id_propinsi
				AND			B.tahun		= $current_year
				AND			A.id_propinsi		in	(
														select	C.sektor
														from	admin_grup	as C
															,	admin_user	as D
														where	D.id_grup		= C.id_grup
														and		D.id_admin_user	= '$user'
													)
			";
			if ($nama){
				$q .= " AND A.nama like '%$nama%' ";
			}
			if ($no_kta){
				$q .= " AND Z.id_nomor_urut_badan_usaha = '$no_kta' ";
			}
			
			$stmt	= $dbh->query($q);
			$row	= $stmt->fetch();
			$total	= $row['total'];
			
			$start	= $_REQUEST['start']?$_REQUEST['start']:0;
			$limit	= 50;
			
			// if (($total - $start < 50) && ($start != 0)) {
				// $limit	= 50 - $total + $start;
			// }
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
				AND			B.status 			= '4'
				AND			A.id_badan_usaha	= Z.id_badan_usaha
				AND			A.id_propinsi		= Z.id_propinsi
				AND			B.tahun		= $current_year
				AND			A.id_propinsi		in	(
														select	C.sektor
														from	admin_grup	as C
															,	admin_user	as D
														where	D.id_grup		= C.id_grup
														and		D.id_admin_user	= '$user'
													)
			";
			
			if ($nama){
				$q .= " AND A.nama like '%$nama%' ";
			}
			if ($no_kta){
				$q .= " AND Z.id_nomor_urut_badan_usaha = '$no_kta' ";
			}
			$q .= " ORDER BY	A.id_badan_usaha	DESC ";
			$q .= " LIMIT 		$start, $limit ";
			 //echo "$q-";
			$rows	= $dbh->query($q);
		}

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