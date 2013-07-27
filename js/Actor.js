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
	this.selected = false;
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
		id: this.id,
	   //name: this.id,
	   name: 'person',
	   type: 'person'
      });
	  
	layer.add(box);
	stage.add(layer);
	console.log("added " + box.attrs.name);

	box.on('mousedown', function(){
		this.moveToTop();
	});
	box.on('mouseup',function(){
		var pos=stage.getMousePosition();
		var mouseX=parseInt(pos.x);
		var mouseY=parseInt(pos.y);
		console.log("x:" + mouseX + ",y:" + mouseY);
		
	});
	box.on('mouseover', function(){
		this.setFill('red');
		layer.draw();
	});
	
	box.on('mouseout', function(){
		if(that.selected == false){
			this.setFill(that.color);
			layer.draw();
		}
		
	});
	box.on('dblclick', function(){
		var healthBar = stage.get('#VitalsDisplay');
		model.updateHealthBar(that.current_vitals);
		healthBar.remove();
		view.drawHealthBar();
		view.drawSelected(that);
		this.setFill('red');
		stage.draw();
		model.initInjury();
		console.log("injuries:" + that.injuries.length);
		var personDataText = "ABC:" + that.abc + " ";
		for(var i=0; i < that.injuries.length; i++){
			var selectedInjuredPart = that.injuries[i];
			console.log("injuries[i]:" +injuries[i]);
			console.log(i+ ":" + selectedInjuredPart.name + "," + selectedInjuredPart.imgSrc);
			personDataText += selectedInjuredPart.injury + " " + selectedInjuredPart.name + ',';
			$('#' + selectedInjuredPart.name).css("background-image", 'url(' + selectedInjuredPart.imgSrc + ')');
		}
		model.initClothes(that);
		
		$('#personData').text(personDataText);
		
	});

};