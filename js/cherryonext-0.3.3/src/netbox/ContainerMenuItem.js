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
// $Id: ContainerMenuItem.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox');

/** Creates a new ContainerMenuItem. 
  * @class It extends the base functionality of Ext.menu.Item
  * with the possibility of dynamically adding (or removing) a submenu to an item.
  * @constructor
  * @param {Object} config Configuration options. They are exactly the same config option of Ext.menu.Item
  * @extends Ext.menu.Item
  */
Ext.ux.netbox.ContainerMenuItem=function(config){
  Ext.ux.netbox.ContainerMenuItem.superclass.constructor.call(this,config);
};

Ext.extend(Ext.ux.netbox.ContainerMenuItem, Ext.menu.Item,/** @scope Ext.ux.netbox.ContainerMenuItem.prototype */
{

  /** This method returns the submenu of this item.
    * @return {Ext.menu.Menu} menu The submenu setted for this item
    */
  getSubMenu : function(){
    return this.menu;
  },

  /** This method sets the submenu for this item.
    * @param {Ext.menu.Menu} menu The submenu setted for this item
    */
  setSubMenu : function(menu){
    this.menu = Ext.menu.MenuMgr.get(menu);
    if(this.getEl()){
      this.getEl().addClass('x-menu-item-arrow');
    }
  },

  /** This method removes the submenu for this item.
    * @return void
    */
  removeSubMenu : function(){
    this.menu=undefined;
    if(this.getEl()){
      this.getEl().removeClass('x-menu-item-arrow');
    }
  }

});