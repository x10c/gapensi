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
// $Id: PreferenceManagerView.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox');

/** Creates a new PreferenceManagerView. It takes as input a config object, usefull to config this component.
  * The only mandatory attribute added is PreferenceManager.
  * @constructor
  * @extends Ext.menu.Menu
  * @param {Object} config
  * @config {Ext.ux.netbox.PreferenceManager} preferenceManager The mandatory preference manager
  * @config {boolean} defaultErrorHandling True to delagate error management to the view, that simply shows the response text in a dialog. false to manage the errors on its own. Optional, default: true.
  * @class This class is a view to show the preferences managed by a preference manager. The ui is similar to the bookmark one used by browser
  * <h4> Example </h4>
  * <pre>
  * //toolbar is a standard Ext.Toolbar
  * var prefManagView = new Ext.ux.netbox.PreferenceManagerView({preferenceManager: prefManager});
  * toolbar.add({text: 'Preference', menu: prefManagView});
  * </pre>
  */
Ext.ux.netbox.PreferenceManagerView = function(config){

  Ext.QuickTips.init();

  this.preferenceManager=config.preferenceManager;
  Ext.ux.netbox.PreferenceManagerView.superclass.constructor.call(this,config);
  this.preferenceManager.on("preferenceSaved",this.onPreferenceSaved,this);
  this.preferenceManager.on("preferenceDeleted",this.onPreferenceDeleted,this);
  this.preferenceManager.on("loadPreferencesFailed",this.resetMenu,this);
  if(config.defaultErrorHandling===undefined || config.defaultErrorHandling){
    new Ext.ux.netbox.DefaultPreferenceManagerErrorManager(this.preferenceManager);
  }

  this.on('show',this.loadRemotePref, this, {single: true});
};

