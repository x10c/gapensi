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
// $Id: filters-lang-it.js 226 2010-03-19 14:02:31Z alexmario74 $
/*
 * Italian translation
 */

if(Ext.ux.netbox.core.DynamicFilterModelView){
   Ext.apply(Ext.ux.netbox.core.DynamicFilterModelView.prototype, {
      deleteText        : 'Elimina',
      filterText        : 'Campo',
      operatorText      : 'Operazione',
      valueText         : 'Valore',
      comboText         : 'Seleziona un campo',
      logicOpeAndText   : 'Verifica tutti',
      logicOpeOrText    : 'Verifica almeno uno'

   });
}

if(Ext.ux.netbox.PreferenceManagerView){
   Ext.apply(Ext.ux.netbox.PreferenceManagerView.prototype, {
      addText           : 'Aggiungi preferenza',
      addTooltipText    : 'Salva la attuale configurazione',
      manageText        : 'Gestisci preferenze',
      manageTooltipText : 'Gestisci le configurazioni salvate',
      okText            : 'OK',
      cancelText        : 'Annulla',
      modifyText        : 'Modifica preferenza',
      modifyBtnText     : 'Modifica',
      deleteBtnText     : 'Elimina',
      closeBtnText      : 'Chiudi',
      nameText          : 'Nome',
      descText          : 'Descrizione',
      defaultText       : 'Predefinita',
      loadingText       : 'Caricamento in corso...'
   });
}

if(Ext.ux.netbox.core.QuickFilterModelView){
   Ext.apply(Ext.ux.netbox.core.QuickFilterModelView.prototype, {
      quickFilterText : 'QuickFilter',
      removeText      : 'Rimuovi filtri',
      removeAllText   : 'Rimuovi tutti'
   });
}

if(Ext.ux.netbox.core.RangeMenu){
   Ext.apply(Ext.ux.netbox.core.RangeMenu.prototype, {
      fromText : 'da',
      toText   : 'a'
   });
}

if(Ext.ux.netbox.date.DateRangeOperator){
   Ext.apply(Ext.ux.netbox.date.DateRangeOperator.prototype, {
      fromText : 'da',
      toText   : 'a',
      includeText : 'compreso',
      bothFromAndToNotEmpty: "Sia 'da' che 'a' devono essere avvalorati",
      fromBiggerThanTo: "'da' è più grande di 'a'",
      fromNotADate: "Da non è una data valida",
      toNotADate: "A non è una data valida",
      toAndFromNotADate: "Sia 'da' che 'a' non sono date valide"
   });
}

if(Ext.ux.netbox.number.NumberRangeOperator){
   Ext.apply(Ext.ux.netbox.number.NumberRangeOperator.prototype, {
      fromText : 'da',
      toText   : 'a',
      includeText : 'compreso',
      bothFromAndToNotEmpty: "Sia 'da' che 'a' devono essere avvalorati",
      fromBiggerThanTo: "'Da' è più grande di 'a'",
      fromNotANumber: "Da non è un numero valido",
      toNotANumber: "A non è un numero valido",
      toAndFromNotANumber: "Sia 'Da' che 'A' non sono numeri validi"
   });
}

if(Ext.ux.netbox.date.DatePeriodOperator){
   Ext.apply(Ext.ux.netbox.date.DatePeriodOperator.prototype, {
      periodText  : "periodo",
      yearText    : "ultimo anno",
      monthText   : "ultimo mese",
      weekText    : "ultima settimana",
      dayText     : "ultimo giorno",
      hourText    : "ultima ora",
      quarterText : "ultimo quarto d'ora",
      valueNotExpected: "valore non previsto"
   });
}

if(Ext.ux.netbox.core.Field){
  Ext.apply(Ext.ux.netbox.core.Field, {
    emptyNotAllowed: "Valore vuoto non consentito"
  });
}

if(Ext.ux.netbox.string.StringField){
   Ext.apply(Ext.ux.netbox.string.StringField.prototype, {
     stringEqualsLabel: "=",
     stringDifferentLabel: "!=",
     containsText: "contiene",
     doesntContainsText: "non contiene",
     startsWithText: "inizia con",
     endsWithText: "finisce con",
     stringListText: "lista",
     stringNotListText: "non in lista",
     emptyNotAllowed: "Valore vuoto non consentito"
   });
}

if(Ext.ux.netbox.DefaultPreferenceManagerErrorManager){
  Ext.apply(Ext.ux.netbox.DefaultPreferenceManagerErrorManager.prototype, {
     failedToApplyDefaultPreferenceTitle: "Impossibile applicare la preferenza predefinita",
     failedToApplyPreferenceTitle: "Impossibile applicare la preferenza",
     failedToSavePreferenceTitle: "Impossibile salvare la preferenza",
     failedToDeletePreferenceTitle: "Impossibile eliminare le preferenze selezionate",
     failedToLoadPreferenceTitle: "Impossibile caricare le preferenze"
  });
}


