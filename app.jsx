App = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      list: Tournaments.find({}, {
        sort: { createdOn: -1 }
      }).fetch()
    }
  },

  getInitialState: function() {
    return { 
      view: "list",
      active: false,
      id: false
    };
  },

  clickBracket: function() {
    this.setState({ 
      view: "bracket" 
    })
  },

  clickMatches: function() {
    this.setState({ 
      view: "matches" 
    })
  },

  clickList: function() {
    this.setState({ 
      active: false,
      id: false,
      view: "list" 
    })
  },

  clickCreate: function() {
    this.setState({
      active: false,
      view: "create" 
    })
  },

  clickTournamentBinder: function(tournament) {
    return (function(){
      this.setState({
        view: "bracket",
        active: true,
        id: tournament._id
      })
    }).bind(this)
  },

  renderList: function() {
    if (this.state.view === "list") {
      return (this.data.list.map((tournament) => {
        return ( 
          <li 
            onClick={this.clickTournamentBinder(tournament)}
            key={tournament._id}>
            {tournament.title} -- created { moment(tournament.createdOn).fromNow() }
          </li> 
        )
      }))
    }
  },

  render: function() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <div className="link-container desktop-only"
                onClick={this.clickBracket}>
                View Bracket
              </div>
            </li>
            <li>
              <div className="link-container desktop-only"
                onClick={this.clickMatches}>
                View Matches
              </div>
            </li>
            <li>
              <div className="link-container"
                onClick={this.clickList}>
                View Tournament List
              </div>
            </li>
            <li>
              <div className="link-container"
                onClick={this.clickCreate}>
                Create New Tournament
              </div>
            </li>
          </ul>
        </nav>

        <ul className="list">
          {this.renderList()}
        </ul>

        <CreateTournament active={this.state.view === "create"} />
        
        <Tournament 
          active={!!this.state.active} 
          view={this.state.view}
          id={this.state.id} />
      </div>
    )
  }
    
})