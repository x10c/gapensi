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
// $Id: StaticFilterModelView.js 192 2008-10-07 12:48:51Z dandfra $

String.prototype.escHtml = function(){ 
  var i,e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'};
  var t=this;
  for(i in e) 
    t=t.replace(new RegExp(i,'g'),e[i]); 
  return t; 
}

Ext.namespace('Ext.ux.netbox.core');

/** It creates a new StaticFilterModelView.
  * @class In this view for each available field there is a label, and an operator combo and space where the widget to edits the values will appear. Something like this:
  * <pre>
  *        +----------------+--+ +----------------+
  * field: |contains        |\/| | ciccio         |
  *        +----------------+--+ +----------------+
  * </pre>
  * There are some config options to manage the way the fields are put together. For example you can divide the fields in column, you can decide where to put the label and so on.
  * This view supports lazy initialization using staticFilter as xtype.
  * <h4> Example </h4>
  * We are creating a static filter panel where the fields are arranged in 3 columns, the label are on the top of the operation field,
  * the operation field will use 33% of the space in te column, and each filter 46 pixels as height
  * <PRE>
  * var viewport = new Ext.Viewport({
  *   layout: "border",
  *   items: [{
  *     filterModel: filterModel,
  *     colsNumber:3,
  *     labelWidth: 55,
  *     labelAlign: 'top',
  *     rowSize: 46,
  *     ratio: 33,
  *     labelPad: 1,
  *     region: "north",
  *     height:150,
  *     xtype: 'staticFilter',
  *     itemCls: 'filter'
  *   },
  *   grid
  * ]});
  * </pre>
  * <B>NB1:</B> This view only supports an elementary filter  for a field. If you use this view you must be sure that this basic assumption is verified<BR>
  * <B>NB2:</B> The items config options will be overwritten<br>
  * @constructor
  * @param {Object} config Configuration options
  * @config {Ext.ux.netbox.core.FilterModel}filterModel the filterModel whose filters must be showed
  * @config {int} colNumbers the number of columns in which the filters must be disposed. The default is 1
  * @config {int} labelWidth The width of the label containing the name of the column. See Ext.layout.FormLayout.labelWidth config option for more details (including the default value)
  * @config {boolean} hideLabels true to hide the label containing the name of the column. See Ext.layout.FormLayout.hideLabels config option for more details (including the default value)
  * @config {String} itemCls class to apply to the label containing the name of the column. See Ext.layout.FormLayout.itemCls config option for more details
  * @config {String}labelAlign allignment of the label containing the name of the column. See Ext.layout.FormLayout.itemCls config option for more details
  * @config {int} labelPad padding of the label containing the name of the column. See Ext.layout.FormLayout.itemCls config option for more details
  * @config {int} rowSize the height of the "row" consisting of operator combo + editor value. The default is 27 pixel
  * @config {int} ratio a number between 1 and 99, the percentage of the space to give to label + combo with the operators. The default is 60
  * @extends Ext.form.FormPanel
  */
Ext.ux.netbox.core.StaticFilterModelView=function(config){

  this.filterModel = config.filterModel;
  this.ratio=60;
  this.rowSize=27;
  if(config.rowSize!==undefined){
    this.rowSize=config.rowSize;
  }
  if(config.ratio){
    this.ratio=config.ratio;
  }
  config=this.createConfig(config);

  this.colsNumber=config.colsNumber;

  /** It contains the panels where the filters must be inserted
    * @property {Array of Ext.Panel}
    * @private
    */
  this.panelColumns=[];
  for(var i=0;i<this.colsNumber;i++){
    this.panelColumns[i]=null;
  }
  Ext.ux.netbox.core.StaticFilterModelView.superclass.constructor.call(this,config);
  if(this.rendered){
    this.populateFields();
  } else {
    this.on('render',this.populateFields,this);
  }
  this.filterModel.getFieldManager().on('fieldAdded',this.addField,this);
  this.filterModel.getFieldManager().on('fieldRemoved',this.removeField,this);
  this.filterModel.on('elementaryFilterAdded',this.elementaryFilterAdded,this);
  this.filterModel.on('elementaryFilterRemoved',this.elementaryFilterRemoved,this);
  this.filterModel.on('filterChanged',this.populateFilters,this);
  this.fieldPanelMapping=new Ext.util.MixedCollection();
  this.filterEditorsMapping={};
  this.managedFilters=new Ext.util.MixedCollection();
  if(this.rendered){
    this.populateFilters();
  } else {
    this.on('render',this.populateFilters,this);
  }
}

