var gameinstance = null;
var audiomanager = null;

initiate();


function Play() {
    document.getElementById("startscreen").style.zIndex = -1;
    document.getElementById("gamescreen").style.zIndex = 2;
    startgame();
}

function MainMenu() {
    document.getElementById("loading").style.zIndex = -100;
    document.getElementById("gameoverscreen").style.zIndex = -1;
    document.getElementById("startscreen").style.zIndex = 2;
    mainmenu();
}

function GameOver() {
    document.getElementById("gameoverscreen").style.zIndex = 2;
    document.getElementById("gamescreen").style.zIndex = -1;
    gameover();
}

function Load() {
    MainMenu();
    audiomanagerinit();
}

function Continue() {
    if (gameinstance)
        gameinstance.pause = false;
    document.getElementById("gamescreen").style.zIndex = 2;
    document.getElementById("pausescreen").style.zIndex = -1;
}

function Pause() {
    if (gameinstance)
        gameinstance.pause = true;
    document.getElementById("gamescreen").style.zIndex = -1;
    document.getElementById("pausescreen").style.zIndex = 2;
}

function audiomanagerinit() {
    audiomanager = new AudioManager("");
}

function startgame() {
    gameinstance = new GameInstance(100);
    //Rest Codes
}

function gameover() {

}

function mainmenu() {

}

function initiate() {
    /*
    Any Preloading should be done here if possible
    */
    setTimeout(() => {
        var txtelement = document.getElementById("changetxt");
        txtelement.innerHTML = "Tap to Begin";
        txtelement.style.cursor = "pointer";
        loading = true;
    }, 1000)
}