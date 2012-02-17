/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_app_adm_user;
var m_app_adm_user_d = _g_root + 'module/app_adm_user/';

function M_AppAdmUser()
{
	this.ha_level = 0;

	this.record = new Ext.data.Record.create([
			{name: 'username'}
		,	{name: 'nama_lengkap'}
		,	{name: 'email'}
		,	{name: 'id_grup'}
		,	{name: 'grup_user'}
	]);

	this.store = new Ext.ux.data.PagingArrayStore({
			url			: m_app_adm_user_d + 'data.php'
		,	fields		: this.record
		,	autoLoad	: false
		,	idIndex		: 0
	});

	this.store_grup = new Ext.data.ArrayStore({
			url			: m_app_adm_user_d + 'data_grup.php'
		,	fields		: ['id','name']
		,	autoLoad	: false
	});

	this.form_username = new Ext.form.TextField({
			fieldLabel	: 'ID User'
		,	allowBlank	: false
		,	width		: 200
	});
	
	this.form_grup = new Ext.form.ComboBox({
			fieldLabel		: 'Grup User'
		,	store			: this.store_grup
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	triggerAction	: 'all'
		,	allowBlank		: false
		,	editable		: false
		,	width			: 200
	});

	this.form_nama_lengkap = new Ext.form.TextField({
			fieldLabel	: 'Nama User'
		,	allowBlank	: false
		,	width		: 200
	});
	
	this.form_email = new Ext.form.TextField({
			fieldLabel	: 'Email'
		,	vtype		: 'email'
		,	allowBlank	: false
		,	width		: 200
	});

	this.form_pass = new Ext.form.TextField({
			fieldLabel	: 'Kata Kunci'
		,	name		: 'password'
		,	inputType	: 'password'
		,	allowBlank	: false
		,	width		: 200
	});

	this.btn_ref = new Ext.Button({
			text		: 'Refresh'
		,	iconCls		: 'refresh16'
		,	scope		: this
		,	handler		: function() {
				this.do_load();
			}
	});

	this.btn_add = new Ext.Button({
			text	: 'Tambah'
		,	iconCls	: 'add16'
		,	scope	: this
		,	handler	: function() {
				this.do_add();
			}
	});

	this.btn_edit = new Ext.Button({
			text		: 'Ubah'
		,	iconCls		: 'edit16'
		,	scope		: this
		,	handler		: function() {
				this.do_edit();
			}
	});

	this.btn_del = new Ext.Button({
			text		: 'Hapus'
		,	iconCls		: 'del16'
		,	disabled	: true
		,	scope		: this
		,	handler		: function() {
				this.do_del();
			}
	});

	this.btn_cancel = new Ext.Button({
			text	: 'Batal'
		,	iconCls	: 'del16'
		,	scope	: this
		,	handler	: function() {
				this.do_cancel();
			}
	});

	this.btn_save = new Ext.Button({
			text		: 'Simpan'
		,	iconCls		: 'save16'
		,	scope		: this
		,	handler		: function() {
				this.do_save();
			}
	});

	this.cm = new Ext.grid.ColumnModel({
			columns: [
					new Ext.grid.RowNumberer()
				,	{
						header		: 'ID User'
					,	dataIndex	: 'username'
					,	width		: 200
					,	filterable	: true
					}
				,	{
						id			: 'nama_lengkap'
					,	header		: 'Nama User'
					,	dataIndex	: 'nama_lengkap'
					,	filterable	: true
					}
				,	{
						header		: 'Grup User'
					,	dataIndex	: 'grup_user'
					, 	width		: 200
					, 	filterable	: true
					}
			]
		,	defaults: {
				sortable	: true
			}
	});

	this.sm = new Ext.grid.RowSelectionModel({
			singleSelect	: true
		,	listeners		: {
				scope			: this
			,	selectionchange	: function(sm) {
					var data = sm.getSelections();

					if (data.length && this.ha_level == 4) {
						this.btn_del.setDisabled(false);
					} else {
						this.btn_del.setDisabled(true);
					}
				}
			}
	});

	this.editor = new MyRowEditor(this);

	this.filters = new Ext.ux.grid.GridFilters({
			encode	: true
		,	local	: true
	});

	this.tbar = new Ext.Toolbar({
		items	: [
				this.btn_ref
			,	'-'
			,	this.btn_add
			,	'-'
			,	this.btn_edit
			,	'-'
			,	this.btn_del
		]
	});
	
	this.bbar = new Ext.PagingToolbar({
			store		: this.store
		,	pageSize	: 50
		,	displayInfo	: true
		,	displayMsg	: 'Menampilkan data ke {0} - {1} dari {2} data'
		,	plugins		: [this.filters]
	});

	this.panel = new Ext.grid.GridPanel({
			id					: 'app_adm_user_panel'
		,	title				: 'Daftar User'
		,	autoExpandColumn	: 'nama_lengkap'
		,	store				: this.store
		,	sm					: this.sm
		,	cm					: this.cm
		,	stripeRows			: true
		,	columnLines			: true
		,	plugins				: [ this.filters ]
		,	tbar				: this.tbar
		,	bbar				: this.bbar
	});

	this.win_add = new Ext.Window({
			title		: 'Ganti Kata Kunci'
		,	modal		: true
		,	layout		: 'form'
		,	labelAlign	: 'left'
		,	iconCls		: 'password16'
		,	padding		: 6
		,	closable	: false
		,	resizable	: false
		,	plain		: true
		,	autoHeight	: true
		,	width		: 350
		,	items		: [
					this.form_username
				,	this.form_grup
				,	this.form_nama_lengkap
				,	this.form_email
				,	this.form_pass
			]
		,	bbar		: [
					this.btn_cancel
				, 	'->'
				,	this.btn_save
			]
	});

	this.do_edit = function()
	{
		if (this.ha_level < 3) {
			return false;
		}

		var data = this.sm.getSelections();
		
		if (!data.length) {
			return false;
		}

		var r = data[0];

		this.form_username.setValue(r.data['username']);
		this.form_username.setReadOnly(true);
		this.form_grup.setValue(r.data['id_grup']);
		this.form_nama_lengkap.setValue(r.data['nama_lengkap']);
		this.form_email.setValue(r.data['email']);
		this.form_pass.setValue('');

		this.dml_type = '3';

		this.win_add.setTitle('Ubah Data User');
		this.win_add.show();
		return true;
	}

	this.do_add = function()
	{
		this.dml_type = '2';

		this.form_username.setValue('');
		this.form_username.setReadOnly(false);
		this.form_grup.clearValue();
		this.form_nama_lengkap.setValue('');
		this.form_email.setValue('');
		this.form_pass.setValue('');

		this.win_add.setTitle('Tambah Data User');
		this.win_add.show();
	}

	this.do_del = function()
	{
		var data = this.sm.getSelections();
		
		if (!data.length) {
			return;
		}

		Ext.MessageBox.confirm('Konfirmasi', 'Hapus Data?', function(btn, text){
			if (btn == 'yes'){
				this.dml_type = 4;
				this.do_save(data[0]);
			}
		}, this);
	}

	this.is_valid = function()
	{
		if (!this.form_username.isValid()){
			Ext.MessageBox.alert('Kesalahan', 'Silahkan isi ID User dengan benar.');
			return false;
		}
		
		if (!this.form_grup.isValid()){
			Ext.MessageBox.alert('Kesalahan', 'Silahkan isi Grup User dengan benar.');
			return false;
		}
		
		if (!this.form_nama_lengkap.isValid()){
			Ext.MessageBox.alert('Kesalahan', 'Silahkan isi Nama User dengan benar.');
			return false;
		}
		
		if (!this.form_email.isValid()){
			Ext.MessageBox.alert('Kesalahan', 'Silahkan isi Email dengan benar.');
			return false;
		}
		
		if (!this.form_pass.isValid()){
			Ext.MessageBox.alert('Kesalahan', 'Silahkan isi Password dengan benar.');
			return false;
		}
		
		return true;
	}
	
	this.do_save = function(record)
	{
		var user;
		var grup	= this.form_grup.getValue();
		var nama	= this.form_nama_lengkap.getValue();
		var email	= this.form_email.getValue();
		var pass	= this.form_pass.getValue();
		var passenc	= MD5(pass, true);

		if (this.dml_type == '2' || this.dml_type == '3') {
			user	= this.form_username.getValue();
			
			if (!this.is_valid()) {
				return;
			}
		} else if (this.dml_type == '4') {
			user = record.data['username'];			
		}

		Ext.Ajax.request({
				url		: m_app_adm_user_d + 'submit.php'
			,	params  : {
						dml_type	: this.dml_type
					,	user		: user
					,	grup_user	: grup
					,	nama		: nama
					,	email		: email
					,	password	: passenc
				}
			,	waitMsg	: 'Mohon Tunggu ...'
			,	success : function (response) {
					var msg = Ext.util.JSON.decode(response.responseText);

					if (msg.success == false) {
						Ext.MessageBox.alert('Kesalahan', msg.info);
						return;
					} else {
						Ext.MessageBox.alert('Informasi', msg.info);
					}

					this.win_add.hide();
					
					this.do_load();
				}
			,	scope	: this
		});
	}

	this.do_cancel = function()
	{
		this.win_add.hide();
	}

	this.do_load = function()
	{
		delete this.store.lastParams;

		this.store.load({
			params	: {
				start	: 0
			,	limit	: 50
			}
		});

		this.store_grup.load();
	}

	this.do_refresh = function(ha_level)
	{
		this.ha_level = ha_level;

		if (this.ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		if (this.ha_level <= 1) {
			this.btn_add.setDisabled(true);
		} else {
			this.btn_add.setDisabled(false);
		}

		this.do_load();
	}
}

m_app_adm_user = new M_AppAdmUser();

//@ sourceURL=app_adm_user.layout.js
