/*
 * Actor class should have no knowledge of
 * of the Level or HealthBar classes to
 * keep it decoupled
 */
function Actor(config){

	this.controller = config.controller;
	this.x = config.x;
	this.y = config.y;
	this.color = config.color;
	this.id = config.id;
	this.current_vitals = config.vitals;
	this.vitals_history = config.vitals_history;
	this.age = config.age;
	this.gender = config.gender;
	this.abc = config.abc; //airway, breathing, circulation
	this.ample = config.ample; //signs & symptoms, allergies, medications, etc.
	this.weight = config.weight;  //kilograms
	this.injuries = [];
	this.clothes = false;
}

Actor.prototype.injureActor = function(){

		var selectedInjury = getRandomInjury();
		console.log("Selected:" + selectedInjury.name);
		var selectedInjuredPart = getRandomInjuredPart(selectedInjury);
		console.log('selectedInjuredPart:' + selectedInjuredPart.name);
		console.log('selectedInjuredPart:' + selectedInjuredPart.imgSrc);
		//var hue = selectedInjury.color;
		//var hue = getRandomColor();
		//$('#' + selectedPart).css("background-color", hue);
		
		console.log(selectedInjuredPart.name);
		this.injuries.push(selectedInjuredPart);
	
};

Actor.prototype.setID = function(id){

		this.id = id;
};

Actor.prototype.draw = function(){
	var that = this;
	var context = this.controller.view.context;
	var stage = this.controller.view.stage;
	var view = this.controller.view;
	var layer = this.controller.view.layer;
	var model = this.controller.model;

	var box = new Kinetic.Rect({
        x: this.x,
        y: this.y,
        width: 30,
        height: 30,
        fill: this.color,
        stroke: 'black',
        strokeWidth: 4,
        draggable: true,
	   name: this.id,
	   type: 'person'
      });
	  
	layer.add(box);
	stage.add(layer);
	console.log("added " + box.attrs.name);

	box.on('dblclick', function(){
		var healthBar = stage.get('#VitalsDisplay');
		model.updateHealthBar(that.current_vitals);
		healthBar.remove();
		view.drawHealthBar();
		stage.draw();
		
		model.initInjury();
		console.log("injuries:" + that.injuries.length);
		for(var i=0; i < that.injuries.length; i++){
			var selectedInjuredPart = that.injuries[i];
			console.log("injuries[i]:" +injuries[i]);
			console.log(i+ ":" + selectedInjuredPart.name + "," + selectedInjuredPart.imgSrc);
			$('#' + selectedInjuredPart.name).css("background-image", 'url(' + selectedInjuredPart.imgSrc + ')');
		}
		model.initClothes(that);
		
	});

};