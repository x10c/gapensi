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
// $Id: FieldManager.js 168 2008-08-21 08:32:46Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** Creates a new FieldManager class in the Netbox Filter Framework, eventually instantiating the fields.<br>
  * <b> NB: </b> If availableValues is specified and the type of the field is string the STRING_LIST and STRING_NOT_IN_LIST operators will be added to the fields.
  * @constructor
  * @param {Array of field config} config An array of configuration object for the fields in this object. Optional, if not present an empty FieldManager is created.
  * @config {String} id The id of the field (for example the id of the column)
  * @config {String} label The label of the field (for example the header of the column)
  * @config {Array} defaultValues The default values of the field in the format {value: ... , label: ...} Optional
  * @config {String} type The type of the field. Available values are: string, enum, float, int, date. Default type is string
  * @config {String} format Only for dates, the format of the date. Look Ext.ux.netbox.data.DateFilterType for more details
  * @config {Ext.data.Store} availableValues The store containing the available values for this field. Look at Ext.ux.netbox.core.Field.setAvailableValues for more details
  * @config {boolean} remoteStore True if the store is remote, false otherwise. Look at Ext.ux.netbox.core.Field.setStoreRemote for more details
  * @config {boolean} forceReload True if you want reload the store everytime expand the combo. Look at Ext.ux.netbox.core.Field.setForceReload for more details
  * @config {boolean} caseSensitive True if the value should be compared with the store's one with case sensitive. Look at Ext.ux.netbox.core.Field.setCaseSensitive for more details
  * @config {function} validate The function used to validate the values of the Field. Look at Ext.ux.netbox.core.Field.setValidateFn for more details
  * @class This class manages the filter fields. You should use an instance of this class (obtained using filterModel.getFieldManager) to add or remove filter fields, or to obtain them to add or remove operators.
  * More than one filter model can have the same FieldManager, allowing to have different sets of filters, but on the same set of fields.
  */
Ext.ux.netbox.core.FieldManager=function(config){
  Ext.ux.netbox.core.FieldManager.superclass.constructor.call(this);
  this.addEvents(/** @scope Ext.ux.netbox.core.FieldManager.prototype */{
    /** Fires when a Field is added
      * @event fieldAdded
      * @param {Ext.ux.netbox.core.Field} field The added field
      */
    fieldAdded : true,
    /** Fires when a Field is removed
      * @event fieldRemoved
      * @param {Ext.ux.netbox.core.Field} field The removed field
      */
    fieldRemoved : true,
    /** Fires before a Field is removed
      * @event beforeFieldRemoved
      * @param {Ext.ux.netbox.core.Field} field The field to remove. To block the event removing just returns false
      */
    beforeFieldRemoved : true 
  });
  /**
    * @property {Ext.util.MixedCollection} fields The list of all fields for this FieldManager
    * @private
    */
  this.fields=new Ext.util.MixedCollection(false,function(field){return(field.getId())});
  if(config!==undefined){
    for(var i=0; i< config.length; i++){
      this.addField(config[i]);
    }
  }
}

Ext.extend(Ext.ux.netbox.core.FieldManager,Ext.util.Observable,/** @scope Ext.ux.netbox.core.FieldManager.prototype */
{

  /** This method returns the list of all fields.
    * @return {Array of Ext.ux.netbox.core.Field} The collection of fields for this Filter
    */
  getAllFields : function(){
    return(this.fields.getRange());
  },
  /** This method returns a field by Id or null if it is not found.
    * @param {String} id The id of field
    * @return {Ext.ux.netbox.core.Field} The field with the given id
    */
  getFieldById : function(id){
    var field=this.fields.get(id);
    if(!field){
      return(null);
    }
    return(field);
  },
  
  /** It creates a field given a field config
    * @private
    * @param {field config} fieldCfg. See the constructor for more details
    * @return {Ext.ux.netbox.core.Field} the field built using
    */
  createFieldFromCfg: function(fieldCfg){
    var field;
    if(fieldCfg.type===undefined){
      fieldCfg.type="string";
    }

    switch(fieldCfg.type){
      case "string":
        field=new Ext.ux.netbox.string.StringField(fieldCfg.id,fieldCfg.label);
        break;
      case "enum":
        field=new Ext.ux.netbox.string.EnumField(fieldCfg.id,fieldCfg.label);
        break;
      case "float":
      case "int":
        field=new Ext.ux.netbox.number.NumberField(fieldCfg.id,fieldCfg.label);
        break;
      case "date":
        field=new Ext.ux.netbox.date.DateField(fieldCfg.id,fieldCfg.label,fieldCfg.format);
        break;
      default:
        return(null);
    }
    if(fieldCfg.availableValues!==undefined){
      field.setAvailableValues(fieldCfg.availableValues);
      if(fieldCfg.remoteStore!==undefined){
        field.setStoreRemote(fieldCfg.remoteStore);
      }
      if(fieldCfg.type=="string" || fieldCfg.type=="enum"){
        field.addOperator(new Ext.ux.netbox.string.StringListOperator('STRING_LIST',field.stringListText));
        field.addOperator(new Ext.ux.netbox.string.StringListOperator('STRING_NOT_IN_LIST',field.stringNotListText));
      }
    }
    if(fieldCfg.defaultValues!==undefined)
      field.setDefaultValues(fieldCfg.defaultValues);
    if(fieldCfg.forceReload!==undefined)
      field.setForceReload(fieldCfg.forceReload);
    if(fieldCfg.caseSensitive!==undefined)
      field.setCaseSensitive(fieldCfg.caseSensitive);
    if(fieldCfg.validate!==undefined)
      field.setValidateFn(fieldCfg.validate);
    return(field);
  },
  /** This method add a Field to the array in FieldManager.
    * If this succeeds the event "fieldAdded" is triggered.
    * @param {Ext.ux.netbox.core.Field or field config} field The Field to add
    */
  addField : function(field){
    if(!(field instanceof Ext.ux.netbox.core.Field)){
      field=this.createFieldFromCfg(field);
    }
    this.fields.add(field);
    this.fireEvent("fieldAdded",field);
  },
  /** This method remove a Field from the array in FieldManager.
    * If this succeeds the event "fieldRemoved" is triggered. A removal can be vetoed returning false to the beforeFieldRemoved event
    * For example if an elementary filter exists for the given field, the FilterModel doesn't allow the removal.
    * @param {Ext.ux.netbox.core.Field} field The Field to remove
    */
  removeField : function(field){
    if(this.fields.containsKey(field.getId())){
      if(this.fireEvent("beforeFieldRemoved",field)!==false){
        if(this.fields.removeKey(field.getId()))
        this.fireEvent("fieldRemoved",field);
      }
    }
  },
  /** It removes all the fiels from this FieldManager
    */
  removeAll : function(){
    for (var i=this.fields.items.length-1; i >= 0; i--) {
      this.removeField(this.fields.items[i]);
    }
  },
  /** It removes all the fields from the field manager
    * and it readds the fields in the given config
    * @param {Array of field config} config An array of configuration object for the fields in this object. Optional, if not present an empty FieldManager is created. See the constructort description for more details
    */
  reconfigure: function(config){
    this.removeAll();
    if(config!==undefined){
      for(var i=0; i< config.length; i++){
        this.addField(config[i]);
      }
    }
  }

});