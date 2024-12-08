let audio = new Audio('ting.mp3');
turn = "X";
let gameIsFinish = false;
player1Count = 0;
player2Count = 0;

const changeChance = () =>{
    return turn === "X"? "O":"X"
}

const updateScore = (winner) => {
    if (winner === "X") {
        player1Count++;
        document.querySelector('.score1 h1').textContent = player1Count;
    } else if (winner === "O") {
        player2Count++;
        document.querySelector('.score2 h1').textContent = player2Count;
    }
};

const checkToWin = ()=>{
    let squaretext = document.getElementsByClassName('squaretext');
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    wins.forEach(e =>{
        if((squaretext[e[0]].innerText === squaretext[e[1]].innerText) && (squaretext[e[2]].innerText === squaretext[e[1]].innerText) && (squaretext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = squaretext[e[0]].innerText + " Won"
            gameIsFinish = true
            document.getElementsByTagName('img')[0].style.width = '200px';
            showWinningLine(e);
            updateScore(squaretext[e[0]].innerText);
        }
    })
}

const showWinningLine = (winningCombination) => {
    const lines = document.querySelectorAll('.line, .line1, .line2, .line3, .line4, .line5, .line6, .line7');

    // Hide all lines
    lines.forEach(line => line.style.display = 'none');

    const lineMapping = {
        "0,1,2": ".line",      // Top horizontal
        "3,4,5": ".line1",     // Middle horizontal
        "6,7,8": ".line2",     // Bottom horizontal
        "0,3,6": ".line3",     // Left vertical
        "1,4,7": ".line4",     // Middle vertical
        "2,5,8": ".line5",     // Right vertical
        "0,4,8": ".line6",     // Diagonal top-left to bottom-right
        "2,4,6": ".line7"      // Diagonal top-right to bottom-left
    };

    const lineClass = lineMapping[winningCombination.join(',')];
    if (lineClass) {
        const winningLine = document.querySelector(lineClass);
        if (winningLine) winningLine.style.display = 'block';
    }
};


let square = document.getElementsByClassName("square");
Array.from(square).forEach(element =>{
    let squaretext = element.querySelector('.squaretext');
    element.addEventListener('click',()=>{
        if(squaretext.innerText === ""){
            squaretext.innerText = turn;
            turn = changeChance();
            audio.play();
            checkToWin();
            if(!gameIsFinish){
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
            }
        }
    })
})

btn.addEventListener('click',()=>{
    let squaretexts = document.querySelectorAll('.squaretext');
    Array.from(squaretexts).forEach(element =>{
        element.innerText =""
        gameIsFinish = false
        document.getElementsByTagName('img')[0].style.width = '0px'
        document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
    })
    let lines = document.querySelectorAll('.line, .line1, .line2, .line3, .line4, .line5, .line6, .line7');
    lines.forEach(element => {
        element.style.display = 'none'; // Reset opacity for all lines
    });
});

