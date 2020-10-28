

//#region GAME LOGIC AND DATA

//DATA
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let currentPopCount = 0
let highestPopCount = 0
let gameLenth = 10000
let clockID = 0
let timeRemaining = 0
let currentPlayer = {}
let currentColor = "blue"
let possibleColors = ["blue", "green", "purple", "pink", "orange"]

function startGame(){
  document.getElementById("game-controls").classList.remove("hidden")    
  document.getElementById("main-controls").classList.add("hidden")
  document.getElementById("scoreboard").classList.add("hidden")
  startClock()
  setTimeout(stopGame, gameLenth)
  
}

function startClock(){
  timeRemaining = gameLenth
  drawClock()
  clockID = setInterval(drawClock, 1000)
}

function stopClock(){
  clearInterval(clockID)
}

function drawClock(){
  let countdownElem = document.getElementById('countdown')
  countdownElem.innerText = (timeRemaining/1000).toString() 
  timeRemaining -= 1000
}

function inflate(){
  clickCount++
  height += inflationRate
  width += inflationRate
  checkBalloonPop()
  draw()
}

function checkBalloonPop(){
  if(height >= maxSize){
    console.log("Pop the Balloon!")
    let balloonElement = document.getElementById("balloon")
    balloonElement.classList.remove(currentColor)
    getRandomColor()
    balloonElement.classList.add(currentColor)
    currentPopCount++
    height = 0
    width = 0
  }
}

function getRandomColor(){
  let i = Math.floor(Math.random() * possibleColors.length);
  currentColor = possibleColors[i]

}

function draw(){
  let balloonElement = document.getElementById("balloon")
  let clickCountElem = document.getElementById("click-count")
  let popCountElem = document.getElementById("pop-count")
  let highPopCountElem = document.getElementById("high-pop-count")
  let playerNameElem = document.getElementById("player-name")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"
  
  clickCountElem.innerText = clickCount.toString()
  popCountElem.innerText = currentPopCount.toString()
  highPopCountElem.innerText = currentPlayer.topScore.toString()

  playerNameElem.innerText = currentPlayer.name
}

function stopGame(){
  console.log("Bummer, the game is over.")
    
  document.getElementById("game-controls").classList.add("hidden")    
  document.getElementById("main-controls").classList.remove("hidden")
  document.getElementById("scoreboard").classList.remove("hidden")
    
    clickCount = 0
    height = 120
    width = 100

    if(currentPopCount > currentPlayer.topScore){
      currentPlayer.topScore = currentPopCount
      savedPlayers
    }
    currentPopCount = 0 
    stopClock()
    draw()
    drawScoreboard()
}

//#endregion

let players = []
loadPlayers()

function setPlayer(event){
  event.preventDefault()
  let form = event.target

  let playerName = form.playerName.value
  
  currentPlayer = players.find(player => player.name == playerName)

  if(!currentPlayer){
    currentPlayer = {name: playerName, topScore: 0}
    players.push(currentPlayer)
    savedPlayers()
  }

  form.reset()
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
  drawScoreboard()
}

function changePlayer(){
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}
function savedPlayers(){
  window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if(!playersData){
    players = playersData
  }
}

function drawScoreboard(){
  let template = ""

players.sort((p1, p2) => p2.topScore - p1.topScore)

  players.forEach(player => {
    template += `
    <div class="d-flex space-between">
        <span>
          <i class="fa fa-user"></i>
          ${player.name}
          </span>
        <span>Score:${player.topScore}</span>
      </div>
    `
  })

  document.getElementById("players").innerHTML = template
}

drawScoreboard()