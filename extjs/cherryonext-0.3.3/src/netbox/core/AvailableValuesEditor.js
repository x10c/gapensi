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
// $Id: AvailableValuesEditor.js 225 2010-03-19 11:35:34Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** This constructor instantiates an editor with an Ext.ux.Andrie.Select to use as editor widget
  * @class This class is used to edit a value of a elementary filter when a set of available values must be shown.
  * The values MUST be in the format [{label:..., value:...}]
  * @constructor
  * @param {Ext.data.Store} store The store used to retrieve the data.
  * It must have 2 columns, label (which will be used as displayField) and value (which will be used as labelField).
  * @config {Object} config See the parameter with the same name of Ext.ux.FilterEditor.
  * Also were added in the config 4 boolean parameters: remote, forceReload,  multiSelect and caseSensitive.
  * config.remote: true if the store is remote, false if the data is local (ie, if store is a Ext.data.SimpleStore). Dafault is false.
  * config.forceReload: true if the store is to be reloaded everytime the combo expands. Dafault is false.
  * config.multiSelect: true if more than one selection is allowed, false for 1. Dafault is false.
  * config.caseSensitive: true if the value should be compared with the store's one with case sensitive. Default is true.
  * @extends Ext.ux.netbox.FilterEditor
  */

Ext.ux.netbox.core.AvailableValuesEditor=function(store,config){

  if(config==undefined){
    config={};
  }
  var mode='local';
  if(config.remote==true)
    mode='remote';
  if(config.multiSelect==undefined){
    config.multiSelect=false;
  }
  this.fieldCombo=new Ext.ux.Andrie.Select({
    store         : store,
    displayField  : 'label',
    valueField    : 'value',
    selectOnFocus : true,
    mode          : mode,
    triggerAction : 'all',
    selectOnFocus : true,
    typeAhead     : true,
    multiSelect   : config.multiSelect,
    minChars      : 0
  });
  if(!config.multiSelect){
    this.fieldCombo.on('select',this.completeEditLater,this);
  }
  if(config.forceReload){
    this.fieldCombo.on("beforequery",function(qe){ qe.combo.lastQuery = null; });
  }
  if(config.caseSensitive)
    this.caseSensitive=true;
  else
    this.caseSensitive=false;
  Ext.ux.netbox.core.AvailableValuesEditor.superclass.constructor.call(this,this.fieldCombo,config);
  this.store=store;
}

Ext.extend(Ext.ux.netbox.core.AvailableValuesEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.core.AvailableValuesEditor.prototype */{

  /** This method sets the value. This means that it sets the value of the inner combo.
    * If the value is an array with at least one element, the value to set is the array of the given elements.
    * Otherwise the value will be the empty string.
    * @param {Object} value The value to set.
    */
  setValue: function(value){
    var val=[];
    var rawVal=[];
    var label='';
    if(value!=undefined && value!=null && Ext.type(value)=="array"){
      if(value.length>0){
        for(var i=0; i< value.length && ((this.fieldCombo.multiSelect) || i<1); i++){
          val.push(value[i].value);
          if(value[i].label!=undefined){
            rawVal.push(value[i].label);
          } else {
            rawVal.push(value[i].value);
          }
        }
      }
    }
    this.originalValue=value;

    Ext.ux.netbox.core.AvailableValuesEditor.superclass.setValue.call(this,val);
    /* Hack to show the right label even if the store is not loaded.*/
    Ext.form.ComboBox.superclass.setValue.call(this.fieldCombo,rawVal.join(","));
    this.fieldCombo.value=val;
    this.fieldCombo.rawValueArray=rawVal;
  },
  
  /** This is a hack. If I stop editing on the select event, the gridpanel will scroll to the first row if there is a scrollbar.
    * The reason is that the ComboBox will request the focus after the event, even if it's not visible 
    * (the editor that contains the combo is already hidden)
    * I delay the complete of the editing at the end of the browser event queue (0 milliseconds of delay), to avoid the problem
    * @provate
    * @ignore
    */
  completeEditLater: function(){
    var task=new Ext.util.DelayedTask(this.completeEdit,this);
    task.delay(0);
  },
  
  /** This method gets the value. It searches the values in the store to have, with the values, the labels. If the store is not loaded,
    * since the user didn't modify the value, it returns the original value.
    * @return {Array} An array ob objects in the format {label:..., value:...}
    */
  getValue: function() {
    var val=Ext.ux.netbox.core.AvailableValuesEditor.superclass.getValue.call(this);
    if(Ext.type(val)=='string'){
      val=val.split(',');
    }
    var toReturn=[];
    for(var i=0; i<val.length;i++){
      var j=this.store.find('value',val[i],0,false,this.caseSensitive);
      if(j<0)
        continue;
      var record=this.store.getAt(j);
      toReturn.push({label: record.get('label'), value: val[i]});
    }
    //if the user clicks on the field and then it presses Enter, the store is not loaded...
    if((val.length>0 && val[0]!=="") && toReturn.length==0)
      return(this.originalValue);
    else
      return toReturn;
  }
});
