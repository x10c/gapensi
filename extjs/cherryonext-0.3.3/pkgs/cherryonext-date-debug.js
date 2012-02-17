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
// $Id: DateTextEditor.js 100 2008-02-26 09:38:02Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.date');

/** It instantiates a new DateTextEditor
  * @class This class extends Ext.ux.netbox.FilterEditor to manage dates as value.
  * For a description of the parameters look at the documentation of Ext.Editor.
  * @constructor
  * @extends Ext.ux.netbox.FilterEditor
  */
Ext.ux.netbox.date.DateTextEditor = function(field,config){
  Ext.ux.netbox.date.DateTextEditor.superclass.constructor.call(this,field,config);
  if(config.format==undefined){
    config.format='Y-m-d H:i:s';
  }
  this.format=config.format;
}

Ext.extend(Ext.ux.netbox.date.DateTextEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.date.DateTextEditor.prototype */{

  /** This method gets the value. If the value inserted by the user is not a valid date, an empty array is returned.
   */

  getValue: function() {
    var val=Ext.ux.netbox.date.DateTextEditor.superclass.getValue.call(this);
    
    if(val===""){
      return([]);
    }else{
      return [{value: val.format('Y-m-d H:i:s'),label:val.format(this.format)}];
    }
  },

  setValue: function(val){
    var value;
    if(val.length==0){
      value="";
    }else{
      value=Date.parseDate(val[0].value, 'Y-m-d H:i:s');
    }
    Ext.ux.netbox.date.DateTextEditor.superclass.setValue.call(this,value);
  }

});// $Id: DateOperators.js 182 2008-09-12 14:07:08Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.date');

/** It instantiates a new DateOperator.
  * @class This is the general class for all DateOperators (with the exception of DatePeriodOperator)<BR>
  * <B>NB:</B> The value of a date operator (ie: value[0].value) will be always in the following format: Y-m-d H:i:s
  * @constructor
  * @extends Ext.ux.netbox.core.Operator
  * @param {String} id The id of the operator
  * @param {String} label The label of the operator
  * @param {String} format The format of the date. The date format should be divided from time format by a space.
  * If you provided only the date format, the time field will not appear.<br>
  * Supported formats:
  * <PRE>
  * Format  Description                                                               Example returned values
  * ------  -----------------------------------------------------------------------   -----------------------
  * d       Day of the month, 2 digits with leading zeros                             01 to 31
  * m       Numeric representation of a month, with leading zeros                     01 to 12
  * Y       A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
  * y       A two digit representation of a year                                      Examples: 99 or 03
  * H       24-hour format of an hour with leading zeros                              00 to 23
  * i       Minutes, with leading zeros                                               00 to 59
  * s       Seconds, with leading zeros                                               00 to 59
  *</PRE>
  */
Ext.ux.netbox.date.DateOperator = function(id,label,format) {
  Ext.ux.netbox.date.DateOperator.superclass.constructor.call(this,id,label,format);

  /** With this operator I want always a TextField with the right mask
    * This is the variable that contains the editor
    * @property {Ext.Editor} editor
    */
  this.editor=null;
  /** The format of the dates
    * @property {String} format
    */
  this.format=format;
};

Ext.extend(Ext.ux.netbox.date.DateOperator,Ext.ux.netbox.core.Operator,/** @scope Ext.ux.netbox.date.DateOperator.prototype */{
  /** This method creates an Ext.ux.netbox.date.DateTextEditor.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var editor;
    var splittedFormat=this.format.split(" ");
    if(splittedFormat.length > 1){
      var dateTimeField=new Ext.ux.form.DateTime({
                dateFormat: splittedFormat[0],
                dateConfig: {
                  altFormats: 'Y-m-d|Y-n-d'
                },
                otherToNow: false,
                timeFormat: splittedFormat[1],
                timeConfig: {
                  altFormats: 'H:i:s'
                }
              });
      editor=new Ext.ux.netbox.date.DateTextEditor(dateTimeField,{format: this.format});
    }else{
      editor=new Ext.ux.netbox.date.DateTextEditor(new Ext.form.DateField({
                format: splittedFormat[0],
                allowBlank: false
              }),
              {format: this.format}
            );
    }
    return editor;
  },

  /** This function controls if the given value is an array with at least an element. If the given element is an object
    * with the format {label: , value: } and the value is a valid date in the format Y-m-d H:i:s, it returns an array containing the first element
    * otherwise it returns an empty array
    * @param {Object} value The value to convert
    * @return {Array} The converted object
    */
  convertValue: function(value){
    if(value !==null && value !== undefined && Ext.type(value)=="array"){
      if(value.length>0 && value[0].value!== undefined && value[0].label!== undefined){
        if(this.getField().checkDate(value[0].label) && this.getField().checkDate(value[0].value,'Y-m-d H:i:s')){
          if(value.length==1){
            return(value);
          } else {
            return([value[0]]);
          }
        }
      }
    }
    return([]);
  },

  /** Returns the format of the dates
    * @return {String} The format of the dates
    */
  getFormat : function(){
    return this.format;
  }
});

