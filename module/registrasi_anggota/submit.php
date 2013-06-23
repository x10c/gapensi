<?php
	include('../../config/db_config.php');
	
	$dml_type		= $_REQUEST['dml_type'];
	$id_badan_usaha	= $_REQUEST['id_badan_usaha'];
	$nama			= $_REQUEST['nama'];
	$alamat			= $_REQUEST['alamat'];
	$kodepos		= $_REQUEST['kodepos'];
	$telepon		= $_REQUEST['telepon'];
	$fax			= $_REQUEST['fax'];
	$email			= $_REQUEST['email'];
	$website		= $_REQUEST['website'];
	$npwp			= $_REQUEST['npwp'];
	$bentuk_bu		= $_REQUEST['bentuk_bu'];
	$id_propinsi	= $_REQUEST['id_propinsi'];
	$id_kabupaten	= $_REQUEST['id_kabupaten'];
	$gred			= $_REQUEST['gred'];
	$pimpinan_bu	= $_REQUEST['pimpinan_bu'];
	$id_jenis_usaha	= $_REQUEST['id_jenis_usaha'];
	$current_year	= date('Y');
	$current_date	= date('d-m-Y');
	$dbh->beginTransaction();
	
	try {
		switch($dml_type) {
			
			case "3" :
				$dbh->exec("
					update	kta_badan_usaha
					set		nama			= '$nama'
						,	alamat			= '$alamat'
						,	kodepos			= '$kodepos'
						,	telepon			= '$telepon'
						,	fax				= '$fax'
						,	email			= '$email'
						,	website			= '$website'
						,	npwp			= '$npwp'
						,	bentuk_bu		= '$bentuk_bu'
						,	id_propinsi		= '$id_propinsi'
						,	id_kabupaten	= '$id_kabupaten'
						,	gred			= '$gred'
						,	pimpinan_bu		= '$pimpinan_bu'
						,	id_jenis_usaha	=  $id_jenis_usaha
					where	id_badan_usaha	=  $id_badan_usaha
				");
				// get last insert id from table kta_badan_usaha
				$id = $dbh->lastInsertId();
				
				// check if badan_usaha is already register
				$q = "
					SELECT		count(*) as total
					FROM		kta_proses_status 	AS A
					WHERE		A.id_badan_usaha	= $id_badan_usaha
					AND			A.status		= '1'
					AND			A.tipe_daftar		= '2'
					AND			A.tahun		= $current_year
				";
				
				$result	= $dbh->query($q)->fetchAll();

				foreach ($result as $row){
					$total	= $row['total'];								
				}
				if (($total < 1)) {
					// insert into table kta_proses with status = '2' (Registrasi)
					$dbh->exec("
						insert into kta_proses_status (
								id_badan_usaha
							,	status
							,	tipe_daftar
							,	tahun
							,	tgl_proses
						)
						values (
								$id_badan_usaha
							,	'1'
							,	'2'
							,	$current_year
							,	now()
						)
					");
				}
				
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