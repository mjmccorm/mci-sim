/*
 * Game view
 * 
 * The view has access to the canvas context
 * and is responsible for the drawing logic
 */
function View(controller){
	console.log("View called");
    this.controller = controller;
    this.stage = controller.stage;
    this.layer = controller.layer;
	this.startLayer = controller.startLayer;

}

View.prototype.drawScreen = function(screenImg){
		
	var group = new Kinetic.Group({
		name: 'startGroup',
		draggable: false
	});
	
	group.on('mouseup', function(){
		console.log(this.getName());
		this.remove();
		});
		
	var startText = new Kinetic.Text({
        x: 250,
        y: 200,
        text: 'Press Enter to Start',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var monitorBackground = new Kinetic.Rect({
		x: 20,
		y: 20,
		fill: '#000',
		width: 700,
		height: 400,
		shadowColor: '#000',
		shadowBlur: 10,
		shadowOffset: [10,10],
		shadowOpacity: 0.2,
		cornerRadius: 10
		});
		
	group.add(monitorBackground);
	group.add(startText);
	this.startLayer.add(group);
	this.stage.add(this.startLayer);
	this.stage.draw();
		
};

/*
View.prototype.drawTags = function() {

	var controller = this.controller;
	var model = controller.model;
	
	for(var n = 0; n < model.tags.length; n++){
		var tag = model.tags[n];
		tag.draw();
	}
	
}; //end of drawTags
*/

View.prototype.drawVictims = function() {
    console.log('View.drawVictims called');
    var controller = this.controller;
    var model = controller.model;
	for (var n = 0; n < model.victims.length; n++) {
	    var victim = model.victims[n];
		var offsetPos = {
			x: victim.x,
			y: victim.y
		};
	    victim.draw(offsetPos);
	}
};

View.prototype.drawBackground = function(){
	console.log("View.drawBackground");
	
	var layer = this.layer;
	var stage = this.stage;
	
	var greenTarp = new Kinetic.Rect({
	x: 600,
	y: 20,
	width: 250,
	height: 100,
	fill: 'green',
	stroke: 'black'
	});
	
	var yellowTarp = new Kinetic.Rect({
	x: 600,
	y: 130,
	width: 250,
	height: 100,
	fill: 'yellow',
	stroke: 'black'
	});
	
	var redTarp = new Kinetic.Rect({
	x: 600,
	y: 240,
	width: 250,
	height: 100,
	fill: 'red',
	stroke: 'black'
	});
	
	var blackTarp = new Kinetic.Rect({
	x: 600,
	y: 350,
	width: 250,
	height: 100,
	fill: 'black',
	stroke: 'black'
	});
	
	layer.add(blackTarp);
	layer.add(redTarp);
	layer.add(yellowTarp);
	layer.add(greenTarp);
	stage.draw();
		
};//end of drawBackground

View.prototype.drawStage = function(){
    console.log("View.drawStage called");
    var controller = this.controller;
    var model = controller.model;

	if (controller.state == controller.states.PLAYING || controller.state == controller.states.GAMEOVER || controller.state == controller.states.WON) {
		//mjmccorm moved these so not dependant on state
		
		this.drawBackground();
		this.drawVictims();
		//this.drawTags();
		model.healthBar.draw();
		
		
	} else if (controller.state == controller.states.READY) {
		//display start message
		this.drawScreen();
	}

};