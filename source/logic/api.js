(function() {
	'use strict';

	var module = {};
	window.API = module;

	var memCache = {};

	var publicKey = '332efd74a79221e47472ac441ba5f181';
	var apiBase = 'http://gateway.marvel.com/v1/public/';
	var resources = {
		characters: {
			endpoint: 'characters',
			queryPairs: [
				'limit=24'
			],
			transformer: function(response) {
				var output = [];
				var character;
				for (var i=0, l=response.data.results.length; i<l; i++) {
					character = response.data.results[i];
					output.push({
						id: character.id,
						name: character.name,
						thumbnail: character.thumbnail
					});
				}
				return output;
			}
		},
		character: {
			endpoint: 'characters/:id',
			transformer: function(response) {
				return response.data.results[0];
			}
		}
	};

	module.get = function(resource, params, query) {
		return new Promise(function(resolve, reject) {
			var resourceConfig = resources[resource];
			var key;
			var url = apiBase + resourceConfig.endpoint;
			var queryPairs = (resourceConfig.queryPairs || []).slice(0);

			// Replace path parameters, e.g. characters/:id
			for (key in params) {
				url = url.replace(':' + key, params[key]);
			}

			// Add query-string parameters
			for (key in query) {
				queryPairs.push(key + '=' + encodeURIComponent(query[key]));
			}
			url += '?' + queryPairs.join('&');

			if (url in memCache) {
				// Use cached data from previous call
				resolve(memCache[url]);
			} else {
				// Request data from Marvel API
				var dataPromise = util.xhrReq(url + '&apikey=' + publicKey);
				dataPromise.then(function(response) {
					response = JSON.parse(response);
					var data = resourceConfig.transformer(response);
					memCache[url] = data;
					resolve(data);
				});
				dataPromise.catch(reject);
			}

		});
	};

}());