<?php 
	include("../../config/db_config.php");
	
	$user = $_COOKIE["username"];
	
	if ($user == null || $user == ""){
		$link = $base_url."index.php";
		
		header('Location:'.$link);
		
		return;
	}
?>
<html>
<head>
<title>GAPENSI</title>
<link rel="shortcut icon" href="<?php echo $base_url; ?>images/icon.png"/>
<link rel="stylesheet" type="text/css" href="<?php echo $base_url; ?>css/main.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo $base_url; ?>css/all.css"/>

<script type="text/javascript" src="<?php echo $base_url; ?>extjs/extjs-ux-all.js"></script>

<script>
	var _g_root = '<?php echo $base_url; ?>';
	
	Ext.QuickTips.init();
</script>

<script type="text/javascript" src="<?php echo $base_url; ?>js/cherryonext-0.3.3/src/netbox/InputTextMask.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/Ext.ux.Printer/Printer.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/Ext.ux.Printer/renderers/Base.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/all.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/MD5.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/NumericField.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>js/cbColumn.js"></script>
<!-- <script type="text/javascript" src="<?php echo $base_url; ?>js/miframe/mif.js"></script> -->

<script type="text/javascript" src="<?php echo $base_url; ?>module/app_home/layout.js"></script>
<script type="text/javascript" src="<?php echo $base_url; ?>module/main/layout.js"></script>

</head>

<body>
<div id="loading-mask"></div>
<div id="loading">
    <div class="loading-indicator">
        <img src="<?php echo $base_url; ?>images/logo.png"
		style='margin-right:8px;' align='absmiddle' />
	<br/>
        Loading&hellip;
    </div>
</div>

<div id="header">
	<img class="header_logo" src="<?php echo $base_url; ?>images/logo.png"/>
	<span class="title">Sistem Informasi GAPENSI</span>
	<span class="subtitle">Gabungan Pelaksana Konstruksi Nasional Indonesia</span>
</div>

<div class='user'>
<span><?php echo $_COOKIE['nama_lengkap']." ( ".$_COOKIE['username']." )"; ?></span>
&nbsp;&nbsp; | &nbsp;&nbsp;
<a class="logout" href="#" onclick='do_logout()'>Logout</a>
</div>

<div id="msg"></div>
<div id="content"></div>

<div id="footer">
&#169; 2012 GAPENSI.ORG - All right reserved. Web Development By x10c.Lab
</div>

</body>
</html>