Ext.extend(Ext.ux.netbox.PreferenceManagerView, Ext.menu.Menu,/** @scope Ext.ux.netbox.PreferenceManagerView.prototype */
{
  addText           : 'Add preference',
  addTooltipText    : 'Save the actual configuration',
  manageText        : 'Manage preferences',
  manageTooltipText : 'Manage the saved configurations',
  okText            : 'OK',
  cancelText        : 'Cancel',
  modifyText        : 'Modify preference',
  modifyBtnText     : 'Modify',
  deleteBtnText     : 'Delete',
  closeBtnText      : 'Close',
  nameText          : 'Name',
  descText          : 'Description',
  defaultText       : 'Default',
  loadingText       : 'Loading...',

  /** loadRemotePref loading preferences from remote server
    * @private
    */
  loadRemotePref : function(){
    if(this.prefStore===undefined){
      this.prefStore=this.preferenceManager.getAllPreferences();
      this.prefStore.on('load', this.loadRemotePrefAsync, this);
      this.prefStore.on('beforeload', this.beforeLoad, this);
      this.createStableItems();
    } 
    this.prefStore.load();
  },
  
  createStableItems: function(){
    if(this.items.getCount()==0){
      this.add(
        {text:this.addText, tooltip:this.addTooltipText, handler:this.addPreference, scope:this},
        {text:this.manageText, tooltip:this.manageTooltipText, handler:this.showManageDialog, scope:this},
        '-');
    }
  },

  beforeLoad: function(){
    this.resetMenu();
    this.getEl().mask(this.loadingText);
  },
  
  resetMenu: function(){
    if(this.getEl())
      this.getEl().unmask();
    for(var i=this.items.getCount()-1; i>=0;i--){
      if(this.items.get(i).removable===true){
        if(this.items.get(i).getEl() && this.items.get(i).getEl().isMasked())
          this.items.get(i).getEl().unmask();
        this.remove(this.items.get(i));
      }
    }
  },

  /** loadRemotePrefAsync
    * @private
    */
  loadRemotePrefAsync : function(){
    this.resetMenu();
    for(var i=0;i<this.prefStore.getTotalCount();i++){
      var rec=this.prefStore.getAt(i);
      var iconCls='';
      if(rec.get('isDefault')==true)
        iconCls='x-icon-checked';
      this.add({
        id:      rec.get('prefId'),
        text:    rec.get('prefName'),
        tooltip: rec.get('prefDesc'),
        iconCls: iconCls,
        handler: this.applyPreference,
        scope:   this,
        removable: true});
    }
  },

  /** addPreference Opens dialog for save the preference
    * @private
    */
  addPreference : function(){
    this.showAddDialog('','','',false);
  },

  /** managePreference Opens dialog for modify the preference
    * @private
    */
  managePreference : function(){
    selModel=this.manageGridPanel.getSelectionModel();
    record=selModel.getSelected();
    if(record)
      this.showAddDialog(record.get('prefId'),record.get('prefName'),record.get('prefDesc'),record.get('isDefault'));
  },

  /** deletePreferences Method for delete the selected preferences
    * @private
    */
  deletePreferences : function(){
    selModel=this.manageGridPanel.getSelectionModel();
    records=selModel.getSelections();
    if(records.length>0){
      var prefIdArray=[];
      for(var i=0;i<records.length;i++){
        prefIdArray.push(records[i].get('prefId'));
      }
      this.preferenceManager.deletePreferences(prefIdArray);
    }
  },
  
  /** showAddDialog Create dialog for add or modify the preference
    * @private
    */
  showAddDialog : function(prefId,prefName,prefDesc,isDefault){
    if(!this.addDialog){
      this.addDialog = new Ext.Window({
        width:       400,
        height:      160,
        minWidth:    400,
        minHeight:   160,
        closeAction: 'hide',
        layout:      'fit',
        plain:       true,
        modal:       true,
        shadow:      true,

        items: this.addForm = new Ext.form.FormPanel({
          labelWidth: 75,
          border:     false,
          bodyStyle: 'background-color:transparent;padding:10px; ',
          items: [{
              id:         'prefId',
              xtype:      'hidden',
              name:       'prefId',
              value:      prefId
            },{
              id:         'prefName',
              xtype:      'textfield',
              fieldLabel: this.nameText,
              name:       'prefName',
              value:      prefName,
              allowBlank: false,
              width:      '96%'
            },{
              id:         'prefDesc',
              xtype:      'textfield',
              fieldLabel: this.descText,
              name:       'prefDesc',
              value:      prefDesc,
              width:      '96%'
            },{
              id:         'isDefault',
              xtype:      'checkbox',
              fieldLabel: this.defaultText,
              name:       'isDefault',
              checked:    isDefault
          }]
        }),

        buttons: [{
          text:    this.okText,
          handler: this.savePreference,
          scope:   this
        },{
          text:    this.cancelText,
          handler: function(){this.addDialog.hide();},
          scope:   this
        }]
      });
    } else {
      this.addForm.findById('prefId').setValue(prefId);
      this.addForm.findById('prefName').setValue(prefName);
      this.addForm.findById('prefDesc').setValue(prefDesc);
      this.addForm.findById('isDefault').setValue(isDefault);
    }
    if(prefId!='')
      this.addDialog.setTitle(this.modifyText);
    else
      this.addDialog.setTitle(this.addText);
    //this.addForm.findById('prefName').focus();
    this.addDialog.show();
  },

  /** showManageDialog Create dialog for manage the preferences
    * @private
    */
  showManageDialog : function(){
    if(!this.manageDialog){
      this.manageDialog = new Ext.Window({
        title:       this.manageText,
        width:       600,
        height:      300,
        minWidth:    500,
        minHeight:   250,
        closeAction: 'hide',
        layout:      'fit',
        plain:       true,
        modal:       true,
        shadow:      true,

        items: this.manageGridPanel = new Ext.grid.GridPanel({
          store:   this.prefStore,
          border:  false,
          enableColumnHide: false,
          columns: [{
              id: 'prefId',
              hidden: true,
              dataIndex: 'prefId'
            },{
              id:'prefName',
              header: this.nameText,
              sortable: true,
              dataIndex: 'prefName',
              width: 200
            },{
              id:'prefDesc',
              header: this.descText,
              sortable: true,
              dataIndex: 'prefDesc',
              width: 330
            },{
              id:'isDefault',
              header: this.defaultText,
              sortable: true,
              dataIndex: 'isDefault',
              width: 60,
              renderer: this.imageRenderer
            }
          ],

          viewConfig: {
              forceFit: true
          },

          tbar:[{
              text: this.modifyBtnText,
              cls:  'x-btn-text-icon',
              iconCls: 'x-icon-modify',
              handler: this.managePreference,
              scope: this
          }, '-', {
              text: this.deleteBtnText,
              cls:  'x-btn-text-icon',
              iconCls: 'x-icon-delete',
              handler: this.deletePreferences,
              scope: this
          }, '-', {
              text: this.closeBtnText,
              cls:  'x-btn-text-icon',
              iconCls: 'x-icon-cancel',
              handler: function(){this.manageDialog.hide();},
              scope: this
          }]
        })
      })
    }
    this.manageDialog.show();
  },

  /** imageRenderer
    * @private
    */
  imageRenderer : function(value, metadata, record, rowIndex, colIndex, store){
    if(value==true)
      return('<img class="x-menu-item-icon x-icon-checked" src="'+Ext.BLANK_IMAGE_URL+'"/>');
  },

  /** applyPreference setting preference
    * @private
    */
  applyPreference : function(item, event){
    this.preferenceManager.applyPreference(item.getId());
  },

  /** savePreference saving preference
    * @private
    */
  savePreference : function(){
    var prefId = this.addForm.findById('prefId');
    var prefName = this.addForm.findById('prefName');
    var prefDesc = this.addForm.findById('prefDesc');
    var isDefault = this.addForm.findById('isDefault');
    if (prefName.isValid()){
      this.preferenceManager.savePreference(prefId.getValue(),prefName.getValue(),prefDesc.getValue(),isDefault.getValue());
    }
  },

  /** onPreferenceSaved
    * @private
    */
  onPreferenceSaved : function(prefName,response){
    this.prefStore.reload();
    this.addDialog.hide();
  },

  /** onPreferenceDeleted
    * @private
    */
  onPreferenceDeleted : function(prefIdArray){
    this.prefStore.reload();
  }

});

