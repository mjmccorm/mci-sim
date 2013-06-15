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
}

Actor.prototype.damage = function(){

	this.health = this.health <= 0 ? 0 : this.health - 1;
	
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
	});

};