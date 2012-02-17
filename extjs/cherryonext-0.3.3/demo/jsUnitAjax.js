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
 * @fileoverview
 * jsUnitAjax.js contains a mock implementation of XmlHttpRequest that can be used for testing the sending and receiving
 * AJAX requests and responses.
 */

/**
 * @class
 * A MockXmlHttpRequest implements the XmlHttpRequest API.  It is intended for use when testing code that deals with AJAX.
 */
function MockXmlHttpRequest() {
    /**
     * stores the headers set on the request
     */
    this.requestHeaderNamesToValues = {};
}

/**
 * Implements open by storing all the arguments
 * @param method
 * @param url
 * @param isAsync
 * @param userName
 * @param password
 */
MockXmlHttpRequest.prototype.open = function(method, url, isAsync, userName, password) {
    this.method = method;
    this.url = url;
    this.isAsync = isAsync;
    this.userName = userName;
    this.password = password;
}

/**
 * Implements send by noting that send was called and storing the data given
 * @param data
 */
MockXmlHttpRequest.prototype.send = function(data) {
    this.sendCalled = true;
    this.data = data;
}

/**
 * Implements setRequestHeader by storing each header and its value in a hash
 * @param label
 * @param value
 */
MockXmlHttpRequest.prototype.setRequestHeader = function(label, value) {
    this.requestHeaderNamesToValues[label] = value;
}

/**
 * Useful for testing.  You can implement createXmlHttpRequest as a global function in your production code by returning
 * a real request; here, when testing, it returns a MockXmlHttpRequest
 */
function createXmlHttpRequest() {
    return new MockXmlHttpRequest();
}