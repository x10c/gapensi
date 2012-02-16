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
Ext.namespace("Ext.ux.netbox.string");Ext.ux.netbox.string.TextFieldOperator=function(b,a){Ext.ux.netbox.string.TextFieldOperator.superclass.constructor.call(this,b,a);this.editor=null};Ext.extend(Ext.ux.netbox.string.TextFieldOperator,Ext.ux.netbox.core.Operator,{createEditor:function(a){var b=new Ext.ux.netbox.core.TextValuesEditor();return b}});Ext.namespace("Ext.ux.netbox.string");Ext.ux.netbox.string.StringListOperator=function(b,a){Ext.ux.netbox.string.StringListOperator.superclass.constructor.call(this,b,a);this.editor=null;valFn=function(c){return(this.getField().emptyNotAllowedFn(c))};this.addValidateFn(valFn)};Ext.extend(Ext.ux.netbox.string.StringListOperator,Ext.ux.netbox.core.Operator,{createEditor:function(a){var b=new Ext.ux.netbox.core.AvailableValuesEditor(this.getField().getAvailableValues(),{remote:this.isStoreRemote(),forceReload:this.isForceReload(),multiSelect:true,caseSensitive:this.isCaseSensitive()});return b},convertValue:function(a){var c=[];if(a!==null&&a!==undefined&&Ext.type(a)=="array"){for(var b=0;b<a.length;b++){if(a[b].value!==undefined&&a[b].label!==undefined){c.push(a[b])}}}return(c)}});Ext.namespace("Ext.ux.netbox.string");Ext.ux.netbox.string.StringField=function(d,a){Ext.ux.netbox.string.StringField.superclass.constructor.call(this,d,a);var b=new Ext.ux.netbox.core.Operator("STRING_EQUAL",this.stringEqualsLabel);this.addOperator(b);this.setDefaultOperator(b);this.addOperator(new Ext.ux.netbox.core.Operator("STRING_DIFFERENT",this.stringDifferentLabel));noEmptyAllowed=this.emptyNotAllowedFn.createDelegate(this);var c=new Ext.ux.netbox.string.TextFieldOperator("STRING_CONTAINS",this.containsText);c.addValidateFn(noEmptyAllowed);this.addOperator(c);c=new Ext.ux.netbox.string.TextFieldOperator("STRING_DOESNT_CONTAIN",this.doesntContainsText);c.addValidateFn(noEmptyAllowed);this.addOperator(c);c=new Ext.ux.netbox.string.TextFieldOperator("STRING_STARTS_WITH",this.startsWithText);c.addValidateFn(noEmptyAllowed);this.addOperator(c);c=new Ext.ux.netbox.string.TextFieldOperator("STRING_ENDS_WITH",this.endsWithText);c.addValidateFn(noEmptyAllowed);this.addOperator(c)};Ext.extend(Ext.ux.netbox.string.StringField,Ext.ux.netbox.core.Field,{stringEqualsLabel:"=",stringDifferentLabel:"!=",containsText:"contains",doesntContainsText:"doesn't contain",startsWithText:"starts with",endsWithText:"ends with",stringListText:"in",stringNotListText:"not in"});Ext.namespace("Ext.ux.netbox.string");Ext.ux.netbox.string.EnumField=function(c,a){Ext.ux.netbox.string.EnumField.superclass.constructor.call(this,c,a);var b=new Ext.ux.netbox.core.Operator("STRING_EQUAL",this.stringEqualsLabel);this.addOperator(b);this.setDefaultOperator(b);this.addOperator(new Ext.ux.netbox.core.Operator("STRING_DIFFERENT",this.stringDifferentLabel))};Ext.extend(Ext.ux.netbox.string.EnumField,Ext.ux.netbox.core.Field,{stringEqualsLabel:"=",stringDifferentLabel:"!=",stringListText:"in",stringNotListText:"not in"});