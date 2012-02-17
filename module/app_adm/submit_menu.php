<?php
	include('../../config/db_config.php');
	
	$id_grup		= $_REQUEST['id_grup'];
	$menu			= $_REQUEST['menu'];
	$ha_level		= $_REQUEST['ha_level'];
	$ha_level_org	= $_REQUEST['ha_level_org'];
	
	$dbh->beginTransaction();
	
	try {
		$result = $dbh->query("
			select	ha_level
			from	__hak_akses
			where	id_grup	= $id_grup
			and		menu_id	= '$menu'
		")->fetchAll();

		$jml = count($result);
		
		if ($jml == 0) {
			$dbh->exec("
				insert into __hak_akses (id_grup, menu_id, ha_level)
				values ($id_grup, '$menu', $ha_level)
			");
		} else {
			$dbh->exec("
				update __hak_akses
				set    ha_level	= $ha_level
				where  id_grup  = $id_grup
				and    menu_id  = '$menu'
			");		
		}

		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.".$jml."'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>