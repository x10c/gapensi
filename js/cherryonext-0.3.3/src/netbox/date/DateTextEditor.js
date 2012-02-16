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
// $Id: DateTextEditor.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.date');

/** It instantiates a new DateTextEditor
  * @class This class extends Ext.ux.netbox.FilterEditor to manage dates as value.
  * For a description of the parameters look at the documentation of Ext.Editor.
  * @constructor
  * @extends Ext.ux.netbox.FilterEditor
  */
Ext.ux.netbox.date.DateTextEditor = function(field,config){
  Ext.ux.netbox.date.DateTextEditor.superclass.constructor.call(this,field,config);
  if(config.format==undefined){
    config.format='Y-m-d H:i:s';
  }
  this.format=config.format;
}

Ext.extend(Ext.ux.netbox.date.DateTextEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.date.DateTextEditor.prototype */{

  /** This method gets the value. If the value inserted by the user is not a valid date, an empty array is returned.
   */

  getValue: function() {
    var val=Ext.ux.netbox.date.DateTextEditor.superclass.getValue.call(this);
    
    if(val===""){
      return([]);
    }else{
      return [{value: val.format('Y-m-d H:i:s'),label:val.format(this.format)}];
    }
  },

  setValue: function(val){
    var value;
    if(val.length==0){
      value="";
    }else{
      value=Date.parseDate(val[0].value, 'Y-m-d H:i:s');
    }
    Ext.ux.netbox.date.DateTextEditor.superclass.setValue.call(this,value);
  }

});