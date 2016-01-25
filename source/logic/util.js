(function(global) {
	'use strict';

	var module = {};
	global.util = module;

	module.xhrReq = function(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function(evt) {
				if (this.status === 200) {
					resolve(this.response);
				} else {
					reject(evt, this.status);
				}
			});
			xhr.addEventListener('error', function(evt) {
				reject(evt);
			});
			xhr.addEventListener('abort', function(evt) {
				reject(evt);
			});
			xhr.open('get', url);
			xhr.send();
		});
	};

	module.onDomReady = function() {
		return new Promise(function(resolve, reject) {
			if (document.readyState !== 'loading') {
				resolve();
			} else {
				return document.addEventListener('DOMContentLoaded', resolve);
			}
		});
	};

}(window));
