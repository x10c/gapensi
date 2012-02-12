<?php
	include('../../config/db_config.php');
	
	$id_propinsi = $_REQUEST['id_propinsi'];
	
	try {
		$i		= 0;
		$data	= "[";

		$query = " select	id_propinsi		as id_propinsi";
		$query.= "		,	id_kabupaten	as id_kabupaten";
		$query.= "		,	nama			as nama";
		$query.= " from		kabupaten";
		$query.= " where	id_propinsi	= '$id_propinsi'";
		
		$result = mysql_query($query);
		
		while($row = mysql_fetch_assoc($result)){
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}
			
			$data.= "[";
			$data.= "'".$row['id_propinsi']."',";
			$data.= "'".$row['id_kabupaten']."',";
			$data.=	"'".$row['nama']."'";
			$data.=	"]";
		}
		
		$data.= "]";
		
		echo $data;
	} catch (exception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>