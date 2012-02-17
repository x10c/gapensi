<?php
	include_once("config/db_config.php");
	
	if ($_COOKIE["username"] != ""){
		$link = $base_url."module/main/index.php";
		
		header('Location:'.$link);
		
		return;
	}
?>

<html>
<head>
<title> GAPENSI </title>
<link rel="shortcut icon" href="<?php echo $base_url; ?>images/icon.png"/>
<link rel="icon" href="<?php echo $base_url; ?>images/icon.png"/>
<link rel="stylesheet" type="text/css" href="<?php echo $base_url; ?>css/index.css"/>

<script>
	var _g_root = '<?php echo $base_url; ?>';
</script>

<script type="text/javascript" src="<?php echo $base_url; ?>js/index-all.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/MD5.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/all.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>layout.js"></script>
</head>

<body>
<div id="back" class="clearfloat">
	<div id="header" class="clearfloat">
		<!--
		-->
	</div>

	<div id="wrap" class="clearfloat">
		<div id="top">
			<div class="horizontal_scroller">
			</div>
		</div>
		<div id="main">
			<div class="image-display">
				<img src="<?php echo $base_url; ?>images/gallery/1.png" width=450 height=225/>
				<img src="<?php echo $base_url; ?>images/gallery/2.png" width=450 height=225/>
				<img src="<?php echo $base_url; ?>images/gallery/3.png" width=450 height=225/>
			</div>

		</div><!--end main-->

		<div id="sidebar" class="clearfloat">
			<div class="login-section">
				<h3>User Login</h3>
				<form name="login_form">
					<label>Nama User:</label>
					<input type="text" name="user" id="user_login" value="" size="23" />
					<label>Kata Kunci:</label>
					<input type="password" name="password" id="user_pass" size="23" onKeyDown="form_pass_on_keydown(event)" />
					<center>
					<input type="button" name="login" value="Login" class="bt_login" onClick="call_do_login()"/>
					</center>
				</form>
			</div>
		</div>
		<div id="footer" class="clearfloat">
			<div class="right">
			<p>&#169; 2012 GAPENSI.ORG - All right reserved. Web Development By x10c.Lab</p>
			</div>
		</div><!--end #footer-->
	</div><!--end wrap-->
</div><!--end back-->
</body>
</html>
