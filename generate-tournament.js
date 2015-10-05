var getRoundCount = function(entrantCount) {
  return Math.ceil(Math.log(entrantCount) / Math.LN2)
}

var calculateByes = function(entrantCount) {
  return Math.pow(2, getRoundCount(entrantCount)) - entrantCount
}

var getRoundTitle = function(roundNum, totalRounds) {
  switch (totalRounds - roundNum) {
    case 1:
      return "Final"
    case 2:
      return "Semis"
    case 3:
      return "Quarters"
    default:
      return "Round " + (roundNum + 1)
  }
}

var interlace = function(entries) {
  if (entries.length < 2) {
    return entries
  }

  var out = []

  while (entries.length) {
    out.push(entries.shift())
    out.push(entries.pop())
  }

  return out
}

GenerateTournament = function(title, entries, callback) {
  callback = callback || function(){}

  entries = _.shuffle(entries.map((player) => {
    return {
      name: player
    }
  }))
  
  var byes = calculateByes(entries.length)
  var roundCount = getRoundCount(entries.length)

  _.times(byes, () => {
    entries.push({ bye: true })
  })

  entries = interlace(entries)

  var rounds = []
  var match_id = 0

  _.times(roundCount, (i) => {
    var matches = []
    var roundEntries = _.clone(i ? rounds[i-1].matches : entries)

    while (roundEntries.length) {
      var home = roundEntries.shift()
      var away = roundEntries.shift()

      if (away.bye) {
        matches.push({
          blank: true,
          match_id: match_id++,
          round: (i + 1),
          name: home.name
        })
      }
      else {
        matches.push({
          round: (i + 1),
          match_id: match_id++,
          home: home.name || "",
          away: away.name || ""
        })
      }
    }

    if (i === 0) {
      matches = interlace(matches)
    }

    var round = {
      height: i + 1,
      round_id: i,
      title: getRoundTitle(i, roundCount),
      matches: matches
    }

    rounds.push(round)
  })

  Tournaments.insert({
    title: title,
    createdOn: new Date(),
    roundCount: roundCount,
    rounds: rounds
  }, callback)
}