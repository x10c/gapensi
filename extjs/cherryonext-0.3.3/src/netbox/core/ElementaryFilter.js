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
// $Id: ElementaryFilter.js 131 2008-03-13 10:52:56Z dandfra $

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

});