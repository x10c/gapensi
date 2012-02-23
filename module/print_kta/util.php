<?php
function ctword($x) {
	$x = abs($x);
	$number = array("", "satu", "dua", "tiga", "empat", "lima",
	"enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
	$temp = "";

	if ($x <12) {
		$temp = "". $number[$x];
	}
	return $temp;
}

function tanggal($format,$nilai="now"){
	$en=array("Sun","Mon","Tue","Wed","Thu","Fri","Sat","Jan","Feb",
				"Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	$id=array("Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu",
				"Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September",
				"Oktober","November","Desember");
	return str_replace($en,$id,date($format,strtotime($nilai)));
}
?>