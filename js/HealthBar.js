/*
 * HealthBar class should have no knowledge
 * of the Actor class to
 * keep it decoupled
 * HealthBar needs a set of Vitals to display
 */
function HealthBar(config){
    console.log("HealthBar called");
	console.log(config);
    this.controller = config.controller;
    this.x = config.x;
    this.y = config.y;
	this.vitalsDisplay = config.vitalsDisplay;
}

HealthBar.prototype.setVitalsDisplay = function(vitals){
	console.log("setVitalsDisplay");
    this.vitalsDisplay = vitals;
};

HealthBar.prototype.draw = function(){
    console.log("Healthbar.draw called");
	var stage = this.controller.view.stage;
	var layer = this.controller.view.layer;

	var group = new Kinetic.Group({
		draggable: true,
		name: 'VitalsDisplay'
		});
		
	var bpText = new Kinetic.Text({
        x: 500,
        y: 15,
        text: this.vitalsDisplay.systolic_bp + '/' + this.vitalsDisplay.diastolic_bp,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var bpLabelText = new Kinetic.Text({
        x: 500,
        y: 45,
        text: 'BP (mm Hg)',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 	
	var prText = new Kinetic.Text({
        x: 500,
        y: 85,
        text: this.vitalsDisplay.pr,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var prLabelText = new Kinetic.Text({
        x: 500,
        y: 115,
        text: 'HR (bpm)',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var osatText = new Kinetic.Text({
        x: 500,
        y: 155,
        text: this.vitalsDisplay.osat + '%',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var osatLabelText = new Kinetic.Text({
        x: 500,
        y: 185,
        text: 'Sp02',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var etco2Text = new Kinetic.Text({
        x: 600,
        y: 155,
        text: this.vitalsDisplay.etco2 + '',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
     });
	 
	 var etco2LabelText = new Kinetic.Text({
        x: 600,
        y: 185,
        text: 'EtCO2',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'green'
     });	 
	 
	 var monitorBackground = new Kinetic.Rect({
		x: 490,
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
	 stage.draw();
	 
};