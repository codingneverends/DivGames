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
    audiomanager = new AudioManager("./music/bg.mp3");
}

function startgame() {
    Score.start();
    gameinstance = new GameInstance(100, () => {
        gameinstance.RemoveGameobject("blockgenerator");
        for (var i = 0; i < gameinstance.gameobjects.length; i++) {
            var _classobject = gameinstance.gameobjects[i]._classobject;
            _classobject.destroy(_classobject);
        }
        GameOver();
    });
    gameinstance.AddGameObject(block_generator);
    gameinstance.run();
}

function gameover() {
    audiomanager.CreateSuddenAudioInstance("./music/gameover.wav", 2000);
    Score.ongameover();
    Score.score = 0;
}

function mainmenu() {
    Score.score = 0;
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

//Initial settings of game
const gamescreen = document.getElementById("gamescreen");
const gamescreen_width = gamescreen.offsetWidth;
const gamescreen_height = gamescreen.offsetHeight;
const gamearea = document.getElementById("gamearea");
const playerarea = document.getElementById("playerarea");
const gamearea_height = 0.6 * gamescreen_height;
gamearea.style.width = 0.4 * gamescreen_width + "px";
playerarea.style.width = 0.4 * gamescreen_width + "px";
gamearea.style.height = gamearea_height + "px";
playerarea.style.height = 0.2 * gamescreen_width + "px";
playerarea.children[0].style.height = 0.2 * gamescreen_width + "px";
playerarea.children[0].style.width = 0.2 * gamescreen_width + "px";

const Player = {
    init() {
        this.player = playerarea.children[0];
        this.position = 0;
    },
    changeposition() {
        this.position++;
        if (this.position == 2)
            this.position = 0;
        this.player.style.marginLeft = this.position * 0.2 * gamescreen_width + "px";
    }
}
Player.init();

const Score = {
    init() {
        this.score_txt = document.getElementById("score_gs");
        this.fin_score_txt = document.getElementById("score");
        this.score = 0;
    },
    start() {
        this.score = 0;
        this.score_txt.innerHTML = 0;
        this.fin_score_txt.innerHTML = 0;
    },
    increase_score(score) {
        this.score += score;
        audiomanager.CreateSuddenAudioInstance("./music/sucess.mp3", 2000);
        this.score_txt.innerHTML = this.score;
    },
    ongameover() {
        this.score_txt.innerHTML = 0;
        this.fin_score_txt.innerHTML = this.score;
    }
}
Score.init();

const initial_speed = 30;
const initial_cooldown = 2;

const block_generator = {
    init() {
        this.gameinstance = gameinstance;
        this.gameobject = null;
        this.unique_id = "blockgenerator";
        this.delta_time = 0;
        this.cooldown = initial_cooldown;
        this.speed = initial_speed;
        this.lastupdatedfor = 0;
    },
    update() {
        var _classobject = block_generator;
        if (Math.floor(_classobject.delta_time) == 0) {
            var position = Math.floor(Math.random() * 100) % 2;
            new Block(_classobject.gameinstance, position, _classobject.speed);
        }
        _classobject.delta_time += _classobject.gameinstance.updatelag;
        var time_in_seconds = _classobject.delta_time / 1000;
        if (time_in_seconds >= _classobject.cooldown)
            _classobject.delta_time = 0;
        if (Score.score % 100 == 0 && Score.score != _classobject.lastupdatedfor) {
            updatescoreandcds(_classobject.gameinstance, Score.score);
            _classobject.lastupdatedfor = Score.score;
        }

    }
}

function Dash() {
    if (gameinstance) {
        if (!gameinstance.gameover) {
            if (!gameinstance.pause) {
                Player.changeposition();
            }
        }
    }
}

class Block {
    constructor(gameinstance, position, speed) {
        this.gameinstance = gameinstance;
        this.position = position;
        this.htmldiv = null;
        this.heghtfromtop = 0;
        this.speed = speed;
        this.gameobject = null;
        this.unique_id = "block" + "_" + Math.floor(gameinstance.time_elapsed * 100) + "_" + Math.floor(Math.random() * 1000);
        gameinstance.CreateGameObject(this);
    }
    init(_classobject) {
        //Add to html div
        var div = document.createElement("div");
        div.className = "blk";
        div.style.height = 0.2 * gamescreen_width + "px";
        div.style.width = 0.2 * gamescreen_width + "px";
        div.style.marginLeft = _classobject.position * 0.2 * gamescreen_width + "px";
        gamearea.appendChild(div);
        _classobject.htmldiv = div;
    }
    update(_classobject) {
        //Update html div
        _classobject.heghtfromtop += _classobject.speed * _classobject.gameinstance.updatelag / 1000;
        var margintop = _classobject.heghtfromtop * gamearea_height / 100 + "px";
        _classobject.htmldiv.style.marginTop = margintop;
        if (_classobject.heghtfromtop > 100) {
            Score.increase_score(10);
            _classobject.destroy(_classobject);
        }
        if ((100 - _classobject.heghtfromtop) / 100 * gamearea_height < 0.2 * gamescreen_width && Player.position == _classobject.position) {
            Score.increase_score(10);
            _classobject.destroy(_classobject);
            _classobject.gameinstance.GameOver();
        }
    }
    destroy(_classobject) {
        //remove from html
        if (_classobject.htmldiv.parentNode) {
            _classobject.htmldiv.parentNode.removeChild(_classobject.htmldiv);
        }
        _classobject.gameinstance.RemoveGameobject(_classobject.gameobject.unique_id);
    }
}

function updatescoreandcds(gameinstance, _score) {
    var gameobject_blocks = gameinstance.gameobjects.filter((_gameobject) => {
        _gameobject.unique_id.includes("block") == true;
    });
    block_generator.cooldown = getcooldown(_score);
    block_generator.speed = getspeed(_score);
    for (var i = 0; i < gameobject_blocks.length; i++) {
        gameobject_blocks[i]._classobject.speed = getspeed(_score);
    }
}

function getspeed(_score) {
    var multiplier = _score / 100;
    var _speed = initial_speed + multiplier * 3;
    return _speed;
}

function getcooldown(_score) {
    var multiplier = _score / 100;
    var _cooldown = initial_cooldown - multiplier * 0.2;
    return _cooldown;
}