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
// $Id: Operator.js 206 2009-09-17 09:47:58Z dandfra $

Ext.namespace('Ext.ux.netbox.core');

/** Implements the operator class.
  * @constructor
  * @param {String} id The operator id
  * @param {String} label The label to show to the user
  * @class This class is the operator in an elementary filter (for example in 'name = "John"' the operator is '='). 
  * The editing and the rendering of the values are the main role of the operator class. (for example in a date field the editing widget and renderer are totally different if 
  * the operation is DATE_EQUAL or DATE_PERIOD). In this base implementation the class delegates all the behaviour to the associated field, and throws an exception if no field is associtated (using field.addOperator).
  * For a list of the operators available in Cherry look Ext.ux.netbox.string.StringField, Ext.ux.netbox.number.NumberField, Ext.ux.netbox.date.DateField
  */
Ext.ux.netbox.core.Operator=function(id, label){
  /** The id of this Ext.ux.netbox.core.Operator
    * @type String
    * @private
    */
  this.id=id;
  /** The label of this Ext.ux.netbox.core.Operator
    * @property {String} label
    * @private
    */
  this.label=((label==undefined)?id:label);
  /** The field that owns this operator.
    * @type Ext.ux.netbox.core.Field
    * @private
    */
  this.field=null;
}

Ext.ux.netbox.core.Operator.prototype = {

  /** It says if for this operator there is a list of available values. In this base class it always returns false.
    * @return {boolean} true if the operator supports a list of available values, false otherwise
    */
  isAvailableValuesAvailable: function(){
    if(this.getField()===null){
      throw("An operator must be associated to a Field to know if there is the list of the available values!");
    }
    return(this.getField().isAvailableValuesAvailable());
  },
  /** Returns the list of available values. By default it asks to the field the available values.
    * If you have a list of available values specific to the operator, overwrite this method.
    * @return {Array} an array of possible values, where a value is in the format {value: ... , label: ...}. If label is null the value is used as label.
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an Exception
    */
  getAvailableValues: function(){
    if(!this.isAvailableValuesAvailable()){
      throw("Available values not available!");
    }
    if(this.getField()==null){
      throw("An operator must be associated to a field to obtain the list of the available values!");
    }
    return(this.getField().getAvailableValues());
  },
  /** Returns the id of this operator.
    * @return {String} id of the operator
    */
  getId: function(){
    return(this.id);
  },
  /** Returns the label of this operator.
    * @return {String} label of the operator
    */
  getLabel: function(){
    return(this.label);
  },
  /** This function sets the field for this operator.
    * It's called by Ext.ux.netbox.core.Field. It should not be called by itself
    * @param {Ext.ux.netbox.core.Field} field The field that owns this operator
    */
  setField: function(field){
    this.field=field;
  },
  /** This function returns the field of this operator or null if not setted.
    * @return {Ext.ux.netbox.core.Field} field or null if not setted
    */
  getField: function(){
    return(this.field);
  },
  /** This method returns a string rendering the value.
    * The default implementation call the method render of Ext.ux.netbox.core.Field.
    * In this default implementation if the field of the operator is unknown, an exception is thrown
    * @param {Object} value The value to render
    * @return {String} the HTML fragment used to render the value of the elementary filter
    * @throws {String} If this method is called when the field is undefined or null
    */
  render: function(value){
    if(this.getField()===undefined || this.getField()===null){
      throw("Impossible to render a value from the operator "+this.getId()+" which is without field");
    }
    return(this.getField().render(value,this.getId()));
  },
  /** This method returns the Ext.Editor used to edit the value of the elemenatry filters using this operator.
    * The creation of the editor is delegated at the specific operetator.
    * In this default implementation if the field of the operator is unknown, an exception is thrown.
    * @param {boolean} cache true to use a cached editor if available, and to put the newly created editor in the cache if not available, false otherwise. The default is true
    * @return {Ext.Editor} the editor used to edit the values of this elementary filter
    * @throws {String} If this method is called when the field is undefined or null
    */
  getEditor: function(cache){
    if(this.getField()==undefined || this.getField()==null){
      throw("Impossible to obtain the editor for the operator "+this.getId()+" which is without field");
    }
    var editor;
    if(cache===undefined){
      cache=true;
    }
    if(this.editor==null || !cache){
      editor=this.createEditor();
      var myField=editor.field;
      var originalFunc=myField.validateValue;
      var myValidateFunc=this.validate;
      var myValidateScope=this;
      myField.validateValue=function(value){
        var val=myField.value;
    	  if(myField.value===undefined || myField.value===null)
    		  val="";
        if(originalFunc.call(this,val)===false)
          return false;
        var retval=myValidateFunc.call(myValidateScope,editor.getValue());
        if(retval===true)
          return true;
        myField.markInvalid(retval);
      };
      if(cache){
        this.editor=editor;
      }
    } else {
      editor=this.editor;
    }
    return(editor);
  },
  /** This method convert an old value of an elementary filter to a new value, suitable for this operator.
    * <B>NB:</B> if you want to return an empty operator return [].
    * In this default implementation, if it's an array, and the first element is of type {value: ... , label: ...},
    * an array with only the first element is returned. Otherwise it returns an empty array.
    * @param {Array of Object} values
    */
  convertValue: function(values){
    if(values !==null && values !== undefined && Ext.type(values)=="array"){
      if(values.length>0 && values[0].value!== undefined && values[0].label!== undefined){
        if(values.length==1){
          return(values);
        } else {
          return([values[0]]);
        }
      }
    }
    return([]);
  },
  /** This method returns a boolean that says if the store of the available values is local or remote.
    * If it returns true the store fetches data from remote, if it returns false the store uses local data.
    * In this default implementation it simply call the same method of the field.
    * In this default implementation if the field for the operator is unknown, an exception is thrown.
    * @return {boolean} true if the store fetches data from remote, false otherwise
    * @throws {String} If the field is null or undefined
    */
  isStoreRemote: function(){
    if(this.getField()===undefined || this.getField()===null){
      throw("Impossible to obtain the type of the store (remote/local) for the operator "+this.getId()+" which is without field");
    }
    return(this.getField().isStoreRemote());
  },
  /** Returns true if the store is always to reload.
    * In this default implementation it simply call the same method of the field.
    * In this default implementation if the field for the operator is unknown, an exception is thrown.
    * @return {boolean} True if the store is always to reload, false otherwise
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an exception
    */
  isForceReload: function(){
    if(this.getField()===undefined || this.getField()===null){
      throw("Impossible to obtain the forceReload info for the operator "+this.getId()+" which is without field");
    }
    return(this.getField().isForceReload());
  },
  /** Returns true if the added value should be compared with case sensitive.
    * In this default implementation it simply call the same method of the field.
    * In this default implementation if the field for the operator is unknown, an exception is thrown.
    * @return {boolean} True if the value should be compared with the store's one with case sensitive, false otherwise
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an exception
    */
  isCaseSensitive: function(){
    if(this.getField()===undefined || this.getField()===null){
      throw("Impossible to obtain the caseSensitive info for the operator "+this.getId()+" which is without field");
    }
    return(this.getField().isCaseSensitive());
  },
  /** Returns the list of default values. By default it asks the default values to the field.
    * If you have a list of default values specific to the operator, overwrite this method.
    * @return {Array} array of default values in the format {value: ... , label: ...}
    */
  getDefaultValues : function(){
    return(this.getField().getDefaultValues());
  },
  /** Validate the values of the ElementaryFilter.
    * In this implementation:
    * <ul>
    * <li> if a validation function is setted on the operation it is called and the result is returned</li>
    * <li> if this operations doesn't have a field an exception is thrown </li>
    * <li> the field validation is invoked, and if it returns true, the optional additional validate is returned, else false is returned</li>
    * </ul>
    * @param {Array} values The values to be validated
    * @return {boolean} true if the values are valid
    * @return {String} the message returned by the custom validator if the values are not valid
    * @throws {String} If the field is null or undefined and the validation function is not set
    */
  validate: function(values){
    if(this.validateFn!==undefined){
      return this.validateFn.call(this,values);
    } 
    if(this.getField()===undefined || this.getField()===null){
      throw("Impossible to call the validate function on the field: is not defined. Operation id: "+this.getId());
    }
    var validation=this.getField().validate(values);
    if(validation && this.additionalValidationFn){
      validation=this.additionalValidationFn.call(this,values);
    }
    return(validation);
  },
  /** Returns the editor. By default it asks the editor to the field.
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(){
    if(this.getField()===undefined || this.getField()===null){
      throw("Impossible to create the editor for the operator "+this.getId()+" which is without field");
    }
    return(this.getField().createEditor(this.getId()));
  },
  
  /** It sets a validate function to add some validation, specific to the operation, to the basic field one
    * @param {function} additionalValidationFn The additional validation function. It has as only parameter the value of the field.
    * Example of usage:
    * <PRE>
    * var myValidateFunction=function(valuesArray){
    *   if(valuesArray.length > 0){
    *     if(valuesArray[0].value > 1)
    *       return true;
    *     else
    *       return "The value is too small";
    *   }else{
    *     return "The value is required";
    *   }
    * };
    * operator.addValidateFn(myValidateFunction);
    * </PRE>
    */
  addValidateFn: function(additionalValidationFn){
    this.additionalValidationFn=additionalValidationFn;
  },
  /** It sets a validate function that completlly override the basic field validation
    * @param {function} validateFn The validation function. It has as only parameter the value of the field.
    * Example of usage:
    * <PRE>
    * var myValidateFunction=function(valuesArray){
    *   if(valuesArray.length > 0){
    *     if(valuesArray[0].value > 1)
    *       return true;
    *     else
    *       return "The value is too small";
    *   }else{
    *     return "The value is required";
    *   }
    * };
    * operator.setValidateFn(myValidateFunction);
    * </PRE>
    */
  setValidateFn: function(validateFn){
    this.validateFn=validateFn;
  }
};// $Id: Field.js 184 2008-09-19 15:05:19Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** Implements the field class.
  * @constructor
  * @param {String} id The field id.
  * @param {String} label The label of the filter. If not supplied the id is used. Optional
  * @class A field is an item on whch I want to perform filter operations.
  * For example if I have a grid with a column 'Price' and I want to filter on the price column, surelly I have a filter on the price column.
  * In a filter the operators available are defined (for example, on the Price column I want only to have the =, and > operators. The Price field will have these 2 operators.
  * Among all the operators there is an operator of default, that will be used as default when a new elementary filter is instantiated.
  * A field can have a list of available values, a default way to render and editor for the values of the elementary filters and so on.
  * Usually you should not instantiate a field directly, but the Ext.ux.netbox.core.FieldManager (or directly the Ext.ux.netbox.core.FieldModel) instantiates them.
  */
Ext.ux.netbox.core.Field=function(id,labelIn,defaultValues){
  Ext.ux.netbox.core.Field.superclass.constructor.call(this);
  this.addEvents(/** @scope Ext.ux.netbox.core.Field.prototype */{
    /** Fires when a operator is added
      * @event operatorAdded
      * @param {Ext.ux.netbox.core.Operator} operator The added operator
      */
    operatorAdded : true,
    /** Fires when a operator is removed
      * @event operatorRemoved
      * @param {Ext.ux.netbox.core.Operator} operator The removed operator
      */
    operatorRemoved : true,
    /** Fires when a defaultOperator is changed
      * @event defaultOperatorChanged
      * @param {Ext.ux.netbox.core.Operator} defaultOperator The changed defaultOperator
      */
    defaultOperatorChanged : true
  });
  /** The id of this Field
    * @type String
    * @private
    */
  this.id=id;
  /** The label of this Field
    * @property {String} label
    * @private
    */
  this.label=((labelIn===undefined)?id:labelIn);
  /** The list of all the available operators for this Field
    * @property {Array of Ext.ux.netbox.core.Operator} availableOperators
    * @private
    */
  this.availableOperators=[];
  /** The default operator for this Field
    * @property {Ext.ux.netbox.core.Operator} defaultOperator
    * @private
    */
  this.defaultOperator=null;
  /** The editor used to edit the value of an elementary filter based on this Field,
    * when the operator doesn't provide a specialized implementation.
    * @private
    */
  this.editor=null;
  /** The Store or array used to obtain the list of the available values.
    * It must contain a value field and a label field.
    * Example:<PRE>
    * var store = new Ext.data.SimpleStore({
    * fields: ['label', 'value'],
    * data : exampleData
    * });</PRE>
    * <B>NB:</B> Both fields must be strings
    * @property {Ext.data.Store} availableValueStore
    * @private
    */
  this.availableValueStore=null;
  /** This value says if the store used to obtain the availableValues uses remote or local data
    * If true it uses remote data, if false it uses local data. The default is true.
    * @property {boolean} isRemote
    * @private
    */
  this.isRemote=true;
  /** This value says if the store is always to reload.
    * If true it reloads data everytime expanding the combo, if false it loads once. The default is false.
    * @property {boolean} forceReload
    * @private
    */
  this.forceReload=false;
  /** This attribute says if the value should be compared with the store's one with case sensitive. The default is true.
    * @property {boolean} caseSensitive
    * @private
    */
  //this.caseSensitive=true;
  /** The default values of this Field. Optional.
    * @property {Array} defaultValues
    * @private
    */
  this.defaultValues=((defaultValues==undefined)?[]:defaultValues);
  /** The validate function of this Field. Optional.
    * @property {function} validateFunc
    * @private
    */
  this.validateFunc=null;
}

Ext.extend(Ext.ux.netbox.core.Field,Ext.util.Observable,/** @scope Ext.ux.netbox.core.Field.prototype */
{
  /** This attribute says if the value should be compared with the store's one with case sensitive. The default is true.
    * @property {boolean} caseSensitive
    * @private
    */
    caseSensitive : true,
  /** This method returns the default values for this Field.
    * @return {Array} The default values for this Field
    */
  getDefaultValues : function(){
    return(this.defaultValues);
  },
  /** This method sets the default values for this Field.
    * @param {Array} values The default values for this Field
    */
  setDefaultValues : function(values){
    var arrayValues=[];
    for(var i=0;i<values.length;i++){
      if(values[i].label==undefined){
        values[i].label=values[i].value;
      }
      arrayValues.push(values[i]);
    }
    this.defaultValues=arrayValues;
  },
  /** This method returns the default operator for this Field.
    * Before the setDefaultOperator method is called it returns null.
    * @return {Ext.ux.netbox.core.Operator} The default operator for this Field
    */
  getDefaultOperator : function(){
    return(this.defaultOperator);
  },
  /** This method sets the default operator for this Field.
    * The default operator must be among the operators of this Field. If not an exception is thrown.
    * If this succeeds the event "defaultOperatorChanged" is triggered.
    * @param {Ext.ux.netbox.core.Operator} defaultOperator The default operator for this Field
    */
  setDefaultOperator : function(defaultOperator){
    var id=defaultOperator.getId();
    var oper=this.getAvailableOperatorById(id);
    if (oper==null){
      throw("operator not among available operators");
    }
    this.defaultOperator=defaultOperator;
    this.fireEvent("defaultOperatorChanged",defaultOperator);
  },
  /** Returns the array or store used to obtain the list of available values for this Field.
    * In this base class it throws an exception since isAvailableValuesAvailable always returns false
    * @return {Ext.data.Store} The store used to obtain the available values
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an Exception
    */
  getAvailableValues : function(){
    if(!this.isAvailableValuesAvailable()){
      throw("Available values not available!");
    }
    return(this.availableValueStore);
  },
  /** This method sets the store or Array of the available values.
    * If the value is not null, isAvailableValuesAvailable values available will return true
    * The store must contain a value field and a label field.
    * Example: <PRE>
    * var store = new Ext.data.SimpleStore({
    * fields: ['label', 'value'],
    * data : exampleData
    * });</PRE>
    * @param {Ext.ux.Store} store The store used to obtain the available values
    */
  setAvailableValues: function(store){
    this.availableValueStore=store;
    this.editor=null;
  },
  /** It says if there is a list of available values.
    * In this implementation it returns false if the setAvailableValues was not called with a Store or Array,
    * or if the last time you called it, the passed value is different from null
    * @return {boolean} true if the operator supports a list of available values, false otherwise
    */
  isAvailableValuesAvailable: function(){
    return(this.availableValueStore!==null);
  },
  /** This method is used to set a variable that says if the store of the available values is local or remote.
    * If isAvailableValuesAvailable returns false the value is ignored. The default is true.
    * <B>NB:</B> This method is used to instantiate the editor, and this happens on the first edit.
    * After this moment every change in the parameter is ignored
    * @param {boolean} isRemote True if the store is remote, false otherwise
    */
  setStoreRemote: function(isRemote){
    this.isRemote=isRemote;
  },
  /** This method returns a value that says if the store of the available values is local or remote.
    * If it returns true the store fetches data from remote, if it returns false the store uses local data.
    * If isAvailableValuesAvailable returns false, the method throws an exception.
    * @return {boolean} True if the store fetches data from remote, false otherwise
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an exception
    */
  isStoreRemote: function(){
    if(!this.isAvailableValuesAvailable()){
      throw(this.getId()+" isStoreRemote: no store available");
    }
    return(this.isRemote);
  },
  /** Sets the attribute that decides forced reloading of store.
    * @param {boolean} forceReload True if the store is always to reload, false otherwise
    */
  setForceReload: function(forceReload){
    this.forceReload=forceReload;
  },
  /** Returns true if the store is always to reload. Default is false.
    * @return {boolean} True if the store is always to reload, false otherwise
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an exception
    */
  isForceReload: function(){
    if(!this.isAvailableValuesAvailable()){
      throw(this.getId()+" isForceReload: no store available");
    }
    return(this.forceReload);
  },
  /** Set the attribute that decide whether the added value should be compared with case sensitive.
    * @param {boolean} caseSensitive True if the value should be compared with the store's one with case sensitive, false otherwise
    */
  setCaseSensitive: function(caseSensitive){
    this.caseSensitive=caseSensitive;
  },
  /** Returns true if the added value should be compared with case sensitive. Default is false.
    * @return {boolean} True if the value should be compared with the store's one with case sensitive, false otherwise
    * @throws {String} If isAvailableValuesAvailable returns false this method throws an exception
    */
  isCaseSensitive: function(){
    if(!this.isAvailableValuesAvailable()){
      throw(this.getId()+" isCaseSensitive: no store available");
    }
    return(this.caseSensitive);
  },
  /** Add a operator to the list of available operator.
    * If this succeeds the event "operatorAdded" is triggered.
    * If the Field of the operator is not null and different that this one an exception is thrown.
    * @param {Ext.ux.netbox.core.Operator} operator. The operator to add
    * @throw {String} If the operator is already associated to a different filter type
    */
  addOperator : function(operator){
    if(operator.getField()!==null && operator.getField()!=this){
      throw("Impossible to add the operator "+operator.getId()+" to the Field "+this.getId()+". The operator is already associated to another Field");
    }
    this.availableOperators.push(operator);
    operator.setField(this);
    this.fireEvent("operatorAdded",operator);
  },
  /** This method returns the list of the available operators.
    * @return {Array} An array containing all the available operators.
    * If no operator is available it returns an empty array
    */
  getAvailableOperators : function(){
    return(this.availableOperators);
  },
  /**This method returns the operator by Id.
    * @param {String} id The id of the operator
    * @return {Ext.ux.netbox.core.Operator} The operator with the given id or null if no operator is found
    */
  getAvailableOperatorById : function(id){
    var index=this._getOperatorIndexById(id);
    if(index===null)
      return(null);
    else
      return(this.getAvailableOperators()[index]);
  },
  /** Search an operator and returns the index.
    * @param {String} id The id of the operator to search
    * @return {int} The index of the operator with the given id, or null if the operator doesn't exists
    * @private
    */
  _getOperatorIndexById : function(id){
    var availableOps=this.getAvailableOperators();
    for(var i=0; i<availableOps.length;i++){
      if(availableOps[i].getId()==id){
        return(i);
      }
    }
    return(null);
  },
  /** This method remove an operator from the list of the operators.
    * If this succeeds the event "operatorRemoved" is triggered. Is not possible to remove the defaultOperator.
    * @param {String} id The id of the operator to remove
    * @throws {String} If the operator to remove is the defaultOperator
    * @throws {String} If the operator with the given id is not found
    */
  removeOperator : function(id){
    var index=this._getOperatorIndexById(id);
    if(index===null){
      throw("The operator with the given id doesn't exist");
    } else {
      var operator=this.getAvailableOperators()[index];
      if (operator==this.getDefaultOperator) {
        throw("operator to remove is the DefaultOperator");
      }
      this.availableOperators.splice(index,1);
      this.fireEvent("operatorRemoved",operator);
    }
  },
  /** This method returns an elementaryFilter's instance of the type of this Field.
    * The operator of the elementaryFilter is the default operator of this Field.
    * @param {Ext.ux.netbox.core.Operator} operator The operator to set on the filter. Optional. As defult the default operator is used.
    * @throws {String} If the given operator is not in this field
    * @return {Ext.ux.netbox.core.ElementaryFilter} The elementaryFilter's instance
    */
  getElementaryFilterInstance : function(operator){
    var filter=new Ext.ux.netbox.core.ElementaryFilter(this,operator);
    return filter;
  },
  /** This method returns the id of this Field.
    * @return {String} the id of this Field
    */
  getId : function(){
    return(this.id);
  },
  /** This method returns the label of this Field.
    * @return {String} the label of this Field
    */
  getLabel : function(){
    return(this.label);
  },
  /** This method returns a string rendering the value. It's used when the operator doesn't provide a specialized implementation.
    * In this default implementation it returns:
    * <PRE>
    *       Condition                Returns
    *----------------------         ---------
    * is undefined or null          Empty String
    * array with length 0           Empty String
    * array with length > 0         The return of this function called on the the values of the array concatenated using ","
    * object with the label         this function called on value.label
    * and the value fields
    * something else                String(value)
    * </PRE>
    * @param {Object} value The value to render
    * @param {String} operatorId The id of the operator in the Filter
    * @return {String} the HTML fragment used to render the value of the Filter
    */
  render: function(value,operatorId){
    if(value !==undefined && value!==null){
      if(Ext.type(value)=="array"){
        var rendered=[];
        for(var i=0;i<value.length;i++){
          rendered.push(this.render(value[i],operatorId));
        }
        return(rendered.join(","));
      }else {
        if(value.value!==undefined && value.label!==undefined){
          return(this.render(value.label,operatorId));
        }
        return(String(value));
      }
    } else {
      return("");
    }
  },
  /** This method creates the editor for the grid when the operator doesn't provide a specialized implementation.
    * In this default implementation it simply returns an Ext.ux.netbox.core.AvailableValuesEditor (ie a ComboBox) if there are availble values
    * or a Ext.ux.netbox.core.TextValuesEditor (ie a TextField) otherwise.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var editor;
    if(!this.isAvailableValuesAvailable()){
      editor=new Ext.ux.netbox.core.TextValuesEditor();
    } else {
      editor=new Ext.ux.netbox.core.AvailableValuesEditor(this.getAvailableValues(),{remote: this.isStoreRemote(),forceReload: this.isForceReload(),caseSensitive: this.isCaseSensitive()});
    }
    return editor;
  },
  /** This method sets the function used to validate the values on the field. Example of usage:
    * <PRE>
    * var myValidateFunction=function(valuesArray){
    *   if(valuesArray.length > 0){
    *     if(valuesArray[0].value > 1)
    *       return true;
    *     else
    *       return "The value is too small";
    *   }else{
    *     return "The value is required";
    *   }
    * };
    * field.setValidateFn(myValidateFunction);
    * </PRE>
    * @param {function} func The function used to validate the values on the field. This function has only the value of the filter as parameter
    */
  setValidateFn: function(func){
    this.validateFunc=func;
  },
  /** This method calls the validation function provided for the field. If none is supplied returns always true.
    * @param {Array} values The values to be validated
    * @return {boolean} true if the values are valid
    * @return {String} the message returned by the custom validator if the values are not valid
    */
  validate: function(values){
    if(this.validateFunc!==null){
      return this.validateFunc.call(this,values);
    }else{
      return true;
    }
  },

  /** Function to use as validator if an empty value is not allowed
    * <h4> Example</h4>
    * <pre>
    * field.setValidateFn(field.emptyNotAllowedFn);
    * </pre>
    */
  emptyNotAllowedFn: function(value){
    if(!value)
      return(this.emptyNotAllowed);
    if(!value.length)
      return(this.emptyNotAllowed);
    return(true);
  },
   /** Text to show when the field is empty and this is not allowed
    */
  emptyNotAllowed: "Empty value not allowed"
});// $Id: Filter.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** This class is an abstract one. See ElementaryField or CompositeField
  * @class The base class for the filter. A filter can be of 2 type:
  * <ol>
  * <li> elementary. It's a filter made only of a condition, for example foo = 'bar'</li>
  * <li> composite. It's a filter made of other filters, that are connected together using a logical operator (AND, OR etc...). Actualy only the AND and OR operators are supported.</li>
  * </ol>
  * This is an abstract class ( a lot of the methods of this class just thow an exception). You should not instantie this class directly. See Ext.ux.netbox.core.CompositeFilter and Ext.ux.netbox.core.ElementaryFilter
  * @constructor
  */
Ext.ux.netbox.core.Filter = function () {
  Ext.ux.netbox.core.Filter.superclass.constructor.call(this);
}

Ext.extend(Ext.ux.netbox.core.Filter,Ext.util.Observable,/** @scope Ext.ux.netbox.core.Filter.prototype */
{
  /** This method returns a javascript object representing the filter.
    * The format of the object returned is dependant on the children implementing this class.
    * If the class is an ElementaryFilter it returns an array of this format:
    * <PRE>{fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}</PRE>
    * If the class is a CompositeFilter it returns an array of this format:
    * <PRE>{left : Ext.ux.netbox.core.Filter, logicalOperator : String, right : Ext.ux.netbox.core.Filter}</PRE>
    * <h4> Example </h4>
    * <PRE>
    * {
    *    left:{
    *      left:{fieldId:"field4",operatorId:"DATE_EQUAL",values:[{label:"12/10/2009 12:12",value:"2009-10-12 12:12:00"}]},
    *      logicalOperator:"AND",
    *      right:{fieldId:"field3",operatorId:"STRING_EQUAL",values:[{"label":"label1","value":"valore1"}]}
    *    },
    *    logicalOperator:"AND",
    *    right:{fieldId:"field",operatorId:"NUMBER_EQUAL",values:[{"label":5,"value":5}]}
    * }
    * </pre>
    * @return {Object} A javascript object rapresenting the filter
    * @throws {String} In this base class an exception is thrown
    */
  getFilterObj : function(){
    throw("getFilterObj is an abstract method!");
  },
  /** This method sets the current filter. The format of the object is dependant on the children implementing this class.
    * If the class is a ElementaryFilter it must be in this format:
    * <PRE>{fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}</PRE>
    * If it's a CompositeFilter it must be in this format:
    * <PRE>{left : Ext.ux.netbox.core.Filter, logicalOperator : String, right : Ext.ux.netbox.core.Filter}</PRE>
    * @param {Object} filter javascript object rapresenting the filter
    * @throws {String} In this base class an exception is thrown
    */
  setFilterObj : function(filter){
    throw("setFilterObj is an abstract method!");
  },
  /** This method get an Ext.ux.netbox.core.ElementaryFilter by id if it is contained in this Filter. If not found return null.
    * @param {String} id The id of the ElementaryFilter
    * @return {Ext.ux.netbox.core.ElementaryFilter} The ElementaryFilter returned
    * @throws {String} In this base class an exception is thrown
    */
  getElementaryFilterById : function(id){
  	throw("getElementaryFilterById is an abstract method!");
  },
  /** This method get an array of Ext.ux.netbox.core.ElementaryFilter by fieldId. If not found return an empty array.
    * @param {String} fieldId The id of the field
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter} The array of ElementaryFilter with the same fieldId or an empty array
    * @throws {String} In this base class an exception is thrown
    */
  getElementaryFiltersByFieldId : function(fieldId){
  	throw("getElementaryFiltersByFieldId is an abstract method!");
  }

});// $Id: ElementaryFilter.js 131 2008-03-13 10:52:56Z dandfra $

Ext.namespace('Ext.ux.netbox.core');

/** Build a new elementaryFilter. The second (optional) argument is the operator for the elementaryFilter.
  * If none is supplied, is the default operator of the field.
  * If the second argument is undefined or null and the default operator is null an exception is thrown.
  * If the operator is supplied but it's not supported by the field an exception is thrown.
  * @class An elementary filter is a condition on a field. For example state='California' is an elementary filter. In this example state is the field, = is the operator and 'California' is the value.
  * An "exportable" rapresentation of a filter is an object in this format:
  * <pre> {fieldId: &lt; The id of the field &mt;, operatorId: &lt;The id of the operator &mt;, values: &lt; The values &mt;}</pre>
  * An elementary filter has an id, but is automatically generated, it's not exported by getFilterObj
  * @constructor
  * @param {Ext.ux.netbox.core.Field} field The Field owner of this elementaryFilter.
  * @param {Ext.ux.netbox.core.Operator} operator Optional. The Operator for the filter. If not supplied the default operator is used.
  * @extends Ext.ux.netbox.core.Filter
  */
Ext.ux.netbox.core.ElementaryFilter = function(field, operator){
  Ext.ux.netbox.core.ElementaryFilter.superclass.constructor.call(this);
  this.addEvents(/** @scope Ext.ux.netbox.core.ElementaryFilter.prototype */{
    /** Fires when a operator is changed
      * @event operatorChanged
      * @param {Ext.ux.netbox.core.ElementaryFilter} elementaryFilter The elementaryFilter that fires the event.
      * @param {Ext.ux.operator} operator The new operator
      */
    operatorChanged : true,
    /** Fires when a value is changed
      * @event valueChanged
      * @param {Ext.ux.netbox.core.ElementaryFilter} elementaryFilter The elementaryFilter that fires the event.
      * @param {String} value The new changed value
      */
    valueChanged : true
  });
  /** The id of this elementaryFilter
    * @type String
    * @private
    */
  this.id = field.getId()+Ext.ux.netbox.core.ElementaryFilter.sequence;
  Ext.ux.netbox.core.ElementaryFilter.sequence++;

  /** The Field that owns this elementaryFilter
    * @type Ext.ux.netbox.core.Field
    * @private
    */
  this.field=field;

  /** The Operator of this elementaryFilter
    * @type Ext.ux.netbox.core.Operator
    * @private
    */
  this.operator;
  this.setOperator(((operator==undefined)?field.getDefaultOperator():operator));

  /** The list of values associated to this elementaryFilter
    * @property {Object} values The values associated to this elementaryFilter
    * @private
    */
  this.values;
  this.setValues(this.getOperator().getDefaultValues());
}
if(Ext.ux.netbox.core.ElementaryFilter.sequence==undefined){
  Ext.ux.netbox.core.ElementaryFilter.sequence=0;
}

Ext.extend(Ext.ux.netbox.core.ElementaryFilter,Ext.ux.netbox.core.Filter,/** @scope Ext.ux.netbox.core.ElementaryFilter.prototype */
{
  /** This method returns the Field for this elementaryFilter.
    * @return {Ext.ux.netbox.core.ElementaryField} The Field for this elementaryFilter
    */
  getField : function(){
    return(this.field);
  },
  /** This method returns the Operator for this elementaryFilter.
    * @return {Ext.ux.netbox.core.Operator} The Operator for this elementaryFilter
    */
  getOperator : function(){
    return(this.operator);
  },
  /** This method sets the Operator for this elementaryFilter passing the Ext.ux.netbox.core.Operator or a String containing the operator's Id.
    * If the operator is not supported by the elementaryFilter an exception is throw. This function fires the operatorChanged event.
    * The old value of the elementaryFilter is converted using the covertValue method of the new operator.
    * @param {Ext.ux.netbox.core.Operator or String} operator The Operator for this elementaryFilter or the operator's Id
    * @throw {String} If the operator is not supported by the elementaryFilter
    */
  setOperator : function(operator){
    if(operator==null){
      throw("Null Operator not allowed");
    }
    if(operator.getId){
      if(this.field.getAvailableOperatorById(operator.getId())==null) throw("Operator "+operator.getId()+" is not available for this elementaryFilter");
    } else {
      var operatorTmp=this.getField().getAvailableOperatorById(operator);
      if(operatorTmp==null){
        throw("Operator "+operator+" is not available for this elementaryFilter");
      }
      operator=operatorTmp;
    }
    this.operator=operator;
    this.fireEvent("operatorChanged",this,operator);
    this.setValues(this.operator.convertValue(this.getValues()));
  },
  /** This method returns the value for this elementaryFilter.
    * @return {Array} The array of values for this elementaryFilter
    */
  getValues : function(){
    if(this.values){
      return(this.values.concat());
    }
    return(this.values);
  },
  /** This method add a value for this elementaryFilter.
    * @param {String} value A value to add for this elementaryFilter
    */
  addValue : function(val){
    this.values.push(val);
    this.fireEvent("valueChanged",this,val);
  },
  /** This method remove a value for this elementaryFilter. If the value is not found an exception is thrown.
    * @throw {String} When the given value is not found
    * @param {String} value The value to remove for this Filter
    */
  removeValue : function(val){
    var find=-1
    for(var i=0;i<this.getValues().length;i++){
      if(this.getValues()[i]==val){
        find=i;
        break;
      }
    }
    if(find!=-1){
      this.values.splice(find,1);
      this.fireEvent("valueChanged",this,val);
    } else {
      throw("Unable to remove the value "+val+". Not found");
    }
  },
  /** This method set a list of values for this elementaryFilter. This method fires a valueChanged event.
    * The values must be an Array. If it's not an array an exception is thrown.
    * The empty value is an empty array. If values is null or undefined an exception is thrown.
    * If the given values are equal (compared using json encode) to the actual values, no event is fired.
    * @param {Array} values The values for this elementaryFilter
    */
  setValues : function(values){
    if(values===undefined || values === null){
      throw("ElementaryFilter "+this.getId()+". Impossible to set a undefined or null value. The empty value is an empty array.");
    }
    if(Ext.type(values)!="array"){
      throw("ElementaryFilter "+this.getId()+". The value of a ElementaryFilter MUST be an array!");
    }
    if(Ext.util.JSON.encode(this.values)!=Ext.util.JSON.encode(values)){
      if(this.getOperator().validate(values)===true || this.getOperator().validate(this.getValues())!==true){
        this.values=values;
        this.fireEvent("valueChanged",this,values);
      }
        
    }
  },
  /** This method returns a javascript object representing the elementaryFilter.<BR>
    * The format is the following:
    * <PRE>{fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}</PRE>
    * @return {Object} A javascript object rapresenting the elementaryFilter.
    */
  getFilterObj : function(){
    return ({fieldId : this.getField().getId(), operatorId : this.getOperator().getId(), values : this.getValues()});
  },
  /** This method, given a javascript object representing an elementaryFilter, sets the elementaryFilter itself.<BR>
    * The format is the following:
    * <PRE>{fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}</PRE>
    * @param {Object} filter The object containing the elementaryFilter to set
    * @throw {String} if the fieldId passed is not the same of the actual one
    */
  setFilterObj : function(filter){
    if(this.getField().getId()!=filter.fieldId){
      throw("Wrong field for this filter. Expected "+this.getField().getId()+" got "+filter.fieldId);
    }
    this.setOperator(this.getField().getAvailableOperatorById(filter.operatorId));
    this.setValues(filter.values);
  },
  /** This method returns the id of current elementaryFilter.
    * @return {String} The elementaryFilter's id returned
    */
  getId : function(){
  	return(this.id);
  },
  /** This method get an Ext.ux.netbox.core.ElementaryFilter by id or null if not found.
    * @param {String} id The elementaryFilter's id
    * @return {Ext.ux.netbox.core.ElementaryFilter} The elementaryFilter returned
    */
  getElementaryFilterById : function(id){
  	if(this.getId()==id)
  	  return(this);
  	return(null);
  },
  /** This method returns an array containig this elementaryFilter by fieldId.
    * If not found an empty array is returned.
    * @param {String} fieldId The field's id
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter} Array with the elementaryFilter returned
    */
  getElementaryFiltersByFieldId : function(fieldId){
  	if(this.getField().getId()==fieldId)
  	  return([this]);
  	return([]);
  },
  /** This method controls if the values is setted for this elementaryFilter.
    * @return {boolean} true if this elementaryFilter is valid, false otherwise
    */
  isValid : function(){
    if(this.values!==undefined && this.getOperator().validate(this.values)===true)
      return true;
    else
      return false;
  }

});// $Id: CompositeFilter.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** It create a new composite filter
  * @class The class implements composite filter, for example (A=1 AND B=2) OR C=3 is a composite filter.
  * Since the logical operators (AND,OR) are binary operator, a composite filter has 2 sides (the left and the right one), and the logical operator between the 2.
  * More composite filters can be built combining other composite filter.
  * For example (A=1 AND B=2) OR C=3 is a composite filter which has on the left a composite filter A=1 AND B=2 and on the right an elementary filter (C=3).
  * @constructor
  * @param {Ext.ux.netbox.core.Filter} left The left side of the composite filter
  * @param {String} logicalOperator The logical operator. Must be one between <em>Ext.ux.netbox.core.CompositeFilter.AND</em> and <em>Ext.ux.netbox.core.CompositeFilter.OR</em>. If not an exception is thown.
  * @param {Ext.ux.netbox.core.Filter} right The right side of the composite filter. Can be null. If null the value of logical operator is ignored.
  * @throws {String} If the logical operator is unknown.
  * @extends Ext.ux.netbox.core.Filter
  */
Ext.ux.netbox.core.CompositeFilter = function (left, logicalOperator, right){
  Ext.ux.netbox.core.CompositeFilter.superclass.constructor.call(this);
  this.addEvents(/** @scope Ext.ux.netbox.core.CompositeFilter.prototype */{
    /** Fires when the left side of the filter is changed
      * @event leftSideChanged
      * @param {Ext.ux.netbox.core.CompositeFilter} filter The composite filter that fires the event
      */
    leftSideChanged : true,
    /** Fires when the right side of the filter is changed
      * @event rightSideChanged
      * @param {Ext.ux.netbox.core.CompositeFilter} filter The composite filter that fires the event
      */
    rightSideChanged : true,
    /** Fires when the logical operator is changed
      * @event operatorChanged
      * @param {Ext.ux.netbox.core.CompositeFilter} filter The composite filter that fires the event
      */
    operatorChanged : true
  });
  /** The left side of the composite filter
    * @type Ext.ux.netbox.core.Filter
    * @private
    */
  this.left;
  this.setLeftSide(left);
  /** The logical operator between the left and the right side of the composite filter
    * @type String
    * @private
    */
  this.logicalOperator;
  this.setLogicalOperator(logicalOperator);
  /** The right side of the composite filter
    * @type Ext.ux.netbox.core.Filter
    * @private
    */
  this.right;
  this.setRightSide(right);
}

/** @ignore
  */
Ext.ux.netbox.core.CompositeFilter.OR="OR";
/** @ignore
  */
Ext.ux.netbox.core.CompositeFilter.AND="AND";

Ext.extend(Ext.ux.netbox.core.CompositeFilter, Ext.ux.netbox.core.Filter,/** @scope Ext.ux.netbox.core.CompositeFilter.prototype */
{
  /** A constant representing the AND logical operator. This is a static property of CompositeFilter
    * @type String
    */
  //here only to generate documentation
  AND: Ext.ux.netbox.core.CompositeFilter.AND,
  
  /** A constant representing the OR logical operator. This is a static property of CompositeFilter
    * @type String
    */
  //here only to generate documentation
  OR: Ext.ux.netbox.core.CompositeFilter.OR,
  
  /** This method sets the logical operator of this composite filter and fires the event operatorChanged.
    * The logical operator must be one among <em>Ext.ux.netbox.core.CompositeFilter.AND</em> and <em>Ext.ux.netbox.core.CompositeFilter.OR</em>. If not an exception is thrown.
    * @param {String} logicalOperator The logical operator
    * @throws {String} If the logical operator is unknown
    */
  setLogicalOperator : function(logicalOperator){
    if (logicalOperator!=Ext.ux.netbox.core.CompositeFilter.AND && logicalOperator!=Ext.ux.netbox.core.CompositeFilter.OR) {
      throw("Unknown logical operator : "+logicalOperator);
    }
    this.logicalOperator=logicalOperator;
    this.fireEvent("operatorChanged",this);
  },
  /** This method returns the logical operator of this composite filter.
    * @return {String} The logical operator
    */
  getLogicalOperator : function(){
    return(this.logicalOperator);
  },
  /** This method sets the right side of a composite filter and fires the event rightSideChanged.
    * @param {Ext.ux.netbox.core.Filter} right The new right side.
    */
  setRightSide : function(right){
    this.right=right;
    this.fireEvent("rightSideChanged",this);
  },
  /** This method returns the right side of this composite filter.
    * @return {Ext.ux.netbox.core.Filter} The right side of this composite filter
    */
  getRightSide : function (){
    return(this.right);
  },
  /** This method sets the left side of this composite filter and fires the event leftSideChanged.
    * @param {Ext.ux.netbox.core.Filter} left The new left side.
    */
  setLeftSide : function(left){
    this.left=left;
    this.fireEvent("leftSideChanged",this);
  },
  /** This method returns the left side of this composite filter.
    * @return {Ext.ux.netbox.core.Filter} The left side of this composite filter
    */
  getLeftSide : function(){
    return(this.left);
  },
  /** This method sets the current composite filter.
    * @param {Object} filter {left : Ext.ux.netbox.core.Filter, logicalOperator : String, right : Ext.ux.netbox.core.Filter}
    */
  setFilterObj : function(filter){
    this.setLeftSide(filter.left);
    this.setLogicalOperator(filter.logicalOperator);
    this.setRightSide(filter.right);
  },
  /** This method returns a javascript object representing the composite filter.
    * @return {Object} {left : Ext.ux.netbox.core.Filter, logicalOperator : String, right : Ext.ux.netbox.core.Filter}
    */
  getFilterObj : function(){
    return {left:this.getLeftSide(), logicalOperator:this.getLogicalOperator(), right:this.getRightSide()};
  },
  /** This method returns an elementary filter by Id. If not found returns null.
    * @param {String} id The id of the elemenatry filter
    * @return {Ext.ux.netbox.core.ElementaryFilter} The elemenatry filter with the given id or null if elemenatry filter is not found
    */
  getElementaryFilterById : function(id){
    var toReturn=this.getLeftSide().getElementaryFilterById(id);
    if(toReturn!=null)
      return(toReturn);
    if(this.getRightSide()!=null)
      return(this.getRightSide().getElementaryFilterById(id));
    return null;
  },
  /** This method returns an array of elemenatry filter with the same fieldId. If not found returns an empty array.
    * @param {String} fieldId The id of the field
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter} The array of elemenatry filters with the same fieldId or an empty array If not found
    */
  getElementaryFiltersByFieldId : function(fieldId){
    var toReturn=this.getLeftSide().getElementaryFiltersByFieldId(fieldId);
    if(this.getRightSide()!=null)
      toReturn=toReturn.concat(this.getRightSide().getElementaryFiltersByFieldId(fieldId));
    return toReturn;
  }

});// $Id: FieldManager.js 168 2008-08-21 08:32:46Z bobbicat71 $

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

});// $Id: FilterModel.js 181 2008-09-12 14:06:10Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** Creates a new FilterModel. It can have as input parametr a fieldManager or the config to build the fieldManager
  * @class The filter model is the core class of the whole filter design, and probably the one you will interact most. It's the class that mantains the filter, it's the class used to obtain
  * an export of the filter in a predefined way (look at getFilterObj for more information about the format), to import a filter, to add or remove a filter and so on. All the views (for example QuickFilterModelView, StaticFilterModelView and DynamicFilterModelView)
  * just shows the data contained in the filter model, and use the filterModel to perform some operation on the filter.
  * A filter model only manages elementary filters that have their field inside the fieldManager that is used to build the filterModel.
  * <h4> Examples </h4>
  * Build a filter model given the fieldManager
  * <pre>
  * var fieldManager=new Ext.ux.netbox.core.FieldManager(fieldManager);
  * </pre>
  * Build a filter model using the config to a fieldManager:
  * <pre>
  *  var filterCfg=[
  *    {id: 'company',label: 'Company'},
  *    {id: 'price',label: 'Price', type: 'float'},
  *    {id: 'change',label: 'Change', type: 'float'},
  *    {id: 'pctChange',label: '% Change', type: 'float'},
  *    {id: 'lastChange',label: 'Last Updated', type: 'date', format: 'd/m/Y H:i'},
  *    {id: 'shouldBuy',label: 'Should Buy', type: 'enum', availableValues: availableValuesStore, remoteStore: false}
  *  ];
  *  var fieldManager=new Ext.ux.netbox.core.FieldManager(filterCfg);
  * </pre>
  * @constructor
  * @param {Mixed} fieldManager A Ext.ux.netbox.core.FieldManager or a config to create a FieldMAnager. In this last case the fieldManager will be built directly by the filter model
  */
