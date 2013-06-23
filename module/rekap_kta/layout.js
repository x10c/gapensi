/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - prasetya yanuar (prasetya.yanuar@googlemail.com)
 */

var m_rekap_kta;
var m_rekap_kta_list;
var m_rekap_kta_d 				= _g_root + 'module/rekap_kta/';
var m_rekap_kta_ha_level		= 0;

function M_RekapKTAForm()
{
	
	this.tanggalMulai = new Ext.form.DateField({
			fieldLabel	: 'Tanggal Mulai'
		,	emptyText	: 'Thn-Bln-Tgl'
		,	format		: 'Y-m-d'
		,	allowBlank	: true
		,	editable	: false
		,	width		: 100
	});
	
	this.tanggalAkhir = new Ext.form.DateField({
			fieldLabel	: 'Tanggal Akhir'
		,	emptyText	: 'Thn-Bln-Tgl'
		,	format		: 'Y-m-d'
		,	allowBlank	: true
		,	editable	: false
		,	width		: 100
	});

	this.btn_print = new Ext.Button({
			text	: 'Print'
		,	iconCls	: 'print16'
		,	scope	: this
		,	handler	: function() {
				this.do_print();
			}
	});

	this.panel = new Ext.form.FormPanel({
			title			: 'Rekap'
		,	labelAlign		: 'right'
		,	labelWidth		: 140
		,	buttonAlign		: 'center'
		,	width			: 500
		,	autoHeight		: true
		,	collapsible		: true
		,	frame			: true
		,	style			: 'margin: 8px;'
		,	bodyCssClass	: 'stop-panel-form'
		,	buttons			: [this.btn_print
			]
		,	items			: [
					this.tanggalMulai
				,	this.tanggalAkhir	
			]
	});

	
	this.do_print = function()
	{
		var data = this.sm.getSelected();

		if (data == undefined) {
			return;
		}

		if (!this.do_validate()) {
			return;
		}

		
		Ext.Ajax.request({
				url		: m_rekap_kta_d +'print.php'
			,	waitMsg	: 'Pemuatan ...'
			,	failure	: function(response) {
					Ext.MessageBox.alert('Gagal', response.responseText);
					return false;
				}
			,	success : function (response) {
					var msg = Ext.util.JSON.decode(response.responseText);
				
				}
			,	scope	: this		
		});
		
		m_rekap_kta_detail.do_refresh(data.get('nama'));
		m_rekap_kta.panel.layout.setActiveItem(1);
	}
	

	this.do_refresh = function()
	{
		if (m_rekap_kta_ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses', 'Maaf, Anda tidak memiliki hak akses untuk melihat menu ini!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
		}

		this.do_load();
	}
}

function M_RekapKTA(title)
{
	m_rekap_kta_form	= new M_RekapKTAForm();
	
	this.panel = new Ext.Panel({
			id				: 'print_kta_panel'
		,	title			: title
		,	layout			: 'card'
		,	activeItem		: 0
		,	autoWidth		: true
		,	autoScroll		: true
		,	items			: [
					m_rekap_kta_form.panel
			]
	});
	
	this.do_refresh = function(ha_level)
	{
		m_rekap_kta_ha_level = ha_level;
		
		m_rekap_kta_form.do_refresh();
	}
}

m_rekap_kta = new M_RekapKTA('Cetak Rekap KTA');

//@ sourceURL=print_kta.layout.js