Ext.extend(Ext.ux.netbox.core.StaticFilterModelView,Ext.form.FormPanel,/** @scope Ext.ux.netbox.core.StaticFilterModelView.prototype */{
  /** This method manipulate the given config option, to create the one that will be sent as parameter to the superclass constructor
    * It sets the layout of this panel as a form, containing config.colsNumber * 2 panels. In the even panels there are the label and the operator combo,
    * in the odd panels there is the field used to edit the value
    * @param {Object} config The config object that is passed to the constructor of the class as parameter
    * @return {Object} The config object to use as parameter of the superclass constructor
    */
  createConfig: function(config){
    config.layout="form";
    config.frame="true";
    if(!config.colsNumber){
      config.colsNumber=1;
    }
    config.colsNumber=config.colsNumber*2;
    var colWidth=1/(config.colsNumber);
    var items=[];
    var addPanelCol=function(panel,colNumber){
      this.panelColumns[colNumber]=panel;
    }
    for(var i=0; i<config.colsNumber; i++){
      var colWidthTmp;
      if(i%2===0){
        colWidthTmp=colWidth*(this.ratio/100)*2;
      } else if(i%2===1){
        colWidthTmp=colWidth*(1-(this.ratio/100))*2;
      }

      var panelCfg={
        columnWidth: colWidthTmp,
        layout: 'anchor',
        items: null,
        plugins: {
          init: addPanelCol.createDelegate(this,[i],true)
        }
      }
      items.push(panelCfg);
      if(i%2==1){
        items.push({width:15, style: "height: 1px"});
      }

    }
    config.items=[{layout:"column", items: items, anchor: "100% 100%" }];
    return(config);
  },

  /** This method, given the Field, returns the index of the panel containing the editor component for the field in this.panelColumns array.
    * <B> NB</B>: The panel containing the operator combo box is the value returned by this function -1
    * @param {Ext.ux.netbox.core.Field} field The field whose index must be calculated
    * @return {int} The index of the panel in the this.panelColumns or -1 if for the field there is no panel
    */
  getEditorPanelNumber: function(field){
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();

    var panelNum=-1;
    for(var i=1; i<this.panelColumns.length;i+=2){
      if(this.panelColumns[i].items.contains(editorComponent)){
        panelNum=i;
        break;
      }
    }
    return(panelNum);
  },

  /** Callback for the elementaryFilterRemoved event of the filter manager. It clean the value and the operator of the just removed filter.
    * @param {Ext.ux.core.netbox.FilterModel} filterModel The filterModel that fired the event
    * @param {Ext.ux.core.netbox.Filter} filter The just removed filter
    */
  elementaryFilterRemoved: function(filterModel,filter){
    var field=filter.getField();
    var panelNum=this.getEditorPanelNumber(field);
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();
    if(editorComponent.items && editorComponent.items.getCount()>0){
      var componentToRemove=editorComponent.items.first();
      editorComponent.remove(componentToRemove);
    }
    if(operator.getValue()!==""){
      operator.clearValue();
    }
    filter.un('operatorChanged',this.operatorChanged,this);
    filter.un('valueChanged',this.valueChanged,this);
    this.managedFilters.remove(filter);
  },

  /** Callback for the elementaryFilterAdded event of the filter manager. It sets the operator on the operatorCombo, and the value in the value field.
    * @param {Ext.ux.core.netbox.FilterModel} filterModel The filterModel that fired the event
    * @param {Ext.ux.core.netbox.Filter} filter The just added filter
    */
  elementaryFilterAdded: function(filterModel,filter){
    var field=filter.getField();
    var panelNum=this.getEditorPanelNumber(field);
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();
    operator.setValue(filter.getOperator().getId());
    var editor=filter.getOperator().getEditor(false);
    this.changeEditor(editor,elementaryFilterCfg);
    var formField=elementaryFilterCfg.getEditor().field;
    if(editorComponent.items && editorComponent.items.getCount()>0){
      var componentToRemove=editorComponent.items.first();
      editorComponent.remove(componentToRemove);
    }

    this.addFormField(formField,editorComponent);
    elementaryFilterCfg.getEditor().editing=true;//hack! This is needed to fool the editor into beliving that it's doing something...
    elementaryFilterCfg.getEditor().setValue(filter.getValues());
    elementaryFilterCfg.getEditor().startValue=filter.getValues();
    filter.on('operatorChanged',this.operatorChanged,this);
    filter.on('valueChanged',this.valueChanged,this);
    this.managedFilters.add(filter);
  },


  /** This method changes the editor used to edit the values of a filter (for example if the operator is changed, the editor can be changed as well).
    * The listeners on the old editor are removed and added to the new one,
    * and then the old editor is replaced with the new one in the GUI
    * @param {Ext.Editor} The new editor to use to edit the value
    * @param {Ext.ux.netbox.core.ElementaryFilterCfg} elementaryFilterCfg The object that manages the editor actually associated with a field
    */
  changeEditor: function(editor,elementaryFilterCfg){
    if(elementaryFilterCfg.getEditor()){
      elementaryFilterCfg.getEditor().un('complete',this.editingCompleted,this);
      elementaryFilterCfg.getEditor().field.un('change',this.editingCompleted,this);
    }
    elementaryFilterCfg.setEditor(editor);
    elementaryFilterCfg.getEditor().on('complete',this.editingCompleted,this);
    elementaryFilterCfg.getEditor().field.on('change',this.editingCompleted,this);
  },

  /** It adds the field used to manage the values  of an elementary filter
    * @param {Ext.form.Field} formField The field that edits the values
    * @param {Ext.Container} editorComponent The field will be added to editorComponent
    */
  addFormField: function(formField, editorComponent){
    editorComponent.add(formField);
    editorComponent.doLayout();
  },

  /** Callback for the operatorChanged event of the filter. It sets the operator on the operatorCombo, and change the editor accordingly
    * @param {Ext.ux.core.netbox.Filter} filter The filter that fired the event
    * @param {Ext.ux.core.netbox.Filter} operator The new operator
    */
  operatorChanged: function(filter, operator){
    var field=filter.getField();
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var operatorCombo=elementaryFilterCfg.getOperatorCombo();
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    if(operatorCombo.getValue()!=operator.getId())
      operatorCombo.setValue(operator.getId());
    var panelNum=this.getEditorPanelNumber(field);
    var editor=filter.getOperator().getEditor(false);
    this.changeEditor(editor,elementaryFilterCfg);
    var formField=elementaryFilterCfg.getEditor().field;
    var componentToRemove=editorComponent.items.first();
    editorComponent.remove(componentToRemove);
    this.addFormField(formField,editorComponent);
    elementaryFilterCfg.getEditor().editing=true;//hack! This is needed to fool the editor into beliving that it's doing something...
    elementaryFilterCfg.getEditor().startValue=filter.getValues();
    elementaryFilterCfg.getEditor().setValue(filter.getValues());
  },

  /** Callback for the valueChanged event of the filter. It sets the value on the editor component
    * @param {Ext.ux.core.netbox.Filter} filter The filter that fired the event
    * @param {Mixed} value The new value
    */
  valueChanged: function(filter, value){
    var elementaryFilterCfg=this.fieldPanelMapping.get(filter.getField().getId());
    var editor=elementaryFilterCfg.getEditor();
    //if(Ext.util.JSON.encode(editor.getValue())!==Ext.util.JSON.encode(value)){
      editor.setValue(value);
    //}
  },
  /**Callback of the complete event of the editor, or callback of the change event on the form field, both editing the value of the filter.
    * It get the value from the editor, and set the value to the filter.
    * @param {Mixed} editorOrFormField. It can be the editor used to edit the value of a filter, or the form field contained in the editor
    */
  editingCompleted: function(editorOrFormField){
    var fn=function(elementaryFilterCfg){
      if(elementaryFilterCfg.getEditor() && (elementaryFilterCfg.getEditor()==editorOrFormField || elementaryFilterCfg.getEditor().field==editorOrFormField)){
        return(true);
      }
      return(false);
    }
    var elementaryFilterCfg=this.fieldPanelMapping.find(fn);
    var field=elementaryFilterCfg.getField();
    var filters=this.filterModel.getElementaryFiltersByFieldId(field.getId());
    if (Ext.util.JSON.encode(filters[0].getValues())!== Ext.util.JSON.encode(elementaryFilterCfg.getEditor().getValue())){
      filters[0].setValues(elementaryFilterCfg.getEditor().getValue());
    }
    elementaryFilterCfg.getEditor().editing=true;//it's still there.... so it's still editing...
  },

  /** This method add all the field contained in the fieldManager associated to the filterModel.
    * This means that it adds the operator combo and the component that will contain the editor for the values of the filter
    */
  populateFields: function(){
    var fields=this.filterModel.getFieldManager().getAllFields();
    for(var i=0;i<fields.length;i++){
      this.addField(fields[i]);
    }
  },
  /** This method remove a given field from the view
    * This means that it removes the operator combo and the component that will contain the editor for the values of the filter<BR>
    * <B> NB</B>: At this moment the widget are not rearranged, it will be implemented in a later moment
    * @param {Ext.ux.netbox.core.Field} field The field to remove
    */
  removeField: function(field){
    var panelNum=this.getEditorPanelNumber(field);
    var elementaryFilterCfg=this.fieldPanelMapping.get(field.getId());
    var editorComponent=elementaryFilterCfg.getEditorComponent();
    var operator=elementaryFilterCfg.getOperatorCombo();
    var componentToRemove=editorComponent.items.first();
    editorComponent.remove(componentToRemove,false);
    var parent=operator.getEl().up('.x-form-item');
    this.panelColumns[panelNum-1].remove(operator,true);
    parent.remove();
    this.panelColumns[panelNum].doLayout();
    this.panelColumns[panelNum-1].doLayout();
    this.fieldPanelMapping.removeKey(field.getId());
  },

  /** Callback of the selected event of a operator combo.
    * This method, if the selected operator is the empty one, remove the filter, sets the selected operator to the filter otherwise
    * @param {Ext.form.ComboBox} combo The combo that fired the event
    * @param {Ext.data.Record} record The selected record
    * @param {int} index The index of the selected item
    */
  operatorSelected: function(combo, record,index){
    var fn=function(elementaryFilterCfg){
      if(elementaryFilterCfg.getOperatorCombo()==combo){
        return(true);
      }
      return(false);
    }
    var elementaryFilterCfg=this.fieldPanelMapping.find(fn);
    var field=elementaryFilterCfg.getField();
    var filters=this.filterModel.getElementaryFiltersByFieldId(field.getId());
    if(record.get('operatorId')===""){
      combo.clearValue();
      if(filters.length>0){
        this.filterModel.removeElementaryFilterById(filters[0].getId());
      }
      return;
    }
    if(record.get('operatorId')!=="" && filters.length==0){
      var filterId=this.filterModel.addElementaryFilterByFieldId(field.getId());
      filters.push(this.filterModel.getElementaryFilterById(filterId));
    }
    var availableOperators=field.getAvailableOperators();
    for(var i=0; i< availableOperators.length; i++){
      if(availableOperators[i].getId()===record.get('operatorId')){
        filters[0].setOperator(availableOperators[i]);
      }
    }
    return;
  },

  /** This method clean the view and then populate all the filters with the actual values from the filterModel.
    * This means that it set the operator in the operator combos  and the values in the editor from the filters in the FilterModel.
    * This method is called for example when the view is built or when the setExpression method is called on the FilteRManager
    */
  populateFilters: function(){
    while(this.managedFilters.getCount()>0){
      var filter=this.managedFilters.last();
      this.elementaryFilterRemoved(this.filterModel,filter);
    }
    var allFilters=this.filterModel.getAllElementaryFilters();
    for(var i=0;i<allFilters.length;i++){
      this.elementaryFilterAdded(this.filterModel,allFilters[i]);
    }
  },

  /** This method add a given field to the view
    * This means that it add the operator combo and the component that will contain the editor for the values of the filter<BR>
    * This component are added at the first available place.
    * @param {Ext.ux.netbox.core.Field} field The field to add
    */
  addField: function(field){
    var cfg={};
    if(this.initialConfig.labelWidth!==undefined){
      cfg.labelWidth=this.initialConfig.labelWidth;
    }
    if(this.initialConfig.hideLabels !==undefined){
      cfg.hideLabels=this.initialConfig.hideLabels;
    }
    if(this.initialConfig.itemCls!==undefined){
      cfg.itemCls=this.initialConfig.itemCls;
    }
    if(this.initialConfig.labelAlign!==undefined){
      cfg.labelAlign=this.initialConfig.labelAlign;
    }
    if(this.initialConfig.labelPad!==undefined){
      cfg.labelPad=this.initialConfig.labelPad;
    }
    var elementaryFilterCfg=new Ext.ux.netbox.core.ElementaryFilterCfg(field,this.rowSize,cfg);
    var minCount=null;
    var choosen=0;
    for(var i=0; i<this.panelColumns.length;i+=2){
      if(!this.panelColumns[i].items){
        minCount=0;
        choosen=i;
        break;
      }
      if(minCount==null || this.panelColumns[i].items.length<minCount){
        minCount=this.panelColumns[i].items.length;
        choosen=i;
      }
    }
    this.fieldPanelMapping.add(field.getId(),elementaryFilterCfg);
    elementaryFilterCfg.getOperatorCombo().on('select',this.operatorSelected,this);
    cfg.layout="form";
    cfg.anchor="100%";
    cfg.items=[elementaryFilterCfg.getOperatorCombo()];
    cfg.height=this.rowSize;
    this.panelColumns[choosen].add(cfg);
    this.panelColumns[choosen].doLayout();
    this.panelColumns[choosen+1].add(elementaryFilterCfg.getEditorComponent());
    this.panelColumns[choosen+1].doLayout();
  }
});