Ext.ux.netbox.core.FilterModel=function(config){
  Ext.ux.netbox.core.FilterModel.superclass.constructor.call(this);
  this.addEvents(/** @scope Ext.ux.netbox.core.FilterModel.prototype */{
    /** Fires when an elementaryFilter is added
      * @event elementaryFilterAdded
      * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel containing the added elementaryFilter
      * @param {Ext.ux.netbox.core.ElementaryFilter} elementaryFilter The added elementaryFilter
      */
    elementaryFilterAdded : true,
    /** Fires when an elementaryFilter is removed
      * @event elementaryFilterRemoved
      * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel containing the removed elementaryFilter
      * @param {Ext.ux.netbox.core.ElementaryFilter} elementaryFilter The removed elementaryFilter
      */
    elementaryFilterRemoved : true,
    /** Fires when the filter managed by this filterModel is changed
      * @event filterChanged
      * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel that has the new filter
      */
    filterChanged : true
  });
  /** The filter
    * @property {Ext.ux.netbox.core.Filter}
    * @private
    */
  this.filter=null;
  /** The fieldManager
    * @property {Ext.ux.netbox.core.FieldManager}
    * @private
    */
  if(config instanceof Ext.ux.netbox.core.FieldManager)
    this.fieldManager=config;
  else
    this.fieldManager=new Ext.ux.netbox.core.FieldManager(config);
  this.fieldManager.on("beforeFieldRemoved",this.onBeforeFieldRemoved,this);
  /** The logicalOperator
    * @property {Ext.ux.netbox.core.CompositeFilter.AND or Ext.ux.netbox.core.CompositeFilter.OR}
    * @private
    */
  if(config.logicalOperator===undefined)
    this.logicalOperator=Ext.ux.netbox.core.CompositeFilter.AND;
  else
    this.logicalOperator=config.logicalOperator;
}

