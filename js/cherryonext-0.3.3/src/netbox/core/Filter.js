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
// $Id: Filter.js 100 2008-02-26 09:38:02Z bobbicat71 $

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

});