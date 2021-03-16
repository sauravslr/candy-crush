document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const squares =[]
    let score = 0
    const displayScore = document.getElementById('score')
    const width = 8
    const candyColor = ['url(blue-candy.png)',
                        'url(green-candy.png)',
                        'url(orange-candy.png)',
                        'url(red-candy.png)',
                        'url(purple-candy.png)',
                        'url(yellow-candy.png)']

function createBoard(){
    for(let i=0;i < width * width;i++){
        const square = document.createElement('div')
        square.setAttribute('draggable',true)
        square.setAttribute('id',i)
        let color = Math.floor(Math.random() * candyColor.length)
        square.style.backgroundImage = candyColor[color]
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()
let colorBeingDragged
let colorBeingReplaced
let squareIDdragged
let squareIDreplaced

squares.forEach(square=> square.addEventListener('dragstart',dragStart))
squares.forEach(square=> square.addEventListener('dragend',dragEnd))
squares.forEach(square=> square.addEventListener('dragover',dragOver))
squares.forEach(square=> square.addEventListener('dragenter',dragEnter))
squares.forEach(square=> square.addEventListener('dragleave',dragLeave))
squares.forEach(square=> square.addEventListener('drop',dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIDdragged = parseInt(this.id)
    console.log(this.id,'dragstart')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id,'dragover')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id,'dragenter')
}

function dragLeave() {
    console.log(this.id,'dragleave')
}




function dragDrop() {
    console.log(this.id,'dragdrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIDreplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[colorBeingDragged].style.backgroundImage = colorBeingReplaced
  
}

function dragEnd() {
    console.log(this.id,'dragend')

    let validMoves = [squareIDdragged -1,squareIDdragged - width,squareIDdragged +1,squareIDdragged + width]

    let validMove = validMoves.includes(squareIDreplaced)

    if(colorBeingReplaced && validMove){
        squareIDreplaced = null
    } else if(colorBeingReplaced && !validMove){
        squares[squareIDreplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIDdragged].style.backgroundImage = colorBeingDragged
    } else squares[squareIDdragged].style.backgroundImage = colorBeingDragged
    }




    function moveDown(){
        for(let i=0;i < 55;i++){
            if(squares[i+ width].style.backgroundImage === ''){
                squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0,1,2,3,4,5,6,7]
                const isfirstRow  = firstRow.includes(i)

                if(isfirstRow && squares[i].style.backgroundImage === ''){
                    let randomcolor = Math.floor(Math.random()* candyColor.length)
                    squares[i].style.backgroundImage = candyColor[randomcolor]
                }
            }

        }
    }

    function checkRowForThree() {
        for(let i=0;i<61;i++){
            let rowofThree = [i,i+1,i+2]
            let decidedColor = squares[i].style.backgroundImage
            let isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

            if(notValid.includes(i)) continue

            if(rowofThree.every(index=> squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                displayScore.innerHTML = score
                rowofThree.forEach(index=> squares[index].style.backgroundImage = '')
            }
        }
    }

    checkRowForThree()

    function checkColumnForThree() {
        for(let i=0;i<47;i++){
            let columnofThree = [i,i+width,i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            let isBlank = squares[i].style.backgroundImage === ''

            if(columnofThree.every(index=> squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                displayScore.innerHTML = score
                columnofThree.forEach(index=> squares[index].style.backgroundImage = '')
            }
        }
    }

    checkColumnForThree()

    function checkRowForFour(){
        for(let i=0;i<60;i++){
            let rowofFour = [i,i+1,i+2,i+3]
            let decidedColor = squares[i].style.backgroundImage
            let isBlank = squares[i].style.backgroundImage === ''
            
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]

            if(notValid.includes(i)) continue
            if(rowofFour.every(index=> squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                displayScore.innerHTML = score
                rowofFour.forEach(index=>squares[index].style.backgroundImage= '')
            }
        }
    }

    checkRowForFour()


    function checkColumnForFour(){
        for(let i=0;i < 39;i++){
            let columnofFour = [i,i+ width,i+width*2,i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            let isBlank = squares[i].style.backgroundImage === ''

            if(columnofFour.every(index=> squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                displayScore.innerHTML = score
                columnofFour.forEach(index=> squares[index].style.backgroundImage = '')
            }
        }
    }

    checkColumnForFour()



    window.setInterval(function(){
        moveDown()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        
    },100)

})