Ext.extend(Ext.ux.netbox.core.FilterModel,Ext.util.Observable,/** @scope Ext.ux.netbox.core.FilterModel.prototype */
{
  /** It doesn't allow the removal of a field if there are filters on that field
  * @private
  */
  onBeforeFieldRemoved: function(field){
    if(this.getElementaryFiltersByFieldId(field.getId()).length>0)
      return(false);
  },
  /** @private
    *
    */
  _createFilter : function (fieldId, operator, values){
    var myField=this.getFieldManager().getFieldById(fieldId);
    if(myField==null) throw ("Field "+fieldId+" not found!");
    var elementaryFilter=myField.getElementaryFilterInstance();
    if(operator!=undefined) elementaryFilter.setOperator(operator);
    if(values!=undefined) elementaryFilter.setValues(values);
    return(elementaryFilter);
  },
  /** @private
    *
    */
  _addFilter : function(elementaryFilter){
    if(this.getFilter()==null)
      this.filter=elementaryFilter;
    else
      this.filter=new Ext.ux.netbox.core.CompositeFilter(this.getFilter(), this.logicalOperator, elementaryFilter);
    this.fireEvent("elementaryFilterAdded", this, elementaryFilter);
  },
  /** @private
    *
    */
  _decodeFilter : function(filterObject){
    if(filterObject.fieldId){
      var myField=this.getFieldManager().getFieldById(filterObject.fieldId);
      if(myField==null) throw ("Field "+filterObject.fieldId+" not found!");
      var operator=myField.getAvailableOperatorById(filterObject.operatorId);
      if(operator===null)
        operator=undefined;
      var elementaryFilter=myField.getElementaryFilterInstance(operator);
      elementaryFilter.setFilterObj(filterObject);
      return(elementaryFilter);
    } else {
      var leftTmp=this._decodeFilter(filterObject.left);
      var rightTmp=this._decodeFilter(filterObject.right);
      var myCompositeFilter=new Ext.ux.netbox.core.CompositeFilter(leftTmp,filterObject.logicalOperator,rightTmp);
      return(myCompositeFilter);
    }
  },
  /** @private
    *
    */
  _encodeFilter : function(filter){
    if(filter.setValues){
      return(filter.getFilterObj());
    } else {
      var filterTmp=filter.getFilterObj();
      filterTmp.left=this._encodeFilter(filterTmp.left);
      filterTmp.right=this._encodeFilter(filterTmp.right);
      return(filterTmp);
    }
  },
  /** @private
    *
    */
  _findAndRemoveFilter : function(parentExpression,expression, matchFn, toRemove){
    if(expression instanceof Ext.ux.netbox.core.ElementaryFilter){
      if(matchFn.call(this,expression)){
        toRemove.push(expression);
        return(true);
      } else {
        return(false);
      }
    }

    var shouldRemoveLeft=this._findAndRemoveFilter(expression,expression.getLeftSide(),matchFn,toRemove)
    var shouldRemoveRight=this._findAndRemoveFilter(expression,expression.getRightSide(),matchFn,toRemove);

    if(shouldRemoveRight && shouldRemoveLeft){
      return(true);
    }

    if(shouldRemoveLeft){
      if(parentExpression.getLeftSide()==expression){
        parentExpression.setLeftSide(expression.getRightSide());
      } else {
        parentExpression.setRightSide(expression.getRightSide());
      }
    }

    if(shouldRemoveRight){
      if(parentExpression.getLeftSide()==expression){
        parentExpression.setLeftSide(expression.getLeftSide());
      } else {
        parentExpression.setRightSide(expression.getLeftSide());
      }
    }

    return(false);
  },
  /** This method returns the FieldManager associated to this filterModel.
    * @return {Ext.ux.netbox.core.FieldManager} The FieldManager
    */
  getFieldManager : function(){
    return(this.fieldManager);
  },
  /** This method returns the filter setted in this filterModel or null if is not setted.
    * @return {Ext.ux.netbox.core.Filter} The filter setted
    */
  getFilter : function(){
    return(this.filter);
  },
  /** This method returns an object representing the actual filter or null if is not setted.
    * <PRE>
    * Filter::=ElementaryFilter|CompositeFilter
    * ElementaryFilter::={fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}
    * CompositeFilter::={left : Ext.ux.netbox.core.Filter, logicalOperator : String, right : Ext.ux.netbox.core.Filter}
    * logicalOperator::="AND"|"OR"
    * </PRE>
    * <h4> Example </h4>
    * <PRE>
    * {
    *    left:{
    *      left:{fieldId:"field4",operatorId:"DATE_EQUAL",values:[{label:"12/10/2009 12:12",value:"2009-10-12 12:12:00"}]},
    *      logicalOperator:"AND",
    *      right:{fieldId:"field3",operatorId:"STRING_EQUAL",values:[{label:"label1",value:"valore1"}]}
    *    },
    *    logicalOperator:"AND",
    *    right:{fieldId:"field",operatorId:"NUMBER_EQUAL",values:[{label:5,value:5}]}
    * }
    * </pre>
    * @param {boolean} evenInvalid (optional) default false
    * @param {Object} additionalFilterObj (optional)
    * @param {String} additionalLogicalOper Ext.ux.netbox.core.CompositeFilter.AND/OR (optional)
    * @return {Object} the filter object
    */
  getFilterObj : function(evenInvalid,additionalFilterObj,additionalLogicalOper){
    var additionalFilter;
    if(additionalFilterObj===undefined){
      additionalFilter=null;
    } else {
      additionalFilter=this._decodeFilter(additionalFilterObj);
    }
    if(additionalLogicalOper===undefined)
      additionalLogicalOper=Ext.ux.netbox.core.CompositeFilter.AND;
    var filter=this.getFilter();

    var filterToExport=null;
    if(this.getFilter()!==null)

    if(filter===null)
      filterToExport=additionalFilter;
    else{
      filterToExport=this._decodeFilter(this._encodeFilter(this.getFilter()));//clone the filter
      if (additionalFilter !== null){
        filterToExport=new Ext.ux.netbox.core.CompositeFilter(filterToExport,additionalLogicalOper,additionalFilter);
      }
    }

    if(filterToExport instanceof Ext.ux.netbox.core.ElementaryFilter){
      if(!filterToExport.isValid()){
        filterToExport=null;
      }
    } else if(filterToExport !== null) {
      var matchFn=function(filter){
        return(!filter.isValid());
      };
      var toRemove=[];
      var shouldRemoveLeft=this._findAndRemoveFilter(filterToExport,filterToExport.getLeftSide(),matchFn,toRemove);
      var shouldRemoveRight=this._findAndRemoveFilter(filterToExport,filterToExport.getRightSide(),matchFn,toRemove);
      if(shouldRemoveLeft && shouldRemoveRight){
        filterToExport=null;
      } else if(shouldRemoveLeft){
        filterToExport=filterToExport.getRightSide();
      }else if(shouldRemoveRight){
        filterToExport=filterToExport.getLeftSide();
      }
    }
    if(filterToExport!=null)
      return(this._encodeFilter(filterToExport));
    else
      return null;
  },
  /** This method sets the filter with an object formatted:
    * <PRE>
    * Filter::=ElementaryFilter|CompositeFilter
    * ElementaryFilter::={fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}
    * CompositeFilter::={left : Ext.ux.netbox.core.ElementaryFilter, logicalOperator : String, right : Ext.ux.netbox.core.ElementaryFilter}
    * logicalOperator::="AND"|"OR"
    * </PRE>
    * If this succeeds the event "filterChanged" is triggered.
    * @param {Object} filterObject
    */
  setFilterObj : function(filterObject){
    if(filterObject){
      if(!filterObject.setFilterObj){
        filterObject=this._decodeFilter(filterObject);
      }
    }
    this.filter=filterObject;
    this.fireEvent("filterChanged",this);
  },
  /** This method returns an elementaryFilter by Id. If not found returns null.
    * @param {String} id The id of the filter
    * @return {Ext.ux.netbox.core.ElementaryFilter} The elementaryFilter with the given id or null if it is not found
    */
  getElementaryFilterById : function(id){
    if(this.getFilter()!=null)
      return(this.getFilter().getElementaryFilterById(id));
    return(null);
  },
  /** This method returns an array of elementaryFilter by fieldId or an empty array if not found.
    * @param {String} fieldId The id of the field
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter} array of elementaryFilter setted with the same fieldId
    */
  getElementaryFiltersByFieldId : function(fieldId){
    if(this.getFilter()!=null){
      return(this.getFilter().getElementaryFiltersByFieldId(fieldId));
    }
    return [];
  },
  /** This method add an elementaryFilter by field Id. If this succeeds the event "elementaryFilterAdded" is triggered.
    * @param {String} fieldId
    * @return {String} id of elementaryFilter added
    */
  addElementaryFilterByFieldId : function(fieldId){
    var elementaryFilter=this._createFilter(fieldId);
    this._addFilter(elementaryFilter);
    return(elementaryFilter.getId());
  },
  /** This method add an elementaryFilter receiving an object that represents it. If this succeeds the event "filterAdded" is triggered.
    * @param {Object} filterObject &#123;fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]&#125;
    * @return {String} id of elementaryFilter added
    */
  addElementaryFilter : function (filterObject){
    var elementaryFilter=this._createFilter(filterObject.fieldId, filterObject.operatorId, filterObject.values);
    this._addFilter(elementaryFilter);
    return(elementaryFilter.getId());
  },
  /** This method remove an elementaryFilter from the FilterModel by Id. If this succeeds the event "elementaryFilterRemoved" is triggered.
    * @param {String} filterId The id of elementaryFilter to remove
    * @throws {String} if the elementaryFilter to remove is not found
    */
  removeElementaryFilterById : function(filterId){
    var removedElementaryFilter=null;
    if(this.getFilter()==null)
      throw("Unable to remove the elementaryFilter with id "+filterId+". The elementaryFilter doesn't exist.");
    if(this.getFilter() instanceof Ext.ux.netbox.core.ElementaryFilter){
      if(this.getFilter().getId()==filterId){
        removedElementaryFilter=this.filter;
        this.filter=null;
      } else {
        throw("Unable to remove the elementaryFilter with id "+filterId+". The elementaryFilter doesn't exist");
      }
    } else {
      var matchFn=function(filter){
        if(filter.getId()===filterId){
          return(true);
        } else {
          return(false);
        }
      };
      var toRemove=[];
      var shouldRemoveLeft=this._findAndRemoveFilter(this.getFilter(),this.getFilter().getLeftSide(),matchFn,toRemove);
      var shouldRemoveRight=this._findAndRemoveFilter(this.getFilter(),this.getFilter().getRightSide(),matchFn,toRemove);
      if(toRemove.length===0){
        throw("Unable to remove the elementaryFilter with id "+filterId+". The elementaryFilter doesn't exist");
      }
      removedElementaryFilter=toRemove[0];
      if(shouldRemoveLeft){
        this.filter=this.getFilter().getRightSide();
      }

      if(shouldRemoveRight){
        this.filter=this.getFilter().getLeftSide();
      }
    }
    this.fireEvent("elementaryFilterRemoved", this, removedElementaryFilter);
  },
  /** This method returns all the elementaryFilter stored in the filter expression or an empty array if filter is null.
    * @param {Ext.ux.netbox.core.Filter} filter The filter from which the elementaryFilters must be extracted. Optional. If not supplied the filter in the filterModel is used
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter}
    */
  getAllElementaryFilters : function(filter){
    if(filter===undefined)
      filter=this.getFilter();
    var elementaryFilters=[];
    if(filter!=null){
      if(filter.setValues){
        elementaryFilters.push(filter);
      } else {
        elementaryFilters=elementaryFilters.concat(this.getAllElementaryFilters(filter.getLeftSide()));
        elementaryFilters=elementaryFilters.concat(this.getAllElementaryFilters(filter.getRightSide()))
      }
    }
    return(elementaryFilters);
  },
  /** This method returns the logical operator setted in the filter model. The default is Ext.ux.netbox.core.CompositeFilter.AND
    * @return {String} The logical operator setted
    */
  getLogicalOperator : function(){
    return this.logicalOperator;
  },
  /** This method sets the logical operator in the filter model.
    * @param {String} logicalOperator The logical operator to set in the filter model
    */
  setLogicalOperator : function(logicalOperator){
    if(logicalOperator===Ext.ux.netbox.core.CompositeFilter.OR || logicalOperator===Ext.ux.netbox.core.CompositeFilter.AND)
      this.logicalOperator=logicalOperator;
      //evento?
  },
  /** This method calls the function with the scope on the filter passed as parameters.
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The scope in which to execute the function
    * @param {Ext.ux.netbox.core.Filter} filter The filter on which execute the function
    */
  each: function(fn, scope, filter){
    if(filter===undefined)
      filter=this.getFilter();
    if(filter==null)
      return;
    if(scope===undefined)
      scope=window;
    fn.call(scope,filter);
    if(filter instanceof Ext.ux.netbox.core.CompositeFilter){
      this.each(fn,scope,filter.getLeftSide());
      this.each(fn,scope,filter.getRightSide());
    }
  }

});// $Id: DynamicFilterModelView.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** It instantiates a DynamicFilterModelView
  * @class It implements the view for dynamic filters. Dynamic filters mean that the user is allowed to add, remove filter, seeing only the actual filters.
  * It's possible to define more than one filter for the same field.
  * It can be lazyly instantiated using dynamicFilter as xtype.
  * <h4> Example </h4>
  * The following code will instantiate a window with a DynamicFilterModelView inside using lazy initialization
  * <pre>
  * win=new Ext.Window({
  *   title: 'Filters',
  *   width:600,
  *   height:350,
  *   layout: 'border',
  *   closeAction: 'hide',
  *   items: [{ filterModel: filterModel,
  *     region: "center",
  *     xtype: 'dynamicFilter'
  *   }]
  * });
  * </pre>
  * @constructor
  * @param {Object} config
  * @config {Ext.ux.netbox.core.FilterModel}filterModel the filterModel whose filters must be showed
  */
