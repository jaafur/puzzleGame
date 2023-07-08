let startGame = document.querySelector('.start-game')
let startGameBtn = document.querySelector('.start')
let restartGame = document.querySelector('.restart-game')
let finalMoves = document.querySelector('.moves')
let restartBtn = document.querySelector('.restart-btn')
let gameContainer = document.querySelector('.game-container')
let movesSpan = document.querySelector('.moves-span')
let picParts = document.querySelector('.pic-parts')
let gameParts = document.querySelector('.game-parts')
let partsArr = []
let count = 0
let moves  = 0

const randomNumber = ()=>{
       return Math.floor(Math.random()*8 + 1)
}

const getCroods = (element)=>{
    const [row,column] = element.getAttribute("croods").split("_")
    return [parseInt(row),parseInt(column)]
}

const checkAjacent = (row1,row2,col1,col2)=>{
    if (row1 == row2) {
        if (col1 == col2+1 || col1 == col2-1) {
            return true
        }
    }else if (col1 == col2) {
        if (row1 == row2 -1||row1==row2+1) {
            return true
        }   
    }
  return false
}

const randomImage = ()=>{
    
    while (partsArr.length < 8) {
        let random = randomNumber()
        if (!partsArr.includes(random)) {
            partsArr.push(random)
            
        }
    }
    partsArr.push(9)
}
randomImage()
// console.log(partsArr)
const isTouchDevice = ()=>{
    try {
        document.createEvent('TouchEvent')
        
        return listenHandler = 'onTouch'
    } catch (e) {
        
        return listenHandler = 'click'
    }
}
 
const gridGenerator = ()=>{
    let listenHandler = isTouchDevice()
    let count = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        let div = document.createElement('div')
        div.classList.add('imageContainer')
        div.setAttribute('croods',`${i}_${j}`)
        div.innerHTML = `<image src ='./pics/image_part_00${partsArr[count]}.png' index ='${partsArr[count]}'
                           class ='image ${partsArr[count]== 9 ? "target":""}'></image>'`
        count ++
        picParts.appendChild(div)
        }
    }
    let images = document.querySelectorAll('.image')
    images.forEach((image) => {
    image.addEventListener('click',(e)=>{
        swap(e)
    })
    }) 
}

gridGenerator()

const swap = (e)=>{
    e.preventDefault()
    const currentElement = e.currentTarget
    const targetElement = document.querySelector('.target')
    // console.log(currentElement)
    const parentElement = currentElement.parentElement
    const parentTarget = targetElement.parentElement

    const [x1,y1] = getCroods(parentElement)
    const [x2,y2] = getCroods(parentTarget)
    
    if(checkAjacent(x1,x2,y1,y2)){
     currentElement.remove()
     targetElement.remove()

     currentindex = parseInt(currentElement.getAttribute('index'))
     targetIndex = parseInt(targetElement.getAttribute('index'))

     currentElement.setAttribute('index',targetIndex)
     targetElement.setAttribute('index',currentindex)

    
     currentArrIndex =partsArr.indexOf(currentindex)
     targetArrIndex = partsArr.indexOf(targetIndex)
    

     let temp = partsArr[targetArrIndex]
     partsArr[targetArrIndex] = partsArr[currentArrIndex]
     partsArr[currentArrIndex] = temp
     
     parentElement.appendChild(targetElement)
     parentTarget.appendChild(currentElement)

     console.log(partsArr.join(''))
    
     if (partsArr.join('') == '123456789') {
        setTimeout(() => {
            gameContainer.classList.add('hide')
           finalMoves.innerHTML = ` : ${moves}`
           restartGame.classList.remove('hide') 
           restartBtn.onclick = ()=>{
            picParts.innerHTML = ``
            partsArr = []
            moves = 0
            count = 0
            randomImage()
            gridGenerator()
            restartGame.classList.add('hide')
            gameContainer.classList.remove('hide')
        }    
        }, 1000);
     }
     moves ++
     movesSpan.innerHTML = `${moves}`
    } 
}
window.onload = ()=>{
    gameContainer.classList.add('hide')
    startGame.classList.remove('hide')
    startGameBtn.onclick = ()=>{
        startGame.classList.add('hide')
        gameContainer.classList.remove('hide')

    }
    
}