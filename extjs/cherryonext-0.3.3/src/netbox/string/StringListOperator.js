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
// $Id: StringListOperator.js 175 2008-08-29 09:43:38Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.string');

/** It instantiates a new StringListOperator
  * @class This is the class that implements an operator that allows the choice of more than one value (from a list)
  * @constructor
  * @extends Ext.ux.netbox.core.Operator
  * @param {String} id The id of the operator.
  * @param {String} label The label of the operator.
  */
Ext.ux.netbox.string.StringListOperator = function(id,label) {
  Ext.ux.netbox.string.StringListOperator.superclass.constructor.call(this,id,label);
  /** With this operator I want always a combo with multiple choice. The editor that implements the behaviour is Ext.ux.netbox.core.AvailableValuesEditor
    * If available values are not available (isAvailableValuesAvailable  returns false) an exception is thrown
    * @property {Ext.Editor} editor
    */
  this.editor=null;
  valFn=function(values){
    return(this.getField().emptyNotAllowedFn(values));
  }
  this.addValidateFn(valFn);
}

Ext.extend(Ext.ux.netbox.string.StringListOperator,Ext.ux.netbox.core.Operator,/** @scope Ext.ux.netbox.string.StringListOperator.prototype */{
  /** This method creates an Ext.ux.netbox.core.AvailableValuesEditor as editor.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var editor=new Ext.ux.netbox.core.AvailableValuesEditor(this.getField().getAvailableValues(),{remote: this.isStoreRemote(),forceReload: this.isForceReload(),multiSelect: true,caseSensitive: this.isCaseSensitive()});
    return editor;
  },
  /** This method convert an old value of an elementary filter to a new value, suitable for this operator.
    * <B>NB:</B> if you want to return an empty operator return [].
    * In this default implementation, if it's an array, it returns all the element of the array in the format {value:...,label:...} 
    * an array with only the first element is returned. Otherwise it returns an empty array.
    * @param {Array of Object} values
    */
  convertValue: function(values){
    var toReturn=[];
    if(values !==null && values !== undefined && Ext.type(values)=="array"){
      for(var i=0;i<values.length;i++){
        if(values[i].value!== undefined && values[i].label!== undefined){
          toReturn.push(values[i]);
        }
      }
    }
    return(toReturn);
  }
});