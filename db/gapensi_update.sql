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


insert into __MENU values ('01'		,'Aplikasi'									,'app'							,'0',1,'00','app');
insert into __MENU values ('01.01'	,'Home'										,'app_home'						,'1',2,'01','beranda');
insert into __MENU values ('01.02'	,'Pengaturan User'							,'app_adm_user'					,'1',2,'01','users');
insert into __MENU values ('01.03'	,'Pengaturan Hak Akses'						,'app_adm'						,'1',2,'01','users');

insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.01',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.02',4);
insert into __HAK_AKSES (id_grup, menu_id, ha_level) values (1,'01.03',4);
