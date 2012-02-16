/*!
 *  Copyright (c) 2007 - 2011, CherryOnExt Team
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the CherryOnExt Team nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL CherryOnExt Team BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Ext.namespace('Ext.ux.layout');

/**
 * @class Ext.ux.layout.RowFitLayout
 * @extends Ext.layout.ContainerLayout
 * <p>Layout that distributes heights of elements so they take 100% of the
 * container height.</p>
 * <p>Height of the child element can be given in pixels (as an integer) or
 * in percent. All elements with absolute height (i.e. in pixels) always will
 * have the given height. All "free" space (that is not filled with elements
 * with 'absolute' height) will be distributed among other elements in
 * proportion of their height percentage. Elements without 'height' in the
 * config will take equal portions of the "unallocated" height.</p>
 * <p>Supports panel collapsing, hiding, removal/addition. The adapter is provided
 * to use with Ext.SplitBar: <b>Ext.ux.layout.RowFitLayout.SplitAdapter</b>.</p>
 * <p>Example usage:</p>
 * <pre><code>
 var vp = new Ext.Viewport({
   layout: 'row-fit',
   items: [
     { xtype: 'panel', height: 100, title: 'Height in pixels', html: 'panel height = 100px' },
     { xtype: 'panel', height: "50%", title: '1/2', html: 'Will take half of remaining height' },
     { xtype: 'panel', title: 'No height 1', html: 'Panel without given height' },
     { xtype: 'panel', title: 'No height 2', html: 'Another panel' }
   ]
 });
 * </code></pre>
 * Usage of the split bar adapter:
 * <pre><code>
 var split = new Ext.SplitBar("elementToDrag", "elementToSize", Ext.SplitBar.VERTICAL, Ext.SplitBar.TOP);
 // note the Ext.SplitBar object is passed to the adapter constructor to set
 // correct minSize and maxSize:
 split.setAdapter(new Ext.ux.layout.RowFitLayout.SplitAdapter(split));
 * </code></pre>
 */

Ext.ux.layout.RowFitLayout = Ext.extend(Ext.layout.ContainerLayout, {
  // private
  monitorResize: true,

  // private
  trackChildEvents: ['collapse', 'expand', 'hide', 'show'],

  // private
  renderAll: function(ct, target) {
    Ext.ux.layout.RowFitLayout.superclass.renderAll.apply(this, arguments);
    // add event listeners on addition/removal of children
    ct.on('add', this.containerListener);
    ct.on('remove', this.containerListener);
  },

  // private
  renderItem: function(c, position, target) {
    Ext.ux.layout.RowFitLayout.superclass.renderItem.apply(this, arguments);

    // add event listeners
    for (var i=0, n = this.trackChildEvents.length; i < n; i++) {
      c.on(this.trackChildEvents[i], this.itemListener);
    }
    c.animCollapse = false; // looks ugly together with row-fit layout

    // store some layout-specific calculations
    c.rowFit = {
      hasAbsHeight: false, // whether the component has absolute height (in pixels)
      relHeight: 0, // relative height, in pixels (if applicable)
      calcRelHeight: 0, // calculated relative height (used when element is resized)
      calcAbsHeight: 0 // calculated absolute height
    };

    // process height config option
    if (c.height) {
      // store relative (given in percent) height
      if (typeof c.height == "string" && c.height.indexOf("%")) {
        c.rowFit.relHeight = parseInt(c.height);
      }
      else { // set absolute height
        c.setHeight(c.height);
        c.rowFit.hasAbsHeight = true;
      }
    }
  },

  // private
  onLayout: function(ct, target) {
    Ext.ux.layout.RowFitLayout.superclass.onLayout.call(this, ct, target);

    if (this.container.collapsed || !ct.items || !ct.items.length) { return; }

    // first loop: determine how many elements with relative height are there,
    // sums of absolute and relative heights etc.
    var absHeightSum = 0, // sum of elements' absolute heights
        relHeightSum = 0, // sum of all percent heights given in children configs
        relHeightRatio = 1, // "scale" ratio used in case sum <> 100%
        relHeightElements = [], // array of elements with 'relative' height for the second loop
        noHeightCount = 0; // number of elements with no height given

    for (var i=0, n = ct.items.length; i < n; i++) {
      var c = ct.items.itemAt(i);

      if (!c.isVisible()) { continue; }

      // collapsed panel is treated as an element with absolute height
      if (c.collapsed) { absHeightSum += c.getFrameHeight(); }
      // element that has an absolute height
      else if (c.rowFit.hasAbsHeight) {
        absHeightSum += c.height;
      }
      // 'relative-heighted'
      else {
        if (!c.rowFit.relHeight) { noHeightCount++; } // element with no height given
        else { relHeightSum += c.rowFit.relHeight; }
        relHeightElements.push(c);
      }
    }

    // if sum of relative heights <> 100% (e.g. error in config or consequence
    // of collapsing/removing panels), scale 'em so it becomes 100%
    if (noHeightCount == 0 && relHeightSum != 100) {
      relHeightRatio = 100 / relHeightSum;
    }

    var freeHeight = target.getStyleSize().height - absHeightSum, // "unallocated" height we have
        absHeightLeft = freeHeight; // track how much free space we have

    while (relHeightElements.length) {
      var c = relHeightElements.shift(), // element we're working with
          relH = c.rowFit.relHeight * relHeightRatio, // height of this element in percent
          absH = 0; // height in pixels

      // no height in config
      if (!relH) {
        relH = (100 - relHeightSum) / noHeightCount;
      }

      // last element takes all remaining space
      if (!relHeightElements.length) { absH = absHeightLeft; }
      else { absH = Math.round(freeHeight * relH / 100); }

      // anyway, height can't be negative
      if (absH < 0) { absH = 0; }

      c.rowFit.calcAbsHeight = absH;
      c.rowFit.calcRelHeight = relH;

      c.setHeight(absH);
      absHeightLeft -= absH;
    }

  },


  /**
   * Event listener for container's children
   * @private
   */
  itemListener: function(item) {
    item.ownerCt.doLayout();
  },


  /**
   * Event listener for the container (on add, remove)
   * @private
   */
  containerListener: function(ct) {
    ct.doLayout();
  }

});

