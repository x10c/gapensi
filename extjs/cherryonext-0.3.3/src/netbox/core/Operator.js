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
};