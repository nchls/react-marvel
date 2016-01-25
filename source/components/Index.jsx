(function(global, API) {

	var Link = global.ReactRouter.Link;

	global.Index = React.createClass({
		getInitialState: function() {
			return {
				characters: []
			};
		},

		componentWillMount: function() {
			var self = this;
			API.get('characters').then(function(characters) {
				self.setState({characters: characters});
			});
		},

		render: function() {
			var self = this;
			return <div className="index">
				<ul>
					{self.state.characters.map(function(character) {
						return <IndexCharacter key={character.id} id={character.id} name={character.name} thumbnail={character.thumbnail} />;
					})}
				</ul>
			</div>;
		}
	});

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

}(window, window.API));
