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
// $Id: TextFieldOperator.js 104 2008-02-29 16:01:33Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.string');

/** Create a new TextFieldOperator
  * @constructor
  * @extends Ext.ux.netbox.core.Operator
  * @class This is the class that implements an operator that wants always a TextField
  * even if availableValues are available.
  */
Ext.ux.netbox.string.TextFieldOperator = function(id,label) {

  Ext.ux.netbox.string.TextFieldOperator.superclass.constructor.call(this,id,label);

  /** With this operator I want always a TextField, even if there are available values
    * This is the variable that contains the editor
    * @property {Ext.Editor} editor
    */
  this.editor=null;
};

Ext.extend(Ext.ux.netbox.string.TextFieldOperator,Ext.ux.netbox.core.Operator,/** @scope Ext.ux.netbox.string.TextFieldOperator.prototype */
{
  /** This method creates an Ext.ux.netbox.core.TextValuesEditor as editor.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var editor=new Ext.ux.netbox.core.TextValuesEditor();
    return editor;
  }

});