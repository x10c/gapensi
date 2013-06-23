<?php
	include('../../config/db_config.php');
	
	try {
		$i		= 0;
		$data	= "[";

		$query = " select	id_propinsi	as id";
		$query.= "		,	nama		as name";
		$query.= " from		propinsi";
		
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