/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - prasetya yanuar (prasetya.yanuar@googlemail.com)
 */

var m_entry_form_print;
var m_print_kta;
var m_print_kta_d = _g_root + 'module/print_kta/';
var m_pendaftaran_anggota_d 				= _g_root + 'module/pendaftaran_anggota/';
var badan_usaha = 0;
var id_pro = '';

function M_EntryFormPrint(){
	this.ha_level = 0;
	
	this.form_badan_usaha = new Ext.form.TextField({
			fieldLabel	: 'Nama Badan Usaha'
		,	allowBlank	: false
		,	width		: 300
	});
	
	this.form_no_sert = new Ext.form.TextField({
			fieldLabel	: 'Nomor Sertifikat'
		,	allowBlank	: false
		,	width		: 200	
	});
	
	this.form_no_blanko = new Ext.form.TextField({
			fieldLabel	: 'Nomor Blanko'
		,	allowBlank	: false
		,	width		: 200	
	});
	
	this.form_no_iujk = new Ext.form.TextField({
			fieldLabel	: 'Nomor IUJK'
		,	allowBlank	: false
		,	width		: 200	
	});
	
	this.btn_tampilkan = new Ext.Button({
			text		: 'Tampilkan'
		,	scope		: this
		,	handler		: function() {
				this.do_display();
			}
	});
	
	this.print_panel = new Ext.Panel({
			title	: 'KTA'
		,	region : 'center'
		,	height : 350
		,	autoScroll : true
		,	xtype	: 'box'
		,	autoLoad :{
				url:''
					}
			
	});
	
	this.btn_print = new Ext.Button({
			text		: 'Print'
		,	iconCls		: 'print16'
		,	scope		: this
		,	handler		: function() {
				this.do_print();
			}	
	});
	
	this.do_print = function(){  
		Ext.Ajax.request({
				url:'../print_kta/print_template.html'
			,	params:{
						id_bu:badan_usaha
					,	id_pro:id_pro
					,	no_sert:this.form_no_sert.getValue()
					}
			,	success: function(response){
						Ext.MessageBox.alert(this.print_panel.body.dom.innerHTML);
					}
				
		});
		return;
		var myWindow = window.open('', '', 'width=200,height=100');
		myWindow.document.write('<html><head>');
		myWindow.document.write('<title>' + 'KTA' + '</title>');
		myWindow.document.write('<link rel="Stylesheet" type="text/css" href="http://dev.sencha.com/deploy/ext-4.0.1/resources/css/ext-all.css" />');
		myWindow.document.write('<script type="text/javascript" src="http://dev.sencha.com/deploy/ext-4.0.1/bootstrap.js"></script>');
		myWindow.document.write('</head><body>');
		myWindow.document.write(this.print_panel.body.dom.innerHTML);
		myWindow.document.write('</body></html>');
		myWindow.print();
	}
	
	this.panel = new Ext.form.FormPanel({
			labelAlign		: 'right'
		,	labelWidth		: 175
		,	autoWidth		: true
		,	autoHeight		: true
		,	style			: 'margin: 8px;'
		,	bodyCssClass	: 'stop-panel-form'
		,	items			: [
					this.form_badan_usaha
				,	this.form_no_sert
				,	this.form_no_blanko		
				,	this.form_no_iujk	
				,	{ xtype : 'panel'
					,	layout: 'column'
					,	border: false
					,	items : [
							{columnWidth: 0.95, layout:'form', baseCls:'stop-panel-form', items : [this.btn_tampilkan]}
						,	{columnWidth: 0.05, layout:'anchor', baseCls:'stop-panel-form', items : [this.btn_print]}
					]
					}
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
	
	this.do_display = function(){
		if(this.is_valid()){
			this.print_panel.load({url:'../print_kta/print_template.html'
				,	scripts:true
				,	params:{
						id_bu:badan_usaha
					,	id_pro:id_pro
					,	no_sert:this.form_no_sert.getValue()
					}
				
			});
			
		}
	}
	this.do_refresh = function(nm_badan_usaha){
		this.form_badan_usaha.setValue(nm_badan_usaha);
	}
	
}

function M_PrintKTA()
{
	this.ha_level	= 0;
	this.nm_badan_usaha = '';
	m_entry_form_print = new M_EntryFormPrint();

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
	
	this.prov_store = new Ext.data.ArrayStore({
			url			: m_print_kta_d + 'data_prov.php'
		,	fields		: ['id','name']
		,	autoLoad	: false
	});
	
	this.form_prov = new Ext.form.ComboBox({
			fieldLabel		: 'Provinsi'
		,	store			: this.prov_store
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	triggerAction	: 'all'
		,	allowBlank		: false
		,	editable		: false
		,	width			: 200
	});
	
	this.form_npwp = new Ext.form.TextField({
			fieldLabel	: 'NPWP'
		,	allowBlank	: false
		,	width		: 200
		,	plugins		: [new Ext.ux.netbox.InputTextMask('99.999.999.9-999.999', false)]
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
	
	this.cm = new Ext.grid.ColumnModel({
			columns: [
					new Ext.grid.RowNumberer()
				,	{
						header		: 'ID Badan Usaha'
					,	dataIndex	: 'id_badan_usaha'
					,	width		: 200
					,   hidden		: true
					,	filterable	: true
					}
				,	{
						id			: 'nama'
					,	header		: 'Nama Perusahaan'
					,	dataIndex	: 'nama'
					,	width		: 200
					,	filterable	: true
					}
				,	{
						header		: 'Alamat'
					,	dataIndex	: 'alamat'
					, 	width		: 200
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
					
					if (data.length){
						badan_usaha = data[0].data['id_badan_usaha'];
						nm_badan_usaha = data[0].data['nama'];
						id_pro	= data[0].data['id_propinsi'];
					} else {
						badan_usaha = 0;
						nm_badan_usaha = '';
						id_pro = '';
					}
				}
			}
	});

	this.filters = new Ext.ux.grid.GridFilters({
			encode	: true
		,	local	: true
	});
	
	this.btn_cari = new Ext.Button({
			text		: 'Refresh'
		,	iconCls		: 'refresh16'
		,	scope		: this
		,	handler		: function() {
				this.do_cari();
			}
	});
	
	this.do_cari = function(){
	
	}
	
	this.btn_print = new Ext.Button({
			text		: 'Print'
		,	iconCls		: 'print16'
		,	scope		: this
		,	handler		: function() {
				this.do_print();
			}
	});
	
	this.do_print = function(){
		m_entry_form_print.do_refresh(nm_badan_usaha);
		this.panel.layout.setActiveItem(1);
	}

	this.tbar = new Ext.Toolbar({
		items	: [
				this.form_prov
			,	'-'
			,	this.form_npwp
			,	'-'
			,	this.btn_cari
			,	'->'
			, 	this.btn_print
		]
	});
	
	this.bbar = new Ext.PagingToolbar({
			store		: this.store
		,	pageSize	: 50
		,	displayInfo	: true
		,	displayMsg	: 'Menampilkan data ke {0} - {1} dari {2} data'
		,	plugins		: [this.filters]
	});

	this.list_panel = new Ext.grid.GridPanel({
			autoExpandColumn	: 'nama'
		,	store				: this.store
		,	sm					: this.sm
		,	cm					: this.cm
		,	stripeRows			: true
		,	columnLines			: true
		,	plugins				: [ this.filters ]
		,	tbar				: this.tbar
		,	bbar				: this.bbar
	});
	
	this.panel = new Ext.Panel({
			id					: 'print_kta'
		,	title				: 'Daftar KTA'
		,	layout			: 'card'
		,	activeItem		: 0
		,	autoWidth		: true
		,	autoScroll		: true
		,	items			: [
					this.list_panel
				,	m_entry_form_print.panel
			]
	});

	this.do_load = function()
	{
		delete this.store.lastParams;

		this.store.load({
			params	: {
				start	: 0
			,	limit	: 50
			}
		});
		this.prov_store.load();
	}

	this.do_refresh = function(ha_level)
	{
		this.ha_level = ha_level;

		if (this.ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.list_panel.setDisabled(true);
			return;
		} else {
			this.list_panel.setDisabled(false);
		}
		this.do_load();
	}
}

m_print_kta = new M_PrintKTA();

//@ sourceURL=print_kta.layout.js
