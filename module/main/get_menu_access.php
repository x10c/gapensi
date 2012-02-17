<?php
	include('../../config/db_config.php');
	
	$user	= $_COOKIE['username'];
	$menu	= $_REQUEST['menu'];

	if ($menu == null || ($menu != null && $menu == "")){
		echo "{success:true, info:'0'}"; 
		return;
	}
	
	setcookie("menu.id", $menu, time() + $cookie_expired, $base_url);
	
	try {
		$query 	= " select	ifnull(max(ha_level),1)	as ha_level";
		$query .= " from	__hak_akses";
		$query .= "	where	menu_id = '$menu'";
		$query .= "	and		id_grup in (";
		$query .= "						select	id_grup";
		$query .= "						from	admin_user";
		$query .= "						where	id_admin_user = '$user'";
		$query .= "						)";
		
		$result = mysql_query($query);
		
		$row = mysql_num_rows($result);
		
		if ($row == 0){
			echo "{success:true, info:'0'}"; 
		} else {
			$data = mysql_fetch_assoc($result);
						
			echo "{success:true, info:'".$data["ha_level"]."'}"; 
		}
	} catch (exception $e) {
		$msg = $e->getMessage();
		echo "{success:false, errorInfo:'".addslashes($msg)."'}"; 
	}
?>