<?php
	include('../../config/db_config.php');
	
	$user	= $_COOKIE['username'];
	
	$i = 0;
	$j = 0;
	
	try {
		$query = " select	menu_name, menu_folder, menu_id, icon";
		$query.= " from		__menu";
		$query.= " where	menu_leaf	= '0'";
		$query.= " order by	menu_id";
		
		$result = mysql_query($query);
		
		$data	= "[";
		
		while($row = mysql_fetch_assoc($result)){
			$query = " select	distinct";
			$query.= " 			A.menu_id";
			$query.= " 		,	A.menu_name";
			$query.= " 		,	A.menu_folder";
			$query.= " 		,	A.menu_id";
			$query.= " 		,	A.icon";
			$query.= " from		__menu		as A";
			$query.= " 		,	__hak_akses	as B";
			$query.= " where	A.menu_id		= B.menu_id";
			$query.= " and		B.ha_level		>= 1";
			$query.= " and		A.menu_parent	= '".$row['menu_id']."'";
			$query.= " and		B.id_grup		in (";
			$query.= " 								select	id_grup";
			$query.= " 								from	admin_user";
			$query.= " 								where	id_admin_user	= '$user'";
			$query.= " 								)";
			$query.= " order by	A.menu_id";
			
			$result2 = mysql_query($query);
			
			$row_count = mysql_num_rows($result2);
			
			if ($row_count == 0 || !$result2){
				continue;
			}
			
			if ($i > 0){
				$data .= ",";
			} else {
				$i++;
			}

			$data.= "{ text     : '".$row['menu_name']."'";
			$data.=	", id       : '".$row['menu_folder']."'";
			$data.=	", iconCls  : '".$row['icon']."'";
			$data.=	", children : [";
			
			$j = 0;

			while($row2 = mysql_fetch_assoc($result2)){
				if ($j > 0){
					$data .= ",";
				} else {
					$j++;
				}
				
				$data.= "{";
				$data.=	"  text		: '".$row2['menu_name']."'";
				$data.=	", id		: '".$row2['menu_folder']."'";
				$data.=	", menu_id	: '".$row2['menu_id']."'";
				$data.=	", iconCls  : '".$row2['icon']."'";
				$data.=	", leaf  	: true";
				$data.=	"}";
			}
			
			$data.= "]}";
		}
		
		$data.= "]";
		
		echo $data;
	} catch (exception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>