/** It instantiates a new DateRangeEditor
  * @class Editor used to edit date ranges. The DATE_RANGE operator returns this editor.
  * @constructor
  * @extends Ext.ux.netbox.FilterEditor
  */
Ext.ux.netbox.date.DateRangeEditor=function(field,config){
  Ext.ux.netbox.date.DateRangeEditor.superclass.constructor.call(this,field,config);
  this.format=config.format;
}

Ext.extend(Ext.ux.netbox.date.DateRangeEditor,Ext.ux.netbox.FilterEditor,/** @scope Ext.ux.netbox.date.DateRangeEditor.prototype */{
  /** This method parses the values returned by the RangeField, and casts the values to follow the Y-m-d H:i:s format
    * @return {Array} Array of object {label: value: } where value is always in the format Y-m-d H:i:s or it is an empty string if the value entered by the user is not a valid date
    */
  getValue: function(){
    var val=Ext.ux.netbox.date.DateRangeEditor.superclass.getValue.call(this);
    var toReturn=[];
    for(var i=0; val && i < val.length; i++){
      var date=Date.parseDate(val[i].value,this.format);
      if(!date){
        toReturn.push({label:"",value:""});
        continue;
      }
      val[i].value=date.format('Y-m-d H:i:s');
      toReturn.push(val[i]);
    }
    return(toReturn);
  }
});

/** It instantiates a new DateRangeOperator
  * @class This is the class that implements the range operator between 2 dates. The id of the operator is DATE_RANGE
  * @constructor
  * @extends Ext.ux.netbox.date.DateOperator
  * @param {String} format See format parameter of DateField
  */
Ext.ux.netbox.date.DateRangeOperator = function(format) {
  Ext.ux.netbox.date.DateRangeOperator.superclass.constructor.call(this,"DATE_RANGE",this.includeText,format);
  this.mapping={
    d: '99',
    m: '99',
    Y: '9999',
    y: '99',
    H: '99',
    i: '99',
    s: '99'
  }
  var validateFn=function(value){
    var isOk=this.getField().emptyNotAllowedFn(value);
    if(isOk!==true){
      return(isOk);
    }
    if(value.length!=2){
      return(this.bothFromAndToNotEmpty);
    }
    var fromADate=this.getField().checkDate(value[0].value,'Y-m-d H:i:s');
    var toADate=this.getField().checkDate(value[1].value,'Y-m-d H:i:s');
    if(!fromADate && !toADate){
      return(this.toAndFromNotADate);
    }

    if(!fromADate){
      return(this.fromNotADate);
    }

    if(!toADate){
      return(this.toNotADate);
    }

    if(Date.parseDate(value[0].value,'Y-m-d H:i:s')>Date.parseDate(value[1].value,'Y-m-d H:i:s')){
      return(this.fromBiggerThanTo);
    }
    return(true);
  }
  this.setValidateFn(validateFn);
}