Ext.reg('staticFilter',Ext.ux.netbox.core.StaticFilterModelView);

/** It instantiates a new ElementaryFilterCfg
  * @class This is a private class used in StaticFilterManagerView. It's used to contain the operator Combo and the actual editor component for a given field
  * @constructor
  * @ignore
  */
Ext.ux.netbox.core.ElementaryFilterCfg = function(field,rowSize,cfg){
  this.rowSize=rowSize;
  var operators = [["","<PRE> </PRE>"]];
  this.labelAlign=cfg.labelAlign;
  this.field=field;
  for(var i=0; i<field.getAvailableOperators().length;i++){
    operators.push([field.getAvailableOperators()[i].getId(),
    field.getAvailableOperators()[i].getLabel()]);
  }
  var operatorStore=new Ext.data.SimpleStore({
    fields : ['operatorId','operatorLabel'],
    data: operators
  });
  var comboCfg={
      store         : operatorStore,
      mode          : 'local',
      valueField    : 'operatorId',
      displayField  : 'operatorLabel',
      editable      : false,
      triggerAction : 'all',
      lazyRender    : true,
      fieldLabel    : field.getLabel(),
      width         : 105,
      tpl           : '<tpl for="."><div class="x-combo-list-item">{[values.operatorLabel=="<PRE> </PRE>" ? values.operatorLabel : values.operatorLabel.escHtml()]}</div></tpl>'
  }
  
  if(Ext.isSafari)
    comboCfg.anchor="90%";
  else
    comboCfg.anchor="98%";
  comboCfg.anchor+=" 100%";
  this.operatorCombo = new Ext.form.ComboBox(comboCfg);
  var cfgCloned=Ext.apply({},cfg);
  cfgCloned.layout='form';
  cfgCloned.height=this.rowSize;
  cfgCloned.labelWidth=1;
  cfgCloned.labelPad=1;
  if(this.labelAlign!=="top")
    cfgCloned.hideLabels=true;
  this.editorComponent=new Ext.Panel(cfgCloned);
}

