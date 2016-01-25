(function(global, API) {

	global.Character = React.createClass({
		getInitialState: function() {
			return {
				charData: {}
			};
		},

		componentWillMount: function() {
			var self = this;
			API.get('character', {id: self.props.params.id}).then(function(charData) {
				self.setState({charData: charData});
			});
		},

		render: function() {
			var charData = this.state.charData;
			if (this.state.charData.id) {
				return <div className="characterDetail" style={{backgroundImage: 'url(' + charData.thumbnail.path + '.' + charData.thumbnail.extension + ')'}}>
					<h2>{charData.name}</h2>
					<p className="description">{charData.description}</p>
				</div>;
			} else {
				return <div className="loading">Loading...</div>;
			}
		}
	});

}(window, window.API));