Ext.extend(Ext.ux.netbox.date.DateRangeOperator,Ext.ux.netbox.date.DateOperator,/** @scope Ext.ux.netbox.date.DateRangeOperator.prototype */{
  /** Label of the from field
    * @type {String}
    */
  fromText    : 'from',
  /** Label of the to field
    * @type {String}
    */
  toText      : 'to',
  /** Label of the operator
    * @type {String}
    */
  includeText : 'between',
  /** Error text when there is only a value and not 2
    * @type {String}
    */
  bothFromAndToNotEmpty: "Both 'from' and 'to' must have a value",
  /** Error text when from is bigger than to
    * @type {String}
    */
  fromBiggerThanTo: "From is bigger than to",
  /** Error text when from is not a valid date
    * @type {String}
    */
  fromNotADate: "From is not a valid date",
  /** Error text when to is not a valid date
    * @type {String}
    */
  toNotADate: "To is not a valid date",
  /** Error text when both to and from are not valid dates
    * @type {String}
    */
  toAndFromNotADate: "From and to are not valid dates",

  /** This method creates an editor used to edit the range of dates.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var field=new Ext.ux.netbox.core.RangeField({
      textCls: Ext.form.TextField,
      fromConfig: this.getTextFieldConfig(),
      toConfig: this.getTextFieldConfig(),
      minListWidth: 300,
      fieldSize: 36
    });

    var editor=new Ext.ux.netbox.date.DateRangeEditor(field,{format: this.format});
    field.on("editingcompleted",editor.completeEdit,editor);
    return editor;
  },
  /** This function returns a string rendering the values. The format is da: (value[0].label), a: (value[1].label).
    * If the value doesn't have any of the elements, "" is used.
    * @param {Array} value The value to render
    * @return {String} The rendered value
    * @private
    */
  render: function(value){
    var valueFrom=value[0] == undefined ? '' : value[0].label;
    var valueTo=value[1] == undefined ? '' : value[1].label;
    return(this.fromText+": "+valueFrom+", "+this.toText+": "+valueTo);
  },

  /** It returns the config to use to create the Ext.form.TextField
    * It's composed by a plugin that register a quickTip and by a InputTextMask with the right mask as plugin,
    * and by a function that check if the date is valid
    * @private
    * @return {Object} An object with 2 elements, a plugin field with an array as value, containing an inputMask and a plugin that create a quickTip, and a function that validates the dates
    */
  getTextFieldConfig: function(){
    return({plugins: [new Ext.ux.netbox.InputTextMask(this.calculateMask(), true)]});
  },
  /** This method, given the format, returns a mask to use
    * in the InputTextMask for the given format
    * @return {String} The format to use
    */
  calculateMask: function(){
	  var maskTmp='';
    for(var i=0; i<this.format.length;i++){
      if(this.mapping[this.format.charAt(i)]){
        maskTmp+=this.mapping[this.format.charAt(i)];
      }else{
        maskTmp+=this.format.charAt(i);
      }
    }
    return(maskTmp);
  }
});

/** It creates a new DatePeriodOperator
  * @class This is the class that implements the period operator. The id of the operator is DATE_PERIOD
  * The available periods are the following:
  * <PRE>
  *   LAST_YEAR: between now and now -1 year
  *   LAST_MONTH: between now and now -1 month
  *   LAST_WEEK: between now and now -1 week
  *   LAST_DAY: between now and now -1 day
  *   LAST_HOUR: between now and now -1 hour
  *   LAST_QUARTER: between now and now -15 minutes
  * </PRE>
  * @constructor
  * @extends Ext.ux.netbox.core.Operator
  * @param {String} format See format parameter of DateField
  */
Ext.ux.netbox.date.DatePeriodOperator = function() {
  Ext.ux.netbox.date.DatePeriodOperator.superclass.constructor.call(this,"DATE_PERIOD",this.periodText);
  /** Store used to show the available values
    * @property {Ext.data.Store} periodStore
    * @private
    */
  this.periodStore=new Ext.data.SimpleStore({fields: ['value', 'label'],
      data: [
        ["LAST_QUARTER",this.quarterText],
        ["LAST_HOUR",this.hourText],
        ["LAST_DAY",this.dayText],
        ["LAST_WEEK",this.weekText],
        ["LAST_MONTH",this.monthText],
        ["LAST_YEAR",this.yearText]
      ]});
   var validateFn=function(value){
     if(this.getField().emptyNotAllowedFn(value)!==true){
       return(this.getField().emptyNotAllowedFn(value));
     }
     if(value[0].value!=="LAST_QUARTER" && value[0].value!=="LAST_HOUR" && value[0].value!=="LAST_DAY"
       && value[0].value!=="LAST_WEEK" && value[0].value!=="LAST_MONTH" && value[0].value!=="LAST_YEAR"){
       return(this.valueNotExpected);
     }
     return(true);
   }
   this.setValidateFn(validateFn);
}

Ext.extend(Ext.ux.netbox.date.DatePeriodOperator,Ext.ux.netbox.core.Operator,/** @scope Ext.ux.netbox.date.DatePeriodOperator.prototype */{

  periodText  : "period",
  yearText    : "last year",
  monthText   : "last month",
  weekText    : "last week",
  dayText     : "last day",
  hourText    : "last hour",
  quarterText : "last quarter",
  valueNotExpected: "Value not expected",

  /** Overwrite getDefaultValues function to return last day as default
    * @return {Array} default values ([{value: "LAST_DAY", label: this.dayText}])
    */
  getDefaultValues : function(){
    return([{value: "LAST_DAY", label: this.dayText}]);
  },

  /** This function sets the store of the periods.
    * The store must be local, and must have the label and value column
    * The default store is the following:
    * <PRE>
    * new Ext.data.SimpleStore({fields: ['value', 'label'],
    *  data: [
    *    ["LAST_YEAR","last year"],
    *    ["LAST_MONTH","last month"],
    *    ["LAST_WEEK","last week"],
    *    ["LAST_DAY","last day"],
    *    ["LAST_HOUR","last hour"],
    *    ["LAST_QUARTER","last quarter"]
    *  ]});
    * </PRE>
    *@param {Ext.data.Store} store The store that contains the available periods
    */
  setPeriods: function(store){
    this.periodStore=store;
    this.editor=null;
  },
  /** This method retruns an Ext.ux.netbox.core.AvailableValuesEditor used to edit the periods.
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var editor=new Ext.ux.netbox.core.AvailableValuesEditor(this.periodStore);
    return editor;
  },
  /**This method convert an old value in a filter to a new value,
    * suitable for this operator. If the given value is an array, with at least one element,
    * this element is an object with {label:...,value:...} and the value is in the period store,
    * an array with the first element is returned, an empty array otherwise.
    * @param {Object} value The value to convert
    * @return {Array} The converted value
    */
  convertValue: function(value){
    if(value !==null && value !== undefined && Ext.type(value)=="array"){
      if(value.length>0 && value[0].value!== undefined && value[0].label!== undefined){
        if(this.periodStore.find('value',value[0].value)!='-1'){
          if(value.length==1){
            return(value);
          } else {
            return([value[0]]);
          }
        }
      }
    }
    return([]);
  }
});// $Id: DateField.js 203 2009-06-25 08:29:49Z dandfra $

