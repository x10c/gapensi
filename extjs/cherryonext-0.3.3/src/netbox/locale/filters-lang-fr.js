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
/**
 * CherryOnExt fr locale.
 */
if(Ext.ux.netbox.core.DynamicFilterModelView){
  Ext.apply(Ext.ux.netbox.core.DynamicFilterModelView.prototype, {
     deleteText        : 'Supprimer',
     filterText        : 'Champ',
     operatorText      : 'Opérateur',
     valueText         : 'Valeur',
     comboText         : 'Séléctionner un champ',
     logicOpeAndText   : 'Tout vérifier',
     logicOpeOrText    : 'Vérifier au moins un'
  });
}
if(Ext.ux.netbox.PreferenceManagerView){
  Ext.apply(Ext.ux.netbox.PreferenceManagerView.prototype, {
     addText           : 'Ajouter un préférence',
     addTooltipText    : 'Sauver la configuration courante',
     manageText        : 'Gérer les préférences',
     manageTooltipText : 'Gérer les configurations sauvées',
     okText            : 'OK',
     cancelText        : 'Anuller',
     modifyText        : 'Modifier la préférence',
     modifyBtnText     : 'Modifier',
     deleteBtnText     : 'Supprimer',
     closeBtnText      : 'Fermer',
     nameText          : 'Nom',
     descText          : 'Description',
     defaultText       : 'Par défault',
     loadingText       : 'Chargement en cours...'
  });
}

if(Ext.ux.netbox.core.QuickFilterModelView){
  Ext.apply(Ext.ux.netbox.core.QuickFilterModelView.prototype, {
     quickFilterText : 'Filtre rapide',
     removeText      : 'Supprimer le filtre',
     removeAllText   : 'Supprimer tous les filtres'
  });
}

if(Ext.ux.netbox.core.RangeItem){
  Ext.apply(Ext.ux.netbox.core.RangeItem.prototype, {
     fromText : 'de',
     toText   : 'à'
  });
}

if(Ext.ux.netbox.core.RangeField){
  Ext.apply(Ext.ux.netbox.core.RangeField.prototype, {
     fromText : 'de',
     toText   : 'à'
  });
}

if(Ext.ux.netbox.date.DateRangeOperator){
  Ext.apply(Ext.ux.netbox.date.DateRangeOperator.prototype, {
     fromText : 'du',
     toText   : 'au',
     includeText : 'compris entre',
     bothFromAndToNotEmpty: "Les deux valeurs 'du' et 'au' doivent être renseignées",
     fromBiggerThanTo: "'du' est plus grand que 'au'",
     fromNotADate: "'du' n\'est pas une date valide",
     toNotADate: "'au' n\'est pas une date valide",
     toAndFromNotADate: "'du' et 'au' ne sont pas des dates valides"
  });
}

if(Ext.ux.netbox.number.NumberRangeOperator){
  Ext.apply(Ext.ux.netbox.number.NumberRangeOperator.prototype, {
     fromText : 'de',
     toText   : 'à',
     includeText : 'compris entre',
     bothFromAndToNotEmpty: "Les deux valeurs 'de' et 'à' doivent être renseignées",
     fromBiggerThanTo: "'de' est plus grand que 'au'",
     fromNotANumber: "Da non è un numero valido",
     toNotANumber: "'à' n\'est pas une date valide",
     toAndFromNotANumber: "'de' et 'à' ne sont pas des dates valides"
  });
}

if(Ext.ux.netbox.date.DatePeriodOperator){
  Ext.apply(Ext.ux.netbox.date.DatePeriodOperator.prototype, {
     periodText  : "période",
     yearText    : "l\'année dernière",
     monthText   : "le mois dernier",
     weekText    : "la semainne dernière",
     dayText     : "hier",
     hourText    : "cette dernière heure",
     quarterText : "ce dernier quart-d\'heure",
     valueNotExpected: "Valeur non reconnue"
  });
}

if(Ext.ux.netbox.core.Field){
 Ext.apply(Ext.ux.netbox.core.Field, {
   emptyNotAllowed: "Valeur vide non authorisée"
 });
}

if(Ext.ux.netbox.string.StringField){
  Ext.apply(Ext.ux.netbox.string.StringField.prototype, {
    stringEqualsLabel: "=",
    stringDifferentLabel: "!=",
    containsText: "contient",
    doesntContainsText: "ne contient pas",
    startsWithText: "commence par",
    endsWithText: "fini par",
    stringListText: "dans",
    stringNotListText: "n\'est pas dans",
    emptyNotAllowed: "Valeur vide non authorisée"
  });
}

if(Ext.ux.netbox.DefaultPreferenceManagerErrorManager){

Ext.apply(Ext.ux.netbox.DefaultPreferenceManagerErrorManager.prototype,
{
    failedToApplyDefaultPreferenceTitle: "Erreur : impossible d\'appliquer la préférence par défaut",
    failedToApplyPreferenceTitle: "Erreur : impossible d\'appliquer la préférence",
    failedToSavePreferenceTitle: "Erreur : impossible de sauver la préférence",
    failedToDeletePreferenceTitle: "Erreur : impossible de supprimer la préférence sélectionnée",
    failedToLoadPreferenceTitle: "Erreur : impossibile de charger les préférences"
 });
}
