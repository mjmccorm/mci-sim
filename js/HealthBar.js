/*
 * HealthBar class should have no knowledge
 * of the Actor class to
 * keep it decoupled
 * HealthBar needs a set of Vitals to display
 */
function HealthBar(config){
    this.controller = config.controller;
    this.x = config.x;
    this.y = config.y;
	this.vitalsDisplay = config.vitalsDisplay;
}

HealthBar.prototype.setVitalsDisplay = function(vitals){
    this.vitalsDisplay = vitals;
};

