<?php
	include('../../config/db_config.php');
	
	try {
		$i		= 0;
		$data	= "[";

		$rows	= $dbh->query("
			select	id_grup		as id_grup
				,	nama_grup	as nama_grup
				,	catatan		as catatan
			from	admin_grup
		");
		
		foreach ($rows as $row) {
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}

			$data.= "[";
			$data.= "".$row['id_grup'].",";
			$data.=	"'".$row['nama_grup']."',";
			$data.=	"'".$row['catatan']."'";
			$data.=	"]";			
		}
		
		$data.= "]";
		
		echo $data;
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>