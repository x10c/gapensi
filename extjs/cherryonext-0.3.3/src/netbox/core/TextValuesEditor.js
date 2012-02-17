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
// $Id: TextValuesEditor.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** It creates a new TextValuesEditor. For an error the order of the parameter is reversed because we want the second field to be optional (the default value is a new Ext.form.TextField)
  * @class This class extends Editor to manage an array of {label: originalValue, value: originalValue} as value.
  * It should be used to manage all the form field that doesn't have a value different from the label (for example a TextField or a checkbox,
  * but not a ComboBox where label and value are different)
  * @constructor
  * @param {Object} config The config object. For more info look at the config options of Ext.Editor
  * @param {Ext.form.Field} The field inside the editor. Optional. The default value is a new Ext.form.TextField
  * @extends Ext.ux.netbox.FilterEditor
  */
Ext.ux.netbox.core.TextValuesEditor = function(field, config){
  if(field==undefined){
    field=new Ext.form.TextField();
  }
  Ext.ux.netbox.core.TextValuesEditor.superclass.constructor.call(this,field,config);
}

Ext.extend(Ext.ux.netbox.core.TextValuesEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.core.TextValuesEditor.prototype */
{
  /** This method sets the value
    * @param (Array) value
    */
  setValue: function(value){
    var val;
    if(value!==undefined && value!==null && Ext.type(value)==="array"){ 
      if(value.length==0){
        val="";
      } else if (value[0].value!==undefined){
        val=value[0].value;
      } else {
        val=value[0];
      }
    } else {
      val="";
    }
    Ext.ux.netbox.FilterEditor.superclass.setValue.call(this,val);
  },

  /** This method gets the value
    * @return Array of Objects containing the values {label: ..., value: ...}
    */
  getValue: function() {
    var val=Ext.ux.netbox.FilterEditor.superclass.getValue.call(this);
    if(val===""){
      return([]);
    } else {
      val=[{label: val, value:val}];
    }
    return(val);
  }

});