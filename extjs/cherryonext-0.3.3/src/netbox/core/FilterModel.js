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
// $Id: FilterModel.js 181 2008-09-12 14:06:10Z bobbicat71 $

Ext.namespace('Ext.ux.netbox.core');

/** Creates a new FilterModel. It can have as input parametr a fieldManager or the config to build the fieldManager
  * @class The filter model is the core class of the whole filter design, and probably the one you will interact most. It's the class that mantains the filter, it's the class used to obtain
  * an export of the filter in a predefined way (look at getFilterObj for more information about the format), to import a filter, to add or remove a filter and so on. All the views (for example QuickFilterModelView, StaticFilterModelView and DynamicFilterModelView)
  * just shows the data contained in the filter model, and use the filterModel to perform some operation on the filter.
  * A filter model only manages elementary filters that have their field inside the fieldManager that is used to build the filterModel.
  * <h4> Examples </h4>
  * Build a filter model given the fieldManager
  * <pre>
  * var fieldManager=new Ext.ux.netbox.core.FieldManager(fieldManager);
  * </pre>
  * Build a filter model using the config to a fieldManager:
  * <pre>
  *  var filterCfg=[
  *    {id: 'company',label: 'Company'},
  *    {id: 'price',label: 'Price', type: 'float'},
  *    {id: 'change',label: 'Change', type: 'float'},
  *    {id: 'pctChange',label: '% Change', type: 'float'},
  *    {id: 'lastChange',label: 'Last Updated', type: 'date', format: 'd/m/Y H:i'},
  *    {id: 'shouldBuy',label: 'Should Buy', type: 'enum', availableValues: availableValuesStore, remoteStore: false}
  *  ];
  *  var fieldManager=new Ext.ux.netbox.core.FieldManager(filterCfg);
  * </pre>
  * @constructor
  * @param {Mixed} fieldManager A Ext.ux.netbox.core.FieldManager or a config to create a FieldMAnager. In this last case the fieldManager will be built directly by the filter model
  */
Ext.ux.netbox.core.FilterModel=function(config){
  Ext.ux.netbox.core.FilterModel.superclass.constructor.call(this);
  this.addEvents(/** @scope Ext.ux.netbox.core.FilterModel.prototype */{
    /** Fires when an elementaryFilter is added
      * @event elementaryFilterAdded
      * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel containing the added elementaryFilter
      * @param {Ext.ux.netbox.core.ElementaryFilter} elementaryFilter The added elementaryFilter
      */
    elementaryFilterAdded : true,
    /** Fires when an elementaryFilter is removed
      * @event elementaryFilterRemoved
      * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel containing the removed elementaryFilter
      * @param {Ext.ux.netbox.core.ElementaryFilter} elementaryFilter The removed elementaryFilter
      */
    elementaryFilterRemoved : true,
    /** Fires when the filter managed by this filterModel is changed
      * @event filterChanged
      * @param {Ext.ux.netbox.core.FilterModel} filterModel The filterModel that has the new filter
      */
    filterChanged : true
  });
  /** The filter
    * @property {Ext.ux.netbox.core.Filter}
    * @private
    */
  this.filter=null;
  /** The fieldManager
    * @property {Ext.ux.netbox.core.FieldManager}
    * @private
    */
  if(config instanceof Ext.ux.netbox.core.FieldManager)
    this.fieldManager=config;
  else
    this.fieldManager=new Ext.ux.netbox.core.FieldManager(config);
  this.fieldManager.on("beforeFieldRemoved",this.onBeforeFieldRemoved,this);
  /** The logicalOperator
    * @property {Ext.ux.netbox.core.CompositeFilter.AND or Ext.ux.netbox.core.CompositeFilter.OR}
    * @private
    */
  if(config.logicalOperator===undefined)
    this.logicalOperator=Ext.ux.netbox.core.CompositeFilter.AND;
  else
    this.logicalOperator=config.logicalOperator;
}

