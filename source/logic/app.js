(function(window, document, util) {

	'use strict'

	var dataPromise = util.xhrReq('http://gateway.marvel.com/v1/public/characters?apikey=332efd74a79221e47472ac441ba5f181');

	dataPromise.then(function(response) {
		console.log(JSON.parse(response));
	});

}(window, document, window.util));

