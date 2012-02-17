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
// $Id: DateField.js 203 2009-06-25 08:29:49Z dandfra $

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