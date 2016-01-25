(function(global) {

	global.util.onDomReady().then(function() {
		var Router = global.ReactRouter.Router;
		var Route = global.ReactRouter.Route;
		var IndexRoute = global.ReactRouter.IndexRoute;
		var browserHistory = global.History.createHistory();
		global.ReactDOM.render((
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Index}/>
					<Route path="/character/:id" component={Character}/>
				</Route>
			</Router>
		), document.getElementById('app'));
	});

	global.App = React.createClass({
		render: function() {
			return <div className="wrap">
				<header>
					<h1>Marvel Characters</h1>
				</header>
				{this.props.children}
			</div>;
		}
	});

}(window));

