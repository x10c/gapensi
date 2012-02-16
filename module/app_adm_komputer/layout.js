/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_app_adm_komputer;
var m_app_adm_komputer_list;
var m_app_adm_komputer_detail;
var m_app_adm_komputer_id_admin_user	= '';
var m_app_adm_komputer_d 				= _g_root + 'module/app_adm_komputer/';
var m_app_adm_komputer_ha_level 		= 0;

function M_AppAdmKomputerDetail()
{
	this.store_status = new Ext.data.ArrayStore({
			fields	: ['id','name']
		,	data	: [
					['0', 'Belum Disetujui']
				,	['1', 'Disetujui']
			]
	});
	
	this.form_id_admin_user = new Ext.form.TextField({
			fieldLabel		: 'ID Pengguna'
		,	readOnly		: true
		,	width			: 200
		,	msgTarget		: 'side'
	});
	
	this.form_mac_address = new Ext.form.TextField({
			fieldLabel		: 'Mac Address'
		,	readOnly		: true
		,	width			: 200
		,	msgTarget		: 'side'
	});

	this.form_status = new Ext.form.ComboBox({
			fieldLabel		: 'Status'
		,	store			: this.store_status
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	msgTarget		: 'side'
		,	width			: 200
	});

	this.panel_form = new Ext.form.FormPanel({
			labelAlign		: 'right'
		,	labelWidth		: 175
		,	autoWidth		: true
		,	autoHeight		: true
		,	style			: 'margin: 8px;'
		,	bodyCssClass	: 'stop-panel-form'
		,	items			: [
					this.form_id_admin_user
				,	this.form_mac_address		
				,	this.form_status		
			]
	});

	this.btn_back = new Ext.Button({
			text	: 'Kembali'
		,	iconCls	: 'back16'
		,	scope	: this
		,	handler	: function() {
				this.do_back();
			}
	});

	this.btn_save	= new Ext.Button({
			text	: 'Simpan'
		,	iconCls	: 'save16'
		,	scope	: this
		,	handler	: function() {
				this.do_save();
			}
	});

	this.toolbar = new Ext.Toolbar({
		items	: [
			this.btn_back
		,	'->'
		,	this.btn_save
		]
	});

	this.panel = new Ext.Panel({
			autoWidth	: true
		,	autoScroll	: true
		,	padding		:'6'
		,	tbar		: this.toolbar
		,	defaults	:{
				style		:{
					marginLeft		:'auto'
				,	marginRight		:'auto'
				,	marginBottom	:'8px'
				}
			}
		,	items		: [
				this.panel_form
			]
	});

	this.edit_fill_form = function(data)
	{
		this.form_id_admin_user.setValue(data.data[0].id_admin_user);
		this.form_mac_address.setValue(data.data[0].mac_address);
		this.form_status.setValue(data.data[0].status);
		this.form_status.focus();
	}

	this.do_proses = function(id)
	{
		Ext.Ajax.request({
			url		: m_app_adm_komputer_d + 'data.php'
		,	params	: {
				id_admin_user	: id
			}
		,	waitMsg	: 'Mohon Tunggu ...'
		,	failure	: function(response) {
				Ext.MessageBox.alert('Gagal', response.responseText);
			}
		,	success : function (response) {
				var msg = Ext.util.JSON.decode(response.responseText);

				if (msg.success == false) {
					Ext.MessageBox.alert('Pesan', msg.info);
					return;
				}

				this.edit_fill_form(msg);
			}
		,	scope	: this
		});
	}

	this.do_back = function()
	{
		m_app_adm_komputer.panel.layout.setActiveItem(0);
	}

	this.is_valid = function()
	{
		if (!this.form_status.isValid()) {
			return false;
		}

		return true;
	}
	
	this.do_save = function()
	{
		if (!this.is_valid()) {
			Ext.MessageBox.alert('Kesalahan', 'Form belum terisi dengan benar!');
			return;
		}

		main_load.show();
		
		Ext.Ajax.request({
				url		: m_app_adm_komputer_d + 'submit.php'
			,	params  : {
						id_admin_user	: m_app_adm_komputer_id_admin_user
					,	status			: this.form_status.getValue()
				}
			,	waitMsg	: 'Mohon Tunggu ...'
			,	failure	: function(response) {
					main_load.hide();
					Ext.MessageBox.alert('Gagal', response.responseText);
				}
			,	success :
					function (response)
					{
						var msg = Ext.util.JSON.decode(response.responseText);

						if (msg.success == false) {
							Ext.MessageBox.alert('Pesan', msg.info);
						}

						main_load.hide();
						
						Ext.MessageBox.alert('Informasi', msg.info);

						m_app_adm_komputer_list.do_load();
						m_app_adm_komputer.panel.layout.setActiveItem(0);
					}
			,	scope	: this
		});
	}
}

