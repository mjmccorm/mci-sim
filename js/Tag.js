/*-----------------------------------------------------------*/
//Tag - object that stores vital signs on a person
/*-----------------------------------------------------------*/
function Tag(config){

	this.controller = config.controller;
	this.x = config.x;
	this.y = config.y;
	this.id = config.id;
	this.person_id = config.person_id || '';
	
}//end of Vitals

Tag.prototype.draw = function(){
	console.log('tag ' + this.id);
	var layer = this.controller.view.layer;
	var stage = this.controller.view.stage;
	
	var triage_tag = new Kinetic.Group({
	id: this.id,
	x: this.x,
	y: this.y,
	draggable: true,
	type: 'tag'
	});

	var box = new Kinetic.Rect({
	x: 10,
	y: 10,
	width: 100,
	height: 50,
	fill: 'white',
	stroke: 'black',
	draggable: false
	});

	var box1 = new Kinetic.Rect({
	x: 10,
	y: 60,
	width: 100,
	height: 50,
	fill: 'black',
	stroke: 'black',
	draggable: false
	});

	var box2 = new Kinetic.Rect({
	x: 10,
	y: 110,
	width: 100,
	height: 50,
	fill: 'red',
	stroke: 'black',
	draggable: false
	});

	var box3 = new Kinetic.Rect({
	x: 10,
	y: 160,
	width: 100,
	height: 50,
	fill: 'yellow',
	stroke: 'black',
	draggable: false
	});

	var box4 = new Kinetic.Rect({
	x: 10,
	y: 210,
	width: 100,
	height: 50,
	fill: 'green',
	stroke: 'black',
	draggable: false
	});

	triage_tag.add(box);
	triage_tag.add(box1);
	triage_tag.add(box2);
	triage_tag.add(box3);
	triage_tag.add(box4);
	triage_tag.setScale(0.3);
	layer.add(triage_tag);
	triage_tag.moveToTop();
	
}; //end of drawTag