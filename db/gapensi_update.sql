UPDATE gapensi.admin_user SET Password = 'c4ca4238a0b923820dcc509a6f75849b' WHERE ID_Admin_User = 'admin';

create table __menu
(
   menu_id              varchar(20) not null,
   menu_name            varchar(100) not null,
   menu_folder          varchar(100),
   menu_leaf            char(1) default '1' comment '0 = not leaf; 1 = leaf',
   menu_level           smallint default 0,
   menu_parent          varchar(100),
   icon                 varchar(20),
   primary key (menu_id)
);

create table __hak_akses
(
   ha_id                bigint not null auto_increment,
   id_grup              int not null,
   menu_id              varchar(20) not null,
   ha_level             smallint not null default 0 comment '0 = tidak ada akses; 1 = view; 2 = insert; 3 = update; 4 = delete',
   primary key (ha_id)
);

alter table __hak_akses add constraint fk_admin_grup___hak_akses foreign key (id_grup)
      references admin_grup (id_grup) on delete restrict on update restrict;

alter table __hak_akses add constraint fk___menu___hak_akses foreign key (menu_id)
      references __menu (menu_id) on delete restrict on update restrict;

create table kta_nomor_urut
(
	id							bigint	not null	auto_increment
,	id_nomor_urut_badan_usaha 	int(10)	not null
,	id_badan_usaha 				int(10) not null
,	id_propinsi 				char(2)	not null
,	masa_berlaku 				int(2)				default null
,	tgl_pengambilan 			date 				default null
,	nrbu						int(10) not null 	default 0
,	primary key (id)
);

alter table kta_nomor_urut add constraint fk_kta_badan_usaha_kta_nomor_urut foreign key (id_badan_usaha)
      references kta_badan_usaha (id_badan_usaha) on delete restrict on update restrict;

alter table kta_nomor_urut add constraint fk_propinsi_kta_nomor_urut foreign key (id_propinsi)
      references propinsi (id_propinsi) on delete restrict on update restrict;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'01'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_01;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'02'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_02;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'03'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_03;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'04'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_04;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'05'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_05;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'06'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_06;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'07'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_07;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'08'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_08;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'09'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_09;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'10'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_10;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'11'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_11;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'12'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_12;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'13'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_13;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'14'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_14;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'15'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_15;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'16'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_16;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'17'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_17;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'18'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_18;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'19'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_19;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'20'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_20;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'21'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_21;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'22'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_22;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'23'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_23;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'24'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_24;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'25'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_25;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'26'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_26;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'27'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_27;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'28'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_28;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'29'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_29;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'30'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_30;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'31'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_31;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'32'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_32;

INSERT INTO kta_nomor_urut (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'33'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	kta_nomor_urut_33;

DELIMITER $$

CREATE TRIGGER kta_nomor_urut_BIR
BEFORE INSERT ON kta_nomor_urut
FOR EACH ROW
BEGIN
	DECLARE	vi_nomor_urut	INT(10);
	
	SELECT	IFNULL(MAX(ID_Nomor_Urut_Badan_Usaha), 0) + 1
	INTO	vi_nomor_urut
	FROM 	kta_nomor_urut
	WHERE	ID_Propinsi = new.ID_Propinsi;
	
	SET new.ID_Nomor_Urut_Badan_Usaha	= vi_nomor_urut;
END
$$

DELIMITER ;

CREATE TABLE jenis_usaha
(
	ID_Jenis_Usaha		SMALLINT	NOT NULL AUTO_INCREMENT
,	Nama_Jenis_Usaha	VARCHAR(50) NOT NULL
,	PRIMARY KEY (ID_Jenis_Usaha)
);

CREATE UNIQUE INDEX JENIS_USAHA_UK ON jenis_usaha
(
   Nama_Jenis_Usaha
);

INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('PT');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('CV');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('PD');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('UD');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('FA');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('NV');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('PB');
INSERT INTO jenis_usaha (Nama_Jenis_Usaha) VALUES ('Koperasi');

ALTER TABLE kta_badan_usaha
ADD COLUMN 	ID_Jenis_Usaha SMALLINT
AFTER 		NRBU;

ALTER TABLE kta_badan_usaha ADD CONSTRAINT FK_JENIS_USAHA_KTA_BADAN_USAHA FOREIGN KEY (ID_Jenis_Usaha)
      REFERENCES JENIS_USAHA (ID_Jenis_Usaha) ON DELETE RESTRICT ON UPDATE RESTRICT;

UPDATE	kta_badan_usaha 	AS A
	,	jenis_usaha			AS B
SET 	A.ID_Jenis_Usaha = B.ID_Jenis_Usaha
WHERE	B.Nama_Jenis_Usaha = TRIM(SUBSTRING(A.Nama, IF(LOCATE(',', A.Nama) <> 0, LOCATE(',', A.Nama) + 1, 100)));

CREATE TABLE __komputer_user
(
   ID_Admin_User		VARCHAR(32) NOT NULL,
   mac_address			VARCHAR(20) NOT NULL,
   status             	CHAR(1) NOT NULL DEFAULT '0' COMMENT '0 = Belum Disetujui; 1 = Disetujui',
   PRIMARY KEY (ID_Admin_User)
);

ALTER TABLE __komputer_user ADD CONSTRAINT FK_ADMIN_USER___KOMPUTER_USER FOREIGN KEY (ID_Admin_User)
      REFERENCES ADMIN_USER (ID_Admin_User) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE kta_proses_status (
  ID_Proses int(6) NOT NULL AUTO_INCREMENT,
  ID_Badan_Usaha int(10) NOT NULL DEFAULT '0',
  Status char(1) DEFAULT NULL,
  Tahun  varchar(4) NOT NULL,
  PRIMARY KEY (ID_Proses),
  KEY ID_Badan_Usaha (ID_Badan_Usaha)
);

INSERT INTO kta_proses_status(ID_Badan_Usaha, Status, Tahun)
SELECT a.ID_Badan_Usaha, '1','2011'
FROM kta_badan_usaha as a;
	  
/*==============================================================*/
/* Table: __PRINT_LOG                                           */
/*==============================================================*/
create table __print_log
(
   id                   bigint(8) not null AUTO_INCREMENT,
   no_sert              varchar(10) not null,
   no_iujk              varchar(14) not null,
   no_blanko            varchar(10) not null,
   id_badan_usaha       INT(10) not null,
   id_user              varchar(11) not null,
   mac_address          varchar(20) not null,
  tanggal timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   primary key (ID)
);

	  
	  
insert into __MENU values ('01'		,'Aplikasi'									,'app'								,'0',1,'00','beranda');
insert into __MENU values ('01.01'	,'Beranda'									,'app_home'							,'1',2,'01','beranda');
insert into __MENU values ('01.02'	,'Pengaturan User'							,'app_adm_user'						,'1',2,'01','users');
insert into __MENU values ('01.03'	,'Pengaturan Hak Akses'						,'app_adm'							,'1',2,'01','users');
insert into __MENU values ('01.04'	,'Pengaturan Komputer Pengguna'				,'app_adm_komputer'					,'1',2,'01','computer');
insert into __MENU values ('02'		,'Pendaftaran'								,'pendaftaran'						,'0',1,'00','app');
insert into __MENU values ('02.01'	,'Pendaftaran Anggota'						,'pendaftaran_anggota'				,'1',2,'02','menu_leaf');
insert into __MENU values ('02.02'	,'Pendaftaran Komputer Pengguna'			,'pendaftaran_komputer_pengguna'	,'1',2,'02','menu_leaf');
insert into __MENU values ('02.03'	,'Pendaftaran Ulang Anggota'				,'registrasi_anggota'				,'1',2,'02','menu_leaf');
insert into __MENU values ('03'		,'Persetujuan'								,'persetujuan'						,'0',1,'00','app');
insert into __MENU values ('03.01'	,'Persetujuan Pendaftaran Anggota'			,'persetujuan_anggota'				,'1',2,'03','menu_leaf');
insert into __MENU values ('03.02'	,'Persetujuan Pendaftaran Ulang Anggota'	,'persetujuan_reg_anggota'			,'1',2,'03','menu_leaf');
insert into __MENU values ('04'		,'Pencetakan'								,'pencetakan'						,'0',1,'00','app');
insert into __MENU values ('04.01'	,'Print KTA'								,'print_kta'						,'1',2,'04','menu_leaf');



insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.03',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.04',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02.01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02.02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02.03',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'03',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'03.01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'03.02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'04',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'04.01',4);
