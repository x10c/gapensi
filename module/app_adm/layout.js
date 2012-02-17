/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_app_adm;
var m_adm_grup;
var m_adm_menu;
var m_adm_ha_level	= 0;
var m_adm_grup_id	= '';
var m_app_adm_d 	= _g_root + 'module/app_adm/';

function grup_on_select_load_others()
{
	if (typeof m_adm_grup == 'undefined' || m_adm_grup_id == '') {
		return;
	}

	if (typeof m_adm_menu != 'undefined') {
		m_adm_menu.do_load();
	}
}

function M_AdmGrup()
{
	this.dml_type = 0;

	this.record = new Ext.data.Record.create([
			{ name	: 'id_grup' }
		,	{ name	: 'nama_grup' }
		,	{ name	: 'catatan' }
		,	{ name	: 'sektor' }
	]);

	this.store = new Ext.ux.data.PagingArrayStore({
			url			: m_app_adm_d + 'data_grup.php'
		,	fields		: this.record
		,	autoLoad	: false
		,	idIndex		: 0
	});

	this.store_sektor = new Ext.data.ArrayStore({
			url			: m_app_adm_d + 'data_propinsi.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.form_nama_grup = new Ext.form.TextField({
		allowBlank	: false
	});

	this.form_catatan = new Ext.form.TextField({
		allowBlank	: true
	});

	this.form_sektor = new Ext.form.ComboBox({
			store			: this.store_sektor
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	listWidth		: 300
	});
	
	this.filters = new Ext.ux.grid.GridFilters({
			encode	: true
		,	local	: true
	});

	this.columns = [
			{
				header		: 'Nama Grup'
			,	dataIndex	: 'nama_grup'
			,	sortable	: true
			,	editor		: this.form_nama_grup
			,	width		: 175
			,	filterable	: true
			}
		,	{
				header		: 'Sektor'
			,	dataIndex	: 'sektor'
			,	sortable	: true
			,	editor		: this.form_sektor
			,	renderer	: combo_renderer(this.form_sektor)
			,	width		: 175
			,	filter		: {
						type		: 'list'
					,	store		: this.store_sektor
					,	labelField	: 'name'
					,	phpMode		: false
				}
			}
		,	{
				id			: 'catatan'
			,	header		: 'Catatan'
			,	dataIndex	: 'catatan'
			,	editor		: this.form_catatan
			,	filterable	: true
			}
	];

	this.sm = new Ext.grid.RowSelectionModel({
			singleSelect	: true
		,	listeners		: {
					scope			: 	this
				,	selectionchange	: function(sm) {
						var data = sm.getSelections();

						if (data.length) {
							if (m_adm_ha_level == 4) {
								this.btn_del.setDisabled(false);
							}
							m_adm_grup_id = data[0].data['id_grup'];
							grup_on_select_load_others();
						} else {
							this.btn_del.setDisabled(true);
							m_adm_grup_id = '';
						}
					}
			}
	});

	this.editor = new MyRowEditor(this);

	this.btn_ref = new Ext.Button({
			text		: 'Refresh'
		,	iconCls		: 'refresh16'
		,	scope		: this
		,	handler		: function() {
				this.do_refresh(m_adm_ha_level);
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

	this.btn_del = new Ext.Button({
			text		: 'Hapus'
		,	iconCls		: 'del16'
		,	disabled	: true
		,	scope		: this
		,	handler		: function() {
				this.do_del();
			}
	});

	this.bbar = new Ext.PagingToolbar({
			store		: this.store
		,	pageSize	: 50
		,	displayInfo	: true
		,	displayMsg	: 'Menampilkan data ke {0} - {1} dari {2} data'
		,	plugins		: [ this.filters ]
	});

	this.panel = new Ext.grid.GridPanel({
			title			: 'Grup User'
		,	region			: 'center'
		,	store			: this.store
		,	sm				: this.sm
		,	columns			: this.columns
		,	plugins			: [ this.editor, this.filters ]
		,	stripeRows		: true
		,	columnLines		: true
		,	tbar			: [
					this.btn_ref
				,	'-'
				,	this.btn_add
				,	'-'
				,	this.btn_del
			]
		,	bbar			: this.bbar
		,	autoExpandColumn: 'catatan'
		,	listeners		: {
				scope		: this
			,	rowdblclick	:
					function (g, r, e) {
						return this.do_edit(r);
					}
			}
	});

	this.do_add = function()
	{
		this.record_new = new this.record({
				id_grup		: ''
			,	nama_grup	: ''
			,	catatan		: ''
			,	sektor		: ''
		});

		this.editor.stopEditing();
		this.store.insert(0, this.record_new);
		this.sm.selectRow(0);
		this.editor.startEditing(0);

		this.dml_type = 2;
	}

	this.do_del = function()
	{
		var data = this.sm.getSelected();
		
		if (!data) {
			return;
		}

		Ext.Msg.confirm("Hapus Grup"
		, "Apakah anda yakin menghapus grup '"+ data.get('nama_grup') +"' ?"
		, function(btn) {
			if (btn == 'no') {
				return;
			}
			this.dml_type = 4;
			this.do_save(data);
		}
		, this);
	}

	this.do_cancel = function()
	{
		if (this.dml_type == 2) {
			this.store.remove(this.record_new);
			this.sm.selectRow(0);
		}
	}

	this.do_save = function(record)
	{
		Ext.Ajax.request({
				url		: m_app_adm_d +'submit_grup.php'
			,	params  : {
						id_grup			: record.data['id_grup']
					,	nama_grup		: record.data['nama_grup']
					,	catatan			: record.data['catatan']
					,	sektor			: record.data['sektor']
					,	dml_type		: this.dml_type
				}
			,	waitMsg	: 'Mohon Tunggu ...'
			,	success :
					function (response)
					{
						var msg = Ext.util.JSON.decode(response.responseText);

						if (msg.success == false) {
							Ext.MessageBox.alert(
							'Pesan Kesalahan', msg.info);
						}

						this.store.load();
					}
			,	scope	: this
		});
	}

	this.do_edit = function(row)
	{
		if (m_adm_ha_level >= 3) {
			this.dml_type = 3;
			return true;
		}

		return false;
	}

	this.do_load = function()
	{
		this.store_sektor.load({
				scope		: this
			,	callback	: function() {
					delete this.store.lastParams;

					this.store.load({
						params	: {
							start	: 0
						,	limit	: 50
						}
					});			
				}
		});
	}
	
	this.do_refresh = function()
	{
		if (m_adm_ha_level <= 1) {
			this.btn_add.setDisabled(true);
		} else {
			this.btn_add.setDisabled(false);
		}

		this.do_load();
	}
}

function M_AdmMenu()
{
	this.reader = new Ext.data.ArrayReader({}, [
			{ name:'menu_parent' }
		,	{ name:'menu_id' }
		,	{ name:'menu_name' }
		,	{ name:'ha_level' }
		,	{ name:'ha_level_org' }
	]);

	this.store = new Ext.data.GroupingStore({
			url			: m_app_adm_d + 'data_menu.php'
		,	reader		: this.reader
		,	groupField	: 'menu_parent'
		,	autoLoad	: false
	});

	this.store_ha_level = new Ext.data.ArrayStore({
			fields	: ['id', 'name']
		,	data	: [
					[0, 'No Access']
				,	[1, 'View']
				,	[2, 'Insert']
				,	[3, 'Update']
				,	[4, 'Delete']
			]
	});

	this.cb_ha_level = new Ext.form.ComboBox({
			store			: this.store_ha_level
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	allowBlank		: false
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
	});

	this.cm = new Ext.grid.ColumnModel({
			columns: [
					new Ext.grid.RowNumberer()
				,	{
						id			: 'menu_name'
					,	header		: 'Nama'
					,	dataIndex	: 'menu_name'
					}
				,	{
						header		: 'Hak Akses'
					,	dataIndex	: 'ha_level'
					,	align		: 'center'
					,	editor		: this.cb_ha_level
					,	renderer	: combo_renderer(this.cb_ha_level)
					,	width		: 30
					}
				,	{
						header		: 'Menu'
					,	dataIndex	: 'menu_parent'
					,	hidden		: true
					,	hideable	: false
					}
			]
		,	defaults: {
				sortable	: true
			}
	});

	this.sm = new Ext.grid.RowSelectionModel({
		singleSelect	: true
	});

	this.editor = new MyRowEditor(this);

	this.btn_ref = new Ext.Button({
			text		: 'Refresh'
		,	iconCls		: 'refresh16'
		,	scope		: this
		,	handler		: function() {
				this.do_load();
			}
	});

	this.grid_view = new Ext.grid.GroupingView({
			forceFit			: true
		,	remoteGroup			: true
		,	groupOnSort			: true
		,	enableGroupingMenu	: false
		,	showGroupName		: false
		,	onLoad				: Ext.emptyFn
		,	listeners			: {
				beforerefresh	: function(v) {
					v.scrollTop	= v.scroller.dom.scrollTop;
					v.scrollHeight	= v.scroller.dom.scrollHeight;
				}
			,	refresh		: function(v) {
					v.scroller.dom.scrollTop = v.scrollTop
						+ (v.scrollTop == 0 ? 0
						: v.scroller.dom.scrollHeight - v.scrollHeight);
				}
			}
	});

	this.panel = new Ext.grid.GridPanel({
			region			: 'center'
		,	title			: 'Daftar Menu'
		,	store			: this.store
		,	sm				: this.sm
		,	cm				: this.cm
		,	plugins			: this.editor
		,	autoExpandColumn: 'menu_name'
		,	view			: this.grid_view
		,	tbar			: [	this.btn_ref ]
		,	listeners       : {
					scope		: this
				,	rowdblclick	: function (g, r, e) {
						return this.do_edit(r);
					}
			}
	});

	this.do_edit = function()
	{
		if (m_adm_ha_level >= 3) {
			return true;
		}

		return false;
	}

	this.do_cancel = function()
	{
		var data = this.sm.getSelections();

		if (!data.length) {
			return;
		}

		var record = data[0];

		this.cb_ha_level.setValue(record.data['ha_level_org']);
	}

	this.do_save = function(record)
	{
		var ha_level		= record.data['ha_level'];
		var ha_level_org	= record.data['ha_level_org'];

		if (ha_level == ha_level_org) {
			return;
		}

		Ext.Ajax.request({
				url		: m_app_adm_d + 'submit_menu.php'
			,	params  : {
						id_grup			: m_adm_grup_id
					,	menu			: record.data['menu_id']
					,	ha_level		: ha_level
					,	ha_level_org	: ha_level_org
				}
			,	waitMsg	: 'Mohon Tunggu ...'
			,	success : function (response) {
					var msg = Ext.util.JSON.decode(response.responseText);

					if (msg.success == false) {
						Ext.MessageBox.alert('Pesan Kesalahan', msg.info);
					}

					this.do_load();
				}
			,	scope	: this
		});
	}

	this.do_load = function()
	{
		if (m_adm_grup_id == '') {
			return;
		}

		this.store.load({
			params	: {
				id_grup : m_adm_grup_id
			}
		});
	}
}

function M_Administrasi()
{
	m_adm_grup	= new M_AdmGrup();
	m_adm_menu	= new M_AdmMenu();

	this.col_left = new Ext.Container({
			region		: 'west'
		,	layout		: 'border'
		,	width		: '50%'
		,	align		: 'scretch'
		,	defaults	: {
					loadMask		: { msg: 'Pemuatan...' }
				,	split			: true
				,	autoScroll		: true
				,	animCollapse	: true
   			}
		,	items	: [	m_adm_grup.panel ]
	});

	this.panel = new Ext.Container({
			id			: 'app_adm_panel'
		,	layout		: 'border'
		,	scope		: this
		,	autoScroll	: true
		,	defaults	: {
					loadMask		: { msg: 'Pemuatan...' }
				,	split			: true
				,	autoScroll		: true
				,	animCollapse	: true
   			}
		,	items		: [
					this.col_left
				,	m_adm_menu.panel
			]
	});

	this.do_refresh = function(ha_level)
	{
		m_adm_ha_level = ha_level;

		if (m_adm_ha_level < 4) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		m_adm_grup.do_refresh();
	}
}

m_app_adm = new M_Administrasi();

//@ sourceURL=app_adm.layout.js
