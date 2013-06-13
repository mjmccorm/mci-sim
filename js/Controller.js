/*
 * Game controller
 * 
 * The controller is responsible for instantiating
 * the view and the model, initializing the game,
 * controlling the game state, and managing keyboard events
 */
function Controller(canvasId){
    console.log("Controller Called");
    this.states = {
        INIT: "INIT",
        READY: "READY",
        PLAYING: "PLAYING",
        WON: "WON",
        GAMEOVER: "GAMEOVER"
    };
	
	this.keys = {
		ENTER: 13,
		UP: 38,
		LEFT: 37,
		RIGHT: 39,
		A: 65 
	};
	
	this.colors = ['#ffcc00', '#ff0000', '#000', '#fff', '#dcdcdc'];

//	this.anim = new Animation(canvasId);
	this.stage = new Kinetic.Stage({
		container: 'container',
		width: 900,
		height: 600
	});
	this.layer = new Kinetic.Layer();
	this.startLayer = new Kinetic.Layer();
 	this.state = this.states.INIT;
    this.model = new Model(this);
    this.view = new View(this);
	this.addKeyboardListeners();
	this.initGame();

};

Controller.prototype.loadImages = function(){
	
	
};

Controller.prototype.addKeyboardListeners = function(){
    var that = this;
    document.onkeydown = function(evt){
        that.handleKeydown(evt);
    };
    document.onkeyup = function(evt){
        that.handleKeyup(evt);
    };
};

Controller.prototype.handleKeyup = function(evt){
    keycode = ((evt.which) || (evt.keyCode));
    
    switch (keycode) {
        
    }
};

Controller.prototype.handleKeydown = function(evt){
	keycode = ((evt.which) || (evt.keyCode));
	console.log(keycode);
	
    switch (keycode) {
    	case this.keys.ENTER: // enter
			console.log("Enter key pressed");
            if (this.state == this.states.READY) {
                this.state = this.states.PLAYING;
				this.startLayer.hide();
				this.view.drawStage();
            }
            else if (this.state == this.states.GAMEOVER || this.state == this.states.WON) {
                this.resetGame();
                this.state = this.states.PLAYING;
            }
            break;
		
		case this.keys.A:  //A
			var tag_id = this.model.addTag();
			console.log("adding tag:" + tag_id);
			this.model.tags[tag_id].draw();			
		    this.stage.draw();
			break;
    }
};

Controller.prototype.initGame = function(){
	console.log("InitGame called");
	var model = this.model;
	var view = this.view;
	model.initVictims();
	model.initHealthBar();
    
    // game is now ready to play
    this.state = this.states.READY;
    view.drawStage();
    //view.drawScreen(this.images.readyScreen);

};

Controller.prototype.resetGame = function(){
	var model = this.model;
   	model.healthBar = null;
	model.victims = [];
	model.initVictims();
	model.initHealthBar();
};