Ext.ux.netbox.core.DynamicFilterModelView=function(config){
  this.filterModel=config.filterModel;

  this.createFieldCombo();
  this.createLogicOpeCombo();

  config=this.createFilterGridConfig(config);
  Ext.ux.netbox.core.DynamicFilterModelView.superclass.constructor.call(this,config);

  this.populateFilterStore();
  this.setLogicOpeCombo();

  this.on('cellclick', this.removeFilter, this);
  this.on('beforeedit', this.updateOperatorStore, this);
  this.on('afteredit', this.updateFilter, this);

  this.getFilterModel().on('elementaryFilterAdded', this.onFilterAdded, this);
  this.getFilterModel().on('elementaryFilterRemoved', this.onFilterRemoved, this);
  this.getFilterModel().on('filterChanged', this.onFilterChanged, this);
  this.getFilterModel().getFieldManager().on('fieldAdded', this.onFieldAdded, this);
  this.getFilterModel().getFieldManager().on('fieldRemoved', this.onFieldRemoved, this);

  this.getView().getRowClass=function(record, index, rowParams, store){
    var cls = '';
    var aFilter = record.data.filter;
    if(!aFilter.isValid()){
      cls='x-grid3-row-notValid';
    }
    return cls;
  };
}

Ext.extend(Ext.ux.netbox.core.DynamicFilterModelView,Ext.grid.EditorGridPanel,/** @scope Ext.ux.netbox.core.DynamicFilterModelView.prototype */
{
  deleteText        : 'Delete',
  filterText        : 'Field',
  operatorText      : 'Operator',
  valueText         : 'Value',
  comboText         : 'Select a new field',
  logicOpeAndText   : 'Check all',
  logicOpeOrText    : 'Check at least one',

  /** getFilterModel
    * @private
    */
  getFilterModel : function(){
    return(this.filterModel);
  },
  /** onFieldAdded
    * @private
    */
  onFieldAdded : function(field){
    this.addFields([field]);
  },
    /** onFieldRemoved
    * @private
    */
  onFieldRemoved : function(field){
    this.removeFields(field);
  },
  /** onFilterAdded
    * @private
    */
  onFilterAdded : function(filterModel, filter){
    var filterRecord=[];
    filterRecord.push(['',
      filter.getField(),
      filter.getOperator().getId(),
      filter.getValues(),
      filter,
      filter.getId()]);
    this.filterStore.loadData(filterRecord, true);
    filter.on('operatorChanged', this.updateFilterOperator, this);
    filter.on('valueChanged',this.updateFilterValues,this);
  },
  /** onFilterRemoved
    * @private
    */
  onFilterRemoved : function(filterModel, filter){
    var recordToRemove=this.filterStore.getById(filter.getId());
    this.filterStore.remove(recordToRemove);
    filter.un('operatorChanged', this.updateFilterOperator, this);
    filter.on('valueChanged',this.updateFilterValues,this);
  },
  /** onFilterChanged
    * @private
    */
  onFilterChanged : function(){
    this.populateFilterStore();
    this.setLogicOpeCombo();
  },
  /** onEditComplete
    * @private
    */
  onEditComplete: function(ed, value, startValue){
    this.editing=false;
    this.activeEditor=null;
    ed.un('specialkey', this.selModel.onEditorKey, this.selModel);
    if(Ext.util.JSON.encode(value) !== Ext.util.JSON.encode(startValue)){
      var r=ed.record;
      //workaround to manage objects in editorGrid
      r.set=function(name, value){
        if(Ext.util.JSON.encode(this.data[name]) == Ext.util.JSON.encode(value)){
          return;
        }
        this.dirty=true;
        if(!this.modified){
          this.modified={};
        }
        if(typeof this.modified[name] == 'undefined'){
          this.modified[name]=this.data[name];
        }
        this.data[name]=value;
        if(!this.editing){
          this.store.afterEdit(this);
        }
      }
      var field=this.colModel.getDataIndex(ed.col);
      var e={
        grid: this,
        record: r,
        field: field,
        originalValue: startValue,
        value: value,
        row: ed.row,
        column: ed.col,
        cancel:false,
        renderTo: this
      };
      if(this.fireEvent('validateedit', e) !== false && !e.cancel){
        r.set(field, e.value);
        delete e.cancel;
        this.fireEvent('afteredit', e);
      }
    }
    this.view.focusCell(ed.row, ed.col);
  },
  /** createFilterGridConfig addding the store etc...
    *
    */
  createFilterGridConfig : function(config){

    this.filterStore=new Ext.data.SimpleStore({
      fields : ['image','field','operatorId','value','filter','filterId'],
      data : [],
      id : 5});

    this.operatorStore=new Ext.data.SimpleStore({
      fields : ['operatorId','operatorLabel'],
      data : [] });

    var operatorCombo=new Ext.form.ComboBox({
      store         : this.operatorStore,
      mode          : 'local',
      valueField    : 'operatorId',
      displayField  : 'operatorLabel',
      editable      : false,
      triggerAction : 'all',
      lazyRender    : true,
      listClass     : 'x-combo-list-small'
    });

    var cm=new Ext.grid.ColumnModel([{
        header    : this.deleteText,
        renderer  : this.imageRenderer,
        width     : 50,
        dataIndex : 'image'
      },{
        header    : this.filterText,
        renderer  : this.fieldRenderer,
        width     : 150,
        dataIndex : 'field'
      },{
        header    : this.operatorText,
        renderer  : this.operatorRenderer,
        width     : 150,
        dataIndex : 'operatorId',
        editor    : operatorCombo
      },{
        header    : this.valueText,
        width     : 150,
        renderer  : this.valueRenderer,
        editable  : true,
        dataIndex : 'value'
      }]);
    //hack to stop the editing when the user selects a new item.
    operatorCombo.on('select',this.completeEditLater,this);

    cm.getCellEditorOrig=cm.getCellEditor;
    cm.filterStore=this.filterStore;
    cm.getCellEditor=function(colIndex, rowIndex){
      if(colIndex==3){
        var filter=this.filterStore.getAt(rowIndex).get('filter');
        var operator=filter.getOperator();
        return(operator.getEditor());
      }
      return(this.getCellEditorOrig(colIndex, rowIndex));
    }
    config.store=this.filterStore;
    config.colModel=cm;
    config.cm=cm;
    config.clicksToEdit=1;
    config.autoExpandColumn=cm.getColumnId('3');
    config.enableColumnHide=false;
    config.enableColumnMove=false;
    config.enableColumnResize=false;
    config.elements='body, tbar';
    if(config.tbar==undefined){
      config.tbar=[];
    }

    config.tbar.push(this.fieldCombo);
    config.tbar.push("-");
    config.tbar.push(this.logicOpeCombo);
    
    return(config);
  },
  
  /** This is a hack. If I stop editing on the select event, the gridpanel will scroll to the first row if there is a scrollbar.
    * The reason is that the ComboBox will request the focus after the event, even if it's not visible 
    * (the editor that contains the combo is already hidden)
    * I delay the complete of the editing at the end of the browser event queue (0 milliseconds of delay), to avoid the problem
    * @provate
    * @ignore
    */
  completeEditLater: function(){
    var scope=this.getColumnModel().getCellEditor(2);
    var fn=scope.completeEdit;
    var task=new Ext.util.DelayedTask(fn,scope);
    task.delay(0);
  },
  /** populateFilterStore
    *
    */
  populateFilterStore : function(){
    this.filterStore.removeAll();
    for(var i=0; i<this.getFilterModel().getAllElementaryFilters().length; i++){
      this.onFilterAdded(this.getFilterModel(),this.getFilterModel().getAllElementaryFilters()[i]);
    }
  },
  /** createFieldCombo
    *
    */
  createFieldCombo : function(){
    this.fieldStore=new Ext.data.SimpleStore({fields: ['fieldId', 'label'], data: [], id:0});
    var allFields=this.getFilterModel().getFieldManager().getAllFields();
    this.addFields(allFields);

    this.fieldCombo=new Ext.form.ComboBox({
        emptyText     : this.comboText,
        displayField  : 'label',
        valueField    : 'fieldId',
        store         : this.fieldStore,
        mode          : 'local',
        triggerAction : 'all',
        selectOnFocus : true,
        typeAhead     : true,
        editable      : true
        });

    this.fieldCombo.on('select', this.addFilter, this);
  },
  /** createLogicOpeCombo
    *
    */  
  createLogicOpeCombo : function(){
    var logicOpeStore=new Ext.data.SimpleStore({
        fields: ['label', 'value'],
        data: [ [this.logicOpeAndText,Ext.ux.netbox.core.CompositeFilter.AND],
                [this.logicOpeOrText,Ext.ux.netbox.core.CompositeFilter.OR] ]
        });
    this.logicOpeCombo=new Ext.form.ComboBox({
        displayField    : 'label',
        valueField      : 'value',
        store           : logicOpeStore,
        mode            : 'local',
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : false,
        value           : Ext.ux.netbox.core.CompositeFilter.AND
        });

    this.logicOpeCombo.on('select', this.chgLogicOpe, this);
  },
  /** setLogicOpeCombo
    *
    *
    */
  setLogicOpeCombo : function(){
    var filter=this.getFilterModel().getFilter();
    if(filter instanceof Ext.ux.netbox.core.CompositeFilter)
      this.logicOpeCombo.setValue(filter.getLogicalOperator());
  },
  /** addFields
    *
    *
    */
  addFields : function(fieldsToAdd){
    var fields=[];
    for(var i=0; i<fieldsToAdd.length; i++){
      fields.push([fieldsToAdd[i].getId(), fieldsToAdd[i].getLabel()]);
    }
    this.fieldStore.loadData(fields, true);
    this.fieldStore.sort('label','ASC');
  },
  /** removeFields
    *
    *
    */
  removeFields : function(fieldToRemove){
    var fieldId=fieldToRemove.getId();
    var toRemove=this.fieldStore.getById(fieldId);
    this.fieldStore.remove(toRemove);
  },
  /** addFilter
    *
    *
    */
  addFilter : function(combo, record, index){
    var addedId=this.getFilterModel().addElementaryFilterByFieldId(record.id);
    this.fieldCombo.clearValue();
    this.filterStore.indexOfId(addedId);
    this.startEditing(this.filterStore.indexOfId(addedId),3);
  },
  /** chgLogicOpe
    *
    *
    */
  chgLogicOpe : function(combo, record, index){
    var logicOpe = record.get('value');
    this.getFilterModel().setLogicalOperator(logicOpe);
    this.getFilterModel().each(
      function(filter){
        if(filter instanceof Ext.ux.netbox.core.CompositeFilter && filter.getLogicalOperator() != logicOpe){
          filter.setLogicalOperator(logicOpe);
        }
      }
    );
  },
  /** removeFilter
    *
    *
    */
  removeFilter : function(grid, rowIndex, columnIndex, event){
    if (columnIndex == 0){
      var recordToRemove=grid.getStore().getAt(rowIndex);
      var filter=recordToRemove.get('filter');
      this.getFilterModel().removeElementaryFilterById(filter.getId());
    }
  },
  /** updateOperatorStore
    *
    */
  updateOperatorStore : function(e){
    if(e.column==2){
      var field=e.record.get('field');
      var operators=[];
      for(var i=0; i<field.getAvailableOperators().length;i++){
        operators.push([field.getAvailableOperators()[i].getId(),
                        field.getAvailableOperators()[i].getLabel().escHtml()]);
      }
      this.operatorStore.loadData(operators, false);
    }
  },
  /** updateFilter
    *
    */
  updateFilter : function(e){
    if(e.column==2){
      var filter=e.record.get('filter');
      var operatorId=e.record.get('operatorId');
      filter.setOperator(operatorId);
    } else if(e.column==3){
      var filter=e.record.get('filter');
      try{
        filter.setValues(e.record.get('value'));
      } catch(exp){
        var r=this.filterStore.getById(filter.getId());
        r.set('value',filter.getValues());
      }
    }
    this.filterStore.commitChanges();
  },
  /** updateFilterOperator
    *
    */
  updateFilterOperator : function(filter){
    var record=this.filterStore.getById(filter.getId());
    if(record.get('operatorId')!=filter.getOperator().getId()){
      record.set('operatorId',filter.getOperator().getId());
    }
    this.filterStore.commitChanges();
  },
  /** updateFilterValues
    *
    */
  updateFilterValues: function(filter){
    var record=this.filterStore.getById(filter.getId());
    if(Ext.util.JSON.encode(record.get('value'))!=Ext.util.JSON.encode(filter.getValues())){
      record.set('value',filter.getValues());
    }
    this.filterStore.commitChanges();
  },
  /** imageRenderer
    *
    */
  imageRenderer : function(value, metadata, record, rowIndex, colIndex, store){
    return('<img class="x-menu-item-icon x-icon-delete" style="position: static; cursor: pointer" src="'+Ext.BLANK_IMAGE_URL+'"/>');
  },
  /** fieldRenderer
    *
    */
  fieldRenderer : function(value, metadata, record, rowIndex, colIndex, store){
    return(value.getLabel());
  },
  /** operatorRenderer
    *
    */
  operatorRenderer : function(value, metadata, record, rowIndex, colIndex, store){
    var operator=record.get('filter').getField().getAvailableOperatorById(value);
    return(operator.getLabel());
  },
  /** valueRenderer
    *
    */
  valueRenderer : function(value, metadata, record, rowIndex, colIndex, store){
    return(record.get('filter').getOperator().render(value));
  }

});
Ext.reg('dynamicFilter',Ext.ux.netbox.core.DynamicFilterModelView);
// $Id: StaticFilterModelView.js 192 2008-10-07 12:48:51Z dandfra $

String.prototype.escHtml = function(){ 
  var i,e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'};
  var t=this;
  for(i in e) 
    t=t.replace(new RegExp(i,'g'),e[i]); 
  return t; 
}

Ext.namespace('Ext.ux.netbox.core');

/** It creates a new StaticFilterModelView.
  * @class In this view for each available field there is a label, and an operator combo and space where the widget to edits the values will appear. Something like this:
  * <pre>
  *        +----------------+--+ +----------------+
  * field: |contains        |\/| | ciccio         |
  *        +----------------+--+ +----------------+
  * </pre>
  * There are some config options to manage the way the fields are put together. For example you can divide the fields in column, you can decide where to put the label and so on.
  * This view supports lazy initialization using staticFilter as xtype.
  * <h4> Example </h4>
  * We are creating a static filter panel where the fields are arranged in 3 columns, the label are on the top of the operation field,
  * the operation field will use 33% of the space in te column, and each filter 46 pixels as height
  * <PRE>
  * var viewport = new Ext.Viewport({
  *   layout: "border",
  *   items: [{
  *     filterModel: filterModel,
  *     colsNumber:3,
  *     labelWidth: 55,
  *     labelAlign: 'top',
  *     rowSize: 46,
  *     ratio: 33,
  *     labelPad: 1,
  *     region: "north",
  *     height:150,
  *     xtype: 'staticFilter',
  *     itemCls: 'filter'
  *   },
  *   grid
  * ]});
  * </pre>
  * <B>NB1:</B> This view only supports an elementary filter  for a field. If you use this view you must be sure that this basic assumption is verified<BR>
  * <B>NB2:</B> The items config options will be overwritten<br>
  * @constructor
  * @param {Object} config Configuration options
  * @config {Ext.ux.netbox.core.FilterModel}filterModel the filterModel whose filters must be showed
  * @config {int} colNumbers the number of columns in which the filters must be disposed. The default is 1
  * @config {int} labelWidth The width of the label containing the name of the column. See Ext.layout.FormLayout.labelWidth config option for more details (including the default value)
  * @config {boolean} hideLabels true to hide the label containing the name of the column. See Ext.layout.FormLayout.hideLabels config option for more details (including the default value)
  * @config {String} itemCls class to apply to the label containing the name of the column. See Ext.layout.FormLayout.itemCls config option for more details
  * @config {String}labelAlign allignment of the label containing the name of the column. See Ext.layout.FormLayout.itemCls config option for more details
  * @config {int} labelPad padding of the label containing the name of the column. See Ext.layout.FormLayout.itemCls config option for more details
  * @config {int} rowSize the height of the "row" consisting of operator combo + editor value. The default is 27 pixel
  * @config {int} ratio a number between 1 and 99, the percentage of the space to give to label + combo with the operators. The default is 60
  * @extends Ext.form.FormPanel
  */
