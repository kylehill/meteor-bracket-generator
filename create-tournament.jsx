CreateTournament = React.createClass({

  //mixins: [ReactMeteorData],

  afterCreate: function() {

  },

  createClick: function() {
    var title = React.findDOMNode(this.refs.title).value.trim()
    var names = React.findDOMNode(this.refs.namelist).value

    var lines = names.split("\n")
    var entries = lines.map(function(line){
      return line.split(",")
    }).reduce(function(mem, line){
      mem = mem.concat(line)
      return mem
    }, []).filter(function(name){
      return name.length
    })

    GenerateTournament(title, entries, this.afterCreate)
  },

  render: function() {
    if (!this.props.active) {
      return <div />
    }

    return (
      <div className="create-container">
        <div className="create-row">
          <div className="create-instructions">
            Tournament Name:
          </div>
          <input ref="title" type="text" className="create-title" />
        </div>
        <div>
          <div className="create-instructions">
            Participants (max 32; comma and/or newline delimited)
          </div>
          <textarea ref="namelist" className="create-namelist" />
        </div>
        <button 
          className="create-button"
          onClick={this.createClick}>Create Tournament</button>
      </div>
    )
  }
})