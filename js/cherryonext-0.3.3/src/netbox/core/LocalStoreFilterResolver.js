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
