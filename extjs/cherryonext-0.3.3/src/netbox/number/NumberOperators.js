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
// $Id: NumberOperators.js 136 2008-03-13 10:55:02Z dandfra $

Ext.namespace('Ext.ux.netbox.number');

/** It instantiates a new NumberRangeOperator
  * @class This is the class that implements the range operator between 2 numbers. The id of the operator is NUMBER_RANGE
  * @constructor
  * @extends Ext.ux.netbox.core.Operator
  */
Ext.ux.netbox.number.NumberRangeOperator = function() {
  Ext.ux.netbox.number.NumberRangeOperator.superclass.constructor.call(this,"NUMBER_RANGE",this.includeText);
  var validateFn=function(value){
    var isOk=this.getField().emptyNotAllowedFn(value);
    if(isOk!==true){
      return(isOk);
    }
    if(value.length!=2){
      return(this.bothFromAndToNotEmpty);
    }
    var fromANumber=this.isNumeric(value[0].value);
    var toANumber=this.isNumeric(value[1].value);
    if(!fromANumber && !toANumber){
      return(this.toAndFromNotANumber);
    }
    
    if(!fromANumber){
      return(this.fromNotANumber);
    }
    
    if(!toANumber){
      return(this.toNotANumber);
    }
    
    if(parseFloat(value[0].value)>parseFloat(value[1].value)){
      return(this.fromBiggerThanTo);
    }
    return(true);
  }
  this.setValidateFn(validateFn);
}

Ext.extend(Ext.ux.netbox.number.NumberRangeOperator,Ext.ux.netbox.core.Operator,/** @scope Ext.ux.netbox.number.NumberRangeOperator.prototype */{

  fromText    : 'from',
  toText      : 'to',
  includeText : 'between',
  bothFromAndToNotEmpty: "Both 'from' and 'to' must have a value",
  fromBiggerThanTo: "From is bigger than to",
  fromNotANumber: "From is not a number",
  toNotANumber: "To is not a number",
  toAndFromNotANumber: "From and to are not numbers",
  isNumeric: function (value){
    if(Ext.type(value)==='number'){
      return(isFinite(value));
    } else if(Ext.type(value)==='string'){
      // I use this function like this: if (isNumeric(myVar)) { }
      // regular expression that validates a value is numeric
      if(value.lastIndexOf(".")===value.length){
        return("A number should not end with a .");
      }
      var RegExp = /^(-)?(\d+)(\.?)(\d*)$/;
      // Note: this WILL allow a number that ends in a decimal: -452.
      // compare the argument to the RegEx
      // the 'match' function returns 0 if the value didn't match
  
      return(value.match(RegExp));
    }
    return(false);
  },

  /** This method creates an aditor used to edit the range of numbers
    * @param {String} operatorId The operatorId actually used in the filter
    * @return {Ext.Editor} The field used to edit the values of this filter
    */
  createEditor: function(operatorId){
    var field=new Ext.ux.netbox.core.RangeField({
      textCls: Ext.form.NumberField,
      fromConfig: {},
      toConfig: {}
    });
    var editor=new Ext.ux.netbox.FilterEditor(field);
    field.on("editingcompleted",editor.completeEdit,editor);
    return editor;
  },
/** This function returns a string rendering the values. The format is da: (value[0].label), a: (value[1].label).
    * If the value doesn't have any of the elements, "" is used.
    * @param {Array} The value to render
    * @return {String} The rendered value
    * @private
    */
  render: function(value){
    var valueFrom=value[0] == undefined ? '' : value[0].label;
    var valueTo=value[1] == undefined ? '' : value[1].label;
    return(this.fromText+": "+valueFrom+", "+this.toText+": "+valueTo);
  }
});