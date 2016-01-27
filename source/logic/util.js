(function(global) {
	'use strict';

	var module = {};
	global.util = module;

	/**
	 * XHR wrapper
	 * @param  {string} url - URL of request
	 * @return {Promise} Promise object resolving with response
	 */
	module.xhrReq = function xhrReq(url) {
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

	/**
	 * DOM ready listener
	 * @return {Promise} Promise object resolving on DOMContentLoaded
	 */
	module.onDomReady = function onDomReady() {
		return new Promise(function(resolve, reject) {
			if (document.readyState !== 'loading') {
				resolve();
			} else {
				return document.addEventListener('DOMContentLoaded', resolve);
			}
		});
	};

	/**
	 * Debouncing function wrapper
	 * @param  {Function} fn - Function to debounce
	 * @param  {number} delay - Minimum time since last invocations to invoke fn
	 */
	module.debounce = function debounce(fn, delay) {
		var self, args, ts, timeout;

		var delayed = function() {
			var since = new Date().getTime() - ts;
			if (since < delay) {
				timeout = setTimeout(delayed, delay - since);
			} else {
				timeout = undefined;
				fn.apply(self, args);
			}
		};

		return function wrap() {
			self = this;
			args = arguments;
			ts = new Date().getTime();
			if (timeout === undefined) {
				timeout = setTimeout(delayed, delay);
			}
		}
	};

}(window));
