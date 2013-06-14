/*
 * Game view
 * 
 * The view has access to the canvas context
 * and is responsible for the drawing logic
 */
function View(controller){
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
	
	/*
	group.on('mouseup', function(){
		this.remove();
		});
	*/	
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

View.prototype.drawHealthBar = function(){
	var controller = this.controller;
    var model = controller.model;
	var healthBar = model.healthBar;
	var layer = this.layer;
	
	//model.healthBar.draw();
	var group = new Kinetic.Group({
		draggable: true,
		name: 'VitalsDisplay'
	});
		
	var bpText = new Kinetic.Text({
        x: 10,
        y: 15,
        text: healthBar.vitalsDisplay.systolic_bp + '/' + healthBar.vitalsDisplay.diastolic_bp,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var bpLabelText = new Kinetic.Text({
        x: 10,
        y: 45,
        text: 'BP (mm Hg)',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 	
	var prText = new Kinetic.Text({
        x: 10,
        y: 85,
        text: healthBar.vitalsDisplay.pr,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var prLabelText = new Kinetic.Text({
        x: 10,
        y: 115,
        text: 'HR (bpm)',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var osatText = new Kinetic.Text({
        x: 10,
        y: 155,
        text: healthBar.vitalsDisplay.osat + '%',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var osatLabelText = new Kinetic.Text({
        x: 10,
        y: 185,
        text: 'Sp02',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var etco2Text = new Kinetic.Text({
        x: 10,
        y: 155,
        text: healthBar.vitalsDisplay.etco2 + '',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var etco2LabelText = new Kinetic.Text({
        x: 10,
        y: 185,
        text: 'EtCO2',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });	 
	 
	 var monitorBackground = new Kinetic.Rect({
		x: 0,
		y: 10,
		fill: '#000',
		width: 200,
		height: 200,
		shadowColor: '#000',
		shadowBlur: 10,
		shadowOffset: [10,10],
		shadowOpacity: 0.2,
		cornerRadius: 10
		});
	 
	 group.add(monitorBackground);
	 group.add(bpText);
	 group.add(bpLabelText);
	 group.add(prText);
	 group.add(prLabelText);
	 group.add(osatText);
	 group.add(osatLabelText);
	 group.add(etco2Text);
	 group.add(etco2LabelText);
	 layer.add(group);
	 
};//end of drawHealthBar

View.prototype.drawVictims = function() {
	console.log("drawVictims");
    var controller = this.controller;
	var view = controller.view;
    var model = controller.model;
	var stage = this.stage;
	for (var n = 0; n < model.victims.length; n++) {
	    var victim = model.victims[n];
	    victim.draw();
	}
};

View.prototype.drawBackground = function(){
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
	//stage.draw();
		
};//end of drawBackground

View.prototype.drawStage = function(){

    var controller = this.controller;
    var model = controller.model;
	var stage = this.stage;
	
	if (controller.state == controller.states.PLAYING || controller.state == controller.states.GAMEOVER || controller.state == controller.states.WON) {
		//mjmccorm moved these so not dependant on state
		this.drawBackground();
		this.drawVictims();
		this.drawHealthBar();
		stage.draw();
		
	} else if (controller.state == controller.states.READY) {
		//display start message
		this.drawScreen();
	}

};