let level = 0;
var TableauHTML = document.getElementById("base");
let bomb =0;
let status = 0;
let timeStart = 0;
let time=0;


function setLevel(lev){
    status=1;
    level=lev.value;
    generateTable();
    plate.generateTab();
    init();   
} 

function replay(level){
    status=1;
    generateTable();
    plate.generateTab();
    init();
    
}

function init(){
    document.getElementById("score").innerHTML = "";
    document.getElementById("mines").innerHTML= `<img id="imgbomb" src="images/bomb.png"></img>`+`${bomb}`;
    timeStart = 0;
    time=0;
    document.getElementById("best").innerHTML = "";
    document.getElementById("smile").src = "images/heureux.svg"
}

class table {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    generateTab(){
        document.getElementById("base").innerHTML="";
            for (let i=0; i<this.height; i++){
                var tab = TableauHTML.insertRow(i);
                for (let j=0; j<this.width; j++){
                    var cell = tab.insertCell(j);
                    cell.innerHTML = `<button class="bouton" value=1 onclick="setAppear(this); endGameWin()" oncontextmenu="setMark(this)"></button>`;
                }
            } setBomb(cell);
            setNumber();
            
        }
    };
 


function generateTable(){
    switch (level){
        case "1" :
            plate = new table(9,9);
            bomb = 10;
        break;
        case "2" :
            plate = new table(16,16);
            bomb = 40;
        break;
        case "3" :
            plate = new table(30,16);
            bomb = 99;
        break;
    } return plate;
};



function setBomb (cell){ // placer les bombes aleatoirement et appliquer la valeur-1
    var countBomb = bomb;
    while (countBomb >0){
        var y = Math.round(Math.random()*(plate.height-1));
        var x = Math.round(Math.random()*(plate.width-1));
        var Coord = TableauHTML.rows[y];
        var cell = Coord.cells[x];
        
        if (Coord.cells[x].children[0].value != -1){ // Ne pas placer 2 bombes au meme endroit
        cell.style.backgroundColor = "rgb(50,50,50)";
        cell.children[0].classList.replace("bouton", "boutonBomb");
        cell.children[0].value = -1; 
        countBomb --;
        }}
}

function setNumber (){
    console.log(bomb);
    for (let i=0; i<plate.height; i++){
        for (let j=0; j<plate.width; j++){
            var sum = TableauHTML.rows[i].cells[j].children[0].value;
            if (TableauHTML.rows[i].cells[j].children[0].value == -1){
                sum = 0;
            } else {
            for (let x=(i-1); x<=(i+1); x++){
                if (x < 0 || x>=plate.height) {
                    continue;
                    }
                for (let y=j-1; y<=j+1; y++){
                    if (y < 0 || y>=plate.width ) {
                        continue;
                        }
                if (TableauHTML.rows[x].cells[y].children[0].value == -1){
                    sum++;
                    // TableauHTML.rows[i].cells[j].children[0].innerHTML = sum-1;
                    TableauHTML.rows[i].cells[j].children[0].value = sum-1;
                } else {
                    // TableauHTML.rows[i].cells[j].children[0].innerHTML = sum-1;
                    TableauHTML.rows[i].cells[j].children[0].value = sum-1;
                    
                }
                    }}}}}}



function setAppear(x){
    timeStart = 1;
    if (status == 0){
        return;
    }
    let parent = x.parentNode; // recupérer les coordonnées
    let coordX = parent.cellIndex;
    let coordY = parent.parentNode.rowIndex;
    x.addEventListener("focus", function () { // bloquer le style bouton focus après qu'il ait été visité
        this.style.outline = 0;  
      });
    if (x.value == -1){
    console.log("PERDU");
    endGameLoose(); // fonction fin du jeu loose
    x.parentNode.style.backgroundColor = "rgba(255,255,255,1)";
    x.parentNode.innerHTML = `<img id="imgbomb" src="images/bomb.png"></img>`;
    x.remove();
    } else if (x.className == "boutonMark"){
        return;
    } else if (x.value > 0) {
        x.innerHTML = x.value;
        if(x.value == 2){
            x.style.fontSize = "0.6em";
        } else if (x.value == 3){
            x.style.fontSize = "0.7em";
        } else if (x.value == 4){
            x.style.fontSize = "0.8em";
        } else if (x.value == 5){
            x.style.fontSize = "0.9em";
        }
        x.style.backgroundColor="rgba(111,111,111,0)";
        x.value = -3;
    } else if (x.value == 0){
        x.style.backgroundColor="rgba(111,111,111,0)";
        x.value = -3;
        for (let i=coordY-1; i<=coordY+1; i++){
            if (i < 0 || i>=plate.height) {
                continue;
                }
            for (let j=coordX-1; j<=coordX+1; j++){
                if (j < 0 || j>=plate.width ) {
                    continue;
                    }
                if (TableauHTML.rows[i].cells[j].children[0].value >= 0) {
                    TableauHTML.rows[i].cells[j].children[0].style.backgroundColor="rgba(111,111,111,0)";
                    this.setAppear(TableauHTML.rows[i].cells[j].children[0]);
            }}
    }
}}


function endGameLoose() {
    document.getElementById("smile").src = "images/crying.svg"
    document.getElementById("score").innerHTML = "Game over, LOOSER";
    status = 0;
    timeStart=0;
}

function endGameWin() {
    if (status == 0){
        return;
    }
    for (let i=0; i<plate.height; i++){
        for (let j=0; j<plate.width; j++){
            console.log(i);
            var total = TableauHTML.rows[i].cells[j].children[0].value 
            if(total != -3 && total != -1 && total != -51){
                return;
            } 
            
        } 
    }
    document.getElementById("smile").src = "images/happywin.png"
    document.getElementById("score").innerHTML = "C'est gagné !";
    timeStart=0;
    document.getElementById("best").innerHTML = "Votre temps est de "+`${time}`+" secondes" ;
    status = 0;
}



// supprime le context sur le tableau pour accederau clique droit
noContext = document.getElementById('base');
noContext.addEventListener('contextmenu', e => {
  e.preventDefault();
});
function setMark(x){
    if (status == 0){
        return;
    }
    if (x.value == -3){
        return;
    }
    if (x.className == "boutonMark") {
        x.className = "bouton";
        x.value = parseInt(x.value) + 50;
        bomb++;
        document.getElementById("mines").innerHTML= `<img id="imgbomb" src="images/bomb.png"></img>`+`${bomb}`;
    } else {
    x.className = "boutonMark";
    x.value = parseInt(x.value)-50;
    bomb--;
    document.getElementById("mines").innerHTML= `<img id="imgbomb" src="images/bomb.png"></img>`+`${bomb}`;
}console.log(x.value)}




setInterval(function(){
    if(timeStart>0){
    time++;}
    document.getElementById("chrono").innerHTML = `<img id="imgTime" src="images/timer.svg"></img>`+`${time}`;}, 1000);
