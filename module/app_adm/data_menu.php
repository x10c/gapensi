<?php
	include('../../config/db_config.php');
	
	$id_grup	= $_REQUEST['id_grup'];
	
	try {
		$i		= 0;
		$data	= "[";

		$rows	= $dbh->query("
			SELECT	B.menu_id								AS menu_id
				,	B.menu_name								AS menu_name
				,	CONCAT(C.menu_id, ' - ', C.menu_name)	AS menu_parent
				,	IFNULL(A.ha_level, 0) 					AS ha_level
			FROM		__hak_akses	AS A
			RIGHT JOIN	__menu		AS B ON	A.menu_id = B.menu_id AND A.id_grup	= $id_grup
				,		__menu		AS C
			WHERE 		B.menu_leaf		= '1'
			AND			B.menu_parent	= C.menu_id
			ORDER BY 	B.menu_id
		");
		
		foreach ($rows as $row) {
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}

			$data.= "[";
			$data.= "'".$row['menu_parent']."'";
			$data.=	",'".$row['menu_id']."'";
			$data.=	",'".$row['menu_name']."'";
			$data.=	",'".$row['ha_level']."'";
			$data.=	",'".$row['ha_level']."'";
			$data.=	"]";			
		}

		$data.= "]";
		
		echo $data;
	} catch (PDOexception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>