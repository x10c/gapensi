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
	
	$dbh->beginTransaction();
	
	try {
		switch($dml_type) {
			case "2" :
				// insert into table kta_badan_usaha
				$dbh->exec("
					insert into kta_badan_usaha (
							nama
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
					)
					values (
							'$nama'
						,	'$alamat'
						,	'$kodepos'
						,	'$telepon'
						,	'$fax'
						,	'$email'
						,	'$website'
						,	'$npwp'
						,	'$bentuk_bu'
						,	'$id_propinsi'
						,	'$id_kabupaten'
						,	'$gred'
						,	'$pimpinan_bu'
						,	 $id_jenis_usaha
					)
				");

				// get last insert id from table kta_badan_usaha
				$id = $dbh->lastInsertId();
				
				// insert into table kta_proses with status = '1' (Pendaftaran)
				$dbh->exec("
					insert into kta_proses (
							id_badan_usaha
						,	status
					)
					values (
							$id
						,	'1'
					)
				");
				
				break;
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
			
				break;
			case "4" :
				$dbh->exec("
					delete	from kta_badan_usaha
					where	id_badan_usaha	= $id_badan_usaha
				");

				$dbh->exec("
					delete	from kta_proses
					where	id_badan_usaha	= $id_badan_usaha
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