Ext.ux.netbox.core.StaticFilterModelView=function(config){

  this.filterModel = config.filterModel;
  this.ratio=60;
  this.rowSize=27;
  if(config.rowSize!==undefined){
    this.rowSize=config.rowSize;
  }
  if(config.ratio){
    this.ratio=config.ratio;
  }
  config=this.createConfig(config);

  this.colsNumber=config.colsNumber;

  /** It contains the panels where the filters must be inserted
    * @property {Array of Ext.Panel}
    * @private
    */
  this.panelColumns=[];
  for(var i=0;i<this.colsNumber;i++){
    this.panelColumns[i]=null;
  }
  Ext.ux.netbox.core.StaticFilterModelView.superclass.constructor.call(this,config);
  if(this.rendered){
    this.populateFields();
  } else {
    this.on('render',this.populateFields,this);
  }
  this.filterModel.getFieldManager().on('fieldAdded',this.addField,this);
  this.filterModel.getFieldManager().on('fieldRemoved',this.removeField,this);
  this.filterModel.on('elementaryFilterAdded',this.elementaryFilterAdded,this);
  this.filterModel.on('elementaryFilterRemoved',this.elementaryFilterRemoved,this);
  this.filterModel.on('filterChanged',this.populateFilters,this);
  this.fieldPanelMapping=new Ext.util.MixedCollection();
  this.filterEditorsMapping={};
  this.managedFilters=new Ext.util.MixedCollection();
  if(this.rendered){
    this.populateFilters();
  } else {
    this.on('render',this.populateFilters,this);
  }
}

Ext.extend(Ext.ux.netbox.core.StaticFilterModelView,Ext.form.FormPanel,/** @scope Ext.ux.netbox.core.StaticFilterModelView.prototype */{
  /** This method manipulate the given config option, to create the one that will be sent as parameter to the superclass constructor
    * It sets the layout of this panel as a form, containing config.colsNumber * 2 panels. In the even panels there are the label and the operator combo,
    * in the odd panels there is the field used to edit the value
    * @param {Object} config The config object that is passed to the constructor of the class as parameter
    * @return {Object} The config object to use as parameter of the superclass constructor
    */
  createConfig: function(config){
    config.layout="form";
    config.frame="true";
    if(!config.colsNumber){
      config.colsNumber=1;
    }
    config.colsNumber=config.colsNumber*2;
    var colWidth=1/(config.colsNumber);
    var items=[];
    var addPanelCol=function(panel,colNumber){
      this.panelColumns[colNumber]=panel;
    }
    for(var i=0; i<config.colsNumber; i++){
      var colWidthTmp;
      if(i%2===0){
        colWidthTmp=colWidth*(this.ratio/100)*2;
      } else if(i%2===1){
        colWidthTmp=colWidth*(1-(this.ratio/100))*2;
      }

      var panelCfg={
        columnWidth: colWidthTmp,
        layout: 'anchor',
        items: null,
        plugins: {
          init: addPanelCol.createDelegate(this,[i],true)
        }
      }
      items.push(panelCfg);
      if(i%2==1){
        items.push({width:15, style: "height: 1px"});
      }

    }
    config.items=[{layout:"column", items: items, anchor: "100% 100%" }];
    return(config);
  },

  /** This method, given the Field, returns the index of the panel containing the editor component for the field in this.panelColumns array.
    * <B> NB</B>: The panel containing the operator combo box is the value returned by this function -1
    * @param {Ext.ux.netbox.core.Field} field The field whose index must be calculated
    * @return {int} The index of the panel in the this.panelColumns or -1 if for the field there is no panel
    */
  getEditorPanelNumber: function(field){
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();

    var panelNum=-1;
    for(var i=1; i<this.panelColumns.length;i+=2){
      if(this.panelColumns[i].items.contains(editorComponent)){
        panelNum=i;
        break;
      }
    }
    return(panelNum);
  },

  /** Callback for the elementaryFilterRemoved event of the filter manager. It clean the value and the operator of the just removed filter.
    * @param {Ext.ux.core.netbox.FilterModel} filterModel The filterModel that fired the event
    * @param {Ext.ux.core.netbox.Filter} filter The just removed filter
    */
  elementaryFilterRemoved: function(filterModel,filter){
    var field=filter.getField();
    var panelNum=this.getEditorPanelNumber(field);
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();
    if(editorComponent.items && editorComponent.items.getCount()>0){
      var componentToRemove=editorComponent.items.first();
      editorComponent.remove(componentToRemove);
    }
    if(operator.getValue()!==""){
      operator.clearValue();
    }
    filter.un('operatorChanged',this.operatorChanged,this);
    filter.un('valueChanged',this.valueChanged,this);
    this.managedFilters.remove(filter);
  },

  /** Callback for the elementaryFilterAdded event of the filter manager. It sets the operator on the operatorCombo, and the value in the value field.
    * @param {Ext.ux.core.netbox.FilterModel} filterModel The filterModel that fired the event
    * @param {Ext.ux.core.netbox.Filter} filter The just added filter
    */
  elementaryFilterAdded: function(filterModel,filter){
    var field=filter.getField();
    var panelNum=this.getEditorPanelNumber(field);
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();
    operator.setValue(filter.getOperator().getId());
    var editor=filter.getOperator().getEditor(false);
    this.changeEditor(editor,elementaryFilterCfg);
    var formField=elementaryFilterCfg.getEditor().field;
    if(editorComponent.items && editorComponent.items.getCount()>0){
      var componentToRemove=editorComponent.items.first();
      editorComponent.remove(componentToRemove);
    }

    this.addFormField(formField,editorComponent);
    elementaryFilterCfg.getEditor().editing=true;//hack! This is needed to fool the editor into beliving that it's doing something...
    elementaryFilterCfg.getEditor().setValue(filter.getValues());
    elementaryFilterCfg.getEditor().startValue=filter.getValues();
    filter.on('operatorChanged',this.operatorChanged,this);
    filter.on('valueChanged',this.valueChanged,this);
    this.managedFilters.add(filter);
  },


  /** This method changes the editor used to edit the values of a filter (for example if the operator is changed, the editor can be changed as well).
    * The listeners on the old editor are removed and added to the new one,
    * and then the old editor is replaced with the new one in the GUI
    * @param {Ext.Editor} The new editor to use to edit the value
    * @param {Ext.ux.netbox.core.ElementaryFilterCfg} elementaryFilterCfg The object that manages the editor actually associated with a field
    */
  changeEditor: function(editor,elementaryFilterCfg){
    if(elementaryFilterCfg.getEditor()){
      elementaryFilterCfg.getEditor().un('complete',this.editingCompleted,this);
      elementaryFilterCfg.getEditor().field.un('change',this.editingCompleted,this);
    }
    elementaryFilterCfg.setEditor(editor);
    elementaryFilterCfg.getEditor().on('complete',this.editingCompleted,this);
    elementaryFilterCfg.getEditor().field.on('change',this.editingCompleted,this);
  },

  /** It adds the field used to manage the values  of an elementary filter
    * @param {Ext.form.Field} formField The field that edits the values
    * @param {Ext.Container} editorComponent The field will be added to editorComponent
    */
  addFormField: function(formField, editorComponent){
    editorComponent.add(formField);
    editorComponent.doLayout();
  },

  /** Callback for the operatorChanged event of the filter. It sets the operator on the operatorCombo, and change the editor accordingly
    * @param {Ext.ux.core.netbox.Filter} filter The filter that fired the event
    * @param {Ext.ux.core.netbox.Filter} operator The new operator
    */
  operatorChanged: function(filter, operator){
    var field=filter.getField();
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var operatorCombo=elementaryFilterCfg.getOperatorCombo();
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    if(operatorCombo.getValue()!=operator.getId())
      operatorCombo.setValue(operator.getId());
    var panelNum=this.getEditorPanelNumber(field);
    var editor=filter.getOperator().getEditor(false);
    this.changeEditor(editor,elementaryFilterCfg);
    var formField=elementaryFilterCfg.getEditor().field;
    var componentToRemove=editorComponent.items.first();
    editorComponent.remove(componentToRemove);
    this.addFormField(formField,editorComponent);
    elementaryFilterCfg.getEditor().editing=true;//hack! This is needed to fool the editor into beliving that it's doing something...
    elementaryFilterCfg.getEditor().startValue=filter.getValues();
    elementaryFilterCfg.getEditor().setValue(filter.getValues());
  },

  /** Callback for the valueChanged event of the filter. It sets the value on the editor component
    * @param {Ext.ux.core.netbox.Filter} filter The filter that fired the event
    * @param {Mixed} value The new value
    */
  valueChanged: function(filter, value){
    var elementaryFilterCfg=this.fieldPanelMapping.get(filter.getField().getId());
    var editor=elementaryFilterCfg.getEditor();
    //if(Ext.util.JSON.encode(editor.getValue())!==Ext.util.JSON.encode(value)){
      editor.setValue(value);
    //}
  },
  /**Callback of the complete event of the editor, or callback of the change event on the form field, both editing the value of the filter.
    * It get the value from the editor, and set the value to the filter.
    * @param {Mixed} editorOrFormField. It can be the editor used to edit the value of a filter, or the form field contained in the editor
    */
  editingCompleted: function(editorOrFormField){
    var fn=function(elementaryFilterCfg){
      if(elementaryFilterCfg.getEditor() && (elementaryFilterCfg.getEditor()==editorOrFormField || elementaryFilterCfg.getEditor().field==editorOrFormField)){
        return(true);
      }
      return(false);
    }
    var elementaryFilterCfg=this.fieldPanelMapping.find(fn);
    var field=elementaryFilterCfg.getField();
    var filters=this.filterModel.getElementaryFiltersByFieldId(field.getId());
    if (Ext.util.JSON.encode(filters[0].getValues())!== Ext.util.JSON.encode(elementaryFilterCfg.getEditor().getValue())){
      filters[0].setValues(elementaryFilterCfg.getEditor().getValue());
    }
    elementaryFilterCfg.getEditor().editing=true;//it's still there.... so it's still editing...
  },

  /** This method add all the field contained in the fieldManager associated to the filterModel.
    * This means that it adds the operator combo and the component that will contain the editor for the values of the filter
    */
  populateFields: function(){
    var fields=this.filterModel.getFieldManager().getAllFields();
    for(var i=0;i<fields.length;i++){
      this.addField(fields[i]);
    }
  },
  /** This method remove a given field from the view
    * This means that it removes the operator combo and the component that will contain the editor for the values of the filter<BR>
    * <B> NB</B>: At this moment the widget are not rearranged, it will be implemented in a later moment
    * @param {Ext.ux.netbox.core.Field} field The field to remove
    */
  removeField: function(field){
    var panelNum=this.getEditorPanelNumber(field);
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();
    var componentToRemove=editorComponent.items.first();
    editorComponent.remove(componentToRemove,false);
    var parent=operator.getEl().up('.x-form-item');
    this.panelColumns[panelNum-1].remove(operator,true);
    parent.remove();
    this.panelColumns[panelNum].doLayout();
    this.panelColumns[panelNum-1].doLayout();
    this.fieldPanelMapping.removeKey(field.getId());
  },

  /** Callback of the selected event of a operator combo.
    * This method, if the selected operator is the empty one, remove the filter, sets the selected operator to the filter otherwise
    * @param {Ext.form.ComboBox} combo The combo that fired the event
    * @param {Ext.data.Record} record The selected record
    * @param {int} index The index of the selected item
    */
  operatorSelected: function(combo, record,index){
    var fn=function(elementaryFilterCfg){
      if(elementaryFilterCfg.getOperatorCombo()==combo){
        return(true);
      }
      return(false);
    }
    var elementaryFilterCfg=this.fieldPanelMapping.find(fn);
    var field=elementaryFilterCfg.getField();
    var filters=this.filterModel.getElementaryFiltersByFieldId(field.getId());
    if(record.get('operatorId')===""){
      combo.clearValue();
      if(filters.length>0){
        this.filterModel.removeElementaryFilterById(filters[0].getId());
      }
      return;
    }
    if(record.get('operatorId')!=="" && filters.length==0){
      var filterId=this.filterModel.addElementaryFilterByFieldId(field.getId());
      filters.push(this.filterModel.getElementaryFilterById(filterId));
    }
    var availableOperators=field.getAvailableOperators();
    for(var i=0; i< availableOperators.length; i++){
      if(availableOperators[i].getId()===record.get('operatorId')){
        filters[0].setOperator(availableOperators[i]);
      }
    }
    return;
  },

  /** This method clean the view and then populate all the filters with the actual values from the filterModel.
    * This means that it set the operator in the operator combos  and the values in the editor from the filters in the FilterModel.
    * This method is called for example when the view is built or when the setExpression method is called on the FilteRManager
    */
  populateFilters: function(){
    while(this.managedFilters.getCount()>0){
      var filter=this.managedFilters.last();
      this.elementaryFilterRemoved(this.filterModel,filter);
    }
    var allFilters=this.filterModel.getAllElementaryFilters();
    for(var i=0;i<allFilters.length;i++){
      this.elementaryFilterAdded(this.filterModel,allFilters[i]);
    }
  },

  /** This method add a given field to the view
    * This means that it add the operator combo and the component that will contain the editor for the values of the filter<BR>
    * This component are added at the first available place.
    * @param {Ext.ux.netbox.core.Field} field The field to add
    */
  addField: function(field){
    var cfg={};
    if(this.initialConfig.labelWidth!==undefined){
      cfg.labelWidth=this.initialConfig.labelWidth;
    }
    if(this.initialConfig.hideLabels !==undefined){
      cfg.hideLabels=this.initialConfig.hideLabels;
    }
    if(this.initialConfig.itemCls!==undefined){
      cfg.itemCls=this.initialConfig.itemCls;
    }
    if(this.initialConfig.labelAlign!==undefined){
      cfg.labelAlign=this.initialConfig.labelAlign;
    }
    if(this.initialConfig.labelPad!==undefined){
      cfg.labelPad=this.initialConfig.labelPad;
    }
    var elementaryFilterCfg=new Ext.ux.netbox.core.ElementaryFilterCfg(field,this.rowSize,cfg);
    var minCount=null;
    var choosen=0;
    for(var i=0; i<this.panelColumns.length;i+=2){
      if(!this.panelColumns[i].items){
        minCount=0;
        choosen=i;
        break;
      }
      if(minCount==null || this.panelColumns[i].items.length<minCount){
        minCount=this.panelColumns[i].items.length;
        choosen=i;
      }
    }
    this.fieldPanelMapping.add(field.getId(),elementaryFilterCfg);
    elementaryFilterCfg.getOperatorCombo().on('select',this.operatorSelected,this);
    cfg.layout="form";
    cfg.anchor="100%";
    cfg.items=[elementaryFilterCfg.getOperatorCombo()];
    cfg.height=this.rowSize;
    this.panelColumns[choosen].add(cfg);
    this.panelColumns[choosen].doLayout();
    this.panelColumns[choosen+1].add(elementaryFilterCfg.getEditorComponent());
    this.panelColumns[choosen+1].doLayout();
  }
});


Ext.reg('staticFilter',Ext.ux.netbox.core.StaticFilterModelView);

/** It instantiates a new ElementaryFilterCfg
  * @class This is a private class used in StaticFilterManagerView. It's used to contain the operator Combo and the actual editor component for a given field
  * @constructor
  * @ignore
  */
Ext.ux.netbox.core.ElementaryFilterCfg = function(field,rowSize,cfg){
  this.rowSize=rowSize;
  var operators = [["","<PRE> </PRE>"]];
  this.labelAlign=cfg.labelAlign;
  this.field=field;
  for(var i=0; i<field.getAvailableOperators().length;i++){
    operators.push([field.getAvailableOperators()[i].getId(),
    field.getAvailableOperators()[i].getLabel()]);
  }
  var operatorStore=new Ext.data.SimpleStore({
    fields : ['operatorId','operatorLabel'],
    data: operators
  });
  var comboCfg={
      store         : operatorStore,
      mode          : 'local',
      valueField    : 'operatorId',
      displayField  : 'operatorLabel',
      editable      : false,
      triggerAction : 'all',
      lazyRender    : true,
      fieldLabel    : field.getLabel(),
      width         : 105,
      tpl           : '<tpl for="."><div class="x-combo-list-item">{[values.operatorLabel=="<PRE> </PRE>" ? values.operatorLabel : values.operatorLabel.escHtml()]}</div></tpl>'
  }
  
  if(Ext.isSafari)
    comboCfg.anchor="90%";
  else
    comboCfg.anchor="98%";
  comboCfg.anchor+=" 100%";
  this.operatorCombo = new Ext.form.ComboBox(comboCfg);
  var cfgCloned=Ext.apply({},cfg);
  cfgCloned.layout='form';
  cfgCloned.height=this.rowSize;
  cfgCloned.labelWidth=1;
  cfgCloned.labelPad=1;
  if(this.labelAlign!=="top")
    cfgCloned.hideLabels=true;
  this.editorComponent=new Ext.Panel(cfgCloned);
}

Ext.ux.netbox.core.ElementaryFilterCfg.prototype=/** @scope Ext.ux.netbox.core.ElementaryFilterCfg.prototype */{
  /** Returns the operator combo used to edit the elementary filter s of the given field
    * @return {Ext.form.ComboBox} The returned combo.
    * @ignore
    */
  getOperatorCombo: function(){
    return(this.operatorCombo);
  },

  /** Returns the container that will contain the field used to edit the value of the elementary filter
    * @return {Ext.Container} The returned container.
    * @ignore
    */
  getEditorComponent: function(){
    return(this.editorComponent);
  },
  /** Returns the form field to edit the value of the elementary filter
    * @return {Ext.form.Field} The returned form field.
    * @ignore
    */
  getField: function(){
    return(this.field);
  },
  /** It sets the editor used to manage the values of the elementary filter
    * @param {Ext.Editor} editor The editor to use to manage the values of the elementary filter
    * @ignore
    */
  setEditor: function(editor){
    this.editor=editor;
    if(Ext.isSafari)
      this.editor.field.anchor="90%";
    else
      this.editor.field.anchor="98%";
    this.editor.field.labelSeparator='';
    if(this.labelAlign=="top"){
      if(Ext.isIE)
        this.editor.field.fieldLabel="<pre> </pre>";//this one doesn't work in FF
      else{
        this.editor.field.labelStyle="white-space: pre;"; //this one doesn't work in IE6
        this.editor.field.fieldLabel=" ";
      }
    } else {
      this.editor.field.fieldLabel="";
    }
  },
  /** It returns the editor used to manage the values of the elementary filter
    * @return {Ext.Editor} The editor used to manage the values of the elementary filter
    * @ignore
    */
  getEditor: function(){
    return(this.editor);
  }
};
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
});// $Id: AvailableValuesEditor.js 225 2010-03-19 11:35:34Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** This constructor instantiates an editor with an Ext.ux.Andrie.Select to use as editor widget
  * @class This class is used to edit a value of a elementary filter when a set of available values must be shown.
  * The values MUST be in the format [{label:..., value:...}]
  * @constructor
  * @param {Ext.data.Store} store The store used to retrieve the data.
  * It must have 2 columns, label (which will be used as displayField) and value (which will be used as labelField).
  * @config {Object} config See the parameter with the same name of Ext.ux.FilterEditor.
  * Also were added in the config 4 boolean parameters: remote, forceReload,  multiSelect and caseSensitive.
  * config.remote: true if the store is remote, false if the data is local (ie, if store is a Ext.data.SimpleStore). Dafault is false.
  * config.forceReload: true if the store is to be reloaded everytime the combo expands. Dafault is false.
  * config.multiSelect: true if more than one selection is allowed, false for 1. Dafault is false.
  * config.caseSensitive: true if the value should be compared with the store's one with case sensitive. Default is true.
  * @extends Ext.ux.netbox.FilterEditor
  */

