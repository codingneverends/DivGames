# GameTemplate

### GameManager.js

    Main js file which controls game initialisations and updates.

    GameInstance class controls a single game instance.

    AudioManager class controls background audio and sigle audio instances.

    Only one GameInstance and AudioManager is recommended while running the game.

    GameObjects will control all gameobjects.

    GameObject will have .init() and .update() methods.

### GameInstance

    GameInstance(updatelag)
        updatelag is time for next update. 

    GameInstance.timer(ms)
        async function to explicitly wait for ms milliseconds

    GameInstance.run()
        Constanat running loop to update/initialize gameobjects

    GameInstance.CreateGameObject(_classobject)
        A gameoject is created added with _classobject(which have .init() and .update() methods) 

    GameInstance.AddGameObject(_gameobject)
        To add gameobject directly

    GameInstance.RemoveGameObject(unique_id)
        Removes specific gameobject with unique_id.

    GameInstance.GameOver()
        Function to invoke inorder to stop game loop

### AudioManager

    AudioManager(bgaudiourl)
        bgaudiourl is initial url to first background music to be placed

    AudioManager.Change_bgaudio(url)
        url is the new url to change/re-start backgroung music
    
    AudioManager.CreateSuddenAudioInstance(url,duartion)
        url and duration of short audios

### GameObject

    GameObject(gameinstance,_classobject)
        gameinstance where the gameobject is associated with
        _classobject is ec=xtented property of gameobject
        _classobject should have .init and .update methods
    
    GameObject.init()
        First function called by GameInstance whenever object is added to it.
    
    GameObject.update()
        Function called by GameInstace continously within specific intervel( - updatelag).

### index.html,index.js,style.css

    Template Files
