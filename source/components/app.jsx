(function(global) {

	global.Link = global.ReactRouter.Link;

	global.util.onDomReady().then(function() {
		var Router = global.ReactRouter.Router;
		var Route = global.ReactRouter.Route;
		var IndexRoute = global.ReactRouter.IndexRoute;
		var browserHistory = global.History.createHistory();

		// Define application routes
		global.ReactDOM.render((
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Index}/>
					<Route path="/character/:id" component={Character}/>
				</Route>
			</Router>
		), document.getElementById('app'));
	});

	// Application wrapper component
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

	global.Breadcrumbs = React.createClass({
		getInitialState: function() {
			return {
				thisPage: ''
			};
		},

		render: function() {
			var self = this;
			return <nav className="breadcrumbs">
				<ol>
					<li>
						<Link to="/">Characters</Link>
					</li>
					<li>
						{self.props.thisPage}
					</li>
				</ol>
			</nav>;
		}
	});

}(window));

