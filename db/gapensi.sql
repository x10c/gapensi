-- MySQL dump 10.11
--
-- Host: localhost    Database: gapensi
-- ------------------------------------------------------
-- Server version	5.0.75-0ubuntu10.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `2011_kta_proses`
--

DROP TABLE IF EXISTS `2011_kta_proses`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `2011_kta_proses` (
  `ID_Proses` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Status` char(1) default NULL,
  PRIMARY KEY  (`ID_Proses`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=44205 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `2011_kta_status`
--

DROP TABLE IF EXISTS `2011_kta_status`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `2011_kta_status` (
  `ID_Status` int(8) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(6) NOT NULL,
  `User` varchar(50) NOT NULL,
  `Tanggal` date NOT NULL,
  `Proses` char(2) NOT NULL,
  PRIMARY KEY  (`ID_Status`)
) ENGINE=MyISAM AUTO_INCREMENT=256900 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `admin_grup`
--

DROP TABLE IF EXISTS `admin_grup`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `admin_grup` (
  `ID_Grup` int(11) unsigned NOT NULL auto_increment,
  `Nama_Grup` varchar(255) NOT NULL,
  `Catatan` text NOT NULL,
  `Tgl_Dibuat` datetime NOT NULL default '0000-00-00 00:00:00',
  `Tgl_Perubahan` datetime NOT NULL default '0000-00-00 00:00:00',
  `Sektor` char(5) NOT NULL,
  `Sektor_Asosiasi` char(2) NOT NULL,
  `Direktori_Grup` varchar(255) NOT NULL,
  `Perm_Admin_Portal` tinyint(3) unsigned NOT NULL default '0',
  `Perm_Tambah_Admin_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Ubah_Admin_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Hapus_Admin_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Lihat_Admin_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Tambah_Admin_Grup` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Ubah_Admin_Grup` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Hapus_Admin_Grup` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Lihat_Admin_Grup` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Tambah_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Ubah_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Hapus_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_Lihat_User` tinyint(1) unsigned NOT NULL default '0',
  `Perm_viewlog` tinyint(1) unsigned NOT NULL default '0',
  `Perm_purgeactivitylog` tinyint(1) unsigned NOT NULL default '0',
  `Perm_openclosesite` tinyint(1) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Grup`),
  KEY `Sektor_Asosiasi` (`Sektor_Asosiasi`),
  KEY `Tgl_Dibuat` (`Tgl_Dibuat`),
  KEY `Tgl_Perubahan` (`Tgl_Perubahan`),
  FULLTEXT KEY `groupname` (`Nama_Grup`,`Catatan`)
) ENGINE=MyISAM AUTO_INCREMENT=479 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `admin_user` (
  `ID_Admin_User` varchar(32) collate latin1_general_ci NOT NULL,
  `ID_Grup` int(11) NOT NULL default '0',
  `Password` varchar(255) collate latin1_general_ci NOT NULL,
  `Nama_Lengkap` varchar(255) collate latin1_general_ci NOT NULL,
  `Email` varchar(255) collate latin1_general_ci NOT NULL,
  `Catatan` varchar(255) collate latin1_general_ci NOT NULL,
  `Tgl_Terdaftar` datetime NOT NULL default '0000-00-00 00:00:00',
  `Tgl_Perubahan` datetime NOT NULL default '0000-00-00 00:00:00',
  `Timezone` smallint(6) NOT NULL default '25200',
  `Pagesize` smallint(6) NOT NULL default '10',
  `Format_Tgl` varchar(16) collate latin1_general_ci NOT NULL default 'D, d M Y',
  `Format_Waktu` varchar(16) collate latin1_general_ci NOT NULL default 'h:i:s O',
  `Perm_Login` tinyint(1) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Admin_User`),
  KEY `ID_Grup` (`ID_Grup`),
  FULLTEXT KEY `id` (`ID_Admin_User`,`Nama_Lengkap`,`Email`,`Catatan`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `admin_user_log`
--

DROP TABLE IF EXISTS `admin_user_log`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `admin_user_log` (
  `userlogid` int(10) unsigned NOT NULL auto_increment,
  `userid` varchar(32) NOT NULL,
  `action` varchar(32) NOT NULL,
  `task` varchar(255) NOT NULL,
  `level` enum('error','warn','info','debug') NOT NULL default 'error',
  `ip` varchar(15) NOT NULL,
  `time` datetime NOT NULL default '0000-00-00 00:00:00',
  `note` text NOT NULL,
  PRIMARY KEY  (`userlogid`),
  KEY `adminuserid` (`userid`),
  KEY `task` (`action`),
  KEY `ip` (`ip`),
  KEY `time` (`time`)
) ENGINE=MyISAM AUTO_INCREMENT=19117 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `admin_user_permission`
--

DROP TABLE IF EXISTS `admin_user_permission`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `admin_user_permission` (
  `user_id` varchar(11) collate latin1_general_ci NOT NULL default '',
  `module_id` int(11) NOT NULL default '0',
  `created` datetime NOT NULL default '0000-00-00 00:00:00',
  `modified` datetime NOT NULL default '0000-00-00 00:00:00',
  `perm_login` tinyint(1) NOT NULL default '0',
  `perm_purgeactivitylog` tinyint(1) NOT NULL default '0',
  `perm_add` tinyint(1) NOT NULL default '0',
  `perm_edit` tinyint(1) NOT NULL default '0',
  `perm_delete` tinyint(1) NOT NULL default '0',
  `perm_publish` tinyint(1) NOT NULL default '0',
  `perm_view` tinyint(3) NOT NULL default '0',
  PRIMARY KEY  (`user_id`,`module_id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `akte_pendirian`
--

DROP TABLE IF EXISTS `akte_pendirian`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `akte_pendirian` (
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `No_Akte_Pendirian` varchar(50) default NULL,
  `Nama_Notaris` varchar(100) default NULL,
  `Alamat` varchar(250) default NULL,
  `Tgl_Akte_Pendirian` date default NULL,
  `Kabupaten_Akte_Pendirian` varchar(4) default NULL,
  `No_Pengesahan_Menteri` varchar(50) default NULL,
  `Tgl_Pengesahan_Menteri` date default NULL,
  `No_Pengesahan_PN` varchar(50) default NULL,
  `Tgl_Pengesahan_PN` date default NULL,
  `No_Pengesahan_LN` varchar(50) default NULL,
  `Tgl_Pengesahan_LN` date default NULL,
  PRIMARY KEY  (`ID_Badan_Usaha`),
  KEY `Kabupaten_Akte_Pendirian` (`Kabupaten_Akte_Pendirian`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `akte_perubahan`
--

DROP TABLE IF EXISTS `akte_perubahan`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `akte_perubahan` (
  `ID_Akte_Perubahan` int(11) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) default NULL,
  `Tanggal` date default NULL,
  `Nomer` varchar(50) default NULL,
  `Nama_Notaris` varchar(100) default NULL,
  `Alamat` varchar(250) default NULL,
  `Kabupaten` varchar(4) default NULL,
  PRIMARY KEY  (`ID_Akte_Perubahan`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=128267 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `alat_konstruksi`
--

DROP TABLE IF EXISTS `alat_konstruksi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `alat_konstruksi` (
  `ID_Alat_Konstruksi` int(11) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Jenis` varchar(50) default NULL,
  `Jumlah` varchar(50) default NULL,
  `Kapasitas` varchar(50) default NULL,
  `Merk` varchar(50) default NULL,
  `Nomor` varchar(50) default NULL,
  `Tahun` varchar(4) default NULL,
  `Kondisi` varchar(5) default NULL,
  `Lokasi` char(2) default NULL,
  `Harga` double default NULL,
  `Row` int(11) default '1',
  PRIMARY KEY  (`ID_Alat_Konstruksi`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=979477 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `anggota`
--

DROP TABLE IF EXISTS `anggota`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `anggota` (
  `ID_Anggota` int(11) unsigned NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL,
  `ID_Propinsi` char(2) character set latin1 NOT NULL,
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL,
  `Nama` varchar(255) character set latin1 default NULL,
  `Alamat1` varchar(255) character set latin1 default NULL,
  `Alamat2` varchar(255) character set latin1 default NULL,
  `Kodepos` char(20) character set latin1 default NULL,
  `ID_Kabupaten` char(4) character set latin1 default NULL,
  `Telepon` varchar(255) character set latin1 default NULL,
  `Fax` varchar(255) character set latin1 default NULL,
  `Email` varchar(255) character set latin1 default NULL,
  `Website` varchar(255) character set latin1 default NULL,
  `NPWP` varchar(255) character set latin1 default NULL,
  PRIMARY KEY  (`ID_Anggota`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `artikel`
--

DROP TABLE IF EXISTS `artikel`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `artikel` (
  `ID_Artikel` int(10) NOT NULL auto_increment,
  `Judul` varchar(250) NOT NULL,
  `Isi_Artikel` text NOT NULL,
  `Gambar` varchar(250) NOT NULL,
  `Pembuat` varchar(30) NOT NULL,
  `Tanggal` datetime NOT NULL,
  `Jenis` tinyint(2) NOT NULL,
  `ID_Kategori_Artikel` tinyint(2) NOT NULL,
  `Status` tinyint(2) unsigned NOT NULL default '0',
  `Mimetype` varchar(255) NOT NULL,
  `Ext` varchar(100) NOT NULL,
  `Total_Pembaca` int(11) NOT NULL,
  `Sektor` char(2) NOT NULL,
  UNIQUE KEY `id` (`ID_Artikel`)
) ENGINE=MyISAM AUTO_INCREMENT=474 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `badan_usaha`
--

DROP TABLE IF EXISTS `badan_usaha`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `badan_usaha` (
  `ID_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Propinsi_Registrasi` char(2) default NULL,
  `Nama` varchar(100) default NULL,
  `Alamat1` varchar(250) default NULL,
  `Alamat2` varchar(250) default NULL,
  `Kodepos` varchar(9) default NULL,
  `Telepon` varchar(50) default NULL,
  `Fax` varchar(50) default NULL,
  `Email` varchar(100) default NULL,
  `Website` varchar(100) default NULL,
  `NPWP` varchar(25) default NULL,
  `Bentuk_BU` char(1) default NULL,
  `Jenis_BU` char(1) default NULL,
  `Golongan_BU` char(1) default NULL,
  `NO_SPT` varchar(30) default NULL,
  `Kekayaan_Bersih` double default NULL,
  `ID_Kabupaten` varchar(4) NOT NULL default '',
  `Pemilik_BU` varchar(50) default NULL,
  `Pimpinan_BU` varchar(50) default NULL,
  PRIMARY KEY  (`ID_Badan_Usaha`),
  KEY `idx_prop` (`ID_Propinsi_Registrasi`),
  KEY `ID_Kabupaten` (`ID_Kabupaten`),
  KEY `NPWP` (`NPWP`),
  KEY `Bentuk_BU` (`Bentuk_BU`),
  KEY `Jenis_BU` (`Jenis_BU`),
  KEY `Kekayaan_Bersih` (`Kekayaan_Bersih`),
  FULLTEXT KEY `Nama` (`Nama`)
) ENGINE=MyISAM AUTO_INCREMENT=8919067 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `banner` (
  `ID_Banner` int(7) unsigned NOT NULL auto_increment,
  `ID_Kategori_Banner` int(7) NOT NULL,
  `Tgl_Tayang` datetime NOT NULL,
  `Tgl_Akhir_Tayang` datetime NOT NULL,
  `Tgl_Dibuat` datetime NOT NULL,
  `Keterangan` text NOT NULL,
  `Pembuat` varchar(255) NOT NULL,
  `Ext` varchar(255) NOT NULL,
  `Mimetype` varchar(255) NOT NULL,
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Banner`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `bentuk_badan_usaha`
--

DROP TABLE IF EXISTS `bentuk_badan_usaha`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `bentuk_badan_usaha` (
  `ID_Bentuk_Badan_Usaha` int(3) NOT NULL auto_increment,
  `Nama` varchar(255) collate latin1_general_ci NOT NULL,
  PRIMARY KEY  (`ID_Bentuk_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `cpc`
--

DROP TABLE IF EXISTS `cpc`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `cpc` (
  `kode` varchar(5) NOT NULL default '',
  `cpc` varchar(5) NOT NULL default '',
  `sub_bidang` varchar(100) NOT NULL default '',
  `sub_sub_bidang` varchar(100) NOT NULL default '',
  PRIMARY KEY  (`kode`),
  KEY `sub_bidang` (`sub_bidang`),
  KEY `sub_sub_bidang` (`sub_sub_bidang`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `cpc08`
--

DROP TABLE IF EXISTS `cpc08`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `cpc08` (
  `kode` varchar(5) NOT NULL default '',
  `cpc` varchar(5) NOT NULL default '',
  `sub_bidang` varchar(255) NOT NULL,
  `sub_sub_bidang` varchar(255) NOT NULL,
  PRIMARY KEY  (`kode`),
  KEY `sub_bidang` (`sub_bidang`),
  KEY `sub_sub_bidang` (`sub_sub_bidang`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `cpc_k`
--

DROP TABLE IF EXISTS `cpc_k`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `cpc_k` (
  `kode` varchar(5) NOT NULL default '',
  `cpc` varchar(5) NOT NULL default '',
  `sub_bidang` varchar(100) NOT NULL default '',
  `sub_sub_bidang` varchar(100) NOT NULL default '',
  `ID_Bidang_Klasifikasi` char(2) NOT NULL,
  PRIMARY KEY  (`kode`),
  KEY `sub_bidang` (`sub_bidang`),
  KEY `sub_sub_bidang` (`sub_sub_bidang`),
  KEY `ID_Bidang_Klasifikasi` (`ID_Bidang_Klasifikasi`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `download`
--

DROP TABLE IF EXISTS `download`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `download` (
  `ID_Download` int(5) NOT NULL auto_increment,
  `Keterangan` text NOT NULL,
  `Tanggal` date NOT NULL default '0000-00-00',
  `ID_Jenis_Dokumen` tinyint(2) unsigned NOT NULL default '1',
  `Status` tinyint(3) unsigned NOT NULL default '0',
  `Mimetype` varchar(255) NOT NULL,
  `Ext` varchar(255) NOT NULL,
  `Sektor` char(5) NOT NULL,
  UNIQUE KEY `id` (`ID_Download`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_01`
--

DROP TABLE IF EXISTS `drp8_01`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_01` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41352 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_02`
--

DROP TABLE IF EXISTS `drp8_02`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_02` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=43038 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_03`
--

DROP TABLE IF EXISTS `drp8_03`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_03` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_04`
--

DROP TABLE IF EXISTS `drp8_04`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_04` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_05`
--

DROP TABLE IF EXISTS `drp8_05`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_05` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_06`
--

DROP TABLE IF EXISTS `drp8_06`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_06` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_07`
--

DROP TABLE IF EXISTS `drp8_07`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_07` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_08`
--

DROP TABLE IF EXISTS `drp8_08`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_08` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_09`
--

DROP TABLE IF EXISTS `drp8_09`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_09` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=45915 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_10`
--

DROP TABLE IF EXISTS `drp8_10`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_10` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=52527 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_11`
--

DROP TABLE IF EXISTS `drp8_11`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_11` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=70039 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_12`
--

DROP TABLE IF EXISTS `drp8_12`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_12` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_13`
--

DROP TABLE IF EXISTS `drp8_13`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_13` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=96020 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_14`
--

DROP TABLE IF EXISTS `drp8_14`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_14` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_15`
--

DROP TABLE IF EXISTS `drp8_15`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_15` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_16`
--

DROP TABLE IF EXISTS `drp8_16`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_16` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_17`
--

DROP TABLE IF EXISTS `drp8_17`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_17` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_18`
--

DROP TABLE IF EXISTS `drp8_18`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_18` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_19`
--

DROP TABLE IF EXISTS `drp8_19`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_19` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_20`
--

DROP TABLE IF EXISTS `drp8_20`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_20` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=48423 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_21`
--

DROP TABLE IF EXISTS `drp8_21`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_21` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_22`
--

DROP TABLE IF EXISTS `drp8_22`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_22` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_23`
--

DROP TABLE IF EXISTS `drp8_23`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_23` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_24`
--

DROP TABLE IF EXISTS `drp8_24`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_24` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_25`
--

DROP TABLE IF EXISTS `drp8_25`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_25` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_26`
--

DROP TABLE IF EXISTS `drp8_26`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_26` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_27`
--

DROP TABLE IF EXISTS `drp8_27`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_27` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_28`
--

DROP TABLE IF EXISTS `drp8_28`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_28` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_29`
--

DROP TABLE IF EXISTS `drp8_29`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_29` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_30`
--

DROP TABLE IF EXISTS `drp8_30`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_30` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_31`
--

DROP TABLE IF EXISTS `drp8_31`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_31` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_32`
--

DROP TABLE IF EXISTS `drp8_32`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_32` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `drp8_33`
--

DROP TABLE IF EXISTS `drp8_33`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `drp8_33` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM AUTO_INCREMENT=41338 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `galeri`
--

DROP TABLE IF EXISTS `galeri`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `galeri` (
  `ID_Galeri` int(7) unsigned NOT NULL auto_increment,
  `ID_Kategori_Galeri` int(7) NOT NULL,
  `Judul` varchar(255) NOT NULL,
  `Keterangan` text NOT NULL,
  `Tgl_Dibuat` datetime NOT NULL,
  `Pembuat` varchar(255) NOT NULL,
  `Ext` varchar(255) NOT NULL,
  `Mimetype` varchar(255) NOT NULL,
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Galeri`)
) ENGINE=MyISAM AUTO_INCREMENT=468 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `info_lelang`
--

DROP TABLE IF EXISTS `info_lelang`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `info_lelang` (
  `ID_Lelang` int(11) NOT NULL auto_increment,
  `Kode_Proyek` varchar(255) NOT NULL,
  `Pemilik_Proyek` varchar(255) NOT NULL,
  `ID_Propinsi` char(2) NOT NULL,
  `ID_Kabupaten` char(4) NOT NULL,
  `ID_Sumber_Dana` tinyint(3) NOT NULL,
  `Nama_Paket` text NOT NULL,
  `Pagu_Dana` int(15) NOT NULL,
  `Sub_Bidang` varchar(255) NOT NULL,
  `Kualifikasi` varchar(255) NOT NULL,
  `Di_Muat_Media` varchar(255) NOT NULL,
  `Tempat_Daftar` varchar(255) NOT NULL,
  `Tgl_Daftar` varchar(255) NOT NULL,
  `Jam_Daftar` varchar(255) NOT NULL,
  `Syarat_Daftar` text NOT NULL,
  `Syarat_Peserta` text NOT NULL,
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Lelang`),
  KEY `ID_Propinsi` (`ID_Propinsi`),
  KEY `ID_Kabupaten` (`ID_Kabupaten`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ip2nation`
--

DROP TABLE IF EXISTS `ip2nation`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `ip2nation` (
  `ip` int(11) unsigned NOT NULL default '0',
  `country` char(2) NOT NULL default '',
  KEY `ip` (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `jenis_badan_usaha`
--

DROP TABLE IF EXISTS `jenis_badan_usaha`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `jenis_badan_usaha` (
  `ID_Jenis_Badan_Usaha` int(3) unsigned NOT NULL auto_increment,
  `Nama` varchar(255) collate latin1_general_ci NOT NULL,
  PRIMARY KEY  (`ID_Jenis_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `jenis_dokumen`
--

DROP TABLE IF EXISTS `jenis_dokumen`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `jenis_dokumen` (
  `ID_Jenis_Dokumen` tinyint(3) NOT NULL auto_increment,
  `Nama` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID_Jenis_Dokumen`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `jenjang_pendidikan`
--

DROP TABLE IF EXISTS `jenjang_pendidikan`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `jenjang_pendidikan` (
  `ID_Jenjang` char(1) NOT NULL default '',
  `Deskripsi` varchar(150) default NULL,
  PRIMARY KEY  (`ID_Jenjang`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kabupaten`
--

DROP TABLE IF EXISTS `kabupaten`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kabupaten` (
  `ID_Kabupaten` varchar(4) NOT NULL default '',
  `Nama` varchar(100) default NULL,
  `ID_Propinsi` char(2) NOT NULL default '',
  PRIMARY KEY  (`ID_Kabupaten`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kategori_artikel`
--

DROP TABLE IF EXISTS `kategori_artikel`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kategori_artikel` (
  `ID_Kategori_Artikel` int(11) NOT NULL auto_increment,
  `Nama` varchar(255) NOT NULL,
  `Keterangan` text NOT NULL,
  `Status` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Kategori_Artikel`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kategori_banner`
--

DROP TABLE IF EXISTS `kategori_banner`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kategori_banner` (
  `ID_Kategori_Banner` int(4) unsigned NOT NULL auto_increment,
  `Nama` varchar(255) NOT NULL,
  `Keterangan` text NOT NULL,
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  PRIMARY KEY  (`ID_Kategori_Banner`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kategori_galeri`
--

DROP TABLE IF EXISTS `kategori_galeri`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kategori_galeri` (
  `ID_Kategori_Galeri` int(4) unsigned NOT NULL auto_increment,
  `Nama` varchar(255) NOT NULL,
  `Keterangan` text NOT NULL,
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  PRIMARY KEY  (`ID_Kategori_Galeri`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `konsultasi`
--

DROP TABLE IF EXISTS `konsultasi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `konsultasi` (
  `ID_Konsultasi` int(10) NOT NULL auto_increment,
  `Nama` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Perihal` varchar(255) NOT NULL,
  `Masalah` text NOT NULL,
  `Jawaban` text NOT NULL,
  `Tgl_Konsultasi` date NOT NULL,
  `Tayang` tinyint(3) unsigned NOT NULL default '0',
  `IP` varchar(255) NOT NULL,
  UNIQUE KEY `id` (`ID_Konsultasi`)
) ENGINE=MyISAM AUTO_INCREMENT=4830 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_badan_usaha`
--

DROP TABLE IF EXISTS `kta_badan_usaha`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_badan_usaha` (
  `ID_Badan_Usaha` int(10) NOT NULL auto_increment,
  `Nama` varchar(100) default NULL,
  `Alamat` varchar(250) default NULL,
  `Kodepos` varchar(9) default NULL,
  `Telepon` varchar(50) default NULL,
  `Fax` varchar(50) default NULL,
  `Email` varchar(100) default NULL,
  `Website` varchar(100) default NULL,
  `NPWP` varchar(25) default NULL,
  `Bentuk_BU` char(1) default NULL,
  `Jenis_BU` char(1) default NULL,
  `ID_Propinsi` char(2) NOT NULL,
  `ID_Kabupaten` varchar(4) NOT NULL default '',
  `Gred` char(1) default NULL,
  `Pimpinan_BU` varchar(250) default NULL,
  `NRBU` int(6) default NULL,
  PRIMARY KEY  (`ID_Badan_Usaha`),
  KEY `ID_Kabupaten` (`ID_Kabupaten`),
  KEY `NPWP` (`NPWP`),
  KEY `Bentuk_BU` (`Bentuk_BU`),
  KEY `Jenis_BU` (`Jenis_BU`),
  FULLTEXT KEY `Nama` (`Nama`)
) ENGINE=MyISAM AUTO_INCREMENT=57936 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_badan_usaha_tmp`
--

DROP TABLE IF EXISTS `kta_badan_usaha_tmp`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_badan_usaha_tmp` (
  `ID_Badan_Usaha` int(10) NOT NULL auto_increment,
  `Nama` varchar(100) default NULL,
  `Alamat` varchar(250) default NULL,
  `Kodepos` varchar(9) default NULL,
  `Telepon` varchar(50) default NULL,
  `Fax` varchar(50) default NULL,
  `Email` varchar(100) default NULL,
  `Website` varchar(100) default NULL,
  `NPWP` varchar(25) default NULL,
  `Bentuk_BU` char(1) default NULL,
  `Jenis_BU` char(1) default NULL,
  `ID_Propinsi` char(2) NOT NULL,
  `ID_Kabupaten` varchar(4) NOT NULL default '',
  `Gred` char(1) default NULL,
  `Pimpinan_BU` varchar(250) default NULL,
  `Nama_Pendaftar` varchar(255) NOT NULL,
  `Telepon_Pendaftar` varchar(255) NOT NULL,
  `Email_Pendaftar` varchar(255) NOT NULL,
  `Catatan` text NOT NULL,
  `Logo_Mimetype` varchar(255) NOT NULL,
  `Logo_Ext` varchar(255) NOT NULL,
  `NRBU` int(6) default NULL,
  PRIMARY KEY  (`ID_Badan_Usaha`),
  KEY `ID_Kabupaten` (`ID_Kabupaten`),
  KEY `NPWP` (`NPWP`),
  KEY `Bentuk_BU` (`Bentuk_BU`),
  KEY `Jenis_BU` (`Jenis_BU`),
  FULLTEXT KEY `Nama` (`Nama`)
) ENGINE=MyISAM AUTO_INCREMENT=246 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_data_kabupaten`
--

DROP TABLE IF EXISTS `kta_data_kabupaten`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_data_kabupaten` (
  `ID_Kabupaten` varchar(4) NOT NULL,
  `ID_Propinsi` char(2) NOT NULL,
  `Alamat` varchar(255) NOT NULL,
  `Kode_Pos` varchar(5) NOT NULL,
  `Telepon` varchar(100) NOT NULL,
  `Fax` varchar(100) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Nama_Ketum` varchar(255) NOT NULL,
  `Nama_Admin` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID_Kabupaten`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_data_propinsi`
--

DROP TABLE IF EXISTS `kta_data_propinsi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_data_propinsi` (
  `ID_Propinsi` char(2) NOT NULL,
  `Alamat` varchar(255) NOT NULL,
  `ID_Kabupaten` varchar(4) NOT NULL,
  `Kode_Pos` varchar(5) NOT NULL,
  `Telepon` varchar(100) NOT NULL,
  `Fax` varchar(100) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Nama_Ketum` varchar(255) NOT NULL,
  `Nama_Admin` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID_Propinsi`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_distribusi_blanko`
--

DROP TABLE IF EXISTS `kta_distribusi_blanko`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_distribusi_blanko` (
  `ID_Distribusi_Blanko` int(15) NOT NULL auto_increment,
  `Tgl_Distribusi` date NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  `No_Seri_Awal` varchar(15) NOT NULL,
  `No_Seri_Akhir` varchar(15) NOT NULL,
  `ID_Propinsi` char(2) NOT NULL,
  `ID_Kabupaten` char(5) NOT NULL,
  `User` varchar(50) NOT NULL,
  `Jenis_Blanko` char(1) NOT NULL,
  PRIMARY KEY  (`ID_Distribusi_Blanko`),
  KEY `Tgl_Distribusi` (`Tgl_Distribusi`),
  KEY `ID_Propinsi` (`ID_Propinsi`),
  KEY `ID_Kabupaten` (`ID_Kabupaten`)
) ENGINE=MyISAM AUTO_INCREMENT=467 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_mstr_kabupaten`
--

DROP TABLE IF EXISTS `kta_mstr_kabupaten`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_mstr_kabupaten` (
  `ID_Kabupaten` varchar(4) NOT NULL default '',
  `Nama` varchar(100) default NULL,
  `ID_Propinsi` char(2) NOT NULL default '',
  PRIMARY KEY  (`ID_Kabupaten`),
  FULLTEXT KEY `Nama` (`Nama`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_mstr_persyaratan`
--

DROP TABLE IF EXISTS `kta_mstr_persyaratan`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_mstr_persyaratan` (
  `ID_Persyaratan` int(2) NOT NULL auto_increment,
  `Uraian` longtext NOT NULL,
  `Bobot` char(2) NOT NULL,
  PRIMARY KEY  (`ID_Persyaratan`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_mstr_propinsi`
--

DROP TABLE IF EXISTS `kta_mstr_propinsi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_mstr_propinsi` (
  `ID_Propinsi` char(2) NOT NULL default '',
  `Nama` varchar(100) default NULL,
  `Nama_Singkat` varchar(10) default NULL,
  PRIMARY KEY  (`ID_Propinsi`),
  FULLTEXT KEY `Nama` (`Nama`,`Nama_Singkat`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_mstr_proses`
--

DROP TABLE IF EXISTS `kta_mstr_proses`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_mstr_proses` (
  `ID_Proses` int(2) NOT NULL auto_increment,
  `Uraian` varchar(100) NOT NULL,
  `Proses` char(1) NOT NULL,
  `Status` varchar(1) NOT NULL,
  `ID_Menu` char(2) NOT NULL,
  PRIMARY KEY  (`ID_Proses`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_01`
--

DROP TABLE IF EXISTS `kta_nomor_seri_01`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_01` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=3872 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_02`
--

DROP TABLE IF EXISTS `kta_nomor_seri_02`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_02` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=3226 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_03`
--

DROP TABLE IF EXISTS `kta_nomor_seri_03`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_03` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=3725 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_04`
--

DROP TABLE IF EXISTS `kta_nomor_seri_04`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_04` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=2807 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_05`
--

DROP TABLE IF EXISTS `kta_nomor_seri_05`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_05` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=2012 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_06`
--

DROP TABLE IF EXISTS `kta_nomor_seri_06`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_06` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1934 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_07`
--

DROP TABLE IF EXISTS `kta_nomor_seri_07`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_07` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=711 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_08`
--

DROP TABLE IF EXISTS `kta_nomor_seri_08`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_08` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=745 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_09`
--

DROP TABLE IF EXISTS `kta_nomor_seri_09`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_09` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=5049 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_10`
--

DROP TABLE IF EXISTS `kta_nomor_seri_10`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_10` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=6260 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_11`
--

DROP TABLE IF EXISTS `kta_nomor_seri_11`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_11` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=8900 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_12`
--

DROP TABLE IF EXISTS `kta_nomor_seri_12`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_12` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1627 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_13`
--

DROP TABLE IF EXISTS `kta_nomor_seri_13`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_13` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=8056 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_14`
--

DROP TABLE IF EXISTS `kta_nomor_seri_14`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_14` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=3822 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_15`
--

DROP TABLE IF EXISTS `kta_nomor_seri_15`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_15` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1831 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_16`
--

DROP TABLE IF EXISTS `kta_nomor_seri_16`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_16` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=3887 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_17`
--

DROP TABLE IF EXISTS `kta_nomor_seri_17`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_17` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=2392 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_18`
--

DROP TABLE IF EXISTS `kta_nomor_seri_18`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_18` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1435 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_19`
--

DROP TABLE IF EXISTS `kta_nomor_seri_19`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_19` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1659 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_20`
--

DROP TABLE IF EXISTS `kta_nomor_seri_20`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_20` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=4583 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_21`
--

DROP TABLE IF EXISTS `kta_nomor_seri_21`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_21` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=973 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_22`
--

DROP TABLE IF EXISTS `kta_nomor_seri_22`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_22` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=2339 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_23`
--

DROP TABLE IF EXISTS `kta_nomor_seri_23`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_23` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1419 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_24`
--

DROP TABLE IF EXISTS `kta_nomor_seri_24`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_24` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=3356 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_25`
--

DROP TABLE IF EXISTS `kta_nomor_seri_25`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_25` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1311 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_26`
--

DROP TABLE IF EXISTS `kta_nomor_seri_26`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_26` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=7247 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_27`
--

DROP TABLE IF EXISTS `kta_nomor_seri_27`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_27` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1275 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_28`
--

DROP TABLE IF EXISTS `kta_nomor_seri_28`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_28` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1584 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_29`
--

DROP TABLE IF EXISTS `kta_nomor_seri_29`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_29` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=828 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_30`
--

DROP TABLE IF EXISTS `kta_nomor_seri_30`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_30` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1086 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_31`
--

DROP TABLE IF EXISTS `kta_nomor_seri_31`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_31` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=1576 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_32`
--

DROP TABLE IF EXISTS `kta_nomor_seri_32`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_32` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=2433 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_seri_33`
--

DROP TABLE IF EXISTS `kta_nomor_seri_33`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_seri_33` (
  `ID_Nomor_Seri` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(8) NOT NULL,
  `No_Seri` varchar(15) NOT NULL,
  `Tahun` varchar(4) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Seri`)
) ENGINE=MyISAM AUTO_INCREMENT=225 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_01`
--

DROP TABLE IF EXISTS `kta_nomor_urut_01`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_01` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2717 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_02`
--

DROP TABLE IF EXISTS `kta_nomor_urut_02`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_02` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2008 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_03`
--

DROP TABLE IF EXISTS `kta_nomor_urut_03`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_03` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2049 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_04`
--

DROP TABLE IF EXISTS `kta_nomor_urut_04`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_04` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1569 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_05`
--

DROP TABLE IF EXISTS `kta_nomor_urut_05`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_05` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1165 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_06`
--

DROP TABLE IF EXISTS `kta_nomor_urut_06`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_06` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1326 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_07`
--

DROP TABLE IF EXISTS `kta_nomor_urut_07`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_07` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=381 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_08`
--

DROP TABLE IF EXISTS `kta_nomor_urut_08`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_08` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=467 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_09`
--

DROP TABLE IF EXISTS `kta_nomor_urut_09`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_09` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=4138 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_10`
--

DROP TABLE IF EXISTS `kta_nomor_urut_10`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_10` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=3856 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_11`
--

DROP TABLE IF EXISTS `kta_nomor_urut_11`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_11` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=4269 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_12`
--

DROP TABLE IF EXISTS `kta_nomor_urut_12`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_12` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=734 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_13`
--

DROP TABLE IF EXISTS `kta_nomor_urut_13`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_13` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=4882 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_14`
--

DROP TABLE IF EXISTS `kta_nomor_urut_14`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_14` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2098 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_15`
--

DROP TABLE IF EXISTS `kta_nomor_urut_15`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_15` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1159 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_16`
--

DROP TABLE IF EXISTS `kta_nomor_urut_16`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_16` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2189 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_17`
--

DROP TABLE IF EXISTS `kta_nomor_urut_17`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_17` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2047 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_18`
--

DROP TABLE IF EXISTS `kta_nomor_urut_18`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_18` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1079 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_19`
--

DROP TABLE IF EXISTS `kta_nomor_urut_19`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_19` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1019 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_20`
--

DROP TABLE IF EXISTS `kta_nomor_urut_20`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_20` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2820 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_21`
--

DROP TABLE IF EXISTS `kta_nomor_urut_21`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_21` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=583 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_22`
--

DROP TABLE IF EXISTS `kta_nomor_urut_22`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_22` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1180 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_23`
--

DROP TABLE IF EXISTS `kta_nomor_urut_23`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_23` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1262 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_24`
--

DROP TABLE IF EXISTS `kta_nomor_urut_24`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_24` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=2036 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_25`
--

DROP TABLE IF EXISTS `kta_nomor_urut_25`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_25` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=787 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_26`
--

DROP TABLE IF EXISTS `kta_nomor_urut_26`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_26` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=4224 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_27`
--

DROP TABLE IF EXISTS `kta_nomor_urut_27`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_27` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=785 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_28`
--

DROP TABLE IF EXISTS `kta_nomor_urut_28`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_28` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1037 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_29`
--

DROP TABLE IF EXISTS `kta_nomor_urut_29`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_29` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=526 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_30`
--

DROP TABLE IF EXISTS `kta_nomor_urut_30`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_30` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=582 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_31`
--

DROP TABLE IF EXISTS `kta_nomor_urut_31`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_31` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1005 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_32`
--

DROP TABLE IF EXISTS `kta_nomor_urut_32`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_32` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=1547 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_nomor_urut_33`
--

DROP TABLE IF EXISTS `kta_nomor_urut_33`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_nomor_urut_33` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` int(2) default NULL,
  `Tgl_Pengambilan` date default NULL,
  `NRBU` int(10) NOT NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=162 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_persyaratan`
--

DROP TABLE IF EXISTS `kta_persyaratan`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_persyaratan` (
  `ID` int(8) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(6) NOT NULL,
  `ID_Persyaratan` int(2) NOT NULL,
  `Periksa` char(2) NOT NULL,
  `Nilai` int(6) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=477721 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_proses`
--

DROP TABLE IF EXISTS `kta_proses`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_proses` (
  `ID_Proses` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Status` char(1) default NULL,
  PRIMARY KEY  (`ID_Proses`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=45640 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_proses_01`
--

DROP TABLE IF EXISTS `kta_proses_01`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_proses_01` (
  `ID_DRP` int(6) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `CPC` varchar(5) NOT NULL default '',
  `ID_Asosiasi_Badan_Usaha` char(2) NOT NULL default '',
  `Jenis_Kinerja` char(1) default '0',
  `Kualifikasi` char(2) NOT NULL default '',
  `Tahun` varchar(4) default NULL,
  `Kemampuan_Dasar` double NOT NULL default '0',
  `Tahun_KD` varchar(4) NOT NULL default '',
  `Proses` char(1) default NULL,
  `User_Pemohon` varchar(100) NOT NULL default '',
  `Tgl_Permohonan` date NOT NULL default '0000-00-00',
  `User_Ctk_BA` varchar(100) NOT NULL default '',
  `Tgl_Ctk_BA` date NOT NULL default '0000-00-00',
  `User_Setuju` varchar(100) NOT NULL default '',
  `Tgl_Setuju` date NOT NULL default '0000-00-00',
  `User_Cetak` varchar(100) NOT NULL default '',
  `Tgl_Cetak` date NOT NULL default '0000-00-00',
  `User_Approval` varchar(100) NOT NULL default '',
  `Tgl_Approval` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`ID_DRP`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `CPC` (`CPC`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `Tgl_Permohonan` (`Tgl_Permohonan`),
  KEY `Tgl_Ctk_BA` (`Tgl_Ctk_BA`),
  KEY `Tgl_Setuju` (`Tgl_Setuju`),
  KEY `Tgl_Approval` (`Tgl_Approval`),
  KEY `Kemampuan_Dasar` (`Kemampuan_Dasar`),
  KEY `Tgl_Cetak` (`Tgl_Cetak`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_registrasi`
--

DROP TABLE IF EXISTS `kta_registrasi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_registrasi` (
  `Id` int(11) NOT NULL auto_increment,
  `Asosiasi` char(2) default NULL,
  `Propinsi` char(2) default NULL,
  `PCID` varchar(50) default NULL,
  `RegKey` varchar(50) default NULL,
  `Tgl_Reg` date default NULL,
  `Status` char(1) default NULL,
  `Download` char(1) default NULL,
  `TglDownload` date default NULL,
  `Kabupaten` varchar(4) default NULL,
  `Password` varchar(255) NOT NULL,
  `Nama_Ketum` varchar(255) NOT NULL,
  `Nama_Admin` varchar(255) NOT NULL,
  `Pasword` varchar(255) NOT NULL,
  PRIMARY KEY  (`Id`),
  KEY `Asosiasi` (`Asosiasi`),
  KEY `Propinsi` (`Propinsi`),
  KEY `Tgl_Reg` (`Tgl_Reg`),
  KEY `TglDownload` (`TglDownload`),
  KEY `PCID` (`PCID`),
  KEY `PCID_2` (`PCID`),
  KEY `PCID_3` (`PCID`)
) ENGINE=MyISAM AUTO_INCREMENT=538 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_setup_aplikasi`
--

DROP TABLE IF EXISTS `kta_setup_aplikasi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_setup_aplikasi` (
  `ID` int(2) NOT NULL,
  `Nama_Proses` varchar(100) NOT NULL,
  `Proses` char(2) NOT NULL,
  `Lingkup` char(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kta_status`
--

DROP TABLE IF EXISTS `kta_status`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kta_status` (
  `ID_Status` int(8) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(6) NOT NULL,
  `User` varchar(50) NOT NULL,
  `Tanggal` date NOT NULL,
  `Proses` char(2) NOT NULL,
  PRIMARY KEY  (`ID_Status`)
) ENGINE=MyISAM AUTO_INCREMENT=258058 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kualifikasi`
--

DROP TABLE IF EXISTS `kualifikasi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `kualifikasi` (
  `ID_Kualifikasi` char(2) NOT NULL,
  `Deskripsi` text NOT NULL,
  PRIMARY KEY  (`ID_Kualifikasi`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `links` (
  `ID_Link` int(5) NOT NULL auto_increment,
  `Nama` varchar(250) NOT NULL,
  `Website` varchar(250) NOT NULL,
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(1) unsigned NOT NULL default '0',
  UNIQUE KEY `id` (`ID_Link`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_01`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_01`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_01` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_02`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_02`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_02` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=133900 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_03`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_03`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_03` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=80067 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_04`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_04`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_04` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=343887 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_05`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_05`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_05` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_06`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_06`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_06` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=318828 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_07`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_07`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_07` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=310920 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_08`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_08`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_08` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=349490 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_09`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_09`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_09` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=902226 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_10`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_10`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_10` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=858925 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_11`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_11`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_11` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=50160 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_12`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_12`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_12` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=76532 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_13`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_13`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_13` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=23059 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_14`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_14`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_14` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_15`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_15`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_15` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_16`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_16`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_16` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=40603 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_17`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_17`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_17` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=400055 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_18`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_18`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_18` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=44482 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_19`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_19`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_19` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_20`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_20`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_20` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=136733 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_21`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_21`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_21` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_22`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_22`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_22` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=23505 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_23`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_23`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_23` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_24`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_24`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_24` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_25`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_25`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_25` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_26`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_26`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_26` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_27`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_27`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_27` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_28`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_28`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_28` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_29`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_29`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_29` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_30`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_30`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_30` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_31`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_31`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_31` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=351647 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_32`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_32`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_32` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=15562 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nomor_urut_badan_usaha_33`
--

DROP TABLE IF EXISTS `nomor_urut_badan_usaha_33`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `nomor_urut_badan_usaha_33` (
  `ID_Nomor_Urut_Badan_Usaha` int(10) NOT NULL auto_increment,
  `ID_Badan_Usaha` int(10) NOT NULL default '0',
  `Masa_Berlaku` date default NULL,
  `Tgl_Pengambilan` int(10) default NULL,
  PRIMARY KEY  (`ID_Nomor_Urut_Badan_Usaha`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `Tgl_Pengambilan` (`Tgl_Pengambilan`)
) ENGINE=MyISAM AUTO_INCREMENT=134636 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pemilik_saham`
--

DROP TABLE IF EXISTS `pemilik_saham`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `pemilik_saham` (
  `ID_Pemilik_Saham` int(11) NOT NULL auto_increment,
  `ID_Jenis_Pemilik` char(1) NOT NULL default '',
  `ID_Terkait` int(11) default NULL,
  `ID_Badan_Usaha` int(11) NOT NULL default '0',
  `Jumlah_Lembar` int(11) default NULL,
  `Nilai_Per_Lembar` int(7) default NULL,
  `Modal_Dasar` decimal(15,2) default NULL,
  `Modal_Disetor` decimal(15,2) default NULL,
  PRIMARY KEY  (`ID_Pemilik_Saham`),
  KEY `ID_Jenis_Pemilik` (`ID_Jenis_Pemilik`),
  KEY `ID_Terkait` (`ID_Terkait`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`)
) ENGINE=MyISAM AUTO_INCREMENT=403256 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `penanggung_jawab`
--

DROP TABLE IF EXISTS `penanggung_jawab`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `penanggung_jawab` (
  `ID_Person` int(11) NOT NULL default '0',
  `ID_Badan_Usaha` int(11) NOT NULL default '0',
  `Pend_Akhir` varchar(30) default NULL,
  `No_Ijazah` varchar(20) default NULL,
  `ID_Sub_Bidang_Klasifikasi` varchar(6) default NULL,
  `ID_Bidang_Klasifikasi` char(2) default NULL,
  `PJBU` char(1) default NULL,
  `PJO` char(1) default NULL,
  `PJB` char(1) default NULL,
  `PJSB` char(1) default NULL,
  `TA` char(1) default NULL,
  `TT` char(1) default NULL,
  `Noreg` varchar(30) default NULL,
  `Thn_Lulus` varchar(4) default NULL,
  `TUK` char(2) default NULL,
  `JTK` char(1) default NULL,
  `Row` int(11) default '1',
  PRIMARY KEY  (`ID_Person`),
  KEY `ID_Sub_Bidang_Klasifikasi` (`ID_Sub_Bidang_Klasifikasi`),
  KEY `ID_Bidang_Klasifikasi` (`ID_Bidang_Klasifikasi`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `PJBU` (`PJBU`),
  KEY `PJO` (`PJO`),
  KEY `PJB` (`PJB`),
  KEY `PJSB` (`PJSB`),
  KEY `TA` (`TA`),
  KEY `TT` (`TT`),
  KEY `TUK` (`TUK`),
  KEY `JTK` (`JTK`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pengaduan`
--

DROP TABLE IF EXISTS `pengaduan`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `pengaduan` (
  `ID_Pengaduan` int(10) NOT NULL auto_increment,
  `Nama` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Tujuan` text NOT NULL,
  `Perihal` varchar(255) NOT NULL,
  `Isi_Pengaduan` text NOT NULL,
  `Jawaban` text NOT NULL,
  `Tgl_Pengaduan` date NOT NULL,
  `Tayang` tinyint(3) unsigned NOT NULL default '0',
  `IP` varchar(255) NOT NULL,
  UNIQUE KEY `id` (`ID_Pengaduan`)
) ENGINE=MyISAM AUTO_INCREMENT=4682 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pengalaman_badan_usaha`
--

DROP TABLE IF EXISTS `pengalaman_badan_usaha`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `pengalaman_badan_usaha` (
  `ID_Pengalaman` bigint(20) NOT NULL auto_increment,
  `Nama_Paket` varchar(250) NOT NULL,
  `NKPK` int(12) NOT NULL,
  `NKPK_Old` varchar(25) NOT NULL,
  `ID_Subbid_Klasifikasi` varchar(6) default NULL,
  `ID_Badan_Usaha` int(10) default NULL,
  `Nilai_Kontrak` varchar(12) default NULL,
  `Nomor_Kontrak` varchar(50) default NULL,
  `Nomor_BA_Serah_Terima` varchar(50) default NULL,
  `Tgl_BA_Serah_Terima` date default NULL,
  `Tgl_Kontrak` date default NULL,
  `Tgl_Mulai` date default NULL,
  `Tgl_Selesai` date default NULL,
  `Tahun` int(4) default NULL,
  `Pemberi_Tugas` varchar(100) default NULL,
  `ID_Propinsi` char(2) default NULL,
  `ID_Asosiasi_Badan_Usaha` char(2) default NULL,
  `ID_Sumber_Dana` char(1) default NULL,
  `ID_Tipe_Kontrak` char(1) default NULL,
  `Path_ID_Tipe_Kontrak` char(4) NOT NULL,
  PRIMARY KEY  (`ID_Pengalaman`),
  KEY `ID_Subbid_Klasifikasi` (`ID_Subbid_Klasifikasi`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`),
  KEY `ID_Propinsi` (`ID_Propinsi`),
  KEY `ID_Asosiasi_Badan_Usaha` (`ID_Asosiasi_Badan_Usaha`),
  KEY `ID_Sumber_Dana` (`ID_Sumber_Dana`),
  KEY `ID_Tipe_Kontrak` (`ID_Tipe_Kontrak`)
) ENGINE=MyISAM AUTO_INCREMENT=986162 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pengurus`
--

DROP TABLE IF EXISTS `pengurus`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `pengurus` (
  `ID_Person` int(11) NOT NULL default '0',
  `ID_Badan_Usaha` int(11) NOT NULL default '0',
  `Jabatan` varchar(100) default NULL,
  `Jenjang` char(1) default NULL,
  `Jenis_Jabatan` char(1) default NULL,
  `Pend_Akhir` varchar(30) default NULL,
  `No_Ijazah` varchar(20) default NULL,
  PRIMARY KEY  (`ID_Person`),
  KEY `ID_Badan_Usaha` (`ID_Badan_Usaha`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `person_badan_usaha`
--

DROP TABLE IF EXISTS `person_badan_usaha`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `person_badan_usaha` (
  `ID_Person` int(11) NOT NULL auto_increment,
  `Nama` varchar(250) default NULL,
  `No_KTP` varchar(30) default NULL,
  `Alamat1` varchar(250) default NULL,
  `Alamat2` varchar(250) default NULL,
  `Kodepos` varchar(9) default NULL,
  `ID_Kabupaten_Alamat` varchar(4) default NULL,
  `ID_Countries_Alamat` char(2) default 'id',
  `Tgl_Lahir` date default NULL,
  `Tempat_Lahir` varchar(100) default NULL,
  `ID_Kabupaten_Lahir` varchar(4) default NULL,
  `ID_Countries_Lahir` char(2) default 'id',
  PRIMARY KEY  (`ID_Person`),
  KEY `ID_Kabupaten_Alamat` (`ID_Kabupaten_Alamat`),
  KEY `ID_Countries_Alamat` (`ID_Countries_Alamat`),
  KEY `ID_Kabupaten_Lahir` (`ID_Kabupaten_Lahir`),
  KEY `ID_Countries_Lahir` (`ID_Countries_Lahir`),
  KEY `No_KTP` (`No_KTP`)
) ENGINE=MyISAM AUTO_INCREMENT=1648852 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `polling`
--

DROP TABLE IF EXISTS `polling`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `polling` (
  `ID_Polling` int(7) unsigned NOT NULL auto_increment,
  `Tgl_Dibuat` datetime NOT NULL,
  `Nama_Pembuat` varchar(255) NOT NULL,
  `Pertanyaan` varchar(255) NOT NULL,
  `Jawaban1` varchar(255) NOT NULL,
  `Jawaban2` varchar(255) NOT NULL,
  `Jawaban3` varchar(255) NOT NULL,
  `Jawaban4` varchar(255) NOT NULL,
  `Jawaban5` varchar(255) NOT NULL,
  `Jawaban6` varchar(255) NOT NULL,
  `Jawaban7` varchar(255) NOT NULL,
  `Jawaban8` varchar(255) NOT NULL,
  `Jawaban9` varchar(255) NOT NULL,
  `Jawaban10` varchar(255) NOT NULL,
  `Jumlah_Jawaban1` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban2` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban3` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban4` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban5` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban6` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban7` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban8` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban9` int(7) unsigned NOT NULL default '0',
  `Jumlah_Jawaban10` int(7) unsigned NOT NULL default '0',
  `Tutup_Polling` tinyint(3) unsigned NOT NULL default '0',
  `Tipe_Grafik` enum('vbar','hbar','pie') NOT NULL default 'vbar',
  `Sektor` char(5) NOT NULL,
  `Status` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`ID_Polling`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `propinsi`
--

DROP TABLE IF EXISTS `propinsi`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `propinsi` (
  `ID_Propinsi` char(2) NOT NULL default '',
  `Nama` varchar(100) default NULL,
  `Nama_Singkat` varchar(10) default NULL,
  PRIMARY KEY  (`ID_Propinsi`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `sumber_dana`
--

DROP TABLE IF EXISTS `sumber_dana`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `sumber_dana` (
  `ID_Sumber_Dana` tinyint(3) NOT NULL auto_increment,
  `Nama` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID_Sumber_Dana`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `useronline`
--

DROP TABLE IF EXISTS `useronline`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `useronline` (
  `id` int(11) NOT NULL auto_increment,
  `ip` varchar(15) NOT NULL default '',
  `timestamp` varchar(15) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=881424 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `visits` (
  `id` int(11) NOT NULL auto_increment,
  `ip_adr` varchar(15) NOT NULL default '',
  `referer` varchar(250) NOT NULL default '',
  `country` char(2) NOT NULL default '',
  `client` varchar(100) NOT NULL default '',
  `visit_date` date default NULL,
  `time` time NOT NULL default '00:00:00',
  `on_page` varchar(35) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=180609 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-01-12 11:18:34