Ext.ux.netbox.core.AvailableValuesEditor=function(store,config){

  if(config==undefined){
    config={};
  }
  var mode='local';
  if(config.remote==true)
    mode='remote';
  if(config.multiSelect==undefined){
    config.multiSelect=false;
  }
  this.fieldCombo=new Ext.ux.Andrie.Select({
    store         : store,
    displayField  : 'label',
    valueField    : 'value',
    selectOnFocus : true,
    mode          : mode,
    triggerAction : 'all',
    selectOnFocus : true,
    typeAhead     : true,
    multiSelect   : config.multiSelect,
    minChars      : 0
  });
  if(!config.multiSelect){
    this.fieldCombo.on('select',this.completeEditLater,this);
  }
  if(config.forceReload){
    this.fieldCombo.on("beforequery",function(qe){ qe.combo.lastQuery = null; });
  }
  if(config.caseSensitive)
    this.caseSensitive=true;
  else
    this.caseSensitive=false;
  Ext.ux.netbox.core.AvailableValuesEditor.superclass.constructor.call(this,this.fieldCombo,config);
  this.store=store;
}

Ext.extend(Ext.ux.netbox.core.AvailableValuesEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.core.AvailableValuesEditor.prototype */{

  /** This method sets the value. This means that it sets the value of the inner combo.
    * If the value is an array with at least one element, the value to set is the array of the given elements.
    * Otherwise the value will be the empty string.
    * @param {Object} value The value to set.
    */
  setValue: function(value){
    var val=[];
    var rawVal=[];
    var label='';
    if(value!=undefined && value!=null && Ext.type(value)=="array"){
      if(value.length>0){
        for(var i=0; i< value.length && ((this.fieldCombo.multiSelect) || i<1); i++){
          val.push(value[i].value);
          if(value[i].label!=undefined){
            rawVal.push(value[i].label);
          } else {
            rawVal.push(value[i].value);
          }
        }
      }
    }
    this.originalValue=value;

    Ext.ux.netbox.core.AvailableValuesEditor.superclass.setValue.call(this,val);
    /* Hack to show the right label even if the store is not loaded.*/
    Ext.form.ComboBox.superclass.setValue.call(this.fieldCombo,rawVal.join(","));
    this.fieldCombo.value=val;
    this.fieldCombo.rawValueArray=rawVal;
  },
  
  /** This is a hack. If I stop editing on the select event, the gridpanel will scroll to the first row if there is a scrollbar.
    * The reason is that the ComboBox will request the focus after the event, even if it's not visible 
    * (the editor that contains the combo is already hidden)
    * I delay the complete of the editing at the end of the browser event queue (0 milliseconds of delay), to avoid the problem
    * @provate
    * @ignore
    */
  completeEditLater: function(){
    var task=new Ext.util.DelayedTask(this.completeEdit,this);
    task.delay(0);
  },
  
  /** This method gets the value. It searches the values in the store to have, with the values, the labels. If the store is not loaded,
    * since the user didn't modify the value, it returns the original value.
    * @return {Array} An array ob objects in the format {label:..., value:...}
    */
  getValue: function() {
    var val=Ext.ux.netbox.core.AvailableValuesEditor.superclass.getValue.call(this);
    if(Ext.type(val)=='string'){
      val=val.split(',');
    }
    var toReturn=[];
    for(var i=0; i<val.length;i++){
      var j=this.store.find('value',val[i],0,false,this.caseSensitive);
      if(j<0)
        continue;
      var record=this.store.getAt(j);
      toReturn.push({label: record.get('label'), value: val[i]});
    }
    //if the user clicks on the field and then it presses Enter, the store is not loaded...
    if((val.length>0 && val[0]!=="") && toReturn.length==0)
      return(this.originalValue);
    else
      return toReturn;
  }
});
// $Id: TextValuesEditor.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** It creates a new TextValuesEditor. For an error the order of the parameter is reversed because we want the second field to be optional (the default value is a new Ext.form.TextField)
  * @class This class extends Editor to manage an array of {label: originalValue, value: originalValue} as value.
  * It should be used to manage all the form field that doesn't have a value different from the label (for example a TextField or a checkbox,
  * but not a ComboBox where label and value are different)
  * @constructor
  * @param {Object} config The config object. For more info look at the config options of Ext.Editor
  * @param {Ext.form.Field} The field inside the editor. Optional. The default value is a new Ext.form.TextField
  * @extends Ext.ux.netbox.FilterEditor
  */
Ext.ux.netbox.core.TextValuesEditor = function(field, config){
  if(field==undefined){
    field=new Ext.form.TextField();
  }
  Ext.ux.netbox.core.TextValuesEditor.superclass.constructor.call(this,field,config);
}

Ext.extend(Ext.ux.netbox.core.TextValuesEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.core.TextValuesEditor.prototype */
{
  /** This method sets the value
    * @param (Array) value
    */
  setValue: function(value){
    var val;
    if(value!==undefined && value!==null && Ext.type(value)==="array"){ 
      if(value.length==0){
        val="";
      } else if (value[0].value!==undefined){
        val=value[0].value;
      } else {
        val=value[0];
      }
    } else {
      val="";
    }
    Ext.ux.netbox.FilterEditor.superclass.setValue.call(this,val);
  },

  /** This method gets the value
    * @return Array of Objects containing the values {label: ..., value: ...}
    */
  getValue: function() {
    var val=Ext.ux.netbox.FilterEditor.superclass.getValue.call(this);
    if(val===""){
      return([]);
    } else {
      val=[{label: val, value:val}];
    }
    return(val);
  }

});// $Id: RangeField.js 227 2010-03-25 09:51:29Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** Create a new RangeField
  * A range field is a widget used to edit ranges. It's a trigger field that has in the popup 2 Ext.form.TextField (or classes derived by a TextField)
  * to allow the user to enter the from and the to end points of a range 
  * @extends Ext.form.TriggerField
  * @constructor
  * @param {Object} config Configuration options
  * <ul>
  *   <li> fromConfig The config for the from object</li>
  *   <li> toConfig The config for the from object</li>
  *   <li> textCls The Class to use as from and to (for example Ext.form.TextField)</li>
  *   <li> minListWidth The min width (in pixel) of the popup. Optional. Default 20 </li>
  *   <li> fieldSize The size of the field (in number of characters). Optional. Default 20</li>
  * </ul>
  */
Ext.ux.netbox.core.RangeField = function(config){
  this.textCls=config.textCls;
  this.fromConfig=config.fromConfig;
  this.toConfig=config.toConfig;
  if(config.minListWidth){
    this.minListWidth=config.minListWidth;
  } else {
    this.minListWidth=100;
  }
  if(config.fieldSize){
    this.defaultAutoCreate.size=config.fieldSize;
  }
  Ext.ux.netbox.core.RangeField.superclass.constructor.call(this,config);
}

Ext.extend(Ext.ux.netbox.core.RangeField,Ext.form.TriggerField,/** @scope Ext.ux.netbox.core.RangeField.prototype */{
  fromText    : 'from',
  toText      : 'to',
  /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "text", size: "20", autocomplete: "off"})
     */  
  defaultAutoCreate : {tag: "input", type: "text", size: "20", autocomplete: "off"},
  editable: false,
  rangeValue: null,
   
  initComponent: function () {
	Ext.ux.netbox.core.RangeField.superclass.initComponent.call(this);
  },
  /** onTriggerClick
    * @private
    */
  onTriggerClick: function(){
    if(this.disabled){
      return;
    }
    if(this.menu == null){
      this.menu = new Ext.ux.netbox.core.RangeMenu(this.textCls,this.fromConfig,this.toConfig,this.validate.createDelegate(this));
    }
    if (this.menuListeners) {
	this.menu.on(Ext.apply({}, this.menuListeners, {scope:this}));
    }
    this.menu.setWidth(this.getWidth());
    this.menu.show(this.getEl());
    this.menu.setValue(this.rangeValue);
  },
  /** getValue
    * @private
    */  
  getValue: function(){
    if(this.menu !== undefined)
      this.rangeValue=this.menu.getValue();
    return(this.rangeValue);
  },
  /** setValue
    * @private
    */  
  setValue: function(val){
    valueFrom = val[0] !== undefined ? val[0] : {value:'',label:''};
    valueTo = val[1] !== undefined ? val[1] : {value:'',label:''};
    formattedValue=this.fromText+": "+valueFrom.label+", "+this.toText+": "+valueTo.label;
    Ext.ux.netbox.core.RangeField.superclass.setValue.call(this, formattedValue);
    this.rangeValue=val;
    if(this.menu!=null){
      this.menu.setValue(this.rangeValue);
    }
  },
  /** It marks the field as invalid. It renders as invalid the from and to field too
    * @private
    * @param {String} msg The message to show to the user
    * @ignore
    */
  markInvalid: function(msg){
    Ext.ux.netbox.core.RangeField.superclass.markInvalid.call(this,msg);
    if(this.menu){
      this.menu.markInvalid(msg);
    }
  },
  /** Overwrites the clearMask function to manage the masks of the from and to fields
    */  
  clearInvalid: function(){
    Ext.ux.netbox.core.RangeField.superclass.clearInvalid.call(this);
    if(this.menu){
      this.menu.clearInvalidFields();
    }
  },
  /** validateBlur
    * @private
    */
  validateBlur: function(e){
    return(this.menu && this.menu.getEl() && !this.menu.getEl().contains(e.target));
  }

});

