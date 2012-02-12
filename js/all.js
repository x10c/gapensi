/**
 * Copyright 2012 - GAPENSI.ORG
 *
 * Author(s):
 * + x10c-Lab
 *   - agus sugianto (agus.delonge@gmail.com)
 */

/* fix for hidden button in RowEditor when grid height is set to auto */
Ext.override(Ext.grid.GridView, {
	getEditorParent: function() {
		return document.body;
	}
});

function MyRowEditor(obj) {
	return new Ext.ux.grid.RowEditor({
		saveText	: 'Simpan'
	,	cancelText	: 'Batal'
	,	clicksToEdit: 2
	,	listeners	: {
			canceledit: function(roweditor, state) {
				if (state === true) {
					obj.do_cancel();
				}
			}
		,	afteredit: function(roweditor, object, record, idx) {
				obj.do_save(record);
			}
		}
	});
}

function combo_renderer(combo)
{
        return function(value) {
                var idx = combo.store.find(combo.valueField, value);
                if (idx < 0) {
                        return value;
                }
                var rec = combo.store.getAt(idx);
                return rec ? rec.get(combo.displayField) : "";
        }
}

function store_renderer(valueField, displayField, store)
{
	return function(v) {
		var i = store.find(valueField, v);
		if (i < 0) {
			return v;
		}
		var rec = store.getAt(i);
		return rec ? rec.get(displayField) : "";
	}
}

function checkbox_renderer(checkbox, str_true, str_false)
{
	return function(value) {
		if (value == '1' || value == 'true' || value == true) {
			return str_true;
		} else {
			return str_false;
		}
	}
}

/*
 * Add filtering on Ext.form.ComboBox
 */
Ext.form.ComboBox.prototype.filterBy = function(fn, scope) {
	var ds = this.store;

	ds.filterBy(fn, scope);
	ds.realSnapshot = ds.snapshot;
	ds.snapshot = ds.data;
};

Ext.form.ComboBox.prototype.clearFilter = function(suppressEvent) {
	var ds = this.store;

	if (ds.realSnapshot && ds.realSnapshot != ds.snapshot) {
		ds.snapshot = ds.realSnapshot;
		delete ds.realSnapshot;
	}
	ds.clearFilter(suppressEvent);
};

/*
 * Add some space between label and form.
 */
Ext.form.FormPanel.prototype.labelSeparator	=' : ';
Ext.form.FieldSet.prototype.labelSeparator	=' : ';

/*
 * show warning 'allowBlank:false' in the right side of the form.
 */
Ext.form.Field.prototype.msgTarget = 'side';

/*
 * Hiding series in Chart.
 * @ref: http://technopaper.blogspot.com/2010/06/hiding-series-in-extjs-charts.html
 */
Ext.override(Ext.chart.Chart, {
    setSeriesStylesByIndex: function(index, styles){
        this.swf.setSeriesStylesByIndex(index, Ext.encode(styles));
    }
});

/*
 * Dynamically add/remove field in grid.
 * @ref: http://www.sencha.com/forum/showthread.php?53009-Adding-removing-fields-and-columns
 */
Ext.override(Ext.data.Store,{
	addField: function(field){
		field = new Ext.data.Field(field);
		this.recordType.prototype.fields.replace(field);
		if(typeof field.defaultValue != 'undefined'){
			this.each(function(r){
				if(typeof r.data[field.name] == 'undefined'){
					r.data[field.name] = field.defaultValue;
				}
			});
		}
		delete this.reader.ef;
		this.reader.buildExtractors();
	},
	removeField: function(name){
		this.recordType.prototype.fields.removeKey(name);
		this.each(function(r){
			delete r.data[name];
			if(r.modified){
				delete r.modified[name];
			}
		});
		delete this.reader.ef;
		this.reader.buildExtractors();
	}
});

Ext.override(Ext.grid.ColumnModel,{
	addColumn: function(column, colIndex){
		if(typeof column == 'string'){
			column = {header: column, dataIndex: column};
		}
		var config = this.config;
		this.config = [];
		if(typeof colIndex == 'number'){
			config.splice(colIndex, 0, column);
		}else{
			colIndex = config.push(column);
		}
		this.setConfig(config);
		return colIndex;
	},
	removeColumn: function(colIndex){
		var config = this.config;
		this.config = [config[colIndex]];
		config.splice(colIndex, 1);
		this.setConfig(config);
	}
});

Ext.override(Ext.grid.GridPanel,{
	addColumn: function(field, column, colIndex){
		if(!column){
			if(field.dataIndex){
				column = field;
				field = field.dataIndex;
			} else{
				column = field.name || field;
			}
		}
		this.store.addField(field);
		return this.colModel.addColumn(column, colIndex);
	}
,	removeColumn: function(name, colIndex){
		this.store.removeField(name);
		if(typeof colIndex != 'number'){
			colIndex = this.colModel.findColumnIndex(name);
		}
		if(colIndex >= 0){
			this.colModel.removeColumn(colIndex);
		}
	}
,	loadMask: true
});

/* masking NPWP */
Ext.apply(Ext.form.VTypes, {
    NPWP:  function(v) {
        return /^\d{2,2}\.\d{3,3}\.\d{3,3}\.\d{1,1}\-\d{3,3}\.\d{3,3}$/.test(v);
    },
    NPWPText: 'Format NPWP harus sesuai.',
    NPWPMask: /[\d\.\-]/i
});

function left(str, n){
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0,n);
}

function right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

