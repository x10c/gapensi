/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

var m_app_home;
var m_app_home_d = _g_root +'module/app_home/';

function M_HomeWinChange(title, form_old_title, form_new_title, form_new_confirm_title, form_type, url)
{
	this.type	= form_type;
	this.url	= url;

	this.form_old = new Ext.form.TextField({
			fieldLabel	: form_old_title
		,	inputType	: form_type
		,	width		: 200
	});

	this.form_new = new Ext.form.TextField({
			fieldLabel	: form_new_title
		,	inputType	: form_type
		,	allowBlank	: false
		,	width		: 200
	});

	this.form_new_confirm = new Ext.form.TextField({
			fieldLabel	: form_new_confirm_title
		,	inputType	: form_type
		,	allowBlank	: false
		,	width		: 200
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

	this.win = new Ext.Window({
			title		: title
		,	modal		: true
		,	layout		: 'form'
		,	labelAlign	: 'left'
		,	iconCls		: 'password16'
		,	padding		: 6
		,	closable	: false
		,	resizable	: false
		,	plain		: true
		,	autoHeight	: true
		,	width		: 340
		,	items		: [
					this.form_old
				,	this.form_new
				,	this.form_new_confirm
			]
		,	bbar		: [
					this.btn_cancel
				,	'->'
				,	this.btn_save
			]
	});

	this.do_cancel = function()
	{
		this.win.hide();
	}

	this.is_form_valid = function()
	{
		if (this.type == 'password') {
			if (!this.form_old.isValid()) {
				Ext.Msg.alert('Kesalahan', 'Data yang anda inputkan kosong atau tidak sesuai format yang ditentukan!');
				return false;
			}
		}
		
		if (!this.form_new.isValid()) {
			Ext.Msg.alert('Kesalahan', 'Data yang anda inputkan kosong atau tidak sesuai format yang ditentukan!');
			return false;
		}

		if (!this.form_new_confirm.isValid()) {
			Ext.Msg.alert('Kesalahan', 'Data yang anda inputkan kosong atau tidak sesuai format yang ditentukan!');
			return false;
		}

		if (this.form_new.getValue() != this.form_new_confirm.getValue()) {
			Ext.Msg.alert('Kesalahan', 'Kata Kunci Baru tidak sesuai dengan konfirmasinya.');
			return false;
		}
		
		return true;
	}

	this.do_save = function(record)
	{
		if (!this.is_form_valid()) {
			return;
		}

		var lama_v	= this.form_old.getValue();
		var baru_v	= this.form_new.getValue();
		var lama	= ''
		var baru	= '';

		if (this.type == 'password') {
			lama	= MD5(lama_v, true);
			baru	= MD5(baru_v, true);
		} else {
			lama	= lama_v;
			baru	= baru_v;
		}

		Ext.Ajax.request({
				url		: this.url
			,	params  : {
						lama	: lama
					,	baru	: baru
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

					this.win.hide();
				}
			,	scope	: this
		});
	}
}

function M_Home()
{
	this.win_pass = new M_HomeWinChange(
			'Penggantian Kata Kunci'
		,	'Kata Kunci Lama'
		,	'Kata Kunci Baru'
		,	'Konfirmasi Kata Kunci Baru'
		,	'password'
		,	m_app_home_d + 'submit.php'
	);

	this.menu = new Ext.menu.Menu({
		items	:[
			{
				text	: 'Ganti Kata Kunci'
			,	iconCls	: 'password16'
			,	scope	: this
			,	handler	: function (b,e) {
					this.do_change_password()
				}
			}
		]
	});

	this.btn_my_account = new Ext.SplitButton({
			text	: 'My Account'
		,	iconCls	: 'account16'
		,	menu	: this.menu
	});

	this.panel = new Ext.Panel({
			id				: 'app_home_panel'
		,	layout			: 'card'
		,	autoScroll		: true
		,	bodyBorder		: false
		,	frame			: false
		,	tbar			: [	this.btn_my_account	]
	});

	this.do_change_password = function()
	{
		this.win_pass.win.show();
	}

	this.do_refresh = function(ha_level)
	{
		this.panel.layout.setActiveItem(0);
	}
}

m_app_home = new M_Home();

//@ sourceURL=app_home.layout.js
