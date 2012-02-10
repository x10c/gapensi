/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

$(document).ready(function() {
	$('.image-display').cycle({
		fx:     'growX',
		pager: 	'.image-list',
		
		pagerAnchorBuilder: function(idx, slide) {
			
		return '<img src="images/gallery/' + (idx+1) + '.png" width=50 height=50/>'; 
		}
	});
	
	$(".right p a").hover(function(){
		$(this).stop().animate(
		{paddingLeft:"10", paddingRight:"10"}, {duration:'700', easing: 'easeInSine'});
	 return true;
	}, function(){
		$(this).stop().animate({paddingLeft:"0", paddingRight:"0"}, {duration:'700', easing: 'easeOutSine'});
	});
	
	$('.horizontal_scroller').SetScroller({	velocity: 	 60,
									direction: 	 'horizontal',
									startfrom: 	 'right',
									loop:		 'infinite',
									movetype: 	 'linear',
									onstartup: 	 'play',
									cursor: 	 'pointer'
	});

});

function call_do_login()
{
	var pass	= MD5(document.login_form.password.value, true);

	Ext.Ajax.request({
			url		: _g_root + 'module/login/submit.php'
		,	params	: {
				user	: document.login_form.user.value
			,	pass	: pass
			}
		,	waitMsg	: 'Pemuatan ...'
		,	failure	: function(form, action) {
				Ext.MessageBox.alert('Kesalahan', action.result.errorInfo);
			}
		,	success	: function(response) {
				var msg = Ext.util.JSON.decode(response.responseText);

				if (msg.success == false) {
					Ext.MessageBox.alert('Kesalahan', msg.errorInfo);
				} else {
					window.location = _g_root + 'module/main/index.php';
				}
			}
	});
}

function form_pass_on_keydown(e)
{
	var keycode;

	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	if (keycode != 13) {
		return;
	}

	call_do_login();
}

