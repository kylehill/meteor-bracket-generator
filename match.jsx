Match = React.createClass({

  propTypes: {
    match: React.PropTypes.object.isRequired
  },

  render: function() {
    var classString = "match"
    if (this.props.match.blank) {
      classString += " match-blank"
    }

    var homePlayer = (this.props.match.winner === "home"
      ? "player winner"
      : "player")

    var awayPlayer = (this.props.match.winner === "away"
      ? "player winner"
      : "player")

    return (
      <div className={classString}>
        <div className={homePlayer}>
          { this.props.match.home }
        </div>
        <div className={awayPlayer}>
          { this.props.match.away }
        </div>
      </div>
    )
  }

})