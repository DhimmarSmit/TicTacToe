let audio = new Audio('ting.mp3');
turn = "X";
let gameIsFinish = false;

const changeChance = () =>{
    return turn === "X"? "O":"X"
}

const checkToWin = ()=>{
    let squaretext = document.getElementsByClassName('squaretext');
    let wins = [
        [0,1,2,0,5,0],
        [3,4,5,0,18,0],
        [6,7,8,0,29,0],
        [0,3,6,-11.5,17,90],
        [1,4,7,0.5,17,90],
        [2,5,8,12.5,17,90],
        [0,4,8,0.5,18,45],
        [2,4,6,0.5,18,135]
    ]
    wins.forEach(e =>{
        if((squaretext[e[0]].innerText === squaretext[e[1]].innerText) && (squaretext[e[2]].innerText === squaretext[e[1]].innerText) && (squaretext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = squaretext[e[0]].innerText + " Won"
            gameIsFinish = true
            document.getElementsByTagName('img')[0].style.width = '200px';
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector('.line').style.opacity = "1"
        }
    })
}

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
        gameIsFinish =false
        document.getElementsByTagName('img')[0].style.width = '0px'
        document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
        document.querySelector('.line').style.opacity = "0"
    })
})

 