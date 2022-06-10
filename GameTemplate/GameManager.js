/*
updatelag
The time to update next frames
call
function to call after game over
gameobject 
All Game Objects in Game which will be updated frequently
gameover
GameOver boolean to identify gameover or not
pause
Pause variable to know game is paused or not
time_elpased
Time_Elapsed to calucated overall runtime of a gameinistance
timer
Asynchrous explicit wait
run
Main run loop of game
CreateGameOject
create a agmeoject and add
AddGameObject
Add given gameoject to instance
RemoveGameObject
Removes a gameobject with unique id
GameOver
function to call to trigger gameover
*/

class GameInstance {
    constructor(updatelag, call) {
        this.updatelag = updatelag;
        this.gameobjects = [];
        this.gameover = false;
        this.pause = false;
        this.time_elapsed = 0;
        this.running = false;
        this.call = call;
    }
    async timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
    async run() {
        this.running = true;
        for (var i = 0; i < this.gameobjects.length; i++)
            this.gameobjects[i].init();
        while (!this.gameover) {
            await this.timer(this.updatelag);
            if (this.pause)
                continue;
            this.time_elapsed += 0.1;
            for (var i = 0; i < this.gameobjects.length; i++)
                this.gameobjects[i].update();
        }
        this.running = false;
    }
    CreateGameObject(_classobject) {
        var _gameobject = new GameObject(this, _classobject);
        if (this.running)
            _gameobject.init();
        this.gameobjects.push(_gameobject);
    }
    AddGameObject(_gameobject) {
        if (this.running)
            _gameobject.init();
        this.gameobjects.push(_gameobject);
        _gameobject.gameinstance = this;
    }
    RemoveGameobject(unique_id) {
        for (var i = 0; i < this.gameobjects.length; i++)
            if (this.gameobjects[i].unique_id == unique_id) {
                this.gameobjects.splice(i, 1);
            }
    }
    GameOver() {
        this.gameover = true;
        this.call();
    }
}


/*
gameinstance
GameInstance of the particular context
_classobject
object where to be init and update to be called
unique_id
id different to different gameobjects
_init
initialistaions of particular gameobject
_update
update of particular gameobject
*/

class GameObject {
    constructor(gameinstance, _classobject) {
        this.gameinstance = gameinstance;
        this._classobject = _classobject;
        this.unique_id = _classobject.unique_id;
        _classobject.gameobject = this;
    }
    init() {
        this._classobject.init(this._classobject);
    }
    update() {
        this._classobject.update(this._classobject);
    }
}


/*
bgaudiourl
url for the background audio
bgaudio
background audio player
Change_bgaudio
change background audio 
CreateSuddenAudioInstance
create a new audio for specific time duration
*/

class AudioManager {
    constructor(bgaudiourl) {
        this.bgaudio = null;
        if (bgaudiourl)
            this.bgaudio = this.Change_bgaudio(bgaudiourl);
    }
    Change_bgaudio(url) {
        if (this.bgaudio && this.bgaudio.pause())
            this.bgaudio.pause();
        this.bgaudio = null;
        var _audio = new Audio();
        _audio.src = url;
        _audio.loop = true;
        _audio.volume = 0.8;
        _audio.play();
        this.bgaudio = _audio;
    }
    CreateSuddenAudioInstance(url, duration) {
        var _audio = new Audio();
        _audio.src = url;
        _audio.loop = false;
        _audio.play();
        setTimeout((_audio) => {
            if (_audio != null) {
                _audio.pause();
            }
            _audio = null;
        }, duration, _audio);
    }
}