Ext.extend(Ext.ux.netbox.core.FilterModel,Ext.util.Observable,/** @scope Ext.ux.netbox.core.FilterModel.prototype */
{
  /** It doesn't allow the removal of a field if there are filters on that field
  * @private
  */
  onBeforeFieldRemoved: function(field){
    if(this.getElementaryFiltersByFieldId(field.getId()).length>0)
      return(false);
  },
  /** @private
    *
    */
  _createFilter : function (fieldId, operator, values){
    var myField=this.getFieldManager().getFieldById(fieldId);
    if(myField==null) throw ("Field "+fieldId+" not found!");
    var elementaryFilter=myField.getElementaryFilterInstance();
    if(operator!=undefined) elementaryFilter.setOperator(operator);
    if(values!=undefined) elementaryFilter.setValues(values);
    return(elementaryFilter);
  },
  /** @private
    *
    */
  _addFilter : function(elementaryFilter){
    if(this.getFilter()==null)
      this.filter=elementaryFilter;
    else
      this.filter=new Ext.ux.netbox.core.CompositeFilter(this.getFilter(), this.logicalOperator, elementaryFilter);
    this.fireEvent("elementaryFilterAdded", this, elementaryFilter);
  },
  /** @private
    *
    */
  _decodeFilter : function(filterObject){
    if(filterObject.fieldId){
      var myField=this.getFieldManager().getFieldById(filterObject.fieldId);
      if(myField==null) throw ("Field "+filterObject.fieldId+" not found!");
      var operator=myField.getAvailableOperatorById(filterObject.operatorId);
      if(operator===null)
        operator=undefined;
      var elementaryFilter=myField.getElementaryFilterInstance(operator);
      elementaryFilter.setFilterObj(filterObject);
      return(elementaryFilter);
    } else {
      var leftTmp=this._decodeFilter(filterObject.left);
      var rightTmp=this._decodeFilter(filterObject.right);
      var myCompositeFilter=new Ext.ux.netbox.core.CompositeFilter(leftTmp,filterObject.logicalOperator,rightTmp);
      return(myCompositeFilter);
    }
  },
  /** @private
    *
    */
  _encodeFilter : function(filter){
    if(filter.setValues){
      return(filter.getFilterObj());
    } else {
      var filterTmp=filter.getFilterObj();
      filterTmp.left=this._encodeFilter(filterTmp.left);
      filterTmp.right=this._encodeFilter(filterTmp.right);
      return(filterTmp);
    }
  },
  /** @private
    *
    */
  _findAndRemoveFilter : function(parentExpression,expression, matchFn, toRemove){
    if(expression instanceof Ext.ux.netbox.core.ElementaryFilter){
      if(matchFn.call(this,expression)){
        toRemove.push(expression);
        return(true);
      } else {
        return(false);
      }
    }

    var shouldRemoveLeft=this._findAndRemoveFilter(expression,expression.getLeftSide(),matchFn,toRemove)
    var shouldRemoveRight=this._findAndRemoveFilter(expression,expression.getRightSide(),matchFn,toRemove);

    if(shouldRemoveRight && shouldRemoveLeft){
      return(true);
    }

    if(shouldRemoveLeft){
      if(parentExpression.getLeftSide()==expression){
        parentExpression.setLeftSide(expression.getRightSide());
      } else {
        parentExpression.setRightSide(expression.getRightSide());
      }
    }

    if(shouldRemoveRight){
      if(parentExpression.getLeftSide()==expression){
        parentExpression.setLeftSide(expression.getLeftSide());
      } else {
        parentExpression.setRightSide(expression.getLeftSide());
      }
    }

    return(false);
  },
  /** This method returns the FieldManager associated to this filterModel.
    * @return {Ext.ux.netbox.core.FieldManager} The FieldManager
    */
  getFieldManager : function(){
    return(this.fieldManager);
  },
  /** This method returns the filter setted in this filterModel or null if is not setted.
    * @return {Ext.ux.netbox.core.Filter} The filter setted
    */
  getFilter : function(){
    return(this.filter);
  },
  /** This method returns an object representing the actual filter or null if is not setted.
    * <PRE>
    * Filter::=ElementaryFilter|CompositeFilter
    * ElementaryFilter::={fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}
    * CompositeFilter::={left : Ext.ux.netbox.core.Filter, logicalOperator : String, right : Ext.ux.netbox.core.Filter}
    * logicalOperator::="AND"|"OR"
    * </PRE>
    * <h4> Example </h4>
    * <PRE>
    * {
    *    left:{
    *      left:{fieldId:"field4",operatorId:"DATE_EQUAL",values:[{label:"12/10/2009 12:12",value:"2009-10-12 12:12:00"}]},
    *      logicalOperator:"AND",
    *      right:{fieldId:"field3",operatorId:"STRING_EQUAL",values:[{label:"label1",value:"valore1"}]}
    *    },
    *    logicalOperator:"AND",
    *    right:{fieldId:"field",operatorId:"NUMBER_EQUAL",values:[{label:5,value:5}]}
    * }
    * </pre>
    * @param {boolean} evenInvalid (optional) default false
    * @param {Object} additionalFilterObj (optional)
    * @param {String} additionalLogicalOper Ext.ux.netbox.core.CompositeFilter.AND/OR (optional)
    * @return {Object} the filter object
    */
  getFilterObj : function(evenInvalid,additionalFilterObj,additionalLogicalOper){
    var additionalFilter;
    if(additionalFilterObj===undefined){
      additionalFilter=null;
    } else {
      additionalFilter=this._decodeFilter(additionalFilterObj);
    }
    if(additionalLogicalOper===undefined)
      additionalLogicalOper=Ext.ux.netbox.core.CompositeFilter.AND;
    var filter=this.getFilter();

    var filterToExport=null;
    if(this.getFilter()!==null)

    if(filter===null)
      filterToExport=additionalFilter;
    else{
      filterToExport=this._decodeFilter(this._encodeFilter(this.getFilter()));//clone the filter
      if (additionalFilter !== null){
        filterToExport=new Ext.ux.netbox.core.CompositeFilter(filterToExport,additionalLogicalOper,additionalFilter);
      }
    }

    if(filterToExport instanceof Ext.ux.netbox.core.ElementaryFilter){
      if(!filterToExport.isValid()){
        filterToExport=null;
      }
    } else if(filterToExport !== null) {
      var matchFn=function(filter){
        return(!filter.isValid());
      };
      var toRemove=[];
      var shouldRemoveLeft=this._findAndRemoveFilter(filterToExport,filterToExport.getLeftSide(),matchFn,toRemove);
      var shouldRemoveRight=this._findAndRemoveFilter(filterToExport,filterToExport.getRightSide(),matchFn,toRemove);
      if(shouldRemoveLeft && shouldRemoveRight){
        filterToExport=null;
      } else if(shouldRemoveLeft){
        filterToExport=filterToExport.getRightSide();
      }else if(shouldRemoveRight){
        filterToExport=filterToExport.getLeftSide();
      }
    }
    if(filterToExport!=null)
      return(this._encodeFilter(filterToExport));
    else
      return null;
  },
  /** This method sets the filter with an object formatted:
    * <PRE>
    * Filter::=ElementaryFilter|CompositeFilter
    * ElementaryFilter::={fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]}
    * CompositeFilter::={left : Ext.ux.netbox.core.ElementaryFilter, logicalOperator : String, right : Ext.ux.netbox.core.ElementaryFilter}
    * logicalOperator::="AND"|"OR"
    * </PRE>
    * If this succeeds the event "filterChanged" is triggered.
    * @param {Object} filterObject
    */
  setFilterObj : function(filterObject){
    if(filterObject){
      if(!filterObject.setFilterObj){
        filterObject=this._decodeFilter(filterObject);
      }
    }
    this.filter=filterObject;
    this.fireEvent("filterChanged",this);
  },
  /** This method returns an elementaryFilter by Id. If not found returns null.
    * @param {String} id The id of the filter
    * @return {Ext.ux.netbox.core.ElementaryFilter} The elementaryFilter with the given id or null if it is not found
    */
  getElementaryFilterById : function(id){
    if(this.getFilter()!=null)
      return(this.getFilter().getElementaryFilterById(id));
    return(null);
  },
  /** This method returns an array of elementaryFilter by fieldId or an empty array if not found.
    * @param {String} fieldId The id of the field
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter} array of elementaryFilter setted with the same fieldId
    */
  getElementaryFiltersByFieldId : function(fieldId){
    if(this.getFilter()!=null){
      return(this.getFilter().getElementaryFiltersByFieldId(fieldId));
    }
    return [];
  },
  /** This method add an elementaryFilter by field Id. If this succeeds the event "elementaryFilterAdded" is triggered.
    * @param {String} fieldId
    * @return {String} id of elementaryFilter added
    */
  addElementaryFilterByFieldId : function(fieldId){
    var elementaryFilter=this._createFilter(fieldId);
    this._addFilter(elementaryFilter);
    return(elementaryFilter.getId());
  },
  /** This method add an elementaryFilter receiving an object that represents it. If this succeeds the event "filterAdded" is triggered.
    * @param {Object} filterObject &#123;fieldId : "&lt;fieldId&gt;", operatorId : "&lt;operatorId&gt;", values : [...]&#125;
    * @return {String} id of elementaryFilter added
    */
  addElementaryFilter : function (filterObject){
    var elementaryFilter=this._createFilter(filterObject.fieldId, filterObject.operatorId, filterObject.values);
    this._addFilter(elementaryFilter);
    return(elementaryFilter.getId());
  },
  /** This method remove an elementaryFilter from the FilterModel by Id. If this succeeds the event "elementaryFilterRemoved" is triggered.
    * @param {String} filterId The id of elementaryFilter to remove
    * @throws {String} if the elementaryFilter to remove is not found
    */
  removeElementaryFilterById : function(filterId){
    var removedElementaryFilter=null;
    if(this.getFilter()==null)
      throw("Unable to remove the elementaryFilter with id "+filterId+". The elementaryFilter doesn't exist.");
    if(this.getFilter() instanceof Ext.ux.netbox.core.ElementaryFilter){
      if(this.getFilter().getId()==filterId){
        removedElementaryFilter=this.filter;
        this.filter=null;
      } else {
        throw("Unable to remove the elementaryFilter with id "+filterId+". The elementaryFilter doesn't exist");
      }
    } else {
      var matchFn=function(filter){
        if(filter.getId()===filterId){
          return(true);
        } else {
          return(false);
        }
      };
      var toRemove=[];
      var shouldRemoveLeft=this._findAndRemoveFilter(this.getFilter(),this.getFilter().getLeftSide(),matchFn,toRemove);
      var shouldRemoveRight=this._findAndRemoveFilter(this.getFilter(),this.getFilter().getRightSide(),matchFn,toRemove);
      if(toRemove.length===0){
        throw("Unable to remove the elementaryFilter with id "+filterId+". The elementaryFilter doesn't exist");
      }
      removedElementaryFilter=toRemove[0];
      if(shouldRemoveLeft){
        this.filter=this.getFilter().getRightSide();
      }

      if(shouldRemoveRight){
        this.filter=this.getFilter().getLeftSide();
      }
    }
    this.fireEvent("elementaryFilterRemoved", this, removedElementaryFilter);
  },
  /** This method returns all the elementaryFilter stored in the filter expression or an empty array if filter is null.
    * @param {Ext.ux.netbox.core.Filter} filter The filter from which the elementaryFilters must be extracted. Optional. If not supplied the filter in the filterModel is used
    * @return {Array of Ext.ux.netbox.core.ElementaryFilter}
    */
  getAllElementaryFilters : function(filter){
    if(filter===undefined)
      filter=this.getFilter();
    var elementaryFilters=[];
    if(filter!=null){
      if(filter.setValues){
        elementaryFilters.push(filter);
      } else {
        elementaryFilters=elementaryFilters.concat(this.getAllElementaryFilters(filter.getLeftSide()));
        elementaryFilters=elementaryFilters.concat(this.getAllElementaryFilters(filter.getRightSide()))
      }
    }
    return(elementaryFilters);
  },
  /** This method returns the logical operator setted in the filter model. The default is Ext.ux.netbox.core.CompositeFilter.AND
    * @return {String} The logical operator setted
    */
  getLogicalOperator : function(){
    return this.logicalOperator;
  },
  /** This method sets the logical operator in the filter model.
    * @param {String} logicalOperator The logical operator to set in the filter model
    */
  setLogicalOperator : function(logicalOperator){
    if(logicalOperator===Ext.ux.netbox.core.CompositeFilter.OR || logicalOperator===Ext.ux.netbox.core.CompositeFilter.AND)
      this.logicalOperator=logicalOperator;
      //evento?
  },
  /** This method calls the function with the scope on the filter passed as parameters.
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The scope in which to execute the function
    * @param {Ext.ux.netbox.core.Filter} filter The filter on which execute the function
    */
  each: function(fn, scope, filter){
    if(filter===undefined)
      filter=this.getFilter();
    if(filter==null)
      return;
    if(scope===undefined)
      scope=window;
    fn.call(scope,filter);
    if(filter instanceof Ext.ux.netbox.core.CompositeFilter){
      this.each(fn,scope,filter.getLeftSide());
      this.each(fn,scope,filter.getRightSide());
    }
  }

});