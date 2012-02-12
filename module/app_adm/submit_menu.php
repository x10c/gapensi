<?php
	include('../../config/db_config.php');
	
	$id_grup		= $_REQUEST['id_grup'];
	$menu_id		= $_REQUEST['menu_id'];
	$ha_level		= $_REQUEST['ha_level'];
	$ha_level_org	= $_REQUEST['ha_level_org'];
	
	$dbh->beginTransaction();
	
	try {
		$result = $dbh->query("
			select	*
			from	__hak_akses
			where	id_grup	= $id_grup
			and		menu_id	= '$menu_id'
		")->fetchAll();

		if (count($result) == 0) {
			$dbh->exec("
				insert into __hak_akses (id_grup, menu_id, ha_level)
				values ($id_grup, '$menu_id', $ha_level)
			");
		} else {
			$dbh->exec("
				update __hak_akses
				set    ha_level	= $ha_level
				where  id_grup  = $id_grup
				and    menu_id  = '$menu_id';
			");		
		}

		$dbh->commit();
		
		echo "{success:true, info:'Data telah tersimpan.'}";
	} catch (PDOexception $e) {
		$dbh->rollBack();
		
		$msg = $e->getMessage();
		
		echo "{success:false, info:'".str_replace("'",'',$msg)."'}"; 
	}
?>