// Split adapter
if (Ext.SplitBar.BasicLayoutAdapter) {

  /**
   * @param {Ext.SplitBar} splitbar to which adapter is applied.
   *   If supplied, will set correct minSize and maxSize.
   */
  Ext.ux.layout.RowFitLayout.SplitAdapter = function(splitbar) {
    if (splitbar && splitbar.el.dom.nextSibling) {
      var next = Ext.getCmp( splitbar.el.dom.nextSibling.id ),
          resized = Ext.getCmp(splitbar.resizingEl.id);

      if (next) {
        splitbar.maxSize = (resized.height || resized.rowFit.calcAbsHeight) +
                           next.getInnerHeight() - 1; // seems can't set height=0 in IE, "1" works fine
      }
      splitbar.minSize = resized.getFrameHeight() + 1;
    }
  }

  Ext.extend(Ext.ux.layout.RowFitLayout.SplitAdapter, Ext.SplitBar.BasicLayoutAdapter, {

    setElementSize: function(splitbar, newSize, onComplete) {
      var resized = Ext.getCmp(splitbar.resizingEl.id);

      // can't resize absent, collapsed or hidden panel
      if (!resized || resized.collapsed || !resized.isVisible()) return;

      // resizingEl has absolute height: just change it
      if (resized.rowFit.hasAbsHeight) {
        resized.setHeight(newSize);
      }
      // resizingEl has relative height: affects next sibling
      else {
        if (splitbar.el.dom.nextSibling) {
          var nextSibling = Ext.getCmp( splitbar.el.dom.nextSibling.id ),
              deltaAbsHeight = newSize - resized.rowFit.calcAbsHeight, // pixels
              nsRf = nextSibling.rowFit, // shortcut
              rzRf = resized.rowFit,
              // pixels in a percent
              pctPxRatio = rzRf.calcRelHeight / rzRf.calcAbsHeight,
              deltaRelHeight = pctPxRatio * deltaAbsHeight; // change in height in percent

          rzRf.relHeight = rzRf.calcRelHeight + deltaRelHeight;

          if (nsRf.hasAbsHeight) {
            var newHeight = nextSibling.height - deltaAbsHeight;
            nextSibling.height = newHeight;
            nextSibling.setHeight(newHeight);
          }
          else {
            nsRf.relHeight = nsRf.calcRelHeight - deltaRelHeight;
          }
        }
      }
      // recalculate heights
      resized.ownerCt.doLayout();
    } // of setElementSize

  }); // of SplitAdapter
}

Ext.Container.LAYOUTS['row-fit'] = Ext.ux.layout.RowFitLayout;  
Ext.apply(Ext.DataView.prototype, {
	deselect:function(node, suppressEvent){
    if(this.isSelected(node)){
			var node = this.getNode(node);
			this.selected.removeElement(node);
			if(this.last == node.viewIndex){
				this.last = false;
			}
			Ext.fly(node).removeClass(this.selectedClass);
			if(!suppressEvent){
				this.fireEvent('selectionchange', this, this.selected.elements);
			}
		}
	}
});

Ext.namespace('Ext.ux.Andrie');

/**
 * @class Ext.ux.Andrie.Select
 * @extends Ext.form.ComboBox
 * A combobox control with support for multiSelect.
 * @constructor
 * Create a new Select.
 * @param {Object} config Configuration options
 * @author Andrei Neculau - andrei.neculau@gmail.com / http://andreineculau.wordpress.com
 * @version 0.4.1
 */
Ext.ux.Andrie.Select = function(config){
	if (config.transform && typeof config.multiSelect == 'undefined'){
		var o = Ext.getDom(config.transform);
		config.multiSelect = (Ext.isIE ? o.getAttributeNode('multiple').specified : o.hasAttribute('multiple'));
	}
	config.hideTrigger2 = config.hideTrigger2||config.hideTrigger;
	Ext.ux.Andrie.Select.superclass.constructor.call(this, config);
}

