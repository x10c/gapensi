<?php
	include('../../config/db_config.php');
	
	try {
		$i		= 0;
		$data	= "[";

		$rows	= $dbh->query("
			select	id_propinsi		as id_propinsi
				,	nama			as nama
			from	kta_mstr_propinsi
		");
		
		foreach ($rows as $row) {
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}

			$data.= "[";
			$data.= "'".$row['id_propinsi']."',";
			$data.=	"'".$row['nama']."',";
			$data.=	"]";			
		}
		
		$data.= "]";
		
		echo $data;
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>