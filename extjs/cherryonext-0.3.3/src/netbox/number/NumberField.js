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
// $Id: NumberField.js 183 2008-09-12 14:08:41Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.number');

/** It instantiates a new NumberField
  * @class This is the class that implements the field to use if the data to filter is a number.
  * It contains as default the following operation:
  * <ul>
  *   <li> NUMBER_EQUAL </li>
  *   <li> NUMBER_NOT_EQUAL </li>
  *   <li> NUMBER_GREATER </li>
  *   <li> NUMBER_GREATER_OR_EQUAL </li>
  *   <li> NUMBER_LESS </li>
  *   <li> NUMBER_LESS_OR_EQUAL </li>
  *   <li> NUMBER_RANGE </li>
  * </ul>
  * The default operation is NUMBER_EQUAL
  * @param {String} id The Field id.
  * @param {String} label Optional. The label of the filter. If not supplied the id is used.
  * @constructor
  * @extends Ext.ux.netbox.core.Field
  */
Ext.ux.netbox.number.NumberField = function(id,label) {
  Ext.ux.netbox.number.NumberField.superclass.constructor.call(this,id,label);
  var equalOperator = new Ext.ux.netbox.core.Operator("NUMBER_EQUAL","=");
  this.addOperator(equalOperator);
  this.setDefaultOperator(equalOperator);
  this.addOperator(new Ext.ux.netbox.core.Operator("NUMBER_NOT_EQUAL","!="));
  noEmptyAllowed=this.emptyNotAllowedFn.createDelegate(this);
  var op=new Ext.ux.netbox.core.Operator("NUMBER_GREATER",">");
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.core.Operator("NUMBER_GREATER_OR_EQUAL",">=");
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.core.Operator("NUMBER_LESS","<");
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.core.Operator("NUMBER_LESS_OR_EQUAL","<=");
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  this.addOperator(new Ext.ux.netbox.number.NumberRangeOperator());
}

Ext.extend(Ext.ux.netbox.number.NumberField,Ext.ux.netbox.core.Field,/** @scope Ext.ux.netbox.number.NumberField.prototype */{

  /** This method creates an Ext.ux.netbox.core.TextValuesEditor with a Ext.form.NumberField as field.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var editor=new Ext.ux.netbox.core.TextValuesEditor(new Ext.form.NumberField({decimalPrecision: 10}));
    return editor;
  }

});