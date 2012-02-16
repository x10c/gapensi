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
// $Id: CompositeFilter.js 100 2008-02-26 09:38:02Z bobbicat71 $

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

});