Ext.extend(Ext.ux.Andrie.Select, Ext.form.ComboBox, {
	/**
	 * @cfg {Boolean} multiSelect Multiple selection is allowed (defaults to false)
	 */
	multiSelect:false,
	/**
	 * @cfg {Integer} minLength Minimum number of required items to be selected
	 */
	minLength:0,
	/**
	 * @cfg {String} minLengthText Validation message displayed when minLength is not met.
	 */
	minLengthText:'Minimum {0} items required',
	/**
	 * @cfg {Integer} maxLength Maximum number of allowed items to be selected
	 */
	maxLength:Number.MAX_VALUE,
	/**
	 * @cfg {String} maxLengthText Validation message displayed when maxLength is not met.
	 */
	maxLengthText:'Maximum {0} items allowed',
	/**
	 * @cfg {Boolean} clearTrigger Show the clear button (defaults to true)
	 */
	clearTrigger:true,
	/**
	 * @cfg {Boolean} history Add selected value to the top of the list (defaults to false)
	 */
	history:false,
	/**
	 * @cfg {Integer} historyMaxLength Number of entered values to remember. 0 means remember all (defaults to 0)
	 */
	historyMaxLength:0,
	/**
	 * @cfg {String} separator Separator to use for the values passed to setValue (defaults to comma)
	 */
	separator:',',
	/**
	 * @cfg {String} displaySeparator Separator to use for displaying the values (defaults to comma)
	 */
	displaySeparator:',',
	
	// private
	valueArray:[],
	
	// private
	rawValueArray:[],
	
	initComponent:function(){
		//from twintrigger
		this.triggerConfig = {
			tag:'span', cls:'x-form-twin-triggers', cn:[
				{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
				{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
			]
		};
		
		Ext.ux.Andrie.Select.superclass.initComponent.call(this);
		if (this.multiSelect){
			this.typeAhead = false;
			this.editable = false;
			//this.lastQuery = this.allQuery;
			this.triggerAction = 'all';
			this.selectOnFocus = false;
		}
		if (this.history){
			this.forceSelection = false;
		}
		if (this.value){
			this.setValue(this.value);
		}
	},
	
	hideTrigger1:true,
	
	getTrigger:Ext.form.TwinTriggerField.prototype.getTrigger,
	
	initTrigger:Ext.form.TwinTriggerField.prototype.initTrigger,
	
	trigger1Class:'x-form-clear-trigger',
	trigger2Class:'x-form-arrow-trigger',
	
	onTrigger2Click:function(){
		this.onTriggerClick();
	},
	
	onTrigger1Click:function(){
		this.clearValue();
	},
	
	initList:function(){
		if(!this.list){
			var cls = 'x-combo-list';

			this.list = new Ext.Layer({
				shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
			});

			var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setWidth(lw);
			this.list.swallowEvent('mousewheel');
			this.assetHeight = 0;

			if(this.title){
				this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
				this.assetHeight += this.header.getHeight();
			}

			this.innerList = this.list.createChild({cls:cls+'-inner'});
						this.innerList.on('mouseover', this.onViewOver, this);
			this.innerList.on('mousemove', this.onViewMove, this);
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'))

			if(this.pageSize){
				this.footer = this.list.createChild({cls:cls+'-ft'});
				this.pageTb = new Ext.PagingToolbar({
					store:this.store,
					pageSize: this.pageSize,
					renderTo:this.footer
				});
				this.assetHeight += this.footer.getHeight();
			}

			if(!this.tpl){
				this.tpl = '<tpl for="."><div class="'+cls+'-item">{' + this.displayField + '}</div></tpl>';
			}

			/**
			* The {@link Ext.DataView DataView} used to display the ComboBox's options.
			* @type Ext.DataView
			*/
			this.view = new Ext.DataView({
				applyTo: this.innerList,
				tpl: this.tpl,
				singleSelect: true,
								
				// ANDRIE
				multiSelect: this.multiSelect,
				simpleSelect: true,
				overClass:cls + '-cursor',
				// END
								
				selectedClass: this.selectedClass,
				itemSelector: this.itemSelector || '.' + cls + '-item'
			});

			this.view.on('click', this.onViewClick, this);
			// ANDRIE
			this.view.on('beforeClick', this.onViewBeforeClick, this);
			// END

			this.bindStore(this.store, true);
						
			// ANDRIE
			if (this.valueArray.length){
				this.selectByValue(this.valueArray);
			}
			// END

			if(this.resizable){
				this.resizer = new Ext.Resizable(this.list,  {
				   pinned:true, handles:'se'
				});
				this.resizer.on('resize', function(r, w, h){
					this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
					this.listWidth = w;
					this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
					this.restrictHeight();
				}, this);
				this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
			}
		}
	},
	
	// private
	initEvents:function(){
		Ext.form.ComboBox.superclass.initEvents.call(this);

		this.keyNav = new Ext.KeyNav(this.el, {
			"up" : function(e){
				this.inKeyMode = true;
				this.hoverPrev();
			},

			"down" : function(e){
				if(!this.isExpanded()){
					this.onTriggerClick();
				}else{
					this.inKeyMode = true;
					this.hoverNext();
				}
			},

			"enter" : function(e){
				if (this.isExpanded()){
					this.inKeyMode = true;
					var hoveredIndex = this.view.indexOf(this.view.lastItem);
					this.onViewBeforeClick(this.view, hoveredIndex, this.view.getNode(hoveredIndex), e);
					this.onViewClick(this.view, hoveredIndex, this.view.getNode(hoveredIndex), e);
				}else{
					this.onSingleBlur();
				}
				return true;
			},

			"esc" : function(e){
				this.collapse();
			},

			"tab" : function(e){
				this.collapse();
				return true;
			},
			
			"home" : function(e){
				this.hoverFirst();
				return false;
			},
			
			"end" : function(e){
				this.hoverLast();
				return false;
			},

			scope : this,

			doRelay : function(foo, bar, hname){
				if(hname == 'down' || this.scope.isExpanded()){
				   return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
				}
				// ANDRIE
				if(hname == 'enter' || this.scope.isExpanded()){
				   return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
				}
				// END
				return true;
			},

			forceKeyDown: true
		});
		this.queryDelay = Math.max(this.queryDelay || 10,
				this.mode == 'local' ? 10 : 250);
		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
		if(this.typeAhead){
			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
		}
		if(this.editable !== false){
			this.el.on("keyup", this.onKeyUp, this);
		}
		// ANDRIE
		if(!this.multiSelect){
			if(this.forceSelection){
				this.on('blur', this.doForce, this);
			}
			this.on('focus', this.onSingleFocus, this);
			this.on('blur', this.onSingleBlur, this);
		}
		this.on('change', this.onChange, this);
		// END
	},

	// ability to delete value with keyboard
	doForce:function(){
		if(this.el.dom.value.length > 0){
			if (this.el.dom.value == this.emptyText){
				this.clearValue();
			}
			else if (!this.multiSelect){
				this.el.dom.value =
					this.lastSelectionText === undefined?'':this.lastSelectionText;
				this.applyEmptyText();
			}
		}
	},
	
	
	/* listeners */
	// private
	onLoad:function(){
		if(!this.hasFocus){
			return;
		}
		if(this.store.getCount() > 0){
			this.expand();
			this.restrictHeight();
			if(this.lastQuery == this.allQuery){
				if(this.editable){
					this.el.dom.select();
				}
				// ANDRIE
				this.selectByValue(this.value, true);
				/*if(!this.selectByValue(this.value, true)){
					this.select(0, true);
				}*/
				// END
			}else{
				this.selectNext();
				if(this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE){
					this.taTask.delay(this.typeAheadDelay);
				}
			}
		}else{
			this.collapse();
		}
		//this.el.focus();
	},

	// private
	onSelect:function(record, index){
		if(this.fireEvent('beforeselect', this, record, index) !== false){
			this.addValue(record.data[this.valueField || this.displayField]);
			this.fireEvent('select', this, record, index);
			if (!this.multiSelect){
				this.collapse();
			}
		}
	},
	
	// private
	onSingleFocus:function(){
		this.oldValue = this.getRawValue();
	},
	
	// private
	onSingleBlur:function(){
		var r = this.findRecord(this.displayField, this.getRawValue());
		if (r){
			this.select(this.store.indexOf(r));
			//return;
		}
		if (String(this.oldValue) != String(this.getRawValue())){
			this.setValue(this.getRawValue());
			this.fireEvent('change', this, this.oldValue, this.getRawValue());
		}
		this.oldValue = String(this.getRawValue());
	},
	
	// private
	onChange:function(){
		if (!this.clearTrigger){
			return;
		}
		if (this.getValue() != ''){
			this.triggers[0].show();
		}else{
			this.triggers[0].hide();
		}
	},



	/* list/view functions AND listeners */
	collapse:function(){
		this.hoverOut();
		Ext.ux.Andrie.Select.superclass.collapse.call(this);
	},

	expand:function(){
		Ext.ux.Andrie.Select.superclass.expand.call(this);
		//this.hoverFirst();
	},
	
	// private
	onViewOver:function(e, t){
		if(this.inKeyMode){ // prevent key nav and mouse over conflicts
			return;
		}
		// ANDRIE
		/*var item = this.view.findItemFromChild(t);
		if(item){
			var index = this.view.indexOf(item);
			this.select(index, false);
		}*/
		// END
	},
	
	// private
	onViewBeforeClick:function(vw, index, node, e){
		this.preClickSelections = this.view.getSelectedIndexes();
	},
	
	// private
	onViewClick:function(vw, index, node, e){
		if (typeof index != 'undefined'){
			var arrayIndex = this.preClickSelections.indexOf(index);
			if (arrayIndex != -1 && this.multiSelect){
				this.removeValue(this.store.getAt(index).data[this.valueField || this.displayField]);
				if (this.inKeyMode){
					this.view.deselect(index, true);
				}
				this.hover(index, true);
			}else{
				var r = this.store.getAt(index);
				if (r){
					if (this.inKeyMode){
						this.view.select(index, true);
					}
					this.onSelect(r, index);
					this.hover(index, true);
				}
			}
		}
			
		// from the old doFocus argument; don't really know its use
		if(vw !== false){
			this.el.focus();
		}
	},

	
	
	/* value functions */
	/**
	 * Add a value if this is a multi select
	 * @param {String} value The value to match
	 */
	addValue:function(v){
		if (!this.multiSelect){
			this.setValue(v);
			return;
		}
		if (v instanceof Array){
			v = v[0];
		}
		v = String(v);
		if (this.valueArray.indexOf(v) == -1){
			var text = v;
			var r = this.findRecord(this.valueField || displayField, v);
			if(r){
				text = r.data[this.displayField];
				if (this.view){
					this.select(this.store.indexOf(r));
				}
			}else if(this.forceSelection){
				return;
			}
			var result = Ext.apply([], this.valueArray);
			result.push(v);
			var resultRaw = Ext.apply([], this.rawValueArray);
			resultRaw.push(text);
			v = result.join(this.separator || ',');
			text = resultRaw.join(this.displaySeparator || this.separator || ',');
			this.commonChangeValue(v, text, result, resultRaw);
		}
	},
	
	/**
	 * Remove a value
	 * @param {String} value The value to match
	 */
	removeValue:function(v){
		if (v instanceof Array){
			v = v[0];
		}
		v = String(v);
		if (this.valueArray.indexOf(v) != -1){
			var text = v;
			var r = this.findRecord(this.valueField || displayField, v);
			if(r){
				text = r.data[this.displayField];
				if (this.view){
					this.deselect(this.store.indexOf(r));
				}
			}else if(this.forceSelection){
				return;
			}
			var result = Ext.apply([], this.valueArray);
			result.remove(v);
			var resultRaw = Ext.apply([], this.rawValueArray);
			resultRaw.remove(text);
			v = result.join(this.separator || ',');
			text = resultRaw.join(this.displaySeparator || this.separator || ',');
			this.commonChangeValue(v, text, result, resultRaw);
		}
	},
	
	/**
	 * Sets the specified value for the field. The value can be an Array or a String (optionally with separating commas)
	 * If the value finds a match, the corresponding record text will be displayed in the field.
	 * @param {Mixed} value The value to match
	 */
	setValue:function(v){
		var result = [],
				resultRaw = [];
		if (v!==null){
    		if (!(v instanceof Array)){
    			if (this.separator && this.separator !== true){
    				v = v.split(String(this.separator));
    			}else{
    				v = [v];
    			}
    		}
    		else if (!this.multiSelect){
    			v = v.slice(0,1);
    		}

    		for (var i=0, len=v.length; i<len; i++){
    			var value = v[i];
    			var text = null;
    			if(this.valueField){
    				var r = this.findRecord(this.valueField || this.displayField, value);
    				if(r){
    					text = r.data[this.displayField];
    				}else if(this.forceSelection){
    					continue;
    				} else {
    				  var r = this.findRecord(this.displayField, value);
    				  text=value;
    				  if(r){
    				    value=r.data[this.valueField];
    				  }
    				}
    			}
    			result.push(value);
    			resultRaw.push(text);
    		}
    }
		v = result.join(this.separator || ',');
		text = resultRaw.join(this.displaySeparator || this.separator || ',');
		
		this.commonChangeValue(v, text, result, resultRaw);
		
		if (this.history && !this.multiSelect && this.mode == 'local'){
			this.addHistory(this.valueField?this.getValue():this.getRawValue());
		}
		if (this.view){
			this.view.clearSelections();
			this.selectByValue(this.valueArray);
		}
	},
	
	// private
	commonChangeValue:function(v, text, result, resultRaw){
		this.lastSelectionText = text;
		this.valueArray = result;
		this.rawValueArray = resultRaw;
		if(this.hiddenField){
			this.hiddenField.value = v;
		}
		Ext.form.ComboBox.superclass.setValue.call(this, text);
		this.value = v;
		
		if (this.oldValueArray != this.valueArray){
			this.fireEvent('change', this, this.oldValueArray, this.valueArray);
		}
		this.oldValueArray = Ext.apply([], this.valueArray);
	},

	validateValue:function(value){
		if(!Ext.ux.Andrie.Select.superclass.validateValue.call(this, value)){
			return false;
		}
		if (this.valueArray.length < this.minLength){
			this.markInvalid(String.format(this.minLengthText, this.minLength));
			return false;
		}
		if (this.valueArray.length > this.maxLength){
			this.markInvalid(String.format(this.maxLengthText, this.maxLength));
			return false;
		}
		return true;
	},
	
	clearValue:function(){
		this.commonChangeValue('', '', [], []);
		if (this.view){
			this.view.clearSelections();
		}
		Ext.ux.Andrie.Select.superclass.clearValue.call(this);
	},
	
	reset:function(){
		if (this.view){
			this.view.clearSelections();
		}
		Ext.ux.Andrie.Select.superclass.reset.call(this);
	},

	getValue : function(asArray){
		if (asArray){
			return typeof this.valueArray != 'undefined' ? this.valueArray : [];
		}
		return Ext.ux.Andrie.Select.superclass.getValue.call(this);
	},
	
	getRawValue:function(asArray){
		if (asArray){
			return typeof this.rawValueArray != 'undefined' ? this.rawValueArray : [];
		}
		return Ext.ux.Andrie.Select.superclass.getRawValue.call(this);
	},
	
	
	
	/* selection functions */
	select:function(index, scrollIntoView){
		this.selectedIndex = index;
		if (!this.view){
			return;
		}
		this.view.select(index, this.multiSelect);
		if(scrollIntoView !== false){
			var el = this.view.getNode(index);
			if(el){
				this.innerList.scrollChildIntoView(el, false);
			}
		}
	},
	
	deselect:function(index, scrollIntoView){
		this.selectedIndex = index;
		this.view.deselect(index, this.multiSelect);
		if(scrollIntoView !== false){
			var el = this.view.getNode(index);
			if(el){
				this.innerList.scrollChildIntoView(el, false);
			}
		}
	},
	
	selectByValue:function(v, scrollIntoView){
		this.hoverOut();
		if(v !== undefined && v !== null){
			if (!(v instanceof Array)){
				v = [v];
			}
			var result = [];
			for (var i=0, len=v.length; i<len; i++){
				var value = v[i];
				var r = this.findRecord(this.valueField || this.displayField, value);
				if(r){
					this.select(this.store.indexOf(r), scrollIntoView);
					result.push(value);
				}
			}
			return result.join(',');
		}
		return false;
	},
	
	// private
	selectFirst:function(){
		var ct = this.store.getCount();
		if(ct > 0){
			this.select(0);
		}
	},
	
	// private
	selectLast:function(){
		var ct = this.store.getCount();
		if(ct > 0){
			this.select(ct);
		}
	},
	
	
	
	/* hover functions */
	/**
	* Hover an item in the dropdown list by its numeric index in the list.
	* @param {Number} index The zero-based index of the list item to select
	* @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
	* hovered item if it is not currently in view (defaults to true)
	*/
	hover:function(index, scrollIntoView){
		if (!this.view){
			return;
		}
		this.hoverOut();
		var node = this.view.getNode(index);
		this.view.lastItem = node;
		Ext.fly(node).addClass(this.view.overClass);
		if(scrollIntoView !== false){
			var el = this.view.getNode(index);
			if(el){
				this.innerList.scrollChildIntoView(el, false);
			}
		}
	},
	
	hoverOut:function(){
		if (!this.view){
			return;
		}
		if (this.view.lastItem){
			Ext.fly(this.view.lastItem).removeClass(this.view.overClass);
			delete this.view.lastItem;
		}
	},

	// private
	hoverNext:function(){
		if (!this.view){
			return;
		}
		var ct = this.store.getCount();
		if(ct > 0){
			if(!this.view.lastItem){
				this.hover(0);
			}else{
				var hoveredIndex = this.view.indexOf(this.view.lastItem);
				if(hoveredIndex < ct-1){
					this.hover(hoveredIndex+1);
				}
			}
		}
	},

	// private
	hoverPrev:function(){
		if (!this.view){
			return;
		}
		var ct = this.store.getCount();
		if(ct > 0){
			if(!this.view.lastItem){
				this.hover(0);
			}else{
				var hoveredIndex = this.view.indexOf(this.view.lastItem);
				if(hoveredIndex != 0){
					this.hover(hoveredIndex-1);
				}
			}
		}
	},
	
	// private
	hoverFirst:function(){
		var ct = this.store.getCount();
		if(ct > 0){
			this.hover(0);
		}
	},
	
	// private
	hoverLast:function(){
		var ct = this.store.getCount();
		if(ct > 0){
			this.hover(ct);
		}
	},
	
	
	
	/* history functions */
	
	addHistory:function(value){
		if (!value.length){
			return;
		}
		var r = this.findRecord(this.valueField || this.displayField, value);
		if (r){
			this.store.remove(r);
		}else{
			//var o = this.store.reader.readRecords([[value]]);
			//r = o.records[0];
			var o = {};
			if (this.valueField){
				o[this.valueField] = value;
			}
			o[this.displayField] = value;
			r = new this.store.reader.recordType(o);
		}
		this.store.clearFilter();
		this.store.insert(0, r);
		this.pruneHistory();
	},
	
	// private
	pruneHistory:function(){
		if (this.historyMaxLength == 0){
			return;
		}
		if (this.store.getCount()>this.historyMaxLength){
			var overflow = this.store.getRange(this.historyMaxLength, this.store.getCount());
			for (var i=0, len=overflow.length; i<len; i++){
				this.store.remove(overflow[i]);
			}
		}
	}
});
Ext.reg('select', Ext.ux.Andrie.Select);/**
 * Ext.ux.form.DateTime Extension Class for Ext 2.x Library
 *
 * @author    Ing. Jozef Sakalos
 * @copyright (c) 2008, Ing. Jozef Sakalos
 * @version $Id: Ext.ux.form.DateTime.js 11 2008-02-22 17:13:52Z jozo $
 *
 * @license Ext.ux.form.DateTime is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.DateTime
 * @extends Ext.form.Field
 */
Ext.ux.form.DateTime = Ext.extend(Ext.form.Field, {
    /**
     * @cfg {String/Object} defaultAutoCreate DomHelper element spec
     * Let superclass to create hidden field instead of textbox. Hidden will be submittend to server
     */
     defaultAutoCreate:{tag:'input', type:'hidden'}
    /**
     * @cfg {Number} timeWidth Width of time field in pixels (defaults to 100)
     */
    ,timeWidth:100
    /**
     * @cfg {String} dtSeparator Date - Time separator. Used to split date and time (defaults to ' ' (space))
     */
    ,dtSeparator:' '
    /**
     * @cfg {String} hiddenFormat Format of datetime used to store value in hidden field
     * and submitted to server (defaults to 'Y-m-d H:i:s' that is mysql format)
     */
    ,hiddenFormat:'Y-m-d H:i:s'
    /**
     * @cfg {Boolean} otherToNow Set other field to now() if not explicly filled in (defaults to true)
     */
    ,otherToNow:true
    /**
     * @cfg {Boolean} emptyToNow Set field value to now if on attempt to set empty value.
     * If it is true then setValue() sets value of field to current date and time (defaults to false)
    /**
     * @cfg {String} timePosition Where the time field should be rendered. 'right' is suitable for forms
     * and 'bellow' is suitable if the field is used as the grid editor (defaults to 'right')
     */
    ,timePosition:'right' // valid values:'bellow', 'right'
    /**
     * @cfg {String} dateFormat Format of DateField. Can be localized. (defaults to 'm/y/d')
     */
    ,dateFormat:'m/d/y'
    /**
     * @cfg {String} timeFormat Format of TimeField. Can be localized. (defaults to 'g:i A')
     */
    ,timeFormat:'g:i A'
    /**
     * @cfg {Object} dateConfig Config for DateField constructor.
     */
    /**
     * @cfg {Object} timeConfig Config for TimeField constructor.
     */

    // {{{
    /**
     * private
     * creates DateField and TimeField and installs the necessary event handlers
     */
    ,initComponent:function() {
        // call parent initComponent
        Ext.ux.form.DateTime.superclass.initComponent.call(this);
        this.validationTask = new Ext.util.DelayedTask(this.validate, this);
        // create DateField
        var dateConfig = Ext.apply({}, {
             id:this.id + '-date'
            ,format:this.dateFormat || Ext.form.DateField.prototype.format
            ,width:this.timeWidth
            ,selectOnFocus:this.selectOnFocus
            ,validationEvent: false
            ,listeners:{
                  blur:{scope:this, fn:this.onBlur}
                 ,focus:{scope:this, fn:this.onFocus}
            }
        }, this.dateConfig);
        this.df = new Ext.form.DateField(dateConfig);
        delete(this.dateFormat);

        // create TimeField
        var timeConfig = Ext.apply({}, {
             id:this.id + '-time'
            ,format:this.timeFormat || Ext.form.TimeField.prototype.format
            ,width:this.timeWidth
            ,selectOnFocus:this.selectOnFocus
            ,validationEvent: false
            ,listeners:{
                  blur:{scope:this, fn:this.onBlur}
                 ,focus:{scope:this, fn:this.onFocus}
            }
        }, this.timeConfig);
        this.tf = new Ext.form.TimeField(timeConfig);
        delete(this.timeFormat);

        // relay events
        this.relayEvents(this.df, ['focus', 'specialkey', 'invalid', 'valid']);
        this.relayEvents(this.tf, ['focus', 'specialkey', 'invalid', 'valid']);

    } // eo function initComponent
    // }}}
    // {{{
    /** private 
      * It buffers the validation events
      */
    ,filterValidation: function(e){
        if(!e.isNavKeyPress()){
            this.validationTask.delay(this.validationDelay);
        }
    }

    ,destroy: function(){
      if(this.df.rendered){
        this.df.destroy();
      }
      if(this.tf.rendered){
        this.tf.destroy();
      }
      Ext.ux.form.DateTime.superclass.destroy.call(this);
    }
    /**
     * private
     * Renders underlying DateField and TimeField and provides a workaround for side error icon bug
     */
    ,onRender:function(ct, position) {
        // don't run more than once
        if(this.isRendered) {
            return;
        }

        // render underlying hidden field
        Ext.ux.form.DateTime.superclass.onRender.call(this, ct, position);

        // render DateField and TimeField
        // create bounding table
        var t;
        if('bellow' === this.timePosition) {
            t = Ext.DomHelper.append(ct, {tag:'table',style:'border-collapse:collapse',children:[
                 {tag:'tr',children:[{tag:'td', style:'padding-bottom:1px', cls:'ux-datetime-date'}]}
                ,{tag:'tr',children:[{tag:'td', cls:'ux-datetime-time'}]}
            ]}, true);
        }
        else {
            t = Ext.DomHelper.append(ct, {tag:'table',style:'border-collapse:collapse',children:[
                {tag:'tr',children:[
                    {tag:'td',style:'padding-right:4px', cls:'ux-datetime-date'},{tag:'td', cls:'ux-datetime-time'}
                ]}
            ]}, true);
        }

        this.tableEl = t;
        this.wrap = t.wrap({cls:'x-form-field-wrap'});
        this.wrap.on("mousedown", this.onMouseDown, this, {delay:10});

        // render DateField & TimeField
        this.df.render(t.child('td.ux-datetime-date'));
        this.tf.render(t.child('td.ux-datetime-time'));
        this.df.getEl().on("keyup",this.filterValidation,this);
        this.tf.getEl().on("keyup",this.filterValidation,this);

        // workaround for IE trigger misalignment bug
        if(Ext.isIE && Ext.isStrict) {
            t.select('input').applyStyles({top:0});
        }

        this.on('specialkey', this.onSpecialKey, this);
        this.df.el.swallowEvent(['keydown', 'keypress']);
        this.tf.el.swallowEvent(['keydown', 'keypress']);

        // create icon for side invalid errorIcon
        if('side' === this.msgTarget) {
            var elp = this.el.findParent('.x-form-element', 10, true);
            this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});

            this.df.errorIcon = this.errorIcon;
            this.tf.errorIcon = this.errorIcon;
        }

        // we're rendered flag
        this.isRendered = true;
        this.validate();
    } // eo function onRender
    // }}}
    // {{{
    /**
     * private
     */
    ,adjustSize:Ext.BoxComponent.prototype.adjustSize
    // }}}
    // {{{
    /**
     * private
     */
    ,alignErrorIcon:function() {
        this.errorIcon.alignTo(this.tableEl, 'tl-tr', [2, 0]);
    }
    // }}}
    // {{{
    /**
     * private initializes internal dateValue
     */
    ,initDateValue:function() {
        this.dateValue = this.otherToNow ? new Date() : new Date(1970, 0, 1, 0, 0, 0);
    }
    /**
     * private initializes internal timeValue
     */
    ,initTimeValue:function() {
        this.timeValue = this.otherToNow ? new Date() : new Date(1970, 0, 1, 0, 0, 0);
    }
    // }}}
    // {{{
    /**
     * Disable this component.
     * @return {Ext.Component} this
     */
    ,disable:function() {
        if(this.isRendered) {
            this.df.disabled = this.disabled;
            this.df.onDisable();
            this.tf.onDisable();
        }
        this.disabled = true;
        this.df.disabled = true;
        this.tf.disabled = true;
        this.fireEvent("disable", this);
        return this;
    } // eo function disable
    // }}}
    // {{{
    /**
     * Enable this component.
     * @return {Ext.Component} this
     */
    ,enable:function() {
        if(this.rendered){
            this.df.onEnable();
            this.tf.onEnable();
        }
        this.disabled = false;
        this.df.disabled = false;
        this.tf.disabled = false;
        this.fireEvent("enable", this);
        return this;
    } // eo function enable
    // }}}
    // {{{
    /**
     * private Focus date filed
     */
    ,focus:function() {
        this.df.focus();
    } // eo function focus
    // }}}
    // {{{
    /**
     * private
     */
    ,getPositionEl:function() {
        return this.wrap;
    }
    // }}}
    // {{{
    /**
     * private
     */
    ,getResizeEl:function() {
        return this.wrap;
    }
    // }}}
    // {{{
    /**
     * @return {Date/String} Returns value of this field
     */
    ,getValue:function() {
      return(this.getDateTime());
    } // eo function getValue
    // }}}
    // {{{
    /**
     * @return {Boolean} true = valid, false = invalid
     * private Calls isValid methods of underlying DateField and TimeField and returns the result
     */
    ,isValid:function() {
        return this.df.isValid() && this.tf.isValid();
    } // eo function isValid
    // }}}
    // {{{
    /**
     * Returns true if this component is visible
     * @return {boolean} 
     */
    ,isVisible : function(){
        return this.df.rendered && this.df.getActionEl().isVisible();
    } // eo function isVisible
    // }}}
    // {{{
    /** 
     * private Handles blur event
     */
    ,onBlur:function(f) {
        // called by both DateField and TimeField blur events

        // revert focus to previous field if clicked in between
        if(this.wrapClick) {
            f.focus();
            this.wrapClick = false;
        }

        // update underlying value
        if(f === this.df) {
            this.updateDate();
        }
        else {
            this.updateTime();
        }
        this.updateHidden();

        // fire events later
        (function() {
            if(!this.df.hasFocus && !this.tf.hasFocus) {
                var v = this.getValue();
                if(String(v) !== String(this.startValue)) {
                    this.fireEvent("change", this, v, this.startValue);
                }
                this.hasFocus = false;
                this.fireEvent('blur', this);
            }
        }).defer(100, this);

    } // eo function onBlur
    // }}}
    // {{{
    /**
     * private Handles focus event
     */
    ,onFocus:function() {
        if(!this.hasFocus){
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this);
        }
    }
    // }}}
    // {{{
    /**
     * private Just to prevent blur event when clicked in the middle of fields
     */
    ,onMouseDown:function(e) {
        this.wrapClick = 'td' === e.target.nodeName.toLowerCase();
    }
    // }}}
    // {{{
    /**
     * private
     * Handles Tab and Shift-Tab events
     */
    ,onSpecialKey:function(t, e) {
        var key = e.getKey();
        if(key == e.TAB) {
            if(t === this.df && !e.shiftKey) {
                e.stopEvent();
                this.tf.focus();
            }
            if(t === this.tf && e.shiftKey) {
                e.stopEvent();
                this.df.focus();
            }
        }
        // otherwise it misbehaves in editor grid
        if(key == e.ENTER) {
            this.updateValue();
        }

    } // eo function onSpecialKey
    // }}}
    // {{{
    /**
     * private Sets the value of DateField
     */
    ,setDate:function(date) {
        this.df.setValue(date);
    } // eo function setDate
    // }}}
    // {{{
    /** 
     * private Sets the value of TimeField
     */
    ,setTime:function(date) {
        this.tf.setValue(date);
    } // eo function setTime
    // }}}
    // {{{
    /**
     * private
     * Sets correct sizes of underlying DateField and TimeField
     * With workarounds for IE bugs
     */
    ,setSize:function(w, h) {
        if(!w) {
            return;
        }
        if('bellow' == this.timePosition) {
            this.df.setSize(w, h);
            this.tf.setSize(w, h);
            if(Ext.isIE) {
                this.df.el.up('td').setWidth(w);
                this.tf.el.up('td').setWidth(w);
            }
        }
        else {
            this.df.setSize(w - this.timeWidth - 4, h);
            this.tf.setSize(this.timeWidth, h);

            if(Ext.isIE) {
                this.df.el.up('td').setWidth(w - this.timeWidth - 4);
                this.tf.el.up('td').setWidth(this.timeWidth);
            }
        }
    } // eo function setSize
    // }}}
    // {{{
    /**
     * @param {Mixed} val Value to set
     * Sets the value of this field
     */
    ,setValue:function(val) {
        if(!val && true === this.emptyToNow) {
            this.setValue(new Date());
            return;
        }
        else if(!val) {
            this.setDate('');
            this.setTime('');
            this.updateValue();
            if(this.rendered){
              this.validate()
            } 
            return;
        }
        val = val ? val : new Date(1970, 0 ,1, 0, 0, 0);
        var da, time;
        if(val instanceof Date) {
            this.setDate(val);
            this.setTime(val);
            this.dateValue=new Date(val);
            this.timeValue=new Date(val);
        }
        else {
            da = val.split(this.dtSeparator);
            this.setDate(da[0]);
            if(da[1]) {
                this.setTime(da[1]);
            }
        }
        this.updateValue();
        if(this.rendered){
          this.validate()
        }

    } // eo function setValue
    // }}}
    // {{{
    /**
     * Hide or show this component by boolean
     * @return {Ext.Component} this
     */
    ,setVisible: function(visible){
        if(visible) {
            this.df.show();
            this.tf.show();
        }else{
            this.df.hide();
            this.tf.hide();
        }
        return this;
    } // eo function setVisible
    // }}}
    //{{{
    ,show:function() {
        return this.setVisible(true);
    } // eo function show
    //}}}
    //{{{
    ,hide:function() {
        return this.setVisible(false);
    } // eo function hide
    //}}}
    // {{{
    /**
     * private Updates the date part
     */
    ,updateDate:function() {

        var d = this.df.getValue();
        if(d) {
            if(!(this.dateValue instanceof Date)) {
                this.initDateValue();
            }
            this.dateValue.setMonth(0); // because of leap years
            this.dateValue.setFullYear(d.getFullYear());
            this.dateValue.setMonth(d.getMonth());
            this.dateValue.setDate(d.getDate());
        }
        else {
            this.dateValue = '';
        }
    } // eo function updateDate
    // }}}
    // {{{
    /**
     * private
     * Updates the time part
     */
    ,updateTime:function() {
        var t = this.tf.getValue();
        if(t){
          if (!(t instanceof Date)) {
            t = Date.parseDate(t, this.tf.format);
          }
          if(!(this.timeValue instanceof Date)) {
            this.initTimeValue();
          }
          this.timeValue.setHours(t.getHours());
          this.timeValue.setMinutes(t.getMinutes());
          this.timeValue.setSeconds(t.getSeconds());
        } else {
          this.timeValue='';
        }
    } // eo function updateTime
    // }}}
    // {{{
    ,getDateTime: function(){
      if(this.dateValue instanceof Date && this.timeValue instanceof Date){
        var dt=new Date();
        dt.setHours(this.timeValue.getHours());
        dt.setMinutes(this.timeValue.getMinutes());
        dt.setSeconds(this.timeValue.getSeconds());
        dt.setMonth(0); // because of leap years
        dt.setFullYear(this.dateValue.getFullYear());
        dt.setMonth(this.dateValue.getMonth());
        dt.setDate(this.dateValue.getDate());
        return(dt);
      } else if(this.dateValue instanceof Date){
        return(new Date(this.dateValue));
      }
      return("");
     
    }
    /**
     * private Updates the underlying hidden field value
     */
    ,updateHidden:function() {
        if(this.isRendered) {
          var value="";
          var dt=this.getDateTime();
          if(dt instanceof Date){
            value=dt.format(this.hiddenFormat);
          }
          this.el.dom.value = value;
        }
    }
    // }}}
    // {{{
    /**
     * private Updates all of Date, Time and Hidden
     */
    ,updateValue:function() {

        this.updateDate();
        this.updateTime();
        this.updateHidden();

        return;
    } // eo function updateValue
    // }}}
    // {{{
    /**
     * @return {Boolean} true = valid, false = invalid
     * callse validate methods of DateField and TimeField
     */
    ,validate:function() {
      var tValid=this.tf.validate();
      var dValid=this.df.validate();
      if(dValid){
        this.df.clearInvalid();
      }
      if(tValid){
        this.tf.clearInvalid();
      }
      if(dValid && tValid){
         this.updateValue();
         return(this.validateValue(this.getValue()));
       }
       return(false);
    } // eo function validate
    // }}}
    // {{{
    ,markInvalid: function(msg){
      this.df.markInvalid(msg);
      this.tf.markInvalid(msg);
     }
     ,clearInvalid: function(){
       this.df.clearInvalid();
       this.tf.clearInvalid();
     }

    /**
     * Returns renderer suitable to render this field
     * @param {Object} Column model config
     */
    ,renderer: function(field) {
        var format = field.editor.dateFormat || Ext.ux.form.DateTime.prototype.dateFormat;
        format += ' ' + (field.editor.timeFormat || Ext.ux.form.DateTime.prototype.timeFormat);
        var renderer = function(val) {
            var retval = Ext.util.Format.date(val, format);
            return retval;
        };
        return renderer;
    } // eo function renderer
    // }}}

}); // eo extend

// register xtype
Ext.reg('xdatetime', Ext.ux.form.DateTime);
