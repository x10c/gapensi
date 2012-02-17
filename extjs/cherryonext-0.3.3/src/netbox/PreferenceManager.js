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
// $Id: PreferenceManager.js 226 2010-03-19 14:02:31Z alexmario74 $

Ext.namespace('Ext.ux.netbox');

/** Creates a new PreferenceManager.
  * @constructor
  * @extends Ext.util.Observable
  * @param {Object} config An object which may contain the following properties:<ul>
  * <li><b>id</b> : String<p style="margin-left:1em">The id of preference manager. A preference is unambiguously identified by id, userName and the name of the preference</p></li>
  * <li><b>userName</b> : String<p style="margin-left:1em">The userName that owns the preferences. A preference is unambiguously identified by id, userName and the name of the preference</p></li>
  * <li><b>getFn</b> : Function<p style="margin-left:1em">The function used to extract from the application the preferences to save</p></li>
  * <li><b>setFn</b> : Function<p style="margin-left:1em">The function used to apply to the application the preferences as returned by getFn</p></li>
  * <li><b>fnScope</b> : Object<p style="margin-left:1em">The scope of the getFn and setFn functions. Optional. If not present window is used</p></li>
  * <li><b>getAllPrefURL</b> : String<p style="margin-left:1em">The URL used to get all the preferences by user. It loads a Store, using a JsonReader as reader.
  * This URL corresponds to a web page that loads a range of preferences for the given user and id. It must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>start</b> : Number<p style="margin-left:1em">The first preference in the range of preferences to return</p></li>
  *   <li><b>limit</b> : Number<p style="margin-left:1em">The The number of preferences to return</p></li>
  * </ul>
  * The page must return a json encoded object in the following format:
  * <PRE>
  * {totalCount: &lt;total number of the preferences&gt;, 
  *   preferences:[
  *     {prefId   : &lt;id of the preference&gt;,
  *      prefName : &lt;name of the preference&gt;,
  *      prefDesc : &lt;the description of the preference&gt;,
  *      isDefault: &lt;true if default, false otherwise&gt;},
  *     {.....}
  *    ]
  *  }
  * </PRE>
  * </p></li>
  * <li><b>applyDefaultPrefURL</b> : String<p style="margin-left:1em">The URL used to apply the default preference.
  * This URL corresponds to a web page that returns the default preference for the given user and id. It must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  * </ul>
  * The page returns the preference in the same format saved by method savePreference and then it's applied. If there is no default preference the response text must be empty.
  * </p></li>
  * <li><b>loadPrefURL</b> : String<p style="margin-left:1em">The URL used to load a specified preference.
  * This URL corresponds to a web page that returns the selected preference for the given user and id. It must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>prefId</b> : String<p style="margin-left:1em">The id of the selected preference</p></li>
  * </ul>
  * The page returns the preference in the same format saved by method savePreference and then it's applied.
  * </p></li>
  * <li><b>savePrefURL</b> : String<p style="margin-left:1em">The URL used to save a preference with a given name.
  * This URL must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>prefId</b> : String<p style="margin-left:1em">The id of the selected preference.
  *   If the value exist means that there is an update, otherwise is an insertion </p></li>
  *   <li><b>prefName</b> : String<p style="margin-left:1em">Name of the preference to save</p></li>
  *   <li><b>prefDesc</b> : String<p style="margin-left:1em">Description of the preference to save</p></li>
  *   <li><b>prefValue</b> : String<p style="margin-left:1em">Value of the preference to save, encoded Json</p></li>
  *   <li><b>isDefault</b> : boolean<p style="margin-left:1em">True if it's default preference, false otherwise</p></li>
  * </ul>
  * </p></li>
  * <li><b>deletePrefURL</b> : String<p style="margin-left:1em">The URL used to delete one or more selected preferences.
  * This URL must be called with the following parameters:
  * <ul>
  *   <li><b>id</b> : String<p style="margin-left:1em">The id of the preference manager</p></li>
  *   <li><b>userName</b> : String<p style="margin-left:1em">The name of the user using the application</p></li>
  *   <li><b>prefIdArray</b> : [String]<p style="margin-left:1em">Array of preference's Id to delete</p></li>
  * </ul>
  * </p></li>
  * @class This class manages user preferences. A user preference is a "state" of some objects that the user wants to save with a name. For example, he has a grid,
  *  with the column in a predefined order, with some filters applied, sorted for a certain column. He can bookmark the given situation, and associate a name 
  *  to it. The he can easilly select from that prefeences, and the grid is back to the state he saved. Since only the developer knows what is usefull to bookmark,
  *  the preferenceManager has 2 functions, a getter and a setter. The getter acquires the state to save from the application, the setter reapplies the settings returned by the getter
  *  to come back to the saved state. The only restriction on the returned value of the getter is that it must be json encodable/decodable. 
  *  To load and manage the preferences this class defines 4 ajax interfaces that the application backend must implement (See the constructor for more details)
  *  To signal an error in the backend simply returns an error http status code (for example 500)
  * <h4>Example</h4>
  * This example suppoose that you have a grid with a filter. It saves and restores the filters and the status of the grid (size of the columns, position of the columns, sort state, hidden/visible columns)
  * <pre>
  * var getterFn=function(){
  *   return({grid: grid.getState(),filter: filterModel.getFilterObj()});
  * }
  * var setterFn=function(pref){
  *   //filter
  *   if(pref.filter){
  *     filterModel.setFilterObj(pref.filter);
  *   }
  *   //grid
  *   if(pref.grid){
  *     grid.getView().userResized=true;
  *     grid.applyState(pref.grid);
  *     grid.getColumnModel().setConfig(grid.getColumnModel().config);
  *   }
  * }
  * prefManager=new Ext.ux.netbox.PreferenceManager({
  *   id: 'prefManagerId',
  *   userName: 'user',
  *   getFn: getterFn,
  *   setFn: setterFn,
  *   getAllPrefURL:'http://getAllPrefURL',
  *   applyDefaultPrefURL:'http://applyDefaultPrefURL',
  *   loadPrefURL:'http://loadPrefURL',
  *   savePrefURL:'http://savePrefURL',
  *   deletePrefURL:'http://deletePrefURL'
  * });
  * </pre>
  */
Ext.ux.netbox.PreferenceManager=function(config){

  Ext.ux.netbox.PreferenceManager.superclass.constructor.call(this,config);

  this.addEvents(/** @scope Ext.ux.netbox.PreferenceManager.prototype */{
    /** Fires when a preference is saved
      * @event preferenceSaved
      * @param {String} prefId The id of the preference that was saved
      * @param {String} prefName The name of the saved preference
      */
    preferenceSaved: true,
    /** Fires when a preference delete failed, that is when the deletePrefURL returned an error HTTP status code (for example 500)
      * @event preferenceDeleteFailed
      * @param {Array} prefIdArray An array with the ids of all the preferences to delete.
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    preferenceDeleteFailed: true,
    /** Fires when applying the default preference failed, that is when the applyDefaultPrefURL returned an error HTTP status code (for example 500)
      * @event applyDefaultPreferenceFailed
      * @param {Array} prefIdArray An array with all the preferences to delete.
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    applyDefaultPreferenceFailed: true,
    /** Fires when applying a preference failed, that is when the loadPrefURL returned an error HTTP status code (for example 500)
      * <b> NB: </b> This event is not fired when the loading of the default preference fails. Look at applyDefaultPreferenceFailed instead
      * @event applyPreferenceFailed
      * @param {String} prefId The id of the preference that was not applied
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    applyPreferenceFailed: true,
    
    /** Fires when saving a preference failed, that is when the savePrefURL returned an error HTTP status code (for example 500)
      * @event preferenceSaveFailed
      * @param {String} prefId The id of the preference that was not saved
      * @param {String} prefName The name of the preference that was not saved
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    preferenceSaveFailed: true,
    
    /** Fires when a preference is deleted
      * @event preferenceDeleted
      * @param {Array} prefIdArray An array with the ids of all the deleted preferences.
      */
    preferenceDeleted : true,
    /** Fires when a load on the store that lists the preferences fails, that is when the getAllPrefURL returned an error HTTP status code (for example 500)
      * @event loadPreferencesFailed
      * @param {XMLHttpRequest} response The response of the ajax method. See <a HREF="http://www.w3.org/TR/XMLHttpRequest/"> XMLHttpRequest reference </a> for more details
      */
    loadPreferencesFailed: true
  });
  /** The id of the preference manager. It's used by the backend to select only the preferences of this preferencesManager, if there are more than one.
    * The tern (id, userName, preferenceId) should be unique.
    * @type String
    */
  this.id=config.id;
  /** The name of the user that owns the prefereces
    * @type String
    */
  this.userName=config.userName;
  /** The setter function that applies the preference restoring the state of the object
    * @type Function
    */
  this.setFn=config.setFn;
  /** The getter function that returns the state of the object
    * @type Function
    */
  this.getFn=config.getFn;
  /** The scope of the getter and setter function
    * @type Object
    */
  this.fnScope=config.fnScope;
  /** The URL used to get all the preferences by user
    * @type String
    */
  this.getAllPrefURL=config.getAllPrefURL;
  /** The URL used to apply the default preference
    * @type String
    */
  this.applyDefaultPrefURL=config.applyDefaultPrefURL;
  /** The URL used to load a specified preference
    * @type String
    */
  this.loadPrefURL=config.loadPrefURL;
  /** The URL used to save a specified preference
    * @type String
    */
  this.savePrefURL=config.savePrefURL;
  /** The URL used to delete a specified preference
    * @type String
    */
  this.deletePrefURL=config.deletePrefURL;
}

Ext.extend(Ext.ux.netbox.PreferenceManager, Ext.util.Observable,/** @scope Ext.ux.netbox.PreferenceManager.prototype */
{
  /** This method returns a store that loads the preferences by userName.
    * The store returned has these columns: prefName, prefDesc, isDefault
    * @return {Ext.data.Store} store The store contains all of a user's preferences
    */
  getAllPreferences : function(){
    if(this.store === undefined){
      this.store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
          url: this.getAllPrefURL
        }),
        baseParams: {id: this.id, userName: this.userName},
        reader: new Ext.data.JsonReader({
          root: 'preferences',
          totalProperty: 'totalCount',
          fields: [
            'prefId',
            'prefName',
            'prefDesc',
            {name: 'isDefault', type: 'boolean'}
          ]
        })
      });
      this.store.on("exception",this._loadExceptionCbk,this);
      this.store.setDefaultSort('prefName');
    }
    return this.store;
  },
  
  /** @private
    * @ignore
    */
  _loadExceptionCbk: function(proxy, request, response){
    this.fireEvent("loadPreferencesFailed",response);
  },

  /** This method returns the default preference by userName.
    * @return {void}
    */
  applyDefaultPreference : function(){
    Ext.Ajax.request({
       url: this.applyDefaultPrefURL,
       success: this.applyDefaultPreferenceCbk.createDelegate(this),
       failure: this.errorFunction.createDelegate(this),
       params: {
         id: this.id,
         userName: this.userName}
    });
  },

  /** This method loads the preference selected.
    * @param {String} prefName The name of the preference
    * @param {Object} prefValue The value of preferences in JSON format
    * @return {void}
    */
  applyPreference : function(prefId,prefValue){
    if(prefValue===undefined){
      Ext.Ajax.request({
         url: this.loadPrefURL,
         success: this.applyPreferenceCbk.createDelegate(this),
         failure: this.errorFunction.createDelegate(this),
         params: {
           id: this.id,
           userName: this.userName,
           prefId: prefId}
      });
    } else {
      this.setFn.call(this.fnScope,prefValue);
    }
  },
  
  /** This method applies the default preference, it it exist
    * @param {Object} response The XMLHttpRequest object containing the preference.
    * @param {Object} options The parameter to the request call.
    * @return {void}
    * @private
    */
  applyDefaultPreferenceCbk : function(response,options){
    if(response.responseText!=""){
      this.applyPreferenceCbk(response,options);
    }
  },

  /** This method converts decodes the responseText using JSON and then it calls the setter function.
    * @param {Object} response The XMLHttpRequest object containing the preference.
    * @param {Object} options The parameter to the request call.
    * @return {void}
    * @private
    */
  applyPreferenceCbk : function(response,options){
    var pref=Ext.util.JSON.decode(response.responseText);
    this.setFn.call(this.fnScope,pref);
  },

  /** The method that saves the preference.
    * @param {String} prefId The id of the preference to save
    * @param {String} prefName The name of the preference to save
    * @param {String} prefDesc The description of the preference
    * @param {boolean} isDefault True if it's default preference
    * @return {String} output decoded with JSON. If it's true (===) it means success, otherwise it's an error message
    */
  savePreference : function(prefId,prefName,prefDesc,isDefault){
    var values=this.getFn.call(this.fnScope);
    var valueEnc=Ext.util.JSON.encode(values);
    var cfg={
       url: this.savePrefURL,
       params: {
         id: this.id,
         userName: this.userName,
         prefId: prefId,
         prefName: prefName,
         prefDesc: prefDesc,
         prefValue: valueEnc,
         isDefault: isDefault
       },
       success: this._onSaveSuccessCbk.createDelegate(this),
       failure: this._onSaveFailureCbk.createDelegate(this)
    };
    Ext.Ajax.request(cfg);
  },

  /** @private
    * @ignore
    */
  _onSaveSuccessCbk : function(response,options){
    this.fireEvent('preferenceSaved',options.params.prefId,options.params.prefName);
  },

  /** @private
    * @ignore
    */
  _onSaveFailureCbk : function(response,options){
    this.fireEvent('preferenceSaveFailed',options.params.prefId, options.params.prefName,response);
  },

  /** This method deletes the preference selected.
    * @param {Array} prefIdArray Array of preference's Id to delete
    * @return {String} output decoded with JSON. If it's true (===) it means success, otherwise it's an error message
    */
  deletePreferences : function(prefIdArray){
    var cfg={
       url: this.deletePrefURL,
       params: {
         id: this.id,
         userName: this.userName,
         prefIdArray: prefIdArray
       },
       success: this._onDeleteSuccessCbk.createDelegate(this),
       failure: this._onDeleteFailureCbk.createDelegate(this)
    };
    Ext.Ajax.request(cfg);
  },

  /** @private
    * @ignore
    */
  _onDeleteSuccessCbk : function(response,options){
    this.fireEvent('preferenceDeleted',options.params.prefIdArray);
  },

  /** @private
    * @ignore
    */
  _onDeleteFailureCbk : function(response,options){
    this.fireEvent('preferenceDeleteFailed',options.params.prefIdArray,response);
  },
  
  /** @private
    * @ignore
    */
  errorFunction : function(response,options){
    if(options.params.prefId===undefined){
      this.fireEvent('applyDefaultPreferenceFailed',response);
    } else {
      this.fireEvent('applyPreferenceFailed',options.params.prefId,response);
    }
  }

});
