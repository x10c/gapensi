/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

Ext.BLANK_IMAGE_URL = _g_root +'/extjs/resources/images/default/s.gif'

var main_hdr;
var main_content;
var main_msg;
var main_menu;
var main_ftr;
var menus;
var main_user;
var menu_access_level;
var main_load;
var _g_ha;

function do_logout()
{
	Ext.Ajax.request({
			url		: _g_root + 'module/logout/index.php'
		,	waitMsg	: 'Logging out ...'
		,	failure	: function(form, action) {
				Ext.MessageBox.alert('Kesalahan', action.result.errorInfo);
			}
		,	success	: function(response) {
				var res = Ext.util.JSON.decode(response.responseText);

				if (res.success == false) {
					Ext.MessageBox.alert('Kesalahan', res.info);
					return;
				}

				window.location = _g_root +'index.php';
			}
	});
}

function get_layout(n)
{
	main_load.show();

	var c = main_content.findById(n.id+"_panel");

	if (c != undefined) {
		var m = eval("m_"+ n.id);

		m.do_refresh(_g_ha);

		main_content.layout.setActiveItem(n.id+"_panel");
		main_load.hide();
		return;
	}

	Ext.Ajax.request({
			url		: _g_root + "module/"+ n.id +"/layout.js"
		,	failure	: function(r) {
				Ext.Msg.alert('Error', r.responseText);
				main_load.hide();
			}
		,	success	: function(r) {
				try {
					window.execScript
						? window.execScript(r.responseText)
						: window.eval(r.responseText);
				} catch (e) {
					console.log(e.stack);
				}

				var m =	eval("m_"+ n.id);

				m.do_refresh(_g_ha);

				main_content.add(m.panel);
				main_content.layout.setActiveItem(m.panel);
				main_content.doLayout();

				main_load.hide();
			}
	});
}

function menu_item_on_click(node)
{
	var n = node.attributes;
	var selnode = main_menu.selModel.selNode || {};

	/* check if user click the same menu in the tree */
	if (typeof n.leaf == 'undefined' || n.id == selnode.id) {
		return;
	}

	Ext.Ajax.request({
			url		: _g_root +'module/main/get_menu_access.php'
		,	params	: {
				menu : n.menu_id
			}
		,	failure	: function(r) {
				Ext.MessageBox.alert('Error', r.responseText);
			}
		,	success	: function(r) {
				var v = Ext.util.JSON.decode(r.responseText);

				if (v.success == false) {
					do_logout();
					return;
				}

				_g_ha = parseInt(v.info);

				if (_g_ha == 0) {
					Ext.Msg.alert('Informasi', 'Maaf, Anda tidak punya hak akses untuk menu ini!');
					return;
				}

				get_layout(n);
			}
	});
}

Ext.onReady(
function(){
	main_msg	= document.getElementById('msg');
	main_user	= document.getElementById('user');

	main_menu	= new Ext.tree.TreePanel({
			title			: 'Menu'
		,	region			: 'west'
		,	width			: 240
		,	minSize			: 220
		,	maxSize			: 500
		,	singleExpand	: false
		,	split			: true
		,	autoScroll		: true
		,	collapsible		: true
		,	useArrows		: true
		,	animate			: true
		,	animCollapse	: true
		,	lines			: false
		,	rootVisible		: false
		,	margins			: '5 0 5 5'
		,	cmargins		: '0 0 0 0'
		,	root			: new Ext.tree.AsyncTreeNode()
		,	loader			: new Ext.tree.TreeLoader({
					dataUrl		: _g_root + 'module/main/menu.php'
				,	listeners	: {
						load	: function(This, node, response) {
							var res = Ext.util.JSON.decode(response.responseText);

							if (res.success == false) {
								Ext.MessageBox.alert('Kesalahan', res.errorInfo);
								this.do_logout();
								return;
							}
						}
					}
			})
		,	listeners		: {
				click	: function(node) {
					menu_item_on_click(node);
				}
			}
	});

	main_content = new Ext.Panel({
		id			: 'doc-body'
	,	region		: 'center'
	,	layout		: 'card'
	,	margins		: '5 5 5 0'
	,	bodyBorder	: false
	,	activeItem	: 0
	,	items		: [
			m_app_home.panel
		]
	});

	main_hdr = {
		region		: 'north'
	,	autoHeight	: true
	,	xtype		: 'box'
	,	el		: 'header'
	,	border		: false
	,	margins		: '0 5 5 5'
	};

	main_ftr = {
		region		: 'south'
	,	autoHeight	: true
	,	xtype		: 'box'
	,	el		: 'footer'
	};

	main_viewport = new Ext.Viewport({
		layout		: 'border'
	,	items		: [
			main_hdr
		,	main_menu
		,	main_content
		,	main_ftr
		]
	});

	main_load = new Ext.LoadMask(main_content.getEl(), {
			msg	:'Mohon tunggu ...'
		});

	main_viewport.doLayout();

	setTimeout(function(){
		Ext.get('loading').remove();
		Ext.get('loading-mask').fadeOut({remove:true});
	}, 250);

	var node = {
		attributes	:{
			menu_id	:'01.01'
		,	id		:'app_home'
		,	leaf	:true
		}
	};

	menu_item_on_click(node);
});

//@ sourceURL=main.layout.js
