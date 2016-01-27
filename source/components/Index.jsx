(function(global, util, API) {

	var SEARCH_DELAY = 300;

	// Index of characters
	global.Index = React.createClass({
		getInitialState: function() {
			return {
				isLoading: true,
				isFailed: false,
				characters: []
			};
		},

		// Request initial data
		componentWillMount: function() {
			var self = this;
			API.get('characters').then(function(characters) {
				self.setState({
					isLoading: false,
					characters: characters
				});
			}).catch(self.handleAPIFailure);
		},

		// Refresh data with search results
		handleSearch: function(term) {
			var self = this;
			var query = (term !== '' ? {nameStartsWith: term} : null);
			self.setState({isLoading: true});
			API.get('characters', null, query).then(function(characters) {
				self.setState({
					isLoading: false,
					characters: characters
				});
			}).catch(self.handleAPIFailure);
		},

		handleAPIFailure: function() {
			this.setState({
				isFailed: true,
				isLoading: false
			});
		},

		handleWarningDismiss: function() {
			this.setState({
				isFailed: false
			});
		},

		render: function() {
			var self = this;
			return <div className="index">
				<SearchBar searchHandler={this.handleSearch} />
				{(self.state.isFailed ?
					<p className="network-warning">
						Requests to the Marvel API are failing. Is your network still up? <button onClick={self.handleWarningDismiss}>Dismiss</button>
					</p>
				: null )}
				<ul className={'characters-list' + (self.state.isLoading ? ' isLoading' : '')}>
					{(self.state.characters.length ?
						self.state.characters.map(function(character) {
							return <IndexCharacter key={character.id} id={character.id} name={character.name} thumbnail={character.thumbnail} />;
						})
					:
						<div>No characters found.</div>
					)}
				</ul>
			</div>;
		}
	});

	global.SearchBar = React.createClass({
		getInitialState: function() {
			return {
				term: '',
				keyTimer: null
			};
		},

		// Replace the notifyTermChange function with a debounced wrapper to prevent overloading the API with every keystroke
		componentWillMount: function() {
			this.notifyTermChange = util.debounce(this.notifyTermChange, SEARCH_DELAY);
		},

		notifyTermChange: function(term) {
			this.props.searchHandler(term);
		},

		handleChange: function(evt) {
			var term = evt.target.value;
			this.setState({term: term});
			this.notifyTermChange(term);
		},

		render: function() {
			return <input className="search-bar" placeholder="Search characters" value={this.state.term} onChange={this.handleChange} />;
		}
	});

	// Character portrait/link
	global.IndexCharacter = React.createClass({
		render: function() {
			var self = this;
			return <li>
				<Link to={'/character/' + self.props.id} style={{backgroundImage: 'url(' + self.props.thumbnail.path + '.' + self.props.thumbnail.extension + ')'}}>
					<span className="caption">{self.props.name}</span>
				</Link>
			</li>;
		}
	});

}(window, window.util, window.API));
