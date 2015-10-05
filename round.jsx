Round = React.createClass({
  propTypes: {
    round: React.PropTypes.object.isRequired
  },

  renderMatches: function() {
    return this.props.round.matches.map((match) => {
      return <Match key={match.match_id} match={ match } />
    })
  },

  render: function() {
    var classString = React.addons.classSet("round", ("round-" + this.props.round.height))

    return (
      <div className={classString}>

        <div className="title">
          {this.props.round.title}
        </div>
        <div className="matches">
          {this.renderMatches()}
        </div>

      </div>
    )
  }
})