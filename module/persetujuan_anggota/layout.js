/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_persetujuan_anggota;
var m_persetujuan_anggota_list;
var m_persetujuan_anggota_detail;
var m_persetujuan_anggota_id_badan_usaha	= 0;
var m_persetujuan_anggota_id_propinsi		= 0;
var m_persetujuan_anggota_d 				= _g_root + 'module/persetujuan_anggota/';
var m_persetujuan_anggota_ha_level 			= 0;

function M_PersetujuanAnggotaDetail()
{
	this.store_jenis_usaha = new Ext.data.ArrayStore({
			url			: m_persetujuan_anggota_d + 'data_jenis_usaha.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});

	this.form_npwp = new Ext.form.TextField({
			fieldLabel		: 'NPWP'
		,	readOnly		: true
		,	width			: 200
		,	msgTarget		: 'side'
	});

	this.form_jenis_usaha = new Ext.form.ComboBox({
			fieldLabel		: 'Bentuk Usaha'
		,	store			: this.store_jenis_usaha
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	readOnly		: true
		,	msgTarget		: 'side'
		,	width			: 100
	});

	this.form_nama_badan_usaha = new Ext.form.TextField({
			fieldLabel		: 'Nama Badan Usaha'
		,	readOnly		: true
		,	width			: 400
		,	msgTarget		: 'side'
	});

	this.form_nrbu = new Ext.form.NumberField({
			fieldLabel		: 'NRBU'
		,	allowBlank		: false
		,	allowDecimals	: false
		,	allowNegative	: false
		,	width			: 100
		,	msgTarget		: 'side'
	});

	this.panel_form = new Ext.form.FormPanel({
			labelAlign		: 'right'
		,	labelWidth		: 175
		,	autoWidth		: true
		,	autoHeight		: true
		,	style			: 'margin: 8px;'
		,	bodyCssClass	: 'stop-panel-form'
		,	items			: [
					this.form_npwp
				,	this.form_jenis_usaha		
				,	this.form_nama_badan_usaha		
				,	this.form_nrbu
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
		this.form_npwp.setValue(data.data[0].npwp);
		this.form_jenis_usaha.setValue(data.data[0].id_jenis_usaha);
		this.form_nama_badan_usaha.setValue(data.data[0].nama);
		this.form_nrbu.setValue('');
		this.form_nrbu.focus();
	}

	this.do_proses = function(id)
	{
		this.dml_type	= 3;

		Ext.Ajax.request({
			url		: m_persetujuan_anggota_d + 'data.php'
		,	params	: {
				id_badan_usaha	: id
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
		m_persetujuan_anggota.panel.layout.setActiveItem(0);
	}

	this.is_valid = function()
	{
		if (!this.form_npwp.isValid()) {
			return false;
		}

		if (!this.form_jenis_usaha.isValid()) {
			return false;
		}

		if (!this.form_nama_badan_usaha.isValid()) {
			return false;
		}

		if (!this.form_nrbu.isValid()) {
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
				url		: m_persetujuan_anggota_d + 'submit.php'
			,	params  : {
						id_badan_usaha	: m_persetujuan_anggota_id_badan_usaha
					,	id_propinsi		: m_persetujuan_anggota_id_propinsi
					,	nrbu			: this.form_nrbu.getValue()
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

						m_persetujuan_anggota_list.do_load();
						m_persetujuan_anggota.panel.layout.setActiveItem(0);
					}
			,	scope	: this
		});
	}

	this.do_refresh = function(id_pro)
	{
		this.store_jenis_usaha.load();
	}
}

function M_PersetujuanAnggotaList()
{
	this.dml_type	= 0;
	this.pageSize	= 50;

	this.record = new Ext.data.Record.create([
			{ name	: 'id_badan_usaha' }
		,	{ name	: 'nama' }
		,	{ name	: 'alamat' }
		,	{ name	: 'npwp' }
		,	{ name	: 'bentuk_bu' }
		,	{ name	: 'id_propinsi' }
		,	{ name	: 'jenis_usaha' }
	]);

	this.store = new Ext.data.JsonStore({
			url			: m_persetujuan_anggota_d + 'data_list.php'
		,	root		: 'data'
		,	fields		: this.record
		,	autoLoad	: false
	});

	this.store_jenis_usaha = new Ext.data.ArrayStore({
			url			: m_persetujuan_anggota_d + 'data_jenis_usaha.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.form_jenis_usaha = new Ext.form.ComboBox({
			store			: this.store_jenis_usaha
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
	});

	this.store_bentuk_badan_usaha = new Ext.data.ArrayStore({
			url			: m_persetujuan_anggota_d + 'data_bentuk_badan_usaha.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.form_bentuk_badan_usaha = new Ext.form.ComboBox({
			store			: this.store_bentuk_badan_usaha
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
	});

	this.store_propinsi = new Ext.data.ArrayStore({
			url			: m_persetujuan_anggota_d + 'data_propinsi.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.form_propinsi = new Ext.form.ComboBox({
			store			: this.store_propinsi
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
						header		: 'NPWP'
					,	dataIndex	: 'npwp'
					,	align		: 'center'
					,	width		: 140
					,	filterable	: true
					}
				,	{ 
						header		: 'Jenis'
					,	dataIndex	: 'jenis_usaha'
					,	editor		: this.form_jenis_usaha
					,	renderer	: combo_renderer(this.form_jenis_usaha)
					,	align		: 'center'
					,	width		: 50
					,	filter		: {
							type		: 'list'
						,	store		: this.store_jenis_usaha
						,	labelField	: 'name'
						,	phpMode		: false
						}
					}
				,	{ 
						header		: 'Nama Badan Usaha'
					,	dataIndex	: 'nama'
					,	width		: 200
					,	filterable	: true
					}
				,	{ 
						header		: 'Bentuk Badan Usaha'
					,	dataIndex	: 'bentuk_bu'
					,	editor		: this.form_bentuk_badan_usaha
					,	renderer	: combo_renderer(this.form_bentuk_badan_usaha)
					,	align		: 'center'
					,	width		: 140
					,	filter		: {
							type		: 'list'
						,	store		: this.store_bentuk_badan_usaha
						,	labelField	: 'name'
						,	phpMode		: false
						}
					}
				,	{ 
						id			: 'alamat'
					,	header		: 'Alamat'
					, 	dataIndex	: 'alamat'
					, 	filterable	: true
					}
				,	{ 
						header		: 'Propinsi'
					,	dataIndex	: 'id_propinsi'
					,	editor		: this.form_propinsi
					,	renderer	: combo_renderer(this.form_propinsi)
					,	width		: 160
					,	filter		: {
							type		: 'list'
						,	store		: this.store_propinsi
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
						m_persetujuan_anggota_id_badan_usaha	= data[0].data['id_badan_usaha'];
						m_persetujuan_anggota_id_propinsi 		= data[0].data['id_propinsi'];
					} else {
						m_persetujuan_anggota_id_badan_usaha 	= 0;
						m_persetujuan_anggota_id_propinsi 		= 0;
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
		,	autoExpandColumn	: 'alamat'
		,	tbar				: this.tbar
		,	bbar				: this.bbar
	});

	this.do_proses = function()
	{
		var data = this.sm.getSelected();

		if (data == undefined) {
			return;
		}

		m_persetujuan_anggota_detail.do_refresh();
		m_persetujuan_anggota_detail.do_proses(data.get('id_badan_usaha'));
		m_persetujuan_anggota.panel.layout.setActiveItem(1);
	}
	
	this.do_load = function()
	{
		this.store_jenis_usaha.load({
				scope		: this
			,	callback	: function() {
					this.store_bentuk_badan_usaha.load({
							scope		: this
						,	callback	: function() {
								this.store_propinsi.load({
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
					});
				}
		});
	}

	this.do_refresh = function()
	{
		if (m_persetujuan_anggota_ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		if (m_persetujuan_anggota_ha_level < 3) {
			this.btn_proses.setDisabled(true);
		} else {
			this.btn_proses.setDisabled(false);
		}

		this.do_load();
	}
}

function M_PersetujuanAnggota(title)
{
	m_persetujuan_anggota_list		= new M_PersetujuanAnggotaList();
	m_persetujuan_anggota_detail	= new M_PersetujuanAnggotaDetail();
	
	this.panel = new Ext.Panel({
			id				: 'persetujuan_anggota_panel'
		,	title			: title
		,	layout			: 'card'
		,	activeItem		: 0
		,	autoWidth		: true
		,	autoScroll		: true
		,	items			: [
					m_persetujuan_anggota_list.panel
				,	m_persetujuan_anggota_detail.panel
			]
	});
	
	this.do_refresh = function(ha_level)
	{
		m_persetujuan_anggota_ha_level = ha_level;
		
		m_persetujuan_anggota_list.do_refresh();
	}
}

m_persetujuan_anggota = new M_PersetujuanAnggota('Persetujuan Anggota');

//@ sourceURL=persetujuan_anggota.layout.js
