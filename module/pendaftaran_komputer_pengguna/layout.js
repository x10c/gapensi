/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_pendaftaran_komputer_pengguna;
var m_pendaftaran_komputer_pengguna_d = _g_root + 'module/pendaftaran_komputer_pengguna/';

function M_PendaftaranKomputerPengguna()
{
	this.dml_type	= 0;
	this.ha_level	= 0;
	this.status		= '0';
	
	this.computer_name	= '';
	this.ip_address		= '';
	this.mac_address	= '';
	
	this.form_user = new Ext.form.TextField({
			fieldLabel		: 'ID Pengguna'
		,	readOnly		: true
		,	allowBlank		: false
		,	width			: 150
		,	msgTarget		: 'side'
	});

	this.mask_mac_address = new Ext.ux.netbox.InputTextMask('AA:AA:AA:AA:AA:AA', true);
	
	this.form_mac_address = new Ext.form.TextField({
			fieldLabel		: 'Mac Address'
		,	allowBlank		: false
		,	width			: 150
		,	plugins			: [ this.mask_mac_address ]
		,	msgTarget		: 'side'
	});
	
	this.store_status = new Ext.data.ArrayStore({
			fields	: ['id','name']
		,	data	: [
					['0', 'Belum Disetujui']
				,	['1', 'Disetujui']
			]
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
		,	readOnly		: true
		,	msgTarget		: 'side'
		,	width			: 150
	});
	
	this.info_mac_address = new Ext.form.DisplayField({
			fieldLabel		: 'Mac Address'
		,	width			: 400
		,	msgTarget		: 'side'
	});

	this.form_panel = new Ext.form.FormPanel({
			labelAlign		: 'right'
		,	labelWidth		: 125
		,	autoWidth		: true
		,	autoHeight		: true
		,	style			: 'margin: 8px;'
		,	bodyCssClass	: 'stop-panel-form'
		,	items			: [
					this.form_user
				,	this.form_mac_address
				,	this.form_status
				,	{
						xtype		: 'fieldset'
					,	title		: 'Informasi Komputer Anda'
					,	collapsible	: true
					,	items		: [
							this.info_mac_address
						]
					}
			]
	});

	this.btn_ref = new Ext.Button({
			text	: 'Refresh'
		,	iconCls	: 'refresh16'
		,	scope	: this
		,	handler	: function() {
				this.do_load();
			}
	});
	
	this.btn_save = new Ext.Button({
			text	: 'Simpan'
		,	iconCls	: 'save16'
		,	scope	: this
		,	handler	: function() {
				this.do_save();
			}
	});
	
	this.toolbar = new Ext.Toolbar({
		items	: [
			this.btn_ref
		,	'->'
		,	this.btn_save
		]
	});

	this.panel = new Ext.Panel({
			id				: 'pendaftaran_komputer_pengguna_panel'
		,	title			: 'Pendaftaran Komputer Pengguna'
		,	autoWidth		: true
		,	autoScroll		: true
		,	padding			: '6'
		,	tbar			: this.toolbar
		,	defaults		: {
				style		: {
						marginLeft		:'auto'
					,	marginRight		:'auto'
					,	marginBottom	:'8px'
				}
			}
		,	items		: [	this.form_panel	]
	});

	this.do_get_mac_address = function()
	{
		var browser = navigator.appName;
		
		if (browser == 'Microsoft Internet Explorer') {
			this.mac_address	= get_mac_address();
		} else {
			this.mac_address	= 'Silahkan gunakan Browser IE untuk mengetahui Mac Address.';
		}
	}
	
	this.edit_fill_form = function(data)
	{
		this.form_user.setValue(data.data[0].id_admin_user);
		this.form_mac_address.setValue(data.data[0].mac_address);
		this.form_status.setValue(data.data[0].status);
		this.info_mac_address.setValue(this.mac_address);
		
		if (data.data[0].ada > 0) {
			this.dml_type	= 3;
		} else {
			this.dml_type	= 2;
		}
	}

	this.is_valid = function()
	{
		if (!this.form_user.isValid()) {
			return false;
		}
		
		if (!this.form_mac_address.isValid()) {
			return false;
		}

		return true;
	}
	
	this.do_save = function()
	{
		if (!this.is_valid()) {
			Ext.MessageBox.alert('Kesalahan', 'Form belum terisi dengan benar.');
			return;
		}

		Ext.Ajax.request({
				url		: m_pendaftaran_komputer_pengguna_d + 'submit.php'
			,	params	: {
						dml_type		: this.dml_type
					,	id_admin_user	: this.form_user.getValue()
					,	mac_address		: this.form_mac_address.getValue()
				}
			,	waitMsg	: 'Pemuatan ...'
			,	failure	: function(response) {
					Ext.MessageBox.alert('Gagal', response.responseText);
				}
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
		this.do_get_mac_address();
		
		Ext.Ajax.request({
				url		: m_pendaftaran_komputer_pengguna_d + 'data.php'
			,	waitMsg	: 'Pemuatan ...'
			,	failure	: function(response) {
					Ext.MessageBox.alert('Gagal', response.responseText);
				}
			,	success : function (response) {
					var msg = Ext.util.JSON.decode(response.responseText);

					this.edit_fill_form(msg);
				}
			,	scope	: this		
		});
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

		if (this.ha_level < 2) {
			this.btn_save.setDisabled(true);
		} else {
			this.btn_save.setDisabled(false);
		}
		
		this.do_load();
	}
}

m_pendaftaran_komputer_pengguna = new M_PendaftaranKomputerPengguna();

//@ sourceURL=pendaftaran_komputer_pengguna.layout.js
