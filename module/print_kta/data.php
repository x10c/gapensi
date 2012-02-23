<?php
	include('../../config/db_config.php');

function retrieve_data_badan_usaha($id_badan_usaha){
	try {
		$query = "  SELECT a.ID_Badan_Usaha,   
				 a.Nama,   
				 a.Alamat,   
				 a.Kodepos,   
				 a.Telepon,   
				 a.Fax,   
				 a.ID_Propinsi,   
				 a.ID_Kabupaten,   
				 a.Gred,   
				 a.Pimpinan_BU,
				a.bentuk_BU,
				d.nama as nama_propinsi,
				e.nama as nama_kabupaten,
				c.nama_ketum as ketum_propinsi,
				b.nama_ketum as ketum_kabupaten,
				f.nama_jenis_usaha
			FROM kta_badan_usaha as a
			left join   kta_data_kabupaten as b on b.id_kabupaten = a.id_kabupaten
			left join   kta_data_propinsi as c on c.id_propinsi = a.id_propinsi
			left join 	kta_mstr_propinsi as d on d.id_propinsi = a.id_propinsi
			left join   kta_mstr_kabupaten as e on e.id_kabupaten = a.id_kabupaten
			left join   jenis_usaha as f on f.id_jenis_usaha = a.id_jenis_usaha
			WHERE a.id_badan_usaha = ".$id_badan_usaha;
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);
		
		return $row;
	} catch (exception $e) {
		$msg = $e->getMessage();
		return null; 
	}
}

function retrieve_idbadanusaha_nokta($no_kta, $id_propinsi){
	try {
		$query = " select id_badan_usaha from kta_nomor_urut 
					where id_propinsi = ".$id_propinsi."and 
					id_nomor_urut_badan_usaha = ".$no_kta;
		
		$result = mysql_query($query);
		
		if ($row = mysql_fetch_assoc($result)){
			return $row['id_badan_usaha'];
			
		}
		else { return "";}
	} catch (exception $e) {
		$msg = $e->getMessage();
		return null; 
	}

}

function retrieve_kta_bu($id_badan_usaha, $id_propinsi){
	try {
		$query = " select id_nomor_urut_badan_usaha from kta_nomor_urut 
					where id_propinsi = ".$id_propinsi." and 
					id_badan_usaha = ".$id_badan_usaha;
		
		$result = mysql_query($query);
		
		if ($row = mysql_fetch_assoc($result)){
			return $row['id_nomor_urut_badan_usaha'];
			
		}
		else { return "";}
	} catch (exception $e) {
		$msg = $e->getMessage();
		return null; 
	}

}
?>