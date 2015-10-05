Tournament = React.createClass({
  
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    if (this.props.id) {
      return {
        tournament: Tournaments.findOne(this.props.id)
      }
    }
    return {}
  },

  renderRounds: function() {
    return this.data.tournament.rounds.map((round) => {
      return <Round key={round.round_id} round={round} />
    })
  },

  render: function() {
    if (!this.props.active) {
      return <div />
    }

    var className = React.addons.classSet({
      "tournament": true,
      
      "bracket-view": (this.props.view === "bracket"),
      "matches-view": (this.props.view === "matches"),
      
      "tournament-rounds-2": (this.data.tournament.roundCount === 2),
      "tournament-rounds-3": (this.data.tournament.roundCount === 3),
      "tournament-rounds-4": (this.data.tournament.roundCount === 4),
      "tournament-rounds-5": (this.data.tournament.roundCount === 5)
    })

    return (
      <section className="tournament-container">
        <div className="tournament-title">
          {this.data.tournament.title}
        </div>
        <div className={className}>
          {this.renderRounds()}
        </div>
      </section>
    )
  }
})