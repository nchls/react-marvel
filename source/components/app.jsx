(function(global) {

	global.util.onDomReady.then(function() {
		global.ReactDOM.render(
			<Router>

			</Router>
		);
	});

	window.App = React.createClass({
		getInitialState: function() {
			return {};
		},

		render: function() {
			return <h1>React!</h1>;
		}
	});

}(window));