Ext.namespace('Ext.ux.netbox.date');

/** It creates a new number field
 * @class This is the class that implements the field to use if the type is date.
 * It contains as default the following operator:
 * <ul>
 *   <li> DATE_EQUAL </li>
 *   <li> DATE_GREATER </li>
 *   <li> DATE_GREATER_OR_EQUAL </li>
 *   <li> DATE_LESS </li>
 *   <li> DATE_LESS_OR_EQUAL </li>
 *   <li> DATE_RANGE </li>
 *   <li> DATE_PERIOD </li>
 * </ul>
 * The default operator is DATE_PERIOD
 * @param {String} id The Field id.
 * @param {String} label Optional. The label of the filter. If not supplied the id is used.
 * @param {String} format The format of the date. Supported formats:
 * <PRE>
 * Format  Description                                                               Example returned values
 * ------  -----------------------------------------------------------------------   -----------------------
 * d       Day of the month, 2 digits with leading zeros                             01 to 31
 * m       Numeric representation of a month, with leading zeros                     01 to 12
 * Y       A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
 * y       A two digit representation of a year                                      Examples: 99 or 03
 * H       24-hour format of an hour with leading zeros                              00 to 23
 * i       Minutes, with leading zeros                                               00 to 59
 * s       Seconds, with leading zeros                                               00 to 59
 *</PRE>
 * @constructor
 * @extends Ext.ux.netbox.core.Field
 */
Ext.ux.netbox.date.DateField = function(id,label,format) {
  Ext.ux.netbox.date.DateField.superclass.constructor.call(this,id,label);
  this.setValidateFn(this.validateDate);
  var periodOperator = new Ext.ux.netbox.date.DatePeriodOperator();
  this.addOperator(periodOperator);
  this.setDefaultOperator(periodOperator);
  this.addOperator(new Ext.ux.netbox.date.DateOperator("DATE_EQUAL","=",format));
  noEmptyAllowed=this.emptyNotAllowedFn.createDelegate(this);
  var op=new Ext.ux.netbox.date.DateOperator("DATE_GREATER",">",format);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.date.DateOperator("DATE_GREATER_OR_EQUAL",">=",format);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.date.DateOperator("DATE_LESS","<",format);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  op=new Ext.ux.netbox.date.DateOperator("DATE_LESS_OR_EQUAL","<=",format);
  op.addValidateFn(noEmptyAllowed);
  this.addOperator(op);
  this.addOperator(new Ext.ux.netbox.date.DateRangeOperator(format));
  this.format=format;
}

Ext.extend(Ext.ux.netbox.date.DateField,Ext.ux.netbox.core.Field,/** @scope Ext.ux.netbox.date.DateField.prototype */{

  validateDate: function(values){
    for(var i=0;values && i<values.length;i++){
      if(values[i].value!=="" && !this.checkDate(values[i].value,'Y-m-d H:i:s')){
        return(this.checkDate(values[i].value,'Y-m-d H:i:s'));
      }
    }
    return(true);
  },

  /** Check if a date is valid.
    * @param {String} value The string containing the date to validate
    * @param {String} format The format of the date in the string. Optional, the default is the format of the field
    * @return {boolean} true if the date is valid, false otherwise
    */
  checkDate: function(value,format){
    if(format==undefined){
      format=this.format;
    }
    var date=Date.parseDate(value,format);
    if(!date){
      return(false);
    }
    var valueTmp=date.format(format);
    if(value!=valueTmp){
      return(false);
    }
    return(true);
  }
});