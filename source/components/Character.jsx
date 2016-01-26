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
			return <div className="character-detail">
				<Breadcrumbs thisPage={charData.name} />
				{
					(charData.id ? <div>
							<h2>{charData.name}</h2>
							<figure className="char-image">
								<img src={charData.thumbnail.path + '.' + charData.thumbnail.extension} width="250" height="250" alt={'Image of ' + charData.name} />
								<figcaption>{charData.name}</figcaption>
							</figure>
							<p className="description">{(charData.description ? charData.description : '[no description]')}</p>
							{(charData.comics.available ? <CharList name="Comics" items={charData.comics.items} /> : null)}
							{(charData.events.available ? <CharList name="Events" items={charData.events.items} /> : null)}
							{(charData.series.available ? <CharList name="Series" items={charData.events.items} /> : null)}
							{(charData.stories.available ? <CharList name="Stories" items={charData.stories.items} /> : null)}
						</div> : <div className="loading">Loading...</div>
					)
				}
			</div>;
		}
	});

	global.CharList = React.createClass({
		getInitialState: function() {
			return {
				name: '',
				items: []
			};
		},

		render: function() {
			var self = this;
			return <div className="character-list">
				<h3>{self.props.name}</h3>
				<ol>
					{self.props.items.map(function(item) {
						return <li key={item.name}>
							{item.name}
						</li>;
					})}
				</ol>
			</div>
		}
	});

}(window, window.API));
