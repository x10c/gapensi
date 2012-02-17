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
// $Id: FilterHeaderPlugin.js 107 2008-03-03 16:18:01Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** It creates a new filter header plugin.
  * @class This is a plugin for an Ext.grid.GridPanel useful to highlight the columns of the grid on which there is at least a filter.
  * It assumes that the id of the fields and the dataIndex of the columns are the same.
  * <h4> Example</h4>
  * <pre>
  * grid = new Ext.grid.GridPanel({
  *   store: store,
  *   columns: [
  *     ....
  *   ],
  *   ...
  *   plugins: [new Ext.ux.netbox.core.FilterHeaderPlugin(filterModel)],
  *   ....
  * });
  * </pre>
  * @constructor
  * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel that owns the filter
  */
Ext.ux.netbox.core.FilterHeaderPlugin = function(filterModel){
  this.filterModel = filterModel;
};

Ext.ux.netbox.core.FilterHeaderPlugin.prototype = {/** @scope Ext.ux.netbox.core.FilterHeaderPlugin.prototype */

  /** The css class to be applied to column headers that active filters. Defaults to 'ux-filterd-column'
    *
    */
  filterCls: 'ux-filtered-column',

  /** @private
    *
    */
  init : function(grid) {
    this.grid = grid;
    grid.on("render", this.onRender, this);
  },

  /** @private
    *
    */
  onRender: function(){
    this.grid.getView().on("refresh", this.onRefresh, this);
    this.updateColumnHeadings(this.grid.getView());
  },

  /** @private
    *
    */
  onRefresh: function(view){
    this.updateColumnHeadings(view);
  },

  /** @private
    *
    */
  updateColumnHeadings: function(view){
    if(!view || !view.mainHd) return;
    var hds = view.mainHd.select('td').removeClass(this.filterCls);
    for(var i=0, len=view.cm.config.length; i<len; i++){
      var filters = this.filterModel.getElementaryFiltersByFieldId(view.cm.config[i].dataIndex);
      for(var j=0;j<filters.length;j++){
        if(filters[j].isValid()===true){
          hds.item(i).addClass(this.filterCls);
          break;
        }
      }
    }
  }

};