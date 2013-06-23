<?php
	include('../../config/db_config.php');
	
	try {
		$i		= 0;
		$data	= "[";

		$query = " select	id_jenis_usaha		as id";
		$query.= "		,	nama_jenis_usaha	as name";
		$query.= " from		jenis_usaha";
		
		$result = mysql_query($query);
		
		while($row = mysql_fetch_assoc($result)){
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}
			
			$data.= "[";
			$data.= "'".$row['id']."',";
			$data.=	"'".$row['name']."'";
			$data.=	"]";
		}
		
		$data.= "]";
		
		echo $data;
	} catch (exception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>