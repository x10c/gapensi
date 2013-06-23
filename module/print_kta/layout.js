/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - prasetya yanuar (prasetya.yanuar@googlemail.com)
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_print_kta;
var m_print_kta_list;
var m_print_kta_detail;
var m_print_kta_id_badan_usaha	= 0;
var m_print_kta_id_propinsi		= 0;
var m_print_kta_d 				= _g_root + 'module/print_kta/';
var m_print_kta_ha_level		= 0;

function M_PrintKTADetail()
{
	this.mac_address = '';
	this.form_badan_usaha = new Ext.form.TextField({
			fieldLabel	: 'Nama Badan Usaha'
		,	readOnly	: true
		,	allowBlank	: false
		,	width		: 300
	});
	
	this.form_no_sert = new Ext.form.TextField({
			fieldLabel	: 'Nomor Sertifikat'
		,	allowBlank	: false
		,	width		: 300	
	});
	
	this.form_no_blanko = new Ext.form.TextField({
			fieldLabel	: 'Nomor Blanko'
		,	allowBlank	: false
		,	width		: 300	
	});
	
	this.form_no_iujk = new Ext.form.TextField({
			fieldLabel	: 'Nomor IUJK'
		,	allowBlank	: false
		,	width		: 300	
	});

	this.btn_preview = new Ext.Button({
			text		: 'Preview'
		,	iconCls		: 'print_preview16'
		,	scope		: this
		,	handler		: function() {
				this.do_preview();
			}
	});
	
	this.btn_print = new Ext.Button({
			text		: 'Print'
		,	iconCls		: 'print16'
		,	disabled	: true
		,	scope		: this
		,	handler		: function() {
				this.do_print();
			}
	});
	
	this.form_panel = new Ext.form.FormPanel({
			title			: 'Parameter'
		,	labelAlign		: 'right'
		,	labelWidth		: 140
		,	buttonAlign		: 'center'
		,	width			: 500
		,	autoHeight		: true
		,	collapsible		: true
		,	frame			: true
		,	style			: 'margin: 8px;'
		,	bodyCssClass	: 'stop-panel-form'
		,	buttons			: [
					this.btn_preview
				,	this.btn_print
			]
		,	items			: [
					this.form_badan_usaha
				,	this.form_no_sert		
				,	this.form_no_blanko		
				,	this.form_no_iujk
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

	this.toolbar = new Ext.Toolbar({
		items	: [
			this.btn_back
		]
	});

	this.print_panel = new Ext.Panel({
			title		: 'KTA'
		,	height 		: 500
		,	autoScroll	: true
		,	xtype		: 'box'
		// ,	autoLoad 	: {
				// url	: ''
			// }
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
					this.form_panel
				,	this.print_panel
			]
	});
	
	this.is_valid = function()
	{
		if (!this.form_no_sert.isValid()) {
			return false;
		}

		if (!this.form_no_iujk.isValid()) {
			return false;
		}

		if (!this.form_no_blanko.isValid()) {
			return false;
		}

		return true;
	}
	
	this.do_preview = function(){
		if(!this.is_valid()){
			Ext.MessageBox.alert('Kesalahan', 'Parameter belum terisi dengan benar.');
			return;
		}
		
		this.print_panel.load({
				url		: m_print_kta_d + 'print_template.html'
			,	scripts	: true
			,	params	: {
					id_bu	: m_print_kta_id_badan_usaha
				,	id_pro	: m_print_kta_id_propinsi
				,	no_sert	: this.form_no_sert.getValue()
				}
			,	scope	: this
		});

		this.btn_print.setDisabled(false);
	}
	
	this.do_get_mac_address = function()
	{
		var browser = navigator.appName;
		
		if (browser == 'Microsoft Internet Explorer') {
			this.mac_address	= get_mac_address();
		} else {
			this.mac_address	= 'Silahkan gunakan Browser IE untuk mengetahui Mac Address.';
		}
	}
	
	this.do_print = function(){  
		// method 1
		// Ext.ux.Printer.print(this.print_panel);
		
		// method 2
		var myWindow = window.open('', '', 'fullscreen=yes,scrollbars=yes');
		myWindow.document.write('<html><head>');
		myWindow.document.write('<title>' + 'KTA' + '</title>');
		myWindow.document.write('<link rel="stylesheet" type="text/css" href="../print_kta/print.css"/>');
		myWindow.document.write('</head><body>');
		myWindow.document.write(this.print_panel.body.dom.innerHTML);
		myWindow.document.write('</body></html>');
		myWindow.print();
		this.do_save_print_log();
	}
	
	this.do_save_print_log = function(){
		this.do_get_mac_address();
		Ext.Ajax.request({
				url		: m_print_kta_d + 'submit.php'
			,	params	: {
						no_sert	: this.form_no_sert.getValue()
					,	no_blanko : this.form_no_blanko.getValue()
					,	no_iujk : this.form_no_iujk.getValue()
					,	id_badan_usaha	: m_print_kta_id_badan_usaha
					,	mac_address : 	this.mac_address
				}
			,	waitMsg	: 'Pemuatan ...'
			,	failure	: function(response) {
					Ext.MessageBox.alert('Gagal', response.responseText);
				}
			,	success : function (response) {
					var msg = Ext.util.JSON.decode(response.responseText);

					 if (msg.success == false) {
						 Ext.MessageBox.alert('Kesalahan', 'log print gagal di simpan :' + msg.info);
						 return;
					 } 					
				}
			,	scope	: this		
		});
	}

	this.do_back = function()
	{
		m_print_kta.panel.layout.setActiveItem(0);
	}

	this.do_refresh = function(nama_badan_usaha){
		this.form_badan_usaha.setValue(nama_badan_usaha);
		this.form_no_sert.setValue('');
		this.form_no_blanko.setValue('');
		this.form_no_iujk.setValue('');
		
		this.btn_print.setDisabled(true);
		
		this.print_panel.load({
				scope	: this
			,	url		: ''
			,	script	: true
		})
	}
	
}

function M_PrintKTAList()
{
	this.pageSize	= 50;

	this.record = new Ext.data.Record.create([
			{ name	: 'id_badan_usaha' }
		,	{ name	: 'nama' }
		,	{ name	: 'alamat' }
		,	{ name	: 'npwp' }
		,	{ name	: 'bentuk_bu' }
		,	{ name	: 'id_propinsi' }
		,	{ name	: 'jenis_usaha' }
		,	{ name  : 'no_kta' }
	]);

	this.reader = new Ext.data.JsonReader(
		{	
				successProperty : 'success'
			,	totalProperty : 'results'
			,	root		: 'data'
		}
		, this.record
	);
	
	this.store = new Ext.data.Store({
			url			: m_print_kta_d + 'data_list.php'
		,	autoLoad	: false
		,	pageSize : this.pageSize
		,	reader : this.reader
	});

	this.store_jenis_usaha = new Ext.data.ArrayStore({
			url			: m_print_kta_d + 'data_jenis_usaha.php'
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
			url			: m_print_kta_d + 'data_bentuk_badan_usaha.php'
		,	fields		: ['id', 'name']
		,	autoLoad	: false
		,	idIndex		: 0
	});
	
	this.form_search_nama =  new Ext.form.TextField({
			fieldLabel	: 'Nama Perusahaan'
		,	width		: 200	
		,	emptyText	: ' - Nama Perusahaan - '
	});
	
	this.form_search_no_kta =  new Ext.form.TextField({
			fieldLabel	: 'Nomor KTA'
		,	width		: 200	
		,	emptyText	: ' - NO KTA - '
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
			url			: m_print_kta_d + 'data_propinsi.php'
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
						header		: 'No KTA'
					,	dataIndex	: 'no_kta'
					,	align		: 'center'
					,	width		: 50
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
						m_print_kta_id_badan_usaha	= data[0].data['id_badan_usaha'];
						m_print_kta_id_propinsi		= data[0].data['id_propinsi'];
					} else {
						m_print_kta_id_badan_usaha 	= 0;
						m_print_kta_id_propinsi 	= 0;
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
	
	this.btn_search = new Ext.Button({
			text	: 'Search'
		,	scope	: this
		,	handler	: function() {
				this.do_search();
			}
	});

	this.btn_print = new Ext.Button({
			text	: 'Print'
		,	iconCls	: 'print16'
		,	scope	: this
		,	handler	: function() {
				this.do_print();
			}
	});

	this.tbar = new Ext.Toolbar({
		items	: [
				this.btn_ref
			,	'-'
			,	this.form_search_nama
			,	this.form_search_no_kta
			,	this.btn_search
			,	'-'
			,	this.btn_print
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

	this.do_validate = function()
	{
		var browser = navigator.appName;
		
		if (browser != 'Microsoft Internet Explorer') {
			Ext.MessageBox.alert('Perhatian', 'Silahkan gunakan Browser IE untuk mencetak KTA.');
			return false;
		}

		return true;
	}
	
	this.do_print = function()
	{
		var data = this.sm.getSelected();

		if (data == undefined) {
			return;
		}

		if (!this.do_validate()) {
			return;
		}

		this.mac_address	= get_mac_address();
		
		Ext.Ajax.request({
				url		: m_print_kta_d + 'data_mac_address.php'
			,	waitMsg	: 'Pemuatan ...'
			,	failure	: function(response) {
					Ext.MessageBox.alert('Gagal', response.responseText);
					return false;
				}
			,	success : function (response) {
					var msg = Ext.util.JSON.decode(response.responseText);

					if (msg.data[0].ada < 1) {
						Ext.MessageBox.alert('Perhatian', 'Silahkan daftarkan komputer anda pada menu Pendaftaran Komputer Pengguna.');
						return;
					}
					
					if (msg.data[0].status == '0') {
						Ext.MessageBox.alert('Perhatian', 'Silahkan hubungi admin pusat untuk mengaktifkan status pendaftaran komputer anda.');
						return;
					}
					
					if (msg.data[0].mac_address != this.mac_address) {
						Ext.MessageBox.alert('Perhatian', 'Komputer yang anda gunakan tidak terdaftar, silahkan daftarkan pada menu Pendaftaran Komputer Pengguna.');
						return;
					}
					
					m_print_kta_detail.do_refresh(data.get('nama'));
					m_print_kta.panel.layout.setActiveItem(1);
				}
			,	scope	: this		
		});
		m_print_kta_detail.do_refresh(data.get('nama'));
		m_print_kta.panel.layout.setActiveItem(1);
	}
	
	this.do_search = function (){
		var load_type = 'user';

		if (m_print_kta_ha_level == 4) {
			load_type = 'all';
		}
		this.store.setBaseParam('nama', this.form_search_nama.getValue());
		this.store.setBaseParam('no_kta', this.form_search_no_kta.getValue());
		this.store.load({
					scope	: this
				,	params	: {
						start		: 0
					,	limit		: this.pageSize
					,	load_type	: load_type
					,	nama		: this.form_search_nama.getValue()
					,	no_kta		: this.form_search_no_kta.getValue()
					}
			});	
	}
	this.do_load = function()
	{
		var load_type = 'user';

		if (m_print_kta_ha_level == 4) {
			load_type = 'all';
			this.store.setBaseParam('load_type', 'all');
		}
		this.store.setBaseParam('nama', '');
		this.store.setBaseParam('no_kta', '');
		
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
														start		: 0
													,	limit		: this.pageSize
													,	load_type	: load_type
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
		if (m_print_kta_ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		this.do_load();
	}
}

function M_PrintKTA(title)
{
	m_print_kta_list	= new M_PrintKTAList();
	m_print_kta_detail	= new M_PrintKTADetail();
	
	this.panel = new Ext.Panel({
			id				: 'print_kta_panel'
		,	title			: title
		,	layout			: 'card'
		,	activeItem		: 0
		,	autoWidth		: true
		,	autoScroll		: true
		,	items			: [
					m_print_kta_list.panel
				,	m_print_kta_detail.panel
			]
	});
	
	this.do_refresh = function(ha_level)
	{
		m_print_kta_ha_level = ha_level;
		
		m_print_kta_list.do_refresh();
	}
}

m_print_kta = new M_PrintKTA('Cetak KTA');

//@ sourceURL=print_kta.layout.js
