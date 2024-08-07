let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let gameStarted = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector ("h2");

document.addEventListener ("keypress", function (){
    if (gameStarted == false){  //game ek hi baar start hoga
        console.log ("Game Started");
        gameStarted = true;

        levelUp();
    }
})

function gameButnFlash (btn){
    btn.classList.add ("flash");    //class list add .flash
    setTimeout (function (){
        btn.classList.remove ("flash");
    },250);
}

function userButnFlash (btn){
    btn.classList.add ("userFlash");    //class list add .flash
    setTimeout (function (){
        btn.classList.remove ("userFlash");
    },250);
}

function levelUp (){
    userSeq = [];

    level++;   
    
    h2.innerText = `Level ${level} <br> Highest Score is ${highestScore}`;
    
    //random button choose
    let ranIdx = Math.floor (Math.random ()*3); //random ind choose karege 0-3 tak
    let ranColor = btns [ranIdx]; //arr btns[0]--btns[3]
    let ranBtn = document.querySelector (`.${ranColor}`);   //random color choose karege class likha hai
    // console.log (ranIdx);
    // console.log (ranColor);
    // console.log (ranBtn);
    gameSeq.push (ranColor);
    console.log (gameSeq);
    gameButnFlash (ranBtn);  
    
     if (highestScore < level){
        highestScore ++;
    }
}

function checkAns (idx){
    //console.log ("curr level : ", level);
    //let idx = level-1;
    if (userSeq[idx] === gameSeq[idx]){
        if (userSeq.length == gameSeq.length) {
            setTimeout (levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!! Your Score was <b>${level}</b> <br> Press any key to Start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout (function (){
            document.querySelector("body").style.backgroundColor = "white";
        },250)
        reset();
    }
}

function btnPress (){
    //console.log (this); //detect kon sa bts press kiya gaya hai 
    let btn = this;
    userButnFlash(btn);
    
    userColor = btn.getAttribute("id");
    userSeq.push (userColor);
    //console.log (userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll (".btn");
for (btn of allBtns){
    btn.addEventListener ("click", btnPress);
}

function reset (){
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    
}