// $Id: RangeMenu.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** Creates a new RangeMenu, a menu containing 2 input box that represents the range value between 2 values.
  * @class This is a private class used by RangeField (it's the popup)
  * @extends Ext.menu.Menu
  * @constructor
  * @ignore
  */
Ext.ux.netbox.core.RangeMenu = function(textCls,fromCfg,toCfg,fieldValidateFunc){
  if(textCls===undefined){
    textCls = Ext.form.TextField;
    textCls.anchor = "100%";
  }
  this.editorFrom=new textCls(fromCfg);
  this.editorTo=new textCls(toCfg);
  this.editorFrom.validate=fieldValidateFunc;
  this.editorTo.validate=fieldValidateFunc;

  this.editorFrom.fieldLabel=this.fromText;
  this.editorTo.fieldLabel=this.toText;

  this.initComponent();

  Ext.ux.netbox.core.RangeMenu.superclass.constructor.apply(this,arguments);
};

Ext.extend(Ext.ux.netbox.core.RangeMenu, Ext.menu.Menu,/** @scope Ext.ux.netbox.core.RangeMenu.prototype */{

  fromText : 'from',  
  toText   : 'to',

  hideOnClick: false,
  layout: "form",
  labelWidth: 38,
  style: {'background-image': 'none'},
  // Needed as it is defined into a MenuLayout but not into the FormLayout
  // that we use for this RangeMenu
  layoutConfig: {  
	doAutoSize : function () {
	}
  },
  
  initComponent: function () {
       Ext.apply(this, {items: [this.editorFrom, this.editorTo]});
       Ext.ux.netbox.core.RangeMenu.superclass.initComponent.call(this);
       this.addEvents({'update': true});
       var items = this.items.items;
       for (var i = 0; i < items.length; i++) {
           items[i].on("keyup", this.onKeyUp, this);
       }
  },
  /** setValue
    * @ignore
    */
  setValue: function(data){
    var from="";
    var to="";
    if(data.length==2){
      from=data[0].label;
      to=data[1].label;
    } else if (data.length==1) {
      from=data[0].label;
    }
    if(to==="") {
        this.editorTo.setRawValue("");
    }else {
	this.editorTo.setValue(to);
    }
    if (from==="") {
        this.editorFrom.setRawValue("");
    } else {
        this.editorFrom.setValue(from);
    }

    this.fireEvent("update", this);
  },
  /** onKeyUp
    * @ignore
    */  
  onKeyUp: function(event){
    if(event.getKey() == event.ENTER && this.isValid()){
      this.hide(true);
      return;
    }
  },
  /** getValue
    * @ignore
    */  
  getValue: function(){
    var result = [{value: this.editorFrom.getValue(), label: this.editorFrom.getValue()}, 
                  {value: this.editorTo.getValue(), label: this.editorTo.getValue()}];
    return result;
  },
  /** isValid
    * @ignore
    */ 
  isValid: function(){
    return (this.editorFrom.isValid() && this.editorTo.isValid());
  },
   /** It sets as invalid the from and to fields
    * @private
    * @param {String} msg The message to show to the user
    * @ignore
    */
  markInvalid: function(msg){
    this.editorFrom.markInvalid(msg);
    this.editorTo.markInvalid(msg);
  },
   /** It clears the invalid mask from the from and to fields
    * @private
    * @ignore
    */ 
  clearInvalidFields: function(){
    this.editorFrom.clearInvalid();
    this.editorTo.clearInvalid();
  }

});
// $Id: LocalStoreFilterResolver.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox.core');

/** Build a new LocalStoreFilterResolver.
  * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel whose filter must be applied to the store
  * @param {Object} mapping A mapping to use instead of the default one.
  * @class This is the class that does the actual filtering with a DataStore that has local data. For each available operator (identified by id) it defines
  * a function that returns if a record matches an elementary filter or not. These functions have as input parameters:
  * <ol>
  *   <li> <b>record</b>: Ext.data.Record <em> The record of the store that the function should check</em></li>
  *   <li> <b>value</b>: Mixed <em> The value of the elementary filter that the function should evaluate</em></li>
  *   <li> <b>column</b>: String <em> The field id of the elementary filter that the function should evaluate</em></li>
  * </ol>
  * For example if I have a filter <PRE>{id:"Ciccio", operator: "STRING_EQUAL", values:[{label: "bombo",value:"bombo"}]},</PRE> the function corresponding with
  * STRING_EQUAL in the mapping will be called for each record in the store, with [{label: "bombo",value:"bombo"}] as value and "Ciccio" as column.<br>
  * This is, for example, the default mapping:
  * <PRE>
  * this.mapping={NUMBER_EQUAL: {fn: this.filterNumberEqual, scope: this},
  *   NUMBER_NOT_EQUAL: {fn: this.filterNumberDifferent, scope: this},
  *   NUMBER_GREATER: {fn: this.filterNumberGreater, scope: this},
  *   NUMBER_GREATER_OR_EQUAL: {fn: this.filterNumberGreaterOrEqual, scope: this},
  *   NUMBER_LESS: {fn: this.filterNumberLess, scope: this},
  *   NUMBER_LESS_OR_EQUAL: {fn: this.filterNumberLessOrEqual, scope: this},
  *   NUMBER_RANGE: {fn: this.filterNumberRange, scope: this},
  *   STRING_EQUAL: {fn: this.filterStringEquals, scope: this},
  *   STRING_DIFFERENT: {fn: this.filterStringDifferent, scope: this},
  *   STRING_CONTAINS: {fn: this.filterStringContains, scope: this},
  *   STRING_DOESNT_CONTAIN: {fn: this.filterStringDoesntContains, scope: this},
  *   STRING_STARTS_WITH: {fn: this.filterStringStartsWith, scope: this},
  *   STRING_ENDS_WITH: {fn: this.filterStringEndsWith, scope: this},
  *   STRING_LIST: {fn: this.filterList, scope: this},
  *   STRING_NOT_IN_LIST: {fn: this.filterNotInList, scope: this}};
  * </PRE>
  * If, in the mapping, the scope field is null, the default scope (window) is used
  * To use this class you should instantiate the class,
  * and then use the filter method of the class as argument of the filterBy method of the store<br>
  * <h4> Example</h4>
  * If you have a grid, with a Store with local data, to filter the grid you simply call the apply function
  * <PRE>
  * var localFilterResolver=new Ext.ux.netbox.core.LocalStoreFilterResolver(filterModel);
  * function filterGrid(){
  *   localFilterResolver.apply(store);
  * }
  * </PRE>
  * @constructor
  */
Ext.ux.netbox.core.LocalStoreFilterResolver = function(filterModel, mapping) {
  /** This is the mapping used to verify if a value matches a single condition
    * @property {Object} mapping
    * @private
    */
  this.mapping=null;
  if(mapping==undefined){
    this.mapping={
      NUMBER_EQUAL: {fn: this.filterNumberEqual, scope: this},
      NUMBER_NOT_EQUAL: {fn: this.filterNumberDifferent, scope: this},
      NUMBER_GREATER: {fn: this.filterNumberGreater, scope: this},
      NUMBER_GREATER_OR_EQUAL: {fn: this.filterNumberGreaterOrEqual, scope: this},
      NUMBER_LESS: {fn: this.filterNumberLess, scope: this},
      NUMBER_LESS_OR_EQUAL: {fn: this.filterNumberLessOrEqual, scope: this},
      NUMBER_RANGE: {fn: this.filterNumberRange, scope: this},
      STRING_EQUAL: {fn: this.filterStringEquals, scope: this},
      STRING_DIFFERENT: {fn: this.filterStringDifferent, scope: this},
      STRING_CONTAINS: {fn: this.filterStringContains, scope: this},
      STRING_DOESNT_CONTAIN: {fn: this.filterStringDoesntContains, scope: this},
      STRING_STARTS_WITH: {fn: this.filterStringStartsWith, scope: this},
      STRING_ENDS_WITH: {fn: this.filterStringEndsWith, scope: this},
      STRING_LIST: {fn: this.filterList, scope: this},
      STRING_NOT_IN_LIST: {fn: this.filterNotInList, scope: this},
      DATE_EQUAL:{fn: this.filterDateEqual, scope: this},
      DATE_GREATER:{fn: this.filterDateGreater, scope: this},
      DATE_GREATER_OR_EQUAL:{fn: this.filterDateGreaterOrEqual, scope: this},
      DATE_LESS:{fn: this.filterDateLess, scope: this},
      DATE_LESS_OR_EQUAL:{fn: this.filterDateLessOrEqual, scope: this},
      DATE_RANGE:{fn: this.filterDateRange, scope: this},
      DATE_PERIOD:{fn: this.filterDatePeriod, scope: this}
    };
  }
  /** This is the filterModel whose filters will be used to filter the store
    * @property {Ext.ux.netbox.core.FilterModel} filterModel
    * @private
    */
  this.filterModel=filterModel;
}

Ext.ux.netbox.core.LocalStoreFilterResolver.prototype = {

  /** This is used to escape the characters that have a special meaning in a regular expression pattern
    * For example the '[','+' etc...
    * @param {String} s The string to escape,
    * @private
    */
  escapeRegExp: function(s){
    return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
  },
  /** This is used to return a standard value from the array of values with format {value: , label: }
    * @param {Object} value The value of the filter.
    * @return {String} A string value to use to match the filter
    * @private
    */
  calcolateValue: function(value){
    if(value.length==0){
      return("");
    } else {
      return(value[0].value);
    }
  },
  /** This is used to return a standard number value from the array of values with format {value: , label: }
    * @param {Object} value The value of the filter.
    * @return {Number} A number value to use to match the filter
    * @throws {String} When it's unable to parse the given value to a number
    * @private
    */
  calcolateValueNumber: function(value){
    if(value.length==0){
      throw("Not a number");
    } else {
      var val=parseFloat(value[0].value);
      if(isNaN(val)){
        throw("Not a number");
      }
      return(val);
    }
  },
  /** This is used to return a standard date value from the array of values with format {value: , label: }
    * @param {Object} value The value of the filter.
    * @return {Date} A date value to use to match the filter
    * @throws {String} When it's unable to parse the given value to a Date
    * @private
    */
  calcolateValueDate: function(value){
    if(value.length==0){
      throw("Not a date");
    } else {
      var date=Date.parseDate(value[0].value,'Y-m-d H:i:s');
      if(!date){
        throw("Not a date");
      }
      return(date);
    }
  },
  /** This is the standard implementation of the STRING_EQUAL filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterStringEquals: function(record, value,column){
    return(record.get(column)===this.calcolateValue(value));
  },
  /** This is the standard implementation of the STRING_DIFFERENT filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterStringDifferent: function(record, value,column){
    return(!this.filterStringEquals(record, value,column));
  },
  /** This is the standard implementation of the STRING_LIST filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise. If value is an empty array it doesn't match
    */
  filterList:  function(record, value,column){
    for(var i=0; i<value.length;i++){
      if(this.filterStringEquals(record, [value[i]],column)){
        return(true);
      }
    }
    return(false);
  },
  /** This is the standard implementation of the STRING_LIST filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise. If value is an empty array it matches all the records
    */
  filterNotInList:  function(record, value,column){
    return(!this.filterList(record, value,column));
  },
  /** This is the standard implementation of the STRING_STARTS_WITH filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterStringStartsWith: function(record, value,column){
    var val=this.escapeRegExp(this.calcolateValue(value));
    var pattern = new RegExp('^' + val,'');
    return(record.get(column).match(pattern)!==null);
  },
  /** This is the standard implementation of the STRING_ENDS_WITH filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterStringEndsWith: function(record, value,column){
    var val=this.escapeRegExp(this.calcolateValue(value));
    var pattern = new RegExp(val+'$','');
    return(record.get(column).match(pattern)!==null);
  },
  /** This is the standard implementation of the STRING_CONTAINS filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterStringContains: function(record, value,column){
    var val=this.escapeRegExp(this.calcolateValue(value));
    var pattern = new RegExp('.*'+val+'.*','');
    return(record.get(column).match(pattern)!==null);
  },
  /** This is the standard implementation of the STRING_DOESNT_CONTAIN filter match.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterStringDoesntContains:function(record, value,column){
    return(!this.filterStringContains(record, value,column));
  },
  /** This is the standard implementation of the NUMBER_EQUAL filter match.
    * When it's unable to parse the given value as a number or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberEqual: function(record, value,column){
    var val;
    try {
      val=this.calcolateValueNumber(value);
    } catch (e){
      return(false);
    }
    return(record.get(column)===val);
  },
  /** This is the standard implementation of the NUMBER_NOT_EQUAL filter match.
    * When it's unable to parse the given value as a number or when the input is an empty array it returns true.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberDifferent:function(record, value,column){
    return(!this.filterNumberEqual(record, value,column));
  },
  /** This is the standard implementation of the NUMBER_GREATER filter match.
    * When it's unable to parse the given value as a number or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberGreater: function(record, value,column){
    var val;
    try {
      val=this.calcolateValueNumber(value);
    } catch (e){
      return(false);
    }
    return(record.get(column)>val);
  },
  /** This is the standard implementation of the NUMBER_LESS_OR_EQUAL filter match.
    * When it's unable to parse the given value as a number or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberLessOrEqual: function(record, value,column){
    var val;
    try {
      val=this.calcolateValueNumber(value);
    } catch (e){
      return(false);
    }
    return(!this.filterNumberGreater(record, value,column));
  },
  /** This is the standard implementation of the NUMBER_LESS filter match.
    * When it's unable to parse the given value as a number or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberLess: function(record, value,column){
    var val;
    try {
      val=this.calcolateValueNumber(value);
    } catch (e){
      return(false);
    }
    return(record.get(column) < val);
  },
  /** This is the standard implementation of the NUMBER_GREATER_OR_EQUAL filter match.
    * When it's unable to parse the given value as a number or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberGreaterOrEqual: function(record, value,column){
    var val;
    try {
      val=this.calcolateValueNumber(value);
    } catch (e){
      return(false);
    }
    return(!this.filterNumberLess(record, value,column));
  },
  /** This is the standard implementation of the NUMBER_RANGE filter match. The 2 range values are included.
    * When it's unable to parse any of the 2 given values as a number or when the input is an empty array it returns false.
    * If the number of given values id different from 2, it returns false
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterNumberRange: function(record, value,column){
    if(value.length!=2){
      return(false);
    }
    var matchLower=this.filterNumberGreaterOrEqual(record,[value[0]],column);
    var matchUpper=this.filterNumberLessOrEqual(record,[value[1]],column);
    return(matchLower && matchUpper);
  },
  /** This is the standard implementation of the DATE_EQUAL filter match.
    * When it's unable to parse the given value as a date or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDateEqual: function(record, value,column){
    var date;
    try {
      date=this.calcolateValueDate(value);
    } catch (e){
      return(false);
    }
    return(record.get(column).getTime()==date.getTime());
  },
  /** This is the standard implementation of the DATE_GREATER filter match.
    * When it's unable to parse the given value as a date or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDateGreater: function(record, value,column){
    var date;
    try {
      date=this.calcolateValueDate(value);
    } catch (e){
      return(false);
    }
    return(record.get(column).getTime()>date.getTime());
  },
  /** This is the standard implementation of the DATE_LESS_OR_EQUAL filter match.
    * When it's unable to parse the given value as a date or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDateLessOrEqual: function(record, value,column){
    var val;
    try {
      val=this.calcolateValueDate(value);
    } catch (e){
      return(false);
    }
    return(!this.filterDateGreater(record, value,column));
  },
  /** This is the standard implementation of the DATE_LESS filter match.
    * When it's unable to parse the given value as a date or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDateLess: function(record, value,column){
    var date;
    try {
      date=this.calcolateValueDate(value);
    } catch (e){
      return(false);
    }
    return(record.get(column).getTime() < date.getTime());
  },
  /** This is the standard implementation of the DATE_GREATER_OR_EQUAL filter match.
    * When it's unable to parse the given value as a date or when the input is an empty array it returns false.
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDateGreaterOrEqual: function(record, value,column){
    var date;
    try {
      date=this.calcolateValueDate(value);
    } catch (e){
      return(false);
    }
    return(!this.filterDateLess(record, value,column));
  },
  /** This is the standard implementation of the DATE_RANGE filter match. The 2 range values are included.
    * When it's unable to parse any of the 2 given values as a dates or when the input is an empty array it returns false.
    * If the number of given values id different from 2, it returns false
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDateRange: function(record, value,column){
    if(value.length!=2){
      return(false);
    }
    var matchLower=this.filterDateGreaterOrEqual(record,[value[0]],column);
    var matchUpper=this.filterDateLessOrEqual(record,[value[1]],column);
    return(matchLower && matchUpper);
  },
  /** This is the standard implementation of the DATE_PERIOD filter match.
    * If the input is empty array it returns false, otherwise it verifies if the value is between now  and now -the period
    * If the given period is not among LAST_YEAR, LAST_MONTH, LAST_WEEK, LAST_DAY, LAST_HOUR, LAST_QUARTER it returns false
    * @param {Ext.data.Record} record The record to match against the value
    * @param {Array of Object} value The value to match against the filter
    * @param {String} column The column of the record to match
    * @return {boolean} true if it matches, false otherwise
    */
  filterDatePeriod: function(record, value,column){
    if(value.length!=1){
      return(false);
    }
    var upper=new Date();
    upperValue={label: upper.format('Y-m-d H:i:s'),value:upper.format('Y-m-d H:i:s')};
    var lower;
    if(value[0].value==='LAST_YEAR'){
      lower=upper.add(Date.YEAR,-1);
    } else if (value[0].value==='LAST_MONTH'){
      lower=upper.add(Date.MONTH,-1);
    }else if (value[0].value==='LAST_WEEK'){
      lower=upper.add(Date.DAY,-7);
    }else if (value[0].value==='LAST_DAY'){
      lower=upper.add(Date.DAY,-1);
    }else if (value[0].value==='LAST_HOUR'){
      lower=upper.add(Date.HOUR,-1);
    }else if (value[0].value==='LAST_QUARTER'){
      lower=upper.add(Date.MINUTE ,-15);
    } else {
      return(false);
    }
    var lowerValue={label: lower.format('Y-m-d H:i:s'),value:lower.format('Y-m-d H:i:s')};
    return(this.filterDateRange(record, [lowerValue,upperValue],column));
  },
  /** This function is used for apply the setted filter on store.<br>
    * Example:
    * <PRE>
    * localFilterResolver.apply(store)
    * </PRE>
    * @param {Ext.data.Store} store The store that is filtered
    */
  apply : function(store){
    store.filterBy(this.filter,this);
  },
  /** This function must be used as the first argument of the filterBy store method to perform the filtering.
    * Example:
    * <PRE>
    * store.filterBy(localStoreFilterResolver.filter,localStoreFilterResolver)
    * </PRE>
    * @param {Ext.data.Record} record The record to filter against the given filterObject (as returned by filterModel.getFilterObj)
    * @param {String} id The id of the record
    * @param {Object} filterObj The record is matched against this filterObj. This parameter is optional. The defualt is this.filterMAnager.getFilterObj()
    * @return {boolean} true id the record matches, false otherwise
    */
  filter: function(record,id,filterObj){
    if(filterObj==undefined)
      filterObj=this.filterModel.getFilterObj();
    if(filterObj==null)
      return(true);
    if(filterObj.operatorId!=undefined){
      var fn=this.mapping[filterObj.operatorId].fn;
      var scope=this.mapping[filterObj.operatorId].scope;
      if(scope===undefined || scope === null){
        scope=window;
      }
      toReturn=fn.call(scope,record,filterObj.values,filterObj.fieldId);
      return(toReturn);
    } else {
      var ret=this.filter(record,id,filterObj.left);
      if(ret===true && filterObj.logicalOperator===Ext.ux.netbox.core.CompositeFilter.OR)
        return true;
      if(ret===false && filterObj.logicalOperator===Ext.ux.netbox.core.CompositeFilter.AND)
        return(false);
      ret=this.filter(record,id,filterObj.right);
      return(ret);
    }
  }
}
// $Id: QuickFilterModelView.js 179 2008-09-10 13:29:44Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** Create a new QuickFilterModelView.
  * @class Provides a view on FilterModel and allows to quickly add filters directly from a grid using a context menu.
  * In this way you right click on a cell of the grid (for example the cell containing the value "John" in the name column), a context menu appears,
  * you select the operator from the context menu (for example "=") and a filter is added (name = "John"). <br>
  * <b>NB</b> By default it will use the value in the store as value, and what returned by the renderer of the column as label
  * Default operators are as follows, divided by datatype:<p><em>
  * <b>String</b>: ['STRING_EQUAL','STRING_DIFFERENT']<br>
  * <b>Enummerative</b>: ['STRING_EQUAL','STRING_DIFFERENT']<br>
  * <b>Number</b>: ['NUMBER_EQUAL','NUMBER_NOT_EQUAL','NUMBER_GREATER','NUMBER_GREATER_OR_EQUAL','NUMBER_LESS','NUMBER_LESS_OR_EQUAL']<br>
  * <b>Date</b>: ['DATE_EQUAL','DATE_GREATER','DATE_GREATER_OR_EQUAL','DATE_LESS','DATE_LESS_OR_EQUAL']</em></p>
  * You can define your own list of operators for each field in the config of the class.
  * @constructor
  * @extends Ext.util.Observable
  * @param {Object} config An object which may contain the following properties:
  * @config {Ext.ux.netbox.core.FilterModel} filterModel The FilterModel (mandatory) which is associated the QuickFilter.
  * @config {Array of Object} fieldsOptions The options (otional) for configure the operators to show or add new custom getter function
  * Each element of the array has the following fields:
  * <ul>
  *   <li> <b>id:</b> <em>id of the field</em></li>
  *   <li> <b>operators:</b> <em>array of operators id. This is the set of operators available in the quick filter for the field</em></li>
  *   <li> <b>getterFn</b>: <em>
  *       function that, given the value in the grid, returns the value for the filter.
  *       Usefull for example when the rendered value is totally different from the store value.
  *       This function has the following attributes:
  *       <ul>
  *         <li><b>tableValue:</b> The value in the Store that is displayed in the cell of the grid</li>
  *         <li><b>fieldId:</b> The id of the field on which the elementary filter will be created</li>
  *         <li><b>operatorId:</b> The id of the operator choose by the user</li>
  *         <li><b>grid:</b> The grid on which the user clicked</li>
  *         <li><b>row:</b> the row on which the user clicked</li>
  *         <li><b>column:</b> the column on which the user clicked</li>
  *       </ul>
  *     </em>
  *   </li>
  * </ul>
  * @config {boolean} duplicatedElementaryFiltersAllowed True to allow 2 equals elementary filter (i.e. to allow name='John' 2 times). Optional. Default false
  * @config {boolean} isStatic True to use QuickFilter with StaticFilterModelView. Optional. Default false
  * <h4> Example </h4>
  * <pre>
  * var quickFilter= new Ext.ux.netbox.core.QuickFilterModelView({
  *   filterModel: filterModel,
  *   //for the grid's column inPortfolio the value in the store is different from the rendered one....
  *   fieldsOptions: [{
  *     id: "inPortfolio",
  *     getterFn: function(value,fieldId,operatorId,grid,row,column){
  *       return([{
  *         value: value,
  *         label: inPortfolio(value)
  *       }]);
  *     }
  *   }]
  * });
  * quickFilter.on("filterChanged",filterTable);
  * var contextMenuManager=new Ext.ux.netbox.ContextMenuManager({menu: {items:[quickFilter.getFilterMenu(),quickFilter.getRemoveFilterMenu()]}});
  * var grid = new Ext.grid.GridPanel({
  *     store: ....,
  *     columns: ....,
  *     plugins: [contextMenuManager],
  *   });
  * </pre>
  */
Ext.ux.netbox.core.QuickFilterModelView=function(config){

  this.addEvents(/** @scope Ext.ux.netbox.core.QuickFilterModelView.prototype */{
    /** Fires when a quickFilter is added or removed
      * @event filterChanged
      */
    filterChanged : true
  });

  this.filterModel=config.filterModel;
  this.quickFilterItem=null;
  this.removeFilterItem=null;
  this.fieldsOptions=config.fieldsOptions;
  if(config.duplicatedElementaryFiltersAllowed===undefined){
    this.duplicatedElementaryFiltersAllowed=false;
  } else {
    this.duplicatedElementaryFiltersAllowed=config.duplicatedElementaryFiltersAllowed;
  }
  if(config.isStatic===undefined){
    this.isStatic=false;
  } else {
    this.isStatic=config.isStatic;
  }
  this.stringOperDefault = ['STRING_EQUAL','STRING_DIFFERENT'];
  this.numberOperDefault = ['NUMBER_EQUAL','NUMBER_NOT_EQUAL','NUMBER_GREATER','NUMBER_GREATER_OR_EQUAL','NUMBER_LESS','NUMBER_LESS_OR_EQUAL'];
  this.dateOperDefault = ['DATE_EQUAL','DATE_GREATER','DATE_GREATER_OR_EQUAL','DATE_LESS','DATE_LESS_OR_EQUAL'];
}

Ext.extend(Ext.ux.netbox.core.QuickFilterModelView, Ext.util.Observable,/** @scope Ext.ux.netbox.core.QuickFilterModelView.prototype */
{
  quickFilterText   : 'QuickFilter',
  removeText        : 'Remove filter',
  removeAllText     : 'Remove all',

  /** Creates menu items based on the operators set for the selected field
    * @private
    */
  filterIsToShow: function(grid,row,column){
    if(column==-1 || this.getField(grid,column)==null){
      return false;
    }else{

      var itemsArray=[];
      var field=this.getField(grid,column);
      var availableOperatorsId;

      if(this.fieldsOptions){
        for(var i=0;i<this.fieldsOptions.length;i++){
          if(this.fieldsOptions[i].id===field.getId() && this.fieldsOptions[i].operators){
            availableOperatorsId=this.fieldsOptions[i].operators;
          }
        }
      }

      if(!availableOperatorsId){
        if(field instanceof Ext.ux.netbox.string.StringField || field instanceof Ext.ux.netbox.string.EnumField){
          availableOperatorsId=this.stringOperDefault;
        }else if(field instanceof Ext.ux.netbox.number.NumberField){
          availableOperatorsId=this.numberOperDefault;
        }else if(field instanceof Ext.ux.netbox.date.DateField){
          availableOperatorsId=this.dateOperDefault;
        }else{
          var availableOperators = field.getAvailableOperators();
          for(var i=0;i<availableOperators.length;i++){
            availableOperatorsId.push(availableOperators[i].getId());
          }
        }
      }

      for(var i=0;i<availableOperatorsId.length;i++){
        var isToAdd=true;
        var operator=field.getAvailableOperatorById(availableOperatorsId[i]);
        var filterItem = {
          text: Ext.util.Format.htmlEncode(operator.getLabel()),
          handler: this.setFilter.createDelegate(this,[grid,row,column,field.getId(),operator.getId()],false)
        };

        var filtersList=this.filterModel.getElementaryFiltersByFieldId(field.getId());
        var values=this.getValues(grid,row,column,field.getId(),operator.getId());
        for(var j=0;j<filtersList.length;j++){
          if(filtersList[j].getOperator().getId()===operator.getId() &&
          Ext.util.JSON.encode(filtersList[j].getValues())===Ext.util.JSON.encode(values))
            isToAdd=false;
        }
        if(operator.validate(values)!==true)
          isToAdd=false;

        if(isToAdd)
          itemsArray.push(filterItem);
      }

      if(itemsArray.length > 0){
        this.quickFilterItem.setSubMenu(new Ext.menu.Menu({items: itemsArray}));
        return true;
      } else {
        return false;
      }
    }
  },

  /**
    * @private
    */
  getValues: function(grid,row,column,fieldId,operatorId){
    var record=grid.getStore().getAt(row);
    var tableValue=record.get(grid.getColumnModel().getDataIndex(column));
    var getterFn;
    var getterScope;

    if(this.fieldsOptions){
      for(var i=0;i<this.fieldsOptions.length;i++){
        if(this.fieldsOptions[i].id===fieldId && this.fieldsOptions[i].getterFn){
          getterFn=this.fieldsOptions[i].getterFn;
          if(this.fieldsOptions[i].getterScope)
            getterScope=this.fieldsOptions[i].getterScope;
        }
      }
    }

    if(!getterFn){
      var field=this.getField(grid,column);
      var operator=field.getAvailableOperatorById(operatorId);

      if(operator instanceof Ext.ux.netbox.date.DateOperator && tableValue instanceof Date){
        getterFn=this.getValuesDate;
      }else{
        getterFn=this.getValuesOther;
      }
    }

    if(!getterScope)
      getterScope=this;

    var values=getterFn.call(getterScope,tableValue,fieldId,operatorId,grid,row,column);
    return values;
  },

  /** Default getter. Returns the values formatted.
    * @private
    */
  getValuesOther: function(tableValue,fieldId,operatorId,grid,row,column){
    var rendererFn=grid.getColumnModel().getRenderer(column);
    var record=grid.getStore().getAt(row);
    var label=rendererFn(tableValue,{},record, row,column,grid.getStore());
    return([{label: label, value: tableValue}]);
  },

  /** Default getter for dates. Returns the values formatted, only for dates.
    * @private
    */
  getValuesDate: function(tableValue,fieldId,operatorId,grid,row,column){
    var field=this.filterModel.getFieldManager().getFieldById(fieldId);
    var operator=field.getAvailableOperatorById(operatorId);
    return([{label: tableValue.format(operator.getFormat()), value: tableValue.format('Y-m-d H:i:s')}]);
  },

  /** Method that takes care of the filter set on filterModel when selecting a menu item.
    * @private
    */
  setFilter: function(grid,row,column,fieldId,operatorId){
    var values=this.getValues(grid,row,column,fieldId,operatorId);
    var filterObject={fieldId : fieldId, operatorId : operatorId, values : values}
    var addFilter=true;
    if(!this.duplicatedElementaryFiltersAllowed){
      var elementaryFilters=this.filterModel.getElementaryFiltersByFieldId(fieldId);
      for(var i=0; i<elementaryFilters.length;i++){
        //quick way to compare 2 filters
        if(elementaryFilters[i].getOperator().getId()===operatorId
          && Ext.util.JSON.encode(elementaryFilters[i].getValues())===Ext.util.JSON.encode(values)){
            addFilter=false;
            break;
        }
      }
    }
    if(this.isStatic){
      var elementaryFilters=this.filterModel.getElementaryFiltersByFieldId(fieldId);
      for(var i=0; i<elementaryFilters.length;i++){
        this.filterModel.removeElementaryFilterById(elementaryFilters[i].getId());
      }
    }
    if(addFilter){
      this.filterModel.addElementaryFilter(filterObject);
      this.fireEvent('filterChanged');
    }
  },

  /** Returns a menu item containing the operators available for the selected field,
    * which corresponds to one of the columns of the grid.
    * @return (Ext.ux.netbox.ContainerMenuItem)
    */
  getFilterMenu: function(){
    if(this.quickFilterItem==null){
      this.quickFilterItem = new Ext.ux.netbox.ContainerMenuItem({
        text     : this.quickFilterText,
        isToShow : this.filterIsToShow,
        scope    : this
      });
    }
    return this.quickFilterItem;
  },

  /** Returns a menu item containing the operators to be removed,
    * in a contextual way to the column of the selected cell.
    * @return (Ext.ux.netbox.ContainerMenuItem)
    */
  getRemoveFilterMenu: function(){
    if(this.removeFilterItem==null){
      this.removeFilterItem = new Ext.ux.netbox.ContainerMenuItem({
        text     : this.removeText,
        isToShow : this.removeFilterIsToShow,
        scope    : this
      });
    }
    return this.removeFilterItem;
  },

  /** Creates menu items based on the operators to be removed, for the selected field.
    * @private
    */
  removeFilterIsToShow: function(grid,row,column){
    var filters=this.filterModel.getAllElementaryFilters();
    if(filters.length > 0){

      var itemsArray=[];

      for(var i=0;i<filters.length;i++){
        var label=filters[i].getField().getLabel()+' '+ filters[i].getOperator().getLabel()+' '+filters[i].getOperator().render(filters[i].getValues());
        var iconCls='';
        if(filters[i].isValid()!==true)
          iconCls='x-icon-invalid';
        var filterItem={
          iconCls  : iconCls,
          text     : label,
          handler  : this.removeFilterById.createDelegate(this,[filters[i].getId()],false),
          isToShow : function(){return(true);}
        };
        itemsArray.push(filterItem);
      }

      var removeAllFilterItem = {
        text    : this.removeAllText,
        handler : this.removeAllFilters,
        scope   : this,
        isToShow: function(){return(true);}
      };
      itemsArray.push(removeAllFilterItem);

      this.removeFilterItem.setSubMenu(new Ext.menu.Menu({items: itemsArray}));
      return true;
    }else{
      return false;
    }
  },

  /** Removes all filters set on the filterModel.
    * @private
    */
  removeAllFilters: function(){
    this.filterModel.setFilterObj(null);
    this.fireEvent('filterChanged');
  },

  /** Removes one filter by id from the filterModel.
    * @private
    */
  removeFilterById: function(filterId){
    this.filterModel.removeElementaryFilterById(filterId);
    this.fireEvent('filterChanged');
  },

  /** Returns the field for the given grid and column.
    * @private
    * @ignore
    */
  getField: function(grid,column){
    var columnId=grid.getColumnModel().getDataIndex(column);
    var field=this.filterModel.getFieldManager().getFieldById(columnId);
    return field;
  }

});// $Id: FilterHeaderPlugin.js 107 2008-03-03 16:18:01Z bobbicat71 $

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

};// $Id: ContainerMenuItem.js 100 2008-02-26 09:38:02Z bobbicat71 $

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

});// $Id: ContextMenuManager.js 226 2010-03-19 14:02:31Z alexmario74 $

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
// $Id: PreferenceManager.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox');

