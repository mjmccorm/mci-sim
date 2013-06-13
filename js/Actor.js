/*
 * Actor class should have no knowledge of
 * of the Level or HealthBar classes to
 * keep it decoupled
 */
function Actor(config){

	console.log("Actor defined");
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
	this.sample = config.sample; //signs & symptoms, allergies, medications, etc.
}

Actor.prototype.damage = function(){

	this.health = this.health <= 0 ? 0 : this.health - 1;
	
};

Actor.prototype.setID = function(id){

		this.id = id;
};
Actor.prototype.draw = function(pos){

	console.log("Actor.draw");
	var context = this.controller.view.context;
	var stage = this.controller.view.stage;
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
		name: this.id
      });

	var id = this.id;
	var vitals = this.current_vitals;
	var age = this.age;
	var gender = this.gender;
	var abc = this.abc;
	var sample = this.sample;
	
	box.on('mouseup', function(){
		
		console.log("Updating vitals with "+ vitals.pr + "," + vitals.rr);
		model.updateHealthBar(vitals);
		console.log("ID:" + id);
		console.log("BP:" + vitals.systolic_bp + "/" + vitals.diastolic_bp);
		console.log("RR:" + vitals.rr);
		console.log("PR:" + vitals.pr);
		console.log("SpO2:" + vitals.osat);
		console.log("EtCO2:" + vitals.etco2);
		console.log("Age:" + age);
		console.log("Gender:" + gender);
		console.log("ABC:" + abc);
		console.log("SAMPLE:" + sample);
		
		
	});
	layer.add(box);
	stage.add(layer);

};