/** This one is needed to allow tooltip for Menu Items
Ext.menu.BaseItem.prototype.onRender = function(container){
  this.el = Ext.get(this.el);
  container.dom.appendChild(this.el.dom);
  if (this.tooltip) {
   this.el.dom.qtip = this.tooltip;
  }
};
  */

/** Build a new DefaultPreferenceManagerErrorManager
  * @constructor
  * @param {Ext.ux.netbox.PreferenceManager} preferenceManager The preferenceManager whose errors this class manage
  * @class This class manages the errors of a preferencesManager by listening to the error events (see the documentation of PreferenceManager, and look at the evants that ends by failed)
  * It shows an error dialog containing the content of the response sent by the server 
  */
Ext.ux.netbox.DefaultPreferenceManagerErrorManager=function(preferenceManager){
  preferenceManager.on("applyDefaultPreferenceFailed",this.manageApplyDefaultPreferenceFailed,this);
  preferenceManager.on("applyPreferenceFailed",this.manageApplyPreferenceFailed,this);
  preferenceManager.on("loadPreferencesFailed",this.manageLoadPreferencesFailed,this);
  preferenceManager.on("preferenceDeleteFailed",this.manageDeletePreferencesFailed,this);
  preferenceManager.on("preferenceSaveFailed",this.manageSavePreferenceFailed,this);
}

Ext.ux.netbox.DefaultPreferenceManagerErrorManager.prototype= {
  /** Title of the error dialog when an error occurs while applying the default preference
    * @type String
    */
  failedToApplyDefaultPreferenceTitle: "Error applying default preference",
  /** Title of the error dialog when an error occurs while applying a preference
    * @type String
    */
  failedToApplyPreferenceTitle: "Error applying preference",
  /** Title of the error dialog when an error occurs while saving a preference
    * @type String
    */
  failedToSavePreferenceTitle: "Error saving preference",
  /** Title of the error dialog when an error occurs while deleting some preferences
    * @type String
    */
  failedToDeletePreferenceTitle: "Error deleting preference(s)",
  /** Title of the error dialog when an error occurs while loading the preferences
    * @type String
    */
  failedToLoadPreferenceTitle: "Error loading preferences",
  /** Callback of the applyDefaultPreferenceFailed event
    * @private
    * @ignore
    */
  manageApplyDefaultPreferenceFailed: function(response){
    this.manageError(this.failedToApplyDefaultPreferenceTitle,response.responseText);
  },
  /** Callback of the applyPreferenceFailed event
    * @private
    * @ignore
    */
  manageApplyPreferenceFailed: function(prefId,response){
    this.manageError(this.failedToApplyPreferenceTitle,response.responseText);
  },
  /** Callback of the preferenceSaveFailed event
    * @private
    * @ignore
    */  
  manageSavePreferenceFailed: function(prefId,prefName,response){
    this.manageError(this.failedToSavePreferenceTitle,response.responseText);
  },
  /** Callback of the preferenceDeleteFailed event
    * @private
    * @ignore
    */  
  manageDeletePreferencesFailed: function(prefIdsArray,response){
    this.manageError(this.failedToDeletePreferenceTitle,response.responseText);
  },
  /** Callback of the loadPreferencesFailed event
    * @private
    * @ignore
    */  
  manageLoadPreferencesFailed: function(response){
    this.manageError(this.failedToLoadPreferenceTitle,response.responseText);
  },
  /** This method has as input the title of the dialog and the content of the response
    * It shows a dialog with title as title and message as content.
    * If you want to personalize the dialog or the behaviour just overwrite this method
    * @param {String} title The title of the dialog
    * @param {String} message The content of the dialog
    */
  manageError: function(title,message){
    Ext.MessageBox.show({
           title: title,
           msg: message,
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.ERROR,
           minWidth: 200
       });
  }
};
