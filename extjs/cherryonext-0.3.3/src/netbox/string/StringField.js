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
// $Id: StringField.js 125 2008-03-12 10:19:23Z dandfra $

Ext.namespace('Ext.ux.netbox.string');

/** It creates a new string field
  * @param {String} id The id of the field
  * @param {String} label Optional. The label of the field. If not supplied the id is used.
  * @constructor
  * @extends Ext.ux.netbox.core.Field
  * @class This is the class that implements the field to use if the type is string.
  * It contains as default the following operators:
  * <ul>
  *   <li> STRING_EQUAL </li>
  *   <li> STRING_DIFFERENT </li>
  *   <li> STRING_CONTAINS </li>
  *   <li> STRING_DOESNT_CONTAIN </li>
  *   <li> STRING_STARTS_WITH </li>
  *   <li> STRING_ENDS_WITH </li>
  * </ul>
  * The default operator is STRING_EQUAL.
  * The STRING_LIST and STRING_NOT_LIST operations should be manually added if needed.
  */
Ext.ux.netbox.string.StringField = function(id,label) {
  Ext.ux.netbox.string.StringField.superclass.constructor.call(this,id,label);
  var equalOperator = new Ext.ux.netbox.core.Operator("STRING_EQUAL",this.stringEqualsLabel);
  this.addOperator(equalOperator);
  this.setDefaultOperator(equalOperator);
  this.addOperator(new Ext.ux.netbox.core.Operator("STRING_DIFFERENT",this.stringDifferentLabel));
  noEmptyAllowed=this.emptyNotAllowedFn.createDelegate(this);
  var op=new Ext.ux.netbox.string.TextFieldOperator("STRING_CONTAINS",this.containsText);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.string.TextFieldOperator("STRING_DOESNT_CONTAIN",this.doesntContainsText);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.string.TextFieldOperator("STRING_STARTS_WITH",this.startsWithText);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.string.TextFieldOperator("STRING_ENDS_WITH",this.endsWithText);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
}

Ext.extend(Ext.ux.netbox.string.StringField,Ext.ux.netbox.core.Field,/** @scope Ext.ux.netbox.string.StringField.prototype */{
  stringEqualsLabel: "=",
  stringDifferentLabel: "!=",
  containsText: "contains",
  doesntContainsText: "doesn't contain",
  startsWithText: "starts with",
  endsWithText: "ends with",
    /** Label of the STRING_LIST operation
    * @property
    */
  stringListText: "in",
  /** Label of the STRING_NOT_IN_LIST operation
    * @property
    */
  stringNotListText: "not in"
});