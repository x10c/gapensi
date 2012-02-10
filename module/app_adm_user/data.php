<?php
	include('../../config/db_config.php');
	
	try {
		$query = " select	A.id_admin_user	as username";
		$query.= "		,	B.id_grup		as id_grup";
		$query.= "		,	B.nama_grup		as grup_user";
		$query.= "		,	A.nama_lengkap	as nama_lengkap";
		$query.= "		,	A.email			as email";
		$query.= " from		admin_user	as A";
		$query.= " 		,	admin_grup	as B";
		$query.= " where	A.id_grup	= B.id_grup";
		
		$result = mysql_query($query);
		
		$i		= 0;
		$data	= "[";

		while($row = mysql_fetch_assoc($result)){
			if ($i > 0){
				$data .= ",";
			} else {
				$i	= 1;
			}
			
			$data.= "[";
			$data.= "'".$row['username']."',";
			$data.=	"'".$row['nama_lengkap']."',";
			$data.=	"'".$row['email']."',";
			$data.= "".$row['id_grup'].",";
			$data.=	"'".$row['grup_user']."'";
			$data.=	"]";
		}
		
		$data.= "]";
		
		echo $data;
	} catch (exception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>