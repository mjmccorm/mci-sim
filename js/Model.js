/*
 * Game model
 * 
 * The model is responsible for initializing and
 * updating the hero, level, bad guys, and health bar
 */
function Model(controller){
    console.log("Model called");
    this.controller = controller;
    this.healthBar = null;
    this.victims = []; // array of victims
    this.tags = []; //array of triage tags
    this.timers = []; //array of timers
}

Model.prototype.initHealthBar = function(){
    console.log("initHealthBar called");
    this.healthBar = new HealthBar({
        controller: this.controller,
        x: 10,
        y: 10,
		vitalsDisplay: new Vitals({
			systolic_bp: 0,
			diastolic_bp: 0,
			pr: 0,
			rr: 0,
			osat: 0,
			etco2: 0,
			other: ''
			})
    });
};

/*
Model.prototype.updateStage() = function() {

    	var controller = this.controller;
    	var canvas = controller.view.canvas;
    	if (controller.state == controller.states.PLAYING) {

	
		//this.healthBar.setHealth();
		//this.updateActor(this.selectedVictim);

	}

}; //end of updateStage
*/

Model.prototype.updateActor = function(actor, model){

	console.log("updateActor:");
	var colors = model.controller.colors;
	var min = 0;
	var max = colors.length-1;
	var i = Math.floor(Math.random() * (max - min + 1)) + min;
	actor.color = colors[i];
	var a = model.controller.view.stage.get('.'+ actor.id);
	
	//need to save location before removing and redrawing
	//actor.x = a.x;
	//actor.y = a.y;
	a.remove();
	actor.draw();
	model.controller.view.stage.draw();
	//actor.draw();
	//if no treatment || random act of god
	//   deteriorate patient
	//else
	//   maintain patient vitals || return to normal

}; //end of updateActor



Model.prototype.updateHealthBar = function(v){
	console.log('updateHealthBar');
	var controller = this.controller;
	this.healthBar.setVitalsDisplay(v);
	console.log("New Vitals: " + v.pr + "," +v.rr);
	//selecting name in Kinetic.js needs a period
	var healthBar = controller.view.stage.get('.VitalsDisplay');
	healthBar.remove();
	this.healthBar.draw();
	controller.view.stage.draw();
	
	//do something to make the layer/group refresh or rebuild it.
	
}; //end of updateHealthBar

Model.prototype.addTag = function(){

	nextTagId = this.tags.length;
	console.log("creating tag " + nextTagId);
	this.tags.push(new Tag({
		id: nextTagId,
		controller: this.controller,
		x: 10 + this.tags.length*5,
		y: 10 + this.tags.length*5
		}));

	return nextTagId;
};//end of addTag

Model.prototype.initVictims = function(){
	console.log("initVictims called");

	//need to randomly create victims with
	//various trauma injuries, ages, and vitals
	var victimStartConfig = [{
		x: 50,
		y: 50,
		color: '#ffcc00',
		vitals: new Vitals({
			systolic_bp: 110,
			diastolic_bp: 70,
			pr: 89,
			rr: 20,
			osat: 98,
			etco2: 40,
			other: ''
		}),
		age: 25,
		id: 'p0',
		gender: 'Male',
		abc: 'air way open, unequal chest rise',
		sample: 'deformity on head, no allergies, no med history'
	},{
		x: 150,
		y: 150,
		color: '#dcdcdc',
		vitals: new Vitals({
			systolic_bp: 90,
			diastolic_bp: 50,
			pr: 140,
			rr: 32,
			osat: 91,
			etco2: 32,
			other: ''
		}),
		age: 45,
		id: 'p1',
		gender: 'Female',
		abc: 'not breathing, approximately 2L blood loss',
		sample: 'open femur fracture, unknown allergies'
	}];

	for (var n = 0; n < victimStartConfig.length; n++) {
	
		//should randomly assign age and gender.
		//should pass age
		//need some sort of trauma event generator
		
		var person = new Actor({
			  controller: this.controller,
			  x: victimStartConfig[n].x,
			  y: victimStartConfig[n].y,
			  color: victimStartConfig[n].color,
			  id: victimStartConfig[n].id,
			  vitals: victimStartConfig[n].vitals, 
			  vitals_history: [], //no history yet
			  age: victimStartConfig[n].age, 
			  gender: victimStartConfig[n].gender,
			  abc: victimStartConfig[n].abc,
			  sample: victimStartConfig[n].sample
		})


		//Each victim should get a timer
		//http://dev.w3.org/html5/spec-LC/timers.html
		
		var model = this;
		var min = 1000;
		var max = 10000;
		var time = Math.floor(Math.random() * (max - min + 1)) + min;
		var timer = window.setInterval(this.updateActor, time, person, model);
		this.timers.push(timer);


     		this.victims.push(person);

		

	}
};




