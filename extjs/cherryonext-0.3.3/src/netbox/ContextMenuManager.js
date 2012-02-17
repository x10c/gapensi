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
// $Id: ContextMenuManager.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox');

/** It takes in input an object with an attribute, the menu (Ext.menu.Menu )to show as context menu
  * or directly the config object as described below.<br>
  * The items that populate the menu must have the following two custom properties passed in the config:
  * <ul>
  *   <li><b>isToShow</b>: Function<p style="margin-left:1em">Function that indicates whether the item should be displayed in context. Optional
      If not present:
        <ul>
          <li>If the item doesn't have a submenu it will be displayed if the click happened on a cell (i.e. not in the white space outside the rows)</li>
          <li>If the item has a submenu, if there is at least one item visible in the submenu </li>
        </ul>
      </p></li>
  *   <li><b>handler</b>: Function<p style="margin-left:1em">Function invoked when the menu item is selected</p></li>
  * </ul>
  * Both this functions have the same signature, the parameters are the following:
  * <ul>
  *  <li><b>grid</b>: Ext.grid.GridPanel <p style="margin-left:1em">The grid over which the menu is shown</p></li>
  *  <li><b>row</b>: int <p style="margin-left:1em">The row number <b>NB</b> if the user doesn't click on a row it's -1</p></li>
  *  <li><b>column</b>: int <p style="margin-left:1em">The column number <b>NB</b> if the user doesn't click on a column it's -1 (It happens if it clicks on the blank space, or if it clicks exactly over the border of a row..)</p></li>
  *  <li><b>item</b>: Ext.menu.Item <p style="margin-left:1em">The column number <b>NB</b> The item to show/hide, or the clicked item </p></li>
  * </ul>
  * @class This class is a plugin for Ext.grid.GridPanel, and it manages the context menu on a grid. A context menu is a menu that is shown when you right click on the grid, showing actions depending on the content of the cell.
  * When the user clicks on the action, the action has a the row and the column of the cell the user clicked.<br>
  * <B>NB</B>: The context menu will be activated even if the user clicks in the grid outside any cells (for example if the grid is empty). In this case the row and/or the column will be -1
  * <h4>Example</h4>
  * In the following example the context menu is visible only on the even rows of the table, and when the user clicks it an alert with the coordinates of the clicked cell is shown.
  * <PRE>
  * var contextMenu= new Ext.menu.Menu({
  *   items:[{
  *     text: 'prova1',
  *     isToShow: function(grid,row,column){
  *       if(row%2==0){
  *         return(true);
  *       } else {
  *         return(false);
  *       }
  *     },
  *     handler: function(grid,row,column){
  *       alert('row: '+row+' col: '+column);
  *     }
  *   }]
  * });
  * 
  * var contextMenuManager=new Ext.ux.netbox.ContextMenuManager({menu: contextMenu});
  * var gridPanel=new Ext.grid.GridPanel({
  *   store: ....,
  *   columns:....,
  *   plugins: [contextMenuManager],
  *   .....
  * });
  *   
  * </PRE>
  * @constructor
  * @param {Object} config Configuration options
  * @config {Ext.menu.Menu} menu The mandatory menu or a config object for instantiate the menu
  */
Ext.ux.netbox.ContextMenuManager=function(config){

  this.menu=config.menu;
  
};

Ext.ux.netbox.ContextMenuManager.prototype=/** @scope Ext.ux.netbox.ContextMenuManager.prototype */
{
  
  /** Plugin init function. It will be called automatically by the grid, with the grid itself as parameter
    * It simply adds the needed listeners, and store the grid as a property of this class
    * @param {Ext.grid.Grid} gridPanel The grid on which the menu should be displayed
    */
  init: function(gridPanel){
    this.gridPanel=gridPanel;
    this.gridPanel.on("contextmenu",this.onContextmenu,this);
  },
  /** Method called when you press the right mouse button on a table cell
    * @private
    */
  onCellcontextmenu : function(grid, rowIndex, cellIndex, e, menu){
    var menuUndefined=false;
    if(!menu){
      menuUndefined=true;
      if(!(this.menu instanceof Ext.menu.Menu)){
        this.menu=new Ext.menu.Menu(this.menu);
      }
      menu=this.menu;
    }
    e.stopEvent();
    var isSomethingVisible=false;
    for(var i=0;i<menu.items.getCount();i++){
      var itemTmp=menu.items.get(i);
      var scope=itemTmp.initialConfig.scope ? itemTmp.initialConfig.scope : window;
      var visible;
      if(itemTmp.initialConfig.isToShow){
        visible=itemTmp.initialConfig.isToShow.call(scope, grid, rowIndex, cellIndex,itemTmp);
        if(visible && itemTmp.menu){
          this.onCellcontextmenu(grid, rowIndex, cellIndex, e, itemTmp.menu);
        }
      } else {
        if(!itemTmp.menu){
          visible = (rowIndex >=0 && cellIndex>=0);
        } else {
          visible=this.onCellcontextmenu(grid, rowIndex, cellIndex, e, itemTmp.menu);
        }
      }
      if(visible){
        itemTmp.setVisible(true);
        if(itemTmp.initialConfig.handler){
          var handler=itemTmp.initialConfig.handler.createDelegate(scope,[grid, rowIndex, cellIndex,itemTmp],false);
          itemTmp.setHandler(handler);
        }
        isSomethingVisible=true;
      } else {
        itemTmp.setVisible(false);
      }
    }
    if(isSomethingVisible && menuUndefined){
      this.menu.showAt([e.getPageX(),e.getPageY()]);
    }
    return isSomethingVisible;
  },

  /** Method called when you press the right mouse button on a table but out of cell
    * @private
    */
  onContextmenu : function(e){
    var t = e.getTarget();
    var header = this.gridPanel.getView().findHeaderIndex(t);
    if(header !== false){
      return;
    }
    var row=-1;
    var col=-1;
    if(this.gridPanel.getView().findRowIndex(t)!==false){
      row=this.gridPanel.getView().findRowIndex(t);
    }
    if(this.gridPanel.getView().findCellIndex(t)!==false){
      col=this.gridPanel.getView().findCellIndex(t);
    }
    this.onCellcontextmenu(this.gridPanel,row,col,e);
  }

};
