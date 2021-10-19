const grid = document.querySelector(".grid")
const lostGame = document.querySelector(".lost-game")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const width = 10
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

const createGrid = () => {
    for (let i = 0; i < width*width; i++){
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}

const startGame = () => {
    grid.style.display = 'flex'
    lostGame.style.display = 'none'
    startButton.style.display = 'none'
    currentSnake.forEach(index => squares[index].classList.remove("snake")) 
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    timerId = setInterval(move, intervalTime)
}

const move = () => {
    if (
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) || 
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        grid.style.display = 'none'
        scoreDisplay.textContent = score
        lostGame.style.display = 'block'
        startButton.style.display = 'block'
        startButton.textContent = 'Restart'
        return clearInterval(timerId)
    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains("apple") ) {
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        generateApple()
        
        score++
        clearInterval(timerId)
        intervalTime *= speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add("snake")
}

const generateApple = () => {
    do {
        appleIndex = Math.floor(Math.random()*squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

const control = (e) => {
    if (e.code === 'ArrowRight'){
        direction = 1
    } else if (e.code === 'ArrowUp'){
        direction = -width
    } else if (e.code === 'ArrowLeft') {
        direction = -1
    } else if (e.code === 'ArrowDown'){
        direction = width
    }
}

createGrid()
currentSnake.forEach(index => squares[index].classList.add("snake"))

document.addEventListener("keydown", control)
startButton.addEventListener("click", startGame)