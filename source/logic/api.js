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
				window.charResponse = response.data.results[0];
				return response.data.results[0];
			}
		}
	};

	module.get = function(resource, query) {
		return new Promise(function(resolve, reject) {
			var resourceConfig = resources[resource];
			var url = apiBase + resourceConfig.endpoint;
			for (var key in query) {
				url = url.replace(':' + key, query[key]);
			}

			if (url in memCache) {
				resolve(memCache[url]);
			} else {
				var dataPromise = util.xhrReq(url + '?apikey=' + publicKey);
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