Ext.ux.netbox.core.ElementaryFilterCfg.prototype=/** @scope Ext.ux.netbox.core.ElementaryFilterCfg.prototype */{
  /** Returns the operator combo used to edit the elementary filter s of the given field
    * @return {Ext.form.ComboBox} The returned combo.
    * @ignore
    */
  getOperatorCombo: function(){
    return(this.operatorCombo);
  },

  /** Returns the container that will contain the field used to edit the value of the elementary filter
    * @return {Ext.Container} The returned container.
    * @ignore
    */
  getEditorComponent: function(){
    return(this.editorComponent);
  },
  /** Returns the form field to edit the value of the elementary filter
    * @return {Ext.form.Field} The returned form field.
    * @ignore
    */
  getField: function(){
    return(this.field);
  },
  /** It sets the editor used to manage the values of the elementary filter
    * @param {Ext.Editor} editor The editor to use to manage the values of the elementary filter
    * @ignore
    */
  setEditor: function(editor){
    this.editor=editor;
    if(Ext.isSafari)
      this.editor.field.anchor="90%";
    else
      this.editor.field.anchor="98%";
    this.editor.field.labelSeparator='';
    if(this.labelAlign=="top"){
      if(Ext.isIE)
        this.editor.field.fieldLabel="<pre> </pre>";//this one doesn't work in FF
      else{
        this.editor.field.labelStyle="white-space: pre;"; //this one doesn't work in IE6
        this.editor.field.fieldLabel=" ";
      }
    } else {
      this.editor.field.fieldLabel="";
    }
  },
  /** It returns the editor used to manage the values of the elementary filter
    * @return {Ext.Editor} The editor used to manage the values of the elementary filter
    * @ignore
    */
  getEditor: function(){
    return(this.editor);
  }
};