function M_AppAdmKomputerList()
{
	this.dml_type	= 0;
	this.pageSize	= 50;

	this.record = new Ext.data.Record.create([
			{ name	: 'id_admin_user' }
		,	{ name	: 'mac_address' }
		,	{ name	: 'status' }
	]);

	this.store = new Ext.data.JsonStore({
			url			: m_app_adm_komputer_d + 'data_list.php'
		,	root		: 'data'
		,	fields		: this.record
		,	autoLoad	: false
	});

	this.store_status = new Ext.data.ArrayStore({
			url			: m_app_adm_komputer_d + 'data_status.php'
		,	fields		: ['id','name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.form_status = new Ext.form.ComboBox({
			store			: this.store_status
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
	});

	this.filters = new Ext.ux.grid.GridFilters({
			encode	: true
		,	local	: true
	});

	this.cm = new Ext.grid.ColumnModel({
			columns	: [
					new Ext.grid.RowNumberer()
				,	{ 
						id			: 'id_admin_user'
					,	header		: 'ID Pengguna'
					,	dataIndex	: 'id_admin_user'
					,	align		: 'left'
					,	filterable	: true
					}
				,	{ 
						header		: 'Mac Address'
					,	dataIndex	: 'mac_address'
					,	align		: 'center'
					,	width		: 200
					,	filterable	: true
					}
				,	{ 
						header		: 'Status'
					,	dataIndex	: 'status'
					,	editor		: this.form_status
					,	renderer	: combo_renderer(this.form_status)
					,	align		: 'center'
					,	width		: 150
					,	filter		: {
							type		: 'list'
						,	store		: this.store_status
						,	labelField	: 'name'
						,	phpMode		: false
						}
					}
				]
		,	defaults : {
				sortable	: true
			}
	});

	this.sm = new Ext.grid.RowSelectionModel({
			singleSelect	: true
		,	listeners		: {
				scope			: this
			,	selectionchange	: function(sm) {
					var data = sm.getSelections();
					
					if (data.length){
						m_app_adm_komputer_id_admin_user	= data[0].data['id_admin_user'];
					} else {
						m_app_adm_komputer_id_admin_user 	= '';
					}
				}
			}
	});

	this.btn_ref = new Ext.Button({
			text	: 'Refresh'
		,	iconCls	: 'refresh16'
		,	scope	: this
		,	handler	: function() {
				this.do_load();
			}
	});

	this.btn_proses = new Ext.Button({
			text	: 'Proses'
		,	iconCls	: 'proses16'
		,	scope	: this
		,	handler	: function() {
				this.do_proses();
			}
	});

	this.tbar = new Ext.Toolbar({
		items	: [
			this.btn_ref
		,	'->'
		,	this.btn_proses
		]
	});

	this.bbar = new Ext.PagingToolbar({
			store			: this.store
		,	pageSize		: this.pageSize
		,	firstText		: 'Halaman Awal'
		,	prevText		: 'Halaman Sebelumnya'
		,	beforePageText	: 'Halaman '
		,	afterPageText	: ' dari {0}'
		,	nextText		: 'Halaman Selanjutnya'
		,	lastText		: 'Halaman Terakhir'
		,	displayInfo		: true
		,	displayMsg		: 'Menampilkan data ke {0} - {1} dari {2} data'
		,	emptyMsg		: 'Tidak ada data'
		,	plugins			: [ this.filters ]
	});
	
	this.panel = new Ext.grid.GridPanel({
			region				: 'center'
		,	store				: this.store
		,	sm					: this.sm
		,	cm					: this.cm
		,	autoScroll			: true
		,	stripeRows			: true
		,	columnLines			: true
		,	plugins				: [ this.filters ]
		,	autoExpandColumn	: 'id_admin_user'
		,	tbar				: this.tbar
		,	bbar				: this.bbar
	});

	this.do_proses = function()
	{
		var data = this.sm.getSelected();

		if (data == undefined) {
			return;
		}

		m_app_adm_komputer_detail.do_proses(data.get('id_admin_user'));
		m_app_adm_komputer.panel.layout.setActiveItem(1);
	}
	
	this.do_load = function()
	{
		this.store_status.load({
				scope		: this
			,	callback	: function() {
					delete this.store.lastParams;
					
					this.store.load({
							scope	: this
						,	params	: {
								start	: 0
							,	limit	: this.pageSize
							}
					});	
				}
		});					
	}

	this.do_refresh = function()
	{
		if (m_app_adm_komputer_ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		if (m_app_adm_komputer_ha_level < 3) {
			this.btn_proses.setDisabled(true);
		} else {
			this.btn_proses.setDisabled(false);
		}

		this.do_load();
	}
}

function M_AppAdmKomputer(title)
{
	m_app_adm_komputer_list		= new M_AppAdmKomputerList();
	m_app_adm_komputer_detail	= new M_AppAdmKomputerDetail();
	
	this.panel = new Ext.Panel({
			id				: 'app_adm_komputer_panel'
		,	title			: title
		,	layout			: 'card'
		,	activeItem		: 0
		,	autoWidth		: true
		,	autoScroll		: true
		,	items			: [
					m_app_adm_komputer_list.panel
				,	m_app_adm_komputer_detail.panel
			]
	});
	
	this.do_refresh = function(ha_level)
	{
		m_app_adm_komputer_ha_level = ha_level;
		
		m_app_adm_komputer_list.do_refresh();
	}
}

m_app_adm_komputer = new M_AppAdmKomputer('Pengaturan Komputer Pengguna');

//@ sourceURL=app_adm_komputer.layout.js
