'use strict'

const playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn")
const squares = document.querySelectorAll(".square")

const winnerindicator = getComputedStyle(document.body).getPropertyValue('--win')

const p1 = "0"
const p2 = "X"
let currentPlayer = p1
let spaces = Array(9).fill(null)

const WINCODE = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

const startGame = () => {
    squares.forEach(box => box.addEventListener("click", boxclicked))
}

function boxclicked(e) {
    const id = e.target.id
    if (!playerHasWon()) {
        if (!spaces[id]) {
            spaces[id] = currentPlayer
            e.target.innerText = currentPlayer

            if (playerHasWon()) {
                playerText.innerText = `${currentPlayer} has won`
                let winning_blocks = playerHasWon()
        
                winning_blocks.map(box => squares[box].style.backgroundColor = winnerindicator)

                return
            }

            currentPlayer = currentPlayer == p1 ? p2 : p1
        }
    }
}

function playerHasWon() {
    for (const code of WINCODE) {
        let [a,b,c] = code;

        if (spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false;
}

restartBtn.addEventListener("click", restart)

function restart() {
    spaces.fill(null)

    squares.forEach(box => {
        box.innerText = ".."
        box.style.backgroundColor = "unset"
    })

    

    playerText.innerText = "Tic Tac Toe"
    currentPlayer = p1
}

startGame()
