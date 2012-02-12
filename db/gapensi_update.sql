UPDATE gapensi.admin_user SET Password = 'c4ca4238a0b923820dcc509a6f75849b' WHERE ID_Admin_User = 'admin';

CREATE TABLE __MENU
(
   MENU_ID              VARCHAR(20) NOT NULL,
   MENU_NAME            VARCHAR(100) NOT NULL,
   MENU_FOLDER          VARCHAR(100),
   MENU_LEAF            CHAR(1) DEFAULT '1' COMMENT '0 = not leaf; 1 = leaf',
   MENU_LEVEL           SMALLINT DEFAULT 0,
   MENU_PARENT          VARCHAR(100),
   ICON                 VARCHAR(20),
   PRIMARY KEY (MENU_ID)
);

CREATE TABLE __HAK_AKSES
(
   HA_ID                BIGINT NOT NULL AUTO_INCREMENT,
   ID_Grup              INT NOT NULL,
   MENU_ID              VARCHAR(20) NOT NULL,
   HA_LEVEL             SMALLINT NOT NULL DEFAULT 0 COMMENT '0 = tidak ada akses; 1 = view; 2 = insert; 3 = update; 4 = delete',
   PRIMARY KEY (HA_ID)
);

ALTER TABLE __HAK_AKSES ADD CONSTRAINT FK_ADMIN_GRUP___HAK_AKSES FOREIGN KEY (ID_Grup)
      REFERENCES ADMIN_GRUP (ID_Grup) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE __HAK_AKSES ADD CONSTRAINT FK___MENU___HAK_AKSES FOREIGN KEY (MENU_ID)
      REFERENCES __MENU (MENU_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE KTA_NOMOR_URUT
(
	ID							BIGINT	NOT NULL	AUTO_INCREMENT
,	ID_Nomor_Urut_Badan_Usaha 	INT(10)	NOT NULL
,	ID_Badan_Usaha 				INT(10) NOT NULL
,	ID_Propinsi 				CHAR(2)	NOT NULL
,	Masa_Berlaku 				INT(2)				DEFAULT NULL
,	Tgl_Pengambilan 			DATE 				DEFAULT NULL
,	NRBU						INT(10) NOT NULL 	DEFAULT 0
,	PRIMARY KEY (ID)
);

ALTER TABLE KTA_NOMOR_URUT ADD CONSTRAINT FK_KTA_BADAN_USAHA_KTA_NOMOR_URUT FOREIGN KEY (ID_Badan_Usaha)
      REFERENCES KTA_BADAN_USAHA (ID_Badan_Usaha) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE KTA_NOMOR_URUT ADD CONSTRAINT FK_PROPINSI_KTA_NOMOR_URUT FOREIGN KEY (ID_Propinsi)
      REFERENCES PROPINSI (ID_Propinsi) ON DELETE RESTRICT ON UPDATE RESTRICT;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'01'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_01;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'02'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_02;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'03'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_03;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'04'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_04;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'05'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_05;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'06'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_06;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'07'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_07;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'08'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_08;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'09'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_09;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'10'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_10;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'11'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_11;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'12'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_12;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'13'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_13;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'14'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_14;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'15'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_15;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'16'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_16;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'17'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_17;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'18'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_18;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'19'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_19;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'20'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_20;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'21'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_21;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'22'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_22;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'23'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_23;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'24'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_24;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'25'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_25;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'26'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_26;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'27'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_27;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'28'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_28;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'29'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_29;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'30'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_30;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'31'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_31;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'32'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_32;

INSERT INTO KTA_NOMOR_URUT (ID_Nomor_Urut_Badan_Usaha, ID_Badan_Usaha, ID_Propinsi, Masa_Berlaku, Tgl_Pengambilan, NRBU)
SELECT	ID_Nomor_Urut_Badan_Usaha
	,	ID_Badan_Usaha
	,	'33'
	,	Masa_Berlaku
	,	Tgl_Pengambilan
	,	NRBU
FROM 	KTA_NOMOR_URUT_33;

DELIMITER $$

CREATE TRIGGER KTA_NOMOR_URUT_BIR
BEFORE INSERT ON KTA_NOMOR_URUT
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

CREATE TABLE JENIS_USAHA
(
	ID_Jenis_Usaha		SMALLINT	NOT NULL AUTO_INCREMENT
,	Nama_Jenis_Usaha	VARCHAR(50) NOT NULL
,	PRIMARY KEY (ID_Jenis_Usaha)
);

CREATE UNIQUE INDEX JENIS_USAHA_UK ON JENIS_USAHA
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

ALTER TABLE KTA_BADAN_USAHA
ADD COLUMN 	ID_Jenis_Usaha SMALLINT
AFTER 		NRBU;

ALTER TABLE KTA_BADAN_USAHA ADD CONSTRAINT FK_JENIS_USAHA_KTA_BADAN_USAHA FOREIGN KEY (ID_Jenis_Usaha)
      REFERENCES JENIS_USAHA (ID_Jenis_Usaha) ON DELETE RESTRICT ON UPDATE RESTRICT;

UPDATE	kta_badan_usaha 	AS A
	,	jenis_usaha			AS B
SET 	A.ID_Jenis_Usaha = B.ID_Jenis_Usaha
WHERE	B.Nama_Jenis_Usaha = TRIM(SUBSTRING(A.Nama, IF(LOCATE(',', A.Nama) <> 0, LOCATE(',', A.Nama) + 1, 100)))

insert into __MENU values ('01'		,'Aplikasi'									,'app'								,'0',1,'00','beranda');
insert into __MENU values ('01.01'	,'Beranda'									,'app_home'							,'1',2,'01','beranda');
insert into __MENU values ('01.02'	,'Pengaturan User'							,'app_adm_user'						,'1',2,'01','users');
insert into __MENU values ('01.03'	,'Pengaturan Hak Akses'						,'app_adm'							,'1',2,'01','users');
insert into __MENU values ('02'		,'Pendaftaran'								,'pendaftaran'						,'0',1,'00','app');
insert into __MENU values ('02.01'	,'Pendaftaran Anggota'						,'pendaftaran_anggota'				,'1',2,'02','menu_leaf');
insert into __MENU values ('02.02'	,'Pendaftaran Komputer Pengguna'			,'pendaftaran_komputer_pengguna'	,'1',2,'02','menu_leaf');
insert into __MENU values ('03'		,'Persetujuan'								,'persetujuan'						,'0',1,'00','app');
insert into __MENU values ('03.01'	,'Persetujuan Anggota'						,'persetujuan_anggota'				,'1',2,'03','menu_leaf');

insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.03',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02.01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'02.02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'03',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'03.01',4);
