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
// $Id: RangeField.js 227 2010-03-25 09:51:29Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** Create a new RangeField
  * A range field is a widget used to edit ranges. It's a trigger field that has in the popup 2 Ext.form.TextField (or classes derived by a TextField)
  * to allow the user to enter the from and the to end points of a range 
  * @extends Ext.form.TriggerField
  * @constructor
  * @param {Object} config Configuration options
  * <ul>
  *   <li> fromConfig The config for the from object</li>
  *   <li> toConfig The config for the from object</li>
  *   <li> textCls The Class to use as from and to (for example Ext.form.TextField)</li>
  *   <li> minListWidth The min width (in pixel) of the popup. Optional. Default 20 </li>
  *   <li> fieldSize The size of the field (in number of characters). Optional. Default 20</li>
  * </ul>
  */
Ext.ux.netbox.core.RangeField = function(config){
  this.textCls=config.textCls;
  this.fromConfig=config.fromConfig;
  this.toConfig=config.toConfig;
  if(config.minListWidth){
    this.minListWidth=config.minListWidth;
  } else {
    this.minListWidth=100;
  }
  if(config.fieldSize){
    this.defaultAutoCreate.size=config.fieldSize;
  }
  Ext.ux.netbox.core.RangeField.superclass.constructor.call(this,config);
}

Ext.extend(Ext.ux.netbox.core.RangeField,Ext.form.TriggerField,/** @scope Ext.ux.netbox.core.RangeField.prototype */{
  fromText    : 'from',
  toText      : 'to',
  /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "text", size: "20", autocomplete: "off"})
     */  
  defaultAutoCreate : {tag: "input", type: "text", size: "20", autocomplete: "off"},
  editable: false,
  rangeValue: null,
   
  initComponent: function () {
	Ext.ux.netbox.core.RangeField.superclass.initComponent.call(this);
  },
  /** onTriggerClick
    * @private
    */
  onTriggerClick: function(){
    if(this.disabled){
      return;
    }
    if(this.menu == null){
      this.menu = new Ext.ux.netbox.core.RangeMenu(this.textCls,this.fromConfig,this.toConfig,this.validate.createDelegate(this));
    }
    if (this.menuListeners) {
	this.menu.on(Ext.apply({}, this.menuListeners, {scope:this}));
    }
    this.menu.setWidth(this.getWidth());
    this.menu.show(this.getEl());
    this.menu.setValue(this.rangeValue);
  },
  /** getValue
    * @private
    */  
  getValue: function(){
    if(this.menu !== undefined)
      this.rangeValue=this.menu.getValue();
    return(this.rangeValue);
  },
  /** setValue
    * @private
    */  
  setValue: function(val){
    valueFrom = val[0] !== undefined ? val[0] : {value:'',label:''};
    valueTo = val[1] !== undefined ? val[1] : {value:'',label:''};
    formattedValue=this.fromText+": "+valueFrom.label+", "+this.toText+": "+valueTo.label;
    Ext.ux.netbox.core.RangeField.superclass.setValue.call(this, formattedValue);
    this.rangeValue=val;
    if(this.menu!=null){
      this.menu.setValue(this.rangeValue);
    }
  },
  /** It marks the field as invalid. It renders as invalid the from and to field too
    * @private
    * @param {String} msg The message to show to the user
    * @ignore
    */
  markInvalid: function(msg){
    Ext.ux.netbox.core.RangeField.superclass.markInvalid.call(this,msg);
    if(this.menu){
      this.menu.markInvalid(msg);
    }
  },
  /** Overwrites the clearMask function to manage the masks of the from and to fields
    */  
  clearInvalid: function(){
    Ext.ux.netbox.core.RangeField.superclass.clearInvalid.call(this);
    if(this.menu){
      this.menu.clearInvalidFields();
    }
  },
  /** validateBlur
    * @private
    */
  validateBlur: function(e){
    return(this.menu && this.menu.getEl() && !this.menu.getEl().contains(e.target));
  }

});

