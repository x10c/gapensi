<?php
	include('../../config/db_config.php');
	
	try {
		$query = " select	id_grup		as id";
		$query.= "		,	nama_grup	as name";
		$query.= " from		admin_grup";
		
		$result = mysql_query($query);
		
		$i		= 0;
		$data	= "[";

		while($row = mysql_fetch_assoc($result)){
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}
			
			$data.= "[";
			$data.= "".$row['id'].",";
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