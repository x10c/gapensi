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
/*
 * German translation done by Thorsten Müller, Bonn, www.terrestris.de
 */

if(Ext.ux.netbox.core.DynamicFilterModelView){
   Ext.apply(Ext.ux.netbox.core.DynamicFilterModelView.prototype, {
      deleteText        : 'Löschen',
      filterText        : 'Filter',
      operatorText      : 'Operator',
      valueText         : 'Wert',
      comboText         : 'Auswahl des Filters',
      logicOpeAndText   : 'Filter mit UND verknüpft',
      logicOpeOrText    : 'Filter mit ODER verknüpft'

   });
}

if(Ext.ux.netbox.PreferenceManagerView){
   Ext.apply(Ext.ux.netbox.PreferenceManagerView.prototype, {
      addText           : 'Neue Einstellung',
      addTooltipText    : 'Speichern der aktuellen Konfiguration',
      manageText        : 'Bearbeite Einstellungen',
      manageTooltipText : 'Bearbeiten der gespeicherten Konfigurationen',
      okText            : 'OK',
      cancelText        : 'Abbrechen',
      modifyText        : 'Bearbeite Einstellung',
      modifyBtnText     : 'Bearbeiten',
      deleteBtnText     : 'Löschen',
      closeBtnText      : 'Schließen',
      nameText          : 'Name',
      descText          : 'Beschreibung',
      defaultText       : 'Standard',
      loadingText       : 'Laden der Einstellung...'
   });
}

if(Ext.ux.netbox.core.QuickFilterModelView){
   Ext.apply(Ext.ux.netbox.core.QuickFilterModelView.prototype, {
      quickFilterText : 'Schnellfilter',
      removeText      : 'Entferne Filter',
      removeAllText   : 'Entferne alle Filter'
   });
}

if(Ext.ux.netbox.core.RangeMenu){
   Ext.apply(Ext.ux.netbox.core.RangeMenu.prototype, {
      fromText : 'von',
      toText   : 'bis'
   });
}

if(Ext.ux.netbox.core.RangeItem){
  Ext.apply(Ext.ux.netbox.core.RangeItem.prototype, {
     fromText : 'von',
     toText   : 'bis'
  });
}

if(Ext.ux.netbox.core.RangeField){
  Ext.apply(Ext.ux.netbox.core.RangeField.prototype, {
     fromText : 'von',
     toText   : 'bis'
  });
}

if(Ext.ux.netbox.date.DateRangeOperator){
   Ext.apply(Ext.ux.netbox.date.DateRangeOperator.prototype, {
      fromText : 'von',
      toText   : 'bis',
      includeText : 'zwischen',
      bothFromAndToNotEmpty: "'von' und 'bis' sind leer",
      fromBiggerThanTo: "'von' grösser als 'bis'",
      fromNotADate: "'von' ist kein gültiges Datum",
      toNotADate: "'bis' ist kein gültiges Datum",
      toAndFromNotADate: "'von' und 'bis' besitzen kein gültiges Datum"
   });
}

if(Ext.ux.netbox.number.NumberRangeOperator){
   Ext.apply(Ext.ux.netbox.number.NumberRangeOperator.prototype, {
      fromText : 'von',
      toText   : 'bis',
      includeText : 'zwischen',
      bothFromAndToNotEmpty: "'von' und 'bis' sind leer",
      fromBiggerThanTo: "'von' grösser als 'bis'",
      fromNotANumber: "'von' ist keine gültige Zahl",
      toNotANumber: "'bis' ist keine gültige Zahl",
      toAndFromNotANumber: "'von' und 'bis' sind keine gültigen Zahlen"
   });
}

if(Ext.ux.netbox.date.DatePeriodOperator){
   Ext.apply(Ext.ux.netbox.date.DatePeriodOperator.prototype, {
      periodText  : "Zeitraum",
      yearText    : "letztes Jahr",
      monthText   : "letzter Monat",
      weekText    : "letzte Woche",
      dayText     : "letzter Tag",
      hourText    : "letzte Stunde",
      quarterText : "letzte Viertelstunde",
      valueNotExpected: "kein gültiger Wert"
   });
}

if(Ext.ux.netbox.core.Field){
  Ext.apply(Ext.ux.netbox.core.Field, {
    emptyNotAllowed: "Wert darf nicht leer sein"
  });
}

if(Ext.ux.netbox.string.StringField){
   Ext.apply(Ext.ux.netbox.string.StringField.prototype, {
     stringEqualsLabel: "=",
     stringDifferentLabel: "!=",
     containsText: "enthält",
     doesntContainsText: "enthält nicht",
     startsWithText: "beginnt mit",
     endsWithText: "endet mit",
     stringListText: "in Liste",
     stringNotListText: "nicht in Liste",
     emptyNotAllowed: "Wert darf nicht leer sein"
   });
}

if(Ext.ux.netbox.DefaultPreferenceManagerErrorManager){
  Ext.apply(Ext.ux.netbox.DefaultPreferenceManagerErrorManager.prototype, {
     failedToApplyDefaultPreferenceTitle: "Anwenden der Standard-Einstellung nicht möglich",
     failedToApplyPreferenceTitle: "Anwenden der Einstellung nicht möglich",
     failedToSavePreferenceTitle: "Speichern der Einstellung nicht möglich",
     failedToDeletePreferenceTitle: "Löschen der Einstellung nicht möglich",
     failedToLoadPreferenceTitle: "Laden der Einstellung nicht möglich"
  });
}


