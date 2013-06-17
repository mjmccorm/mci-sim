/*
 * Game model
 * 
 * The model is responsible for initializing and
 * updating the hero, level, bad guys, and health bar
 */
function Model(controller){
    this.controller = controller;
    this.healthBar = null;
    this.victims = []; // array of victims
    this.tags = []; //array of triage tags
    this.timers = []; //array of timers
}

Model.prototype.initHealthBar = function(){
    this.healthBar = new HealthBar({
        controller: this.controller,
        x: 10,
        y: 300,
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

Model.prototype.updateHealthBar = function(v){

	this.healthBar.setVitalsDisplay(v);

}; //end of updateHealthBar

Model.prototype.updateActor = function(actor){
	console.log(actor);
	console.log(model);
	var model = this;
	//assign a random color to mimic patient needs
	var colors = model.controller.colors;
	var min = 0;
	var max = colors.length-1;
	var i = Math.floor(Math.random() * (max - min + 1)) + min;
	actor.color = colors[i];
	var a = model.controller.view.stage.get('.'+ actor.id);
	
	//need to save location before removing and redrawing
	actor.x += a.getX();
	actor.y += a.getY();
	//remove actor listener before removing actor
	//otherwise browser crashes when trying to click
	//a.off();
	a.remove();
	actor.draw();
	//full reference needed because setInterval doesn't understand 'this'
	model.controller.view.stage.draw();
	//if no treatment || random act of god
	//   deteriorate patient
	//else
	//   maintain patient vitals || return to normal
}; //end of updateActor

Model.prototype.initTags = function(){

	var maxVictims = this.victims.length + 5;
	for(var i=0; i<maxVictims; i++){
		this.addTag();
	}
	for(var i=0; i<this.tags.length; i++){
		this.tags[i].draw();
	}
} //end of initTags

Model.prototype.addTag = function(){
	nextTagId = this.tags.length;
	this.tags.push(new Tag({
		id: nextTagId,
		controller: this.controller,
		x: 10 + this.tags.length*5,
		y: 10 + this.tags.length*5
		}));
	return nextTagId;
};//end of addTag

Model.prototype.initVictims = function(){
	//need to randomly create victims with
	//various trauma injuries, ages, and vitals
	var victimStartConfig = [{
		x: 100,
		y: 100,
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
		sample: 'deformity on head, no allergies, no med history',
		weight: 65
	},{
		x: 250,
		y: 250,
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
		sample: 'open femur fracture, unknown allergies',
		weight: 80
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

		//random generate # of injuries
		//need to figure out how to not duplicate injuries.
		person.injureActor();
		person.injureActor();
		
		//Each victim should get a timer
		//http://dev.w3.org/html5/spec-LC/timers.html
		var model = this;
		var min = 2000;
		var max = 10000;
		var time = Math.floor(Math.random() * (max - min + 1)) + min;
		//var timer = window.setInterval(model.updateActor, time, person, model);
		//this.timers.push(timer);
		this.victims.push(person);

		

	}
};

Model.prototype.updateActorX = function(actor){

	//getShape
	//set Actor x = shape.attrs.x

}; //end of updateActorX

Model.prototype.updateActorY = function(actor){

};//end of updateActorY

Model.prototype.initInjury = function(){

	$('#head').css("background-image", 'url(images/builder/healthy-head.png)');
	$('#armR').css("background-image", 'url(images/builder/right-arm-healthy.png)');
	$('#armL').css("background-image", 'url(images/builder/left-arm-healthy.png)');
	$('#torso').css("background-image",'url(images/builder/torso-healthy.png)');
	$('#pelvis').css("background-image",'url(images/builder/pants.png)');
	$('#legR').css("background-image", 'url(images/builder/right-leg-healthy.png)');
	$('#legL').css("background-image", 'url(images/builder/left-leg-healthy.png)');
	
} //end of initInjury

Model.prototype.initClothes = function(actor){

	if(actor.clothes == true){
		$('#armRClothes').css("background-image", 'url(images/builder/right-arm-clothes.png)');
		$('#armLClothes').css("background-image", 'url(images/builder/left-arm-clothes.png)');
		$('#torsoClothes').css("background-image",'url(images/builder/torso-clothes.png)');
	
		$('#armRClothes').click(function(){
			$('#armRClothes').css("background-image", 'none');
			actor.clothes = false;
		});
	
		$('#armLClothes').click(function(){
			$('#armLClothes').css("background-image", 'none');
			actor.clothes = false;
		});
	
		$('#torsoClothes').click(function(){
			$('#torsoClothes').css("background-image", 'none');
			actor.clothes = false;
		});
	}else{
		//do nothing
	}
	
}

Model.prototype.updateInjury = function() {


} //end of updateInjury



