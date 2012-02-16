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
// $Id: FilterEditor.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox');

/** For a description of the parameters look at the documentation of Ext.Editor
  * @class This class extends Editor to allow an object as value (i.e. objects that String() translate into [object Object]. The 2 changes rows 
  * are documented using this comment: <pre>//<-- changed</pre>
  * @constructor
  */
Ext.ux.netbox.FilterEditor = function(field,config){
  Ext.ux.netbox.FilterEditor.superclass.constructor.call(this,field,config);
};

Ext.extend(Ext.ux.netbox.FilterEditor,Ext.grid.GridEditor,/** @scope Ext.ux.netbox.FilterEditor.prototype */
{
  /** This is absolutely equal to the method of GridEditor, but it calls this.setValue and not this.field.setValue
    */
  startEdit : function(el, value){
    if(this.editing){
        this.completeEdit();
    }
    this.boundEl = Ext.get(el);
    var v = value !== undefined ? value : this.boundEl.dom.innerHTML;
    if(!this.rendered){
        this.render(this.parentEl || document.body);
    }
    if(this.fireEvent("beforestartedit", this, this.boundEl, v) === false){
        return;
    }
    this.startValue = v;
    this.setValue(v);//<-- changed
    if(this.autoSize){
      var sz = this.boundEl.getSize();
      switch(this.autoSize){
        case "width":
        this.setSize(sz.width,  "");
        break;
        case "height":
        this.setSize("",  sz.height);
        break;
        default:
        this.setSize(sz.width,  sz.height);
      }
    }
    this.el.alignTo(this.boundEl, this.alignment);
    this.editing = true;
    this.show();
  },

  /** This is absolutely equal to the method of GridEditor, but it calls Ext.util.JSON.encode and not String to compare the values
    */
  completeEdit : function(remainVisible){
    if(!this.editing){
      return;
    }
    var v = this.getValue();
    if(this.revertInvalid !== false && !this.field.isValid()){
      v = this.startValue;
      this.cancelEdit(true);
    }
    if(Ext.util.JSON.encode(v) === Ext.util.JSON.encode(this.startValue) && this.ignoreNoChange){//<-- changed
      this.editing = false;
      this.hide();
      return;
    }
    if(this.fireEvent("beforecomplete", this, v, this.startValue) !== false){
      this.editing = false;
      if(this.updateEl && this.boundEl){
        this.boundEl.update(v);
      }
      if(remainVisible !== true){
        this.hide();
      }
      this.fireEvent("complete", this, v, this.startValue);
    }
  }
});