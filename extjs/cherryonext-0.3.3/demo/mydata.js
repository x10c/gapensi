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
    var myData = [
        ['3m Co',71.72,0.02,0.03,'10/12 12:00','0'],
        ['Alcoa Inc',29.01,0.42,1.47,'12/10 12:00','1'],
        ['Altria Group Inc',83.81,0.28,0.34,'4/5 12:00','0'],
        ['American Express Company',52.55,0.01,0.02,'9/1 12:00','1'],
        ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00','0'],
        ['AT&T Inc.',31.61,-0.48,-1.54,'19/12 12:00','1'],
        ['Boeing Co.',75.43,0.53,0.71,'28/2 12:00','0'],
        ['Caterpillar Inc.',67.27,0.92,1.39,'12/17 12:00','1'],
        ['Citigroup, Inc.',49.37,0.02,0.04,'12/22 20:15','0'],
        ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'12/22 19:30','0'],
        ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00','0'],
        ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00','1'],
        ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00','0'],
        ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00','0'],
        ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00','0'],
        ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00','1'],
        ['International Business Machines',81.41,0.44,0.54,'9/1 12:00','2'],
        ['Johnson & Johnson',64.72,0.06,0.09,'5/1 12:00','0'],
        ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00','0'],
        ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00','2'],
        ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00','0'],
        ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00','0'],
        ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00','0'],
        ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00','2'],
        ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00','0'],
        ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00','2'],
        ['United Tech1logies Corporation',63.26,0.55,0.88,'9/1 12:00','2'],
        ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00','0'],
        ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00','2']
    ];

    var store = new Ext.data.SimpleStore({
        fields: [
           {name: 'company'},
           {name: 'price', type: 'float'},
           {name: 'change', type: 'float'},
           {name: 'pctChange', type: 'float'},
           {name: 'lastChange', type: 'date', dateFormat: 'n/j H:i'},
           {name: 'inPortfolio'}
        ]
      });

    // examples of custom renderer function
    function change(val){
      if(val > 0){
        return '<span style="color:green;">' + val + '</span>';
      }else if(val < 0){
        return '<span style="color:red;">' + val + '</span>';
      }
      return val;
    }

    function inPortfolio(val){
      if(val==='0'){
        return("Yes");
      }else if (val==='1'){
        return("No");
      }else if (val==='2'){
        return("I don't remember");
      } else {
        return("?????");
      }
    }

    function pctChange(val){
      if(val > 0){
        return '<span style="color:green;">' + val + '%</span>';
      }else if(val < 0){
        return '<span style="color:red;">' + val + '%</span>';
      }
      return val;
    }

    store.loadData(myData);
