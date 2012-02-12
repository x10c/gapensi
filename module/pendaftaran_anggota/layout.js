/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_pendaftaran_anggota;
var m_pendaftaran_anggota_list;
var m_pendaftaran_anggota_detail;
var m_pendaftaran_anggota_id_badan_usaha	= 0;
var m_pendaftaran_anggota_d 				= _g_root + 'module/pendaftaran_anggota/';
var m_pendaftaran_anggota_ha_level 			= 0;

function M_PendaftaranAnggotaDetail()
{
	this.dml_type	= 0;

	this.store_jenis_usaha = new Ext.data.ArrayStore({
			url			: m_pendaftaran_anggota_d + 'data_jenis_usaha.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});

	this.store_bentuk_badan_usaha = new Ext.data.ArrayStore({
			url			: m_pendaftaran_anggota_d + 'data_bentuk_badan_usaha.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});

	this.store_propinsi = new Ext.data.ArrayStore({
			url			: m_pendaftaran_anggota_d + 'data_propinsi.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.store_kabupaten = new Ext.data.ArrayStore({
			url			: m_pendaftaran_anggota_d + 'data_kabupaten.php'
		,	fields		: ['id_propinsi', 'id_kabupaten', 'nama']
		,	autoLoad	: false
		,	idIndex		: 1
	});

	this.store_gred = new Ext.data.ArrayStore({
			fields		: ['value']
		,	data		: [
					['1']
				,	['2']
				,	['3']
				,	['4']
				,	['5']
				,	['6']
				,	['7']
			]
	});

	this.form_npwp = new Ext.form.TextField({
			fieldLabel		: 'NPWP'
		,	vtype			: 'NPWP'
		,	allowBlank		: false
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
		,	allowBlank		: false
		,	msgTarget		: 'side'
		,	width			: 100
	});

	this.form_nama_badan_usaha = new Ext.form.TextField({
			fieldLabel		: 'Nama Badan Usaha'
		,	allowBlank		: false
		,	width			: 400
		,	msgTarget		: 'side'
	});

	this.form_bentuk_badan_usaha = new Ext.form.ComboBox({
			fieldLabel		: 'Bentuk Badan Usaha'
		,	store			: this.store_bentuk_badan_usaha
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	allowBlank		: false
		,	msgTarget		: 'side'
		,	width			: 200
	});

	this.form_alamat = new Ext.form.TextArea({
			fieldLabel		: 'Alamat'
		,	allowBlank		: false
		,	width			: 400
		,	msgTarget		: 'side'
	});
	
	this.form_propinsi = new Ext.form.ComboBox({
			fieldLabel		: 'Propinsi'
		,	store			: this.store_propinsi
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	mode			: 'local'
		,	allowBlank		: false
		,	width			: 200
		,	msgTarget		: 'side'
		,	listeners		: {
					scope	: this
				,	select	: function(cb, record, index) {
						delete this.store_kabupaten.lastParams;
						
						this.store_kabupaten.load({
								scope		: this
							,	params		: {
									id_propinsi : record.get('id')
								}
							,	callback	: function(){
									var data = this.store_kabupaten.getAt(0);
									
									this.form_kabupaten.setDisabled(false);
									this.form_kabupaten.setValue(data['id_kabupaten']);
								}
						});
					}
			}
	});

	this.form_kabupaten = new Ext.form.ComboBox({
			fieldLabel		: 'Kabupaten/Kota'
		,	store			: this.store_kabupaten
		,	emptyText		: 'Silahkan pilih Propinsi'
		,	valueField		: 'id_kabupaten'
		,	displayField	: 'nama'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	mode			: 'local'
		,	allowBlank		: false
		,	width			: 200
		,	msgTarget		: 'side'
	});
	
	this.form_telepon = new Ext.form.NumberField({
			fieldLabel		: 'Telepon'
		,	allowBlank		: true
		,	allowDecimals	: false
		,	allowNegative	: false
		,	maxLength		: 50
		,	maxLengthText	: 'Maksimal panjang kolom adalah 50'
		,	width			: 200
		,	msgTarget		: 'side'
	});

	this.form_fax = new Ext.form.NumberField({
			fieldLabel		: 'Fax'
		,	allowBlank		: true
		,	allowDecimals	: false
		,	allowNegative	: false
		,	maxLength		: 50
		,	maxLengthText	: 'Maksimal panjang kolom adalah 50'
		,	width			: 200
		,	msgTarget		: 'side'
	});
	
	this.form_kode_pos = new Ext.form.NumberField({
			fieldLabel		: 'Kode Pos'
		,	allowBlank		: true
		,	allowDecimals	: false
		,	allowNegative	: false
		,	maxLength		: 5
		,	maxLengthText	: 'Maksimal panjang kolom adalah 5'
		,	width			: 100
		,	msgTarget		: 'side'
	});

	this.form_nama_pimpinan = new Ext.form.TextField({
			fieldLabel		: 'Nama Pimpinan'
		,	allowBlank		: false
		,	width			: 400
		,	msgTarget		: 'side'
	});
	
	this.form_email = new Ext.form.TextField({
			fieldLabel		: 'Email'
		,	allowBlank		: true
		,	width			: 200
		,	msgTarget		: 'side'
	});
	
	this.form_website = new Ext.form.TextField({
			fieldLabel		: 'Website'
		,	allowBlank		: true
		,	width			: 200
		,	msgTarget		: 'side'
	});

	this.form_gred = new Ext.form.ComboBox({
			fieldLabel		: 'Gred Tertinggi'
		,	store			: this.store_gred
		,	valueField		: 'value'
		,	displayField	: 'value'
		,	mode			: 'local'
		,	forceSelection	: true
		,	typeAhead		: true
		,	selectOnFocus	: true
		,	triggerAction	: 'all'
		,	allowBlank		: false
		,	msgTarget		: 'side'
		,	width			: 50
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
				,	this.form_bentuk_badan_usaha		
				,	this.form_alamat		
				,	this.form_propinsi		
				,	this.form_kabupaten		
				,	this.form_telepon		
				,	this.form_fax		
				,	this.form_kode_pos		
				,	this.form_nama_pimpinan
				,	this.form_email
				,	this.form_website
				,	this.form_gred
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

	this.do_reset = function()
	{
		this.form_npwp.setValue('');
		this.form_jenis_usaha.clearValue();
		this.form_nama_badan_usaha.setValue('');
		this.form_bentuk_badan_usaha.clearValue();
		this.form_alamat.setValue('');
		this.form_propinsi.clearValue();
		this.form_kabupaten.clearValue();
		this.form_telepon.setValue('');
		this.form_fax.setValue('');
		this.form_kode_pos.setValue('');
		this.form_nama_pimpinan.setValue('');
		this.form_email.setValue('');
		this.form_website.setValue('');
		this.form_gred.clearValue();		
	}

	this.edit_fill_form = function(data)
	{
		this.form_npwp.setValue(data.data[0].npwp);
		this.form_jenis_usaha.setValue(data.data[0].id_jenis_usaha);
		this.form_nama_badan_usaha.setValue(data.data[0].nama);
		this.form_bentuk_badan_usaha.setValue(data.data[0].bentuk_bu);
		this.form_alamat.setValue(data.data[0].alamat);
		this.form_propinsi.setValue(data.data[0].id_propinsi);
		this.form_kabupaten.setValue(data.data[0].id_kabupaten);
		this.form_telepon.setValue(data.data[0].telepon);
		this.form_fax.setValue(data.data[0].fax);
		this.form_kode_pos.setValue(data.data[0].kodepos);
		this.form_nama_pimpinan.setValue(data.data[0].pimpinan_bu);
		this.form_email.setValue(data.data[0].email);
		this.form_website.setValue(data.data[0].website);
		this.form_gred.setValue(data.data[0].gred);
	}

	this.do_add = function()
	{
		this.dml_type	= 2;
		this.do_reset();
	}

	this.do_edit = function(id)
	{
		this.dml_type	= 3;

		Ext.Ajax.request({
			url		: m_pendaftaran_anggota_d + 'data.php'
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
		m_pendaftaran_anggota.panel.layout.setActiveItem(0);
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

		if (!this.form_bentuk_badan_usaha.isValid()) {
			return false;
		}

		if (!this.form_alamat.isValid()) {
			return false;
		}

		if (!this.form_propinsi.isValid()) {
			return false;
		}

		if (!this.form_kabupaten.isValid()) {
			return false;
		}

		if (!this.form_nama_pimpinan.isValid()) {
			return false;
		}

		if (!this.form_gred.isValid()) {
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
				url		: m_pendaftaran_anggota_d + 'submit.php'
			,	params  : {
						dml_type		: this.dml_type
					,	id_badan_usaha	: m_pendaftaran_anggota_id_badan_usaha
					,	nama			: this.form_nama_badan_usaha.getValue()
					,	alamat			: this.form_alamat.getValue()
					,	kodepos			: this.form_kode_pos.getValue()
					,	telepon			: this.form_telepon.getValue()
					,	fax				: this.form_fax.getValue()
					,	email			: this.form_email.getValue()
					,	website			: this.form_website.getValue()
					,	npwp			: this.form_npwp.getValue()
					,	bentuk_bu		: this.form_bentuk_badan_usaha.getValue()
					,	id_propinsi		: this.form_propinsi.getValue()
					,	id_kabupaten	: this.form_kabupaten.getValue()
					,	gred			: this.form_gred.getValue()
					,	pimpinan_bu		: this.form_nama_pimpinan.getValue()
					,	id_jenis_usaha	: this.form_jenis_usaha.getValue()
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

						m_pendaftaran_anggota_list.do_load();
						m_pendaftaran_anggota.panel.layout.setActiveItem(0);
					}
			,	scope	: this
		});
	}

	this.do_refresh = function(id_pro)
	{
		this.store_jenis_usaha.load();
		this.store_bentuk_badan_usaha.load();
		this.store_propinsi.load();
		this.store_kabupaten.load({
			params	: {
				id_propinsi	: id_pro
			}
		});
	}
}

function M_PendaftaranAnggotaList()
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
			url			: m_pendaftaran_anggota_d + 'data_list.php'
		,	root		: 'data'
		,	fields		: this.record
		,	autoLoad	: false
	});

	this.store_jenis_usaha = new Ext.data.ArrayStore({
			url			: m_pendaftaran_anggota_d + 'data_jenis_usaha.php'
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
			url			: m_pendaftaran_anggota_d + 'data_bentuk_badan_usaha.php'
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
			url			: m_pendaftaran_anggota_d + 'data_propinsi.php'
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
						m_pendaftaran_anggota_id_badan_usaha = data[0].data['id_badan_usaha'];
					} else {
						m_pendaftaran_anggota_id_badan_usaha = 0;
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

	this.btn_add = new Ext.Button({
			text	: 'Tambah'
		,	iconCls	: 'add16'
		,	scope	: this
		,	handler	: function() {
				this.do_add();
			}
	});

	this.btn_edit = new Ext.Button({
			text	: 'Ubah'
		,	iconCls	: 'edit16'
		,	scope	: this
		,	handler	: function() {
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

	this.do_add = function()
	{
		m_pendaftaran_anggota_detail.do_add();
		m_pendaftaran_anggota_detail.do_refresh(0);
		m_pendaftaran_anggota.panel.layout.setActiveItem(1);
	}

	this.do_edit = function()
	{
		var data = this.sm.getSelected();

		if (data == undefined) {
			return;
		}

		m_pendaftaran_anggota_detail.do_refresh(data.get('id_propinsi'));
		m_pendaftaran_anggota_detail.do_edit(data.get('id_badan_usaha'));
		m_pendaftaran_anggota.panel.layout.setActiveItem(1);
	}
	
	this.do_del = function()
	{
		var data = this.sm.getSelected();
		
		if (data == undefined) {
			return;
		}

		Ext.MessageBox.confirm("Konfirmasi", "Hapus Data '"+ data.get('nama') +"' ?", function(btn, text){
			if (btn == 'yes'){
				this.dml_type = 4;
				this.do_save(data);
			}
		}, this);
	}

	this.do_save = function(record)
	{
		Ext.Ajax.request({
				url		: m_pendaftaran_anggota_d + 'submit.php'
			,	params  : {
						dml_type		: this.dml_type
					,	id_badan_usaha	: record.get('id_badan_usaha')
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

					this.do_load();
				}
			,	scope	: this
		});
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
		if (m_pendaftaran_anggota_ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		if (m_pendaftaran_anggota_ha_level >= 2) {
			this.btn_add.setDisabled(false);
		} else {
			this.btn_add.setDisabled(true);
		}
		
		if (m_pendaftaran_anggota_ha_level < 3) {
			this.btn_edit.setDisabled(true);
		} else {
			this.btn_edit.setDisabled(false);
		}

		if (m_pendaftaran_anggota_ha_level == 4) {
			this.btn_del.setDisabled(false);
		} else {
			this.btn_del.setDisabled(true);
		}

		this.do_load();
	}
}

function M_PendaftaranAnggota(title)
{
	m_pendaftaran_anggota_list		= new M_PendaftaranAnggotaList();
	m_pendaftaran_anggota_detail	= new M_PendaftaranAnggotaDetail();
	
	this.panel = new Ext.Panel({
			id				: 'pendaftaran_anggota_panel'
		,	title			: title
		,	layout			: 'card'
		,	activeItem		: 0
		,	autoWidth		: true
		,	autoScroll		: true
		,	items			: [
					m_pendaftaran_anggota_list.panel
				,	m_pendaftaran_anggota_detail.panel
			]
	});
	
	this.do_refresh = function(ha_level)
	{
		m_pendaftaran_anggota_ha_level = ha_level;
		
		m_pendaftaran_anggota_list.do_refresh();
	}
}

m_pendaftaran_anggota = new M_PendaftaranAnggota('Pendaftaran Anggota');

//@ sourceURL=pendaftaran_anggota.layout.js