/** Creates a new PreferenceManager.
  * @constructor
  * @extends Ext.util.Observable
  * @param {Object} config An object which may contain the following properties:<ul>
  * <li><b>id</b> : String<p style="margin-left:1em">The id of preference manager. A preference is unambiguously identified by id, userName and the name of the preference</p></li>
  * <li><b>userName</b> : String<p style="margin-left:1em">The userName that owns the preferences. A preference is unambiguously identified by id, userName and the name of the preference</p></li>
  * <li><b>getFn</b> : Function<p style="margin-left:1em">The function used to extract from the application the preferences to save</p></li>
  * <li><b>setFn</b> : Function<p style="margin-left:1em">The function used to apply to the application the preferences as returned by getFn</p></li>
  * <li><b>fnScope</b> : Object<p style="margin-left:1em">The scope of the getFn and setFn functions. Optional. If not present window is used</p></li>
  * <li><b>getAllPrefURL</b> : String<p style="margin-left:1em">The URL used to get all the preferences by user. It loads a Store, using a JsonReader as reader.
  * This URL corresponds to a web page that loads a range of preferences for the given user and id. It must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>start</b> : Number<p style="margin-left:1em">The first preference in the range of preferences to return</p></li>
  *   <li><b>limit</b> : Number<p style="margin-left:1em">The The number of preferences to return</p></li>
  * </ul>
  * The page must return a json encoded object in the following format:
  * <PRE>
  * {totalCount: &lt;total number of the preferences&gt;, 
  *   preferences:[
  *     {prefId   : &lt;id of the preference&gt;,
  *      prefName : &lt;name of the preference&gt;,
  *      prefDesc : &lt;the description of the preference&gt;,
  *      isDefault: &lt;true if default, false otherwise&gt;},
  *     {.....}
  *    ]
  *  }
  * </PRE>
  * </p></li>
  * <li><b>applyDefaultPrefURL</b> : String<p style="margin-left:1em">The URL used to apply the default preference.
  * This URL corresponds to a web page that returns the default preference for the given user and id. It must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  * </ul>
  * The page returns the preference in the same format saved by method savePreference and then it's applied. If there is no default preference the response text must be empty.
  * </p></li>
  * <li><b>loadPrefURL</b> : String<p style="margin-left:1em">The URL used to load a specified preference.
  * This URL corresponds to a web page that returns the selected preference for the given user and id. It must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>prefId</b> : String<p style="margin-left:1em">The id of the selected preference</p></li>
  * </ul>
  * The page returns the preference in the same format saved by method savePreference and then it's applied.
  * </p></li>
  * <li><b>savePrefURL</b> : String<p style="margin-left:1em">The URL used to save a preference with a given name.
  * This URL must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>prefId</b> : String<p style="margin-left:1em">The id of the selected preference.
  *   If the value exist means that there is an update, otherwise is an insertion </p></li>
  *   <li><b>prefName</b> : String<p style="margin-left:1em">Name of the preference to save</p></li>
  *   <li><b>prefDesc</b> : String<p style="margin-left:1em">Description of the preference to save</p></li>
  *   <li><b>prefValue</b> : String<p style="margin-left:1em">Value of the preference to save, encoded Json</p></li>
  *   <li><b>isDefault</b> : boolean<p style="margin-left:1em">True if it's default preference, false otherwise</p></li>
  * </ul>
  * </p></li>
  * <li><b>deletePrefURL</b> : String<p style="margin-left:1em">The URL used to delete one or more selected preferences.
  * This URL must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>prefIdArray</b> : [String]<p style="margin-left:1em">Array of preference's Id to delete</p></li>
  * </ul>
  * </p></li>
  * @class This class manages user preferences. A user preference is a "state" of some objects that the user wants to save with a name. For example, he has a grid,
  *  with the column in a predefined order, with some filters applied, sorted for a certain column. He can bookmark the given situation, and associate a name 
  *  to it. The he can easilly select from that prefeences, and the grid is back to the state he saved. Since only the developer knows what is usefull to bookmark,
  *  the preferenceManager has 2 functions, a getter and a setter. The getter acquires the state to save from the application, the setter reapplies the settings returned by the getter
  *  to come back to the saved state. The only restriction on the returned value of the getter is that it must be json encodable/decodable. 
  *  To load and manage the preferences this class defines 4 ajax interfaces that the application backend must implement (See the constructor for more details)
  *  To signal an error in the backend simply returns an error http status code (for example 500)
  * <h4>Example</h4>
  * This example suppoose that you have a grid with a filter. It saves and restores the filters and the status of the grid (size of the columns, position of the columns, sort state, hidden/visible columns)
  * <pre>
  * var getterFn=function(){
  *   return({grid: grid.getState(),filter: filterModel.getFilterObj()});
  * }
  * var setterFn=function(pref){
  *   //filter
  *   if(pref.filter){
  *     filterModel.setFilterObj(pref.filter);
  *   }
  *   //grid
  *   if(pref.grid){
  *     grid.getView().userResized=true;
  *     grid.applyState(pref.grid);
  *     grid.getColumnModel().setConfig(grid.getColumnModel().config);
  *   }
  * }
  * prefManager=new Ext.ux.netbox.PreferenceManager({
  *   id: 'prefManagerId',
  *   userName: 'user',
  *   getFn: getterFn,
  *   setFn: setterFn,
  *   getAllPrefURL:'http://getAllPrefURL',
  *   applyDefaultPrefURL:'http://applyDefaultPrefURL',
  *   loadPrefURL:'http://loadPrefURL',
  *   savePrefURL:'http://savePrefURL',
  *   deletePrefURL:'http://deletePrefURL'
  * });
  * </pre>
  */
Ext.ux.netbox.PreferenceManager=function(config){

  Ext.ux.netbox.PreferenceManager.superclass.constructor.call(this,config);

  this.addEvents(/** @scope Ext.ux.netbox.PreferenceManager.prototype */{
    /** Fires when a preference is saved
      * @event preferenceSaved
      * @param {String} prefId The id of the preference that was saved
      * @param {String} prefName The name of the saved preference
      */
    preferenceSaved: true,
    /** Fires when a preference delete failed, that is when the deletePrefURL returned an error HTTP status code (for example 500)
      * @event preferenceDeleteFailed
      * @param {Array} prefIdArray An array with the ids of all the preferences to delete.
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    preferenceDeleteFailed: true,
    /** Fires when applying the default preference failed, that is when the applyDefaultPrefURL returned an error HTTP status code (for example 500)
      * @event applyDefaultPreferenceFailed
      * @param {Array} prefIdArray An array with all the preferences to delete.
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    applyDefaultPreferenceFailed: true,
    /** Fires when applying a preference failed, that is when the loadPrefURL returned an error HTTP status code (for example 500)
      * <b> NB: </b> This event is not fired when the loading of the default preference fails. Look at applyDefaultPreferenceFailed instead
      * @event applyPreferenceFailed
      * @param {String} prefId The id of the preference that was not applied
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    applyPreferenceFailed: true,
    
    /** Fires when saving a preference failed, that is when the savePrefURL returned an error HTTP status code (for example 500)
      * @event preferenceSaveFailed
      * @param {String} prefId The id of the preference that was not saved
      * @param {String} prefName The name of the preference that was not saved
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    preferenceSaveFailed: true,
    
    /** Fires when a preference is deleted
      * @event preferenceDeleted
      * @param {Array} prefIdArray An array with the ids of all the deleted preferences.
      */
    preferenceDeleted : true,
    /** Fires when a load on the store that lists the preferences fails, that is when the getAllPrefURL returned an error HTTP status code (for example 500)
      * @event loadPreferencesFailed
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    loadPreferencesFailed: true
  });
  /** The id of the preference manager. It's used by the backend to select only the preferences of this preferencesManager, if there are more than one.
    * The tern (id, userName, preferenceId) should be unique.
    * @type String
    */
  this.id=config.id;
  /** The name of the user that owns the prefereces
    * @type String
    */
  this.userName=config.userName;
  /** The setter function that applies the preference restoring the state of the object
    * @type Function
    */
  this.setFn=config.setFn;
  /** The getter function that returns the state of the object
    * @type Function
    */
  this.getFn=config.getFn;
  /** The scope of the getter and setter function
    * @type Object
    */
  this.fnScope=config.fnScope;
  /** The URL used to get all the preferences by user
    * @type String
    */
  this.getAllPrefURL=config.getAllPrefURL;
  /** The URL used to apply the default preference
    * @type String
    */
  this.applyDefaultPrefURL=config.applyDefaultPrefURL;
  /** The URL used to load a specified preference
    * @type String
    */
  this.loadPrefURL=config.loadPrefURL;
  /** The URL used to save a specified preference
    * @type String
    */
  this.savePrefURL=config.savePrefURL;
  /** The URL used to delete a specified preference
    * @type String
    */
  this.deletePrefURL=config.deletePrefURL;
}

Ext.extend(Ext.ux.netbox.PreferenceManager, Ext.util.Observable,/** @scope Ext.ux.netbox.PreferenceManager.prototype */
{
  /** This method returns a store that loads the preferences by userName.
    * The store returned has these columns: prefName, prefDesc, isDefault
    * @return {Ext.data.Store} store The store contains all of a user's preferences
    */
  getAllPreferences : function(){
    if(this.store === undefined){
      this.store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
          url: this.getAllPrefURL
        }),
        baseParams: {id: this.id, userName: this.userName},
        reader: new Ext.data.JsonReader({
          root: 'preferences',
          totalProperty: 'totalCount',
          fields: [
            'prefId',
            'prefName',
            'prefDesc',
            {name: 'isDefault', type: 'boolean'}
          ]
        })
      });
      this.store.on("exception",this._loadExceptionCbk,this);
      this.store.setDefaultSort('prefName');
    }
    return this.store;
  },
  
  /** @private
    * @ignore
    */
  _loadExceptionCbk: function(proxy, request, response){
    this.fireEvent("loadPreferencesFailed",response);
  },

  /** This method returns the default preference by userName.
    * @return {void}
    */
  applyDefaultPreference : function(){
    Ext.Ajax.request({
       url: this.applyDefaultPrefURL,
       success: this.applyDefaultPreferenceCbk.createDelegate(this),
       failure: this.errorFunction.createDelegate(this),
       params: {
         id: this.id,
         userName: this.userName}
    });
  },

  /** This method loads the preference selected.
    * @param {String} prefName The name of the preference
    * @param {Object} prefValue The value of preferences in JSON format
    * @return {void}
    */
  applyPreference : function(prefId,prefValue){
    if(prefValue===undefined){
      Ext.Ajax.request({
         url: this.loadPrefURL,
         success: this.applyPreferenceCbk.createDelegate(this),
         failure: this.errorFunction.createDelegate(this),
         params: {
           id: this.id,
           userName: this.userName,
           prefId: prefId}
      });
    } else {
      this.setFn.call(this.fnScope,prefValue);
    }
  },
  
  /** This method applies the default preference, it it exist
    * @param {Object} response The XMLHttpRequest object containing the preference.
    * @param {Object} options The parameter to the request call.
    * @return {void}
    * @private
    */
  applyDefaultPreferenceCbk : function(response,options){
    if(response.responseText!=""){
      this.applyPreferenceCbk(response,options);
    }
  },

  /** This method converts decodes the responseText using JSON and then it calls the setter function.
    * @param {Object} response The XMLHttpRequest object containing the preference.
    * @param {Object} options The parameter to the request call.
    * @return {void}
    * @private
    */
  applyPreferenceCbk : function(response,options){
    var pref=Ext.util.JSON.decode(response.responseText);
    this.setFn.call(this.fnScope,pref);
  },

  /** The method that saves the preference.
    * @param {String} prefId The id of the preference to save
    * @param {String} prefName The name of the preference to save
    * @param {String} prefDesc The description of the preference
    * @param {boolean} isDefault True if it's default preference
    * @return {String} output decoded with JSON. If it's true (===) it means success, otherwise it's an error message
    */
  savePreference : function(prefId,prefName,prefDesc,isDefault){
    var values=this.getFn.call(this.fnScope);
    var valueEnc=Ext.util.JSON.encode(values);
    var cfg={
       url: this.savePrefURL,
       params: {
         id: this.id,
         userName: this.userName,
         prefId: prefId,
         prefName: prefName,
         prefDesc: prefDesc,
         prefValue: valueEnc,
         isDefault: isDefault
       },
       success: this._onSaveSuccessCbk.createDelegate(this),
       failure: this._onSaveFailureCbk.createDelegate(this)
    };
    Ext.Ajax.request(cfg);
  },

  /** @private
    * @ignore
    */
  _onSaveSuccessCbk : function(response,options){
    this.fireEvent('preferenceSaved',options.params.prefId,options.params.prefName);
  },

  /** @private
    * @ignore
    */
  _onSaveFailureCbk : function(response,options){
    this.fireEvent('preferenceSaveFailed',options.params.prefId, options.params.prefName,response);
  },

  /** This method deletes the preference selected.
    * @param {Array} prefIdArray Array of preference's Id to delete
    * @return {String} output decoded with JSON. If it's true (===) it means success, otherwise it's an error message
    */
  deletePreferences : function(prefIdArray){
    var cfg={
       url: this.deletePrefURL,
       params: {
         id: this.id,
         userName: this.userName,
         prefIdArray: prefIdArray
       },
       success: this._onDeleteSuccessCbk.createDelegate(this),
       failure: this._onDeleteFailureCbk.createDelegate(this)
    };
    Ext.Ajax.request(cfg);
  },

  /** @private
    * @ignore
    */
  _onDeleteSuccessCbk : function(response,options){
    this.fireEvent('preferenceDeleted',options.params.prefIdArray);
  },

  /** @private
    * @ignore
    */
  _onDeleteFailureCbk : function(response,options){
    this.fireEvent('preferenceDeleteFailed',options.params.prefIdArray,response);
  },
  
  /** @private
    * @ignore
    */
  errorFunction : function(response,options){
    if(options.params.prefId===undefined){
      this.fireEvent('applyDefaultPreferenceFailed',response);
    } else {
      this.fireEvent('applyPreferenceFailed',options.params.prefId,response);
    }
  }

});
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
