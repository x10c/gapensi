/*
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
Ext.namespace("Ext.ux.netbox.number");Ext.ux.netbox.number.NumberRangeOperator=function(){Ext.ux.netbox.number.NumberRangeOperator.superclass.constructor.call(this,"NUMBER_RANGE",this.includeText);var a=function(d){var c=this.getField().emptyNotAllowedFn(d);if(c!==true){return(c)}if(d.length!=2){return(this.bothFromAndToNotEmpty)}var e=this.isNumeric(d[0].value);var b=this.isNumeric(d[1].value);if(!e&&!b){return(this.toAndFromNotANumber)}if(!e){return(this.fromNotANumber)}if(!b){return(this.toNotANumber)}if(parseFloat(d[0].value)>parseFloat(d[1].value)){return(this.fromBiggerThanTo)}return(true)};this.setValidateFn(a)};Ext.extend(Ext.ux.netbox.number.NumberRangeOperator,Ext.ux.netbox.core.Operator,{fromText:"from",toText:"to",includeText:"between",bothFromAndToNotEmpty:"Both 'from' and 'to' must have a value",fromBiggerThanTo:"From is bigger than to",fromNotANumber:"From is not a number",toNotANumber:"To is not a number",toAndFromNotANumber:"From and to are not numbers",isNumeric:function(b){if(Ext.type(b)==="number"){return(isFinite(b))}else{if(Ext.type(b)==="string"){if(b.lastIndexOf(".")===b.length){return("A number should not end with a .")}var a=/^(-)?(\d+)(\.?)(\d*)$/;return(b.match(a))}}return(false)},createEditor:function(a){var c=new Ext.ux.netbox.core.RangeField({textCls:Ext.form.NumberField,fromConfig:{},toConfig:{}});var b=new Ext.ux.netbox.FilterEditor(c);c.on("editingcompleted",b.completeEdit,b);return b},render:function(c){var b=c[0]==undefined?"":c[0].label;var a=c[1]==undefined?"":c[1].label;return(this.fromText+": "+b+", "+this.toText+": "+a)}});Ext.namespace("Ext.ux.netbox.number");Ext.ux.netbox.number.NumberField=function(d,a){Ext.ux.netbox.number.NumberField.superclass.constructor.call(this,d,a);var b=new Ext.ux.netbox.core.Operator("NUMBER_EQUAL","=");this.addOperator(b);this.setDefaultOperator(b);this.addOperator(new Ext.ux.netbox.core.Operator("NUMBER_NOT_EQUAL","!="));noEmptyAllowed=this.emptyNotAllowedFn.createDelegate(this);var c=new Ext.ux.netbox.core.Operator("NUMBER_GREATER",">");c.addValidateFn(noEmptyAllowed);this.addOperator(c);c=new Ext.ux.netbox.core.Operator("NUMBER_GREATER_OR_EQUAL",">=");c.addValidateFn(noEmptyAllowed);this.addOperator(c);c=new Ext.ux.netbox.core.Operator("NUMBER_LESS","<");c.addValidateFn(noEmptyAllowed);this.addOperator(c);c=new Ext.ux.netbox.core.Operator("NUMBER_LESS_OR_EQUAL","<=");c.addValidateFn(noEmptyAllowed);this.addOperator(c);this.addOperator(new Ext.ux.netbox.number.NumberRangeOperator())};Ext.extend(Ext.ux.netbox.number.NumberField,Ext.ux.netbox.core.Field,{createEditor:function(a){var b=new Ext.ux.netbox.core.TextValuesEditor(new Ext.form.NumberField({decimalPrecision:10}));return b}});