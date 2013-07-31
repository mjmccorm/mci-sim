/*-----------------------------------------------------------*/
//Tag - object that stores the triage status of a person
/*-----------------------------------------------------------*/
function Tag(config){

	this.controller = config.controller;
	this.x = config.x;
	this.y = config.y;
	this.id = config.id;
	this.person_id = config.person_id || '';
	
}//end of Tag

Tag.prototype.draw = function(){
	
	var layer = this.controller.view.layer;
	var stage = this.controller.view.stage;
	var model = this.controller.model;
	
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
	
	triage_tag.on('mousedown',function(){
		this.moveToTop();
	});
	
	triage_tag.on('mouseup', function(){
		// Detect shapes under mouse position
		var pos = stage.getMousePosition();
		var collidingShapes = stage.getAllIntersections(pos);
		
		for (var i = 0; i < collidingShapes.length; i++){
			if(collidingShapes[i].attrs.type == "person"){
				console.log(collidingShapes[i].attrs.id);
				console.log("Triage Tag: " + this.attrs.id + " belongs to person: " + collidingShapes[i].attrs.id);
				
				//Check to see if person already has tag
				//var result = $.grep(model.victims, function(e){ return e.id == id; });
				
				//create a new group with this and collidingShapes[i]
				var tagged_person = new Kinetic.Group({
					id: 'g'+this.id,
					x: this.x,
					y: this.y,
					draggable: true,
					type: 'tagged_person'
					});
				this.setDraggable(false);
				collidingShapes[i].setDraggable(false);
				tagged_person.add(this);
				tagged_person.add(collidingShapes[i]);
				layer.add(tagged_person);
				tagged_person.moveToTop();
				
				//reposition the tag off to one side
				//disable to moveToTop listeners for person
				
				break;
			}
		}
	});
	
	/*triage_tag.on('mouseup',function(){
		var pos=stage.getMousePosition();
		var mouseX=parseInt(pos.x);
		var mouseY=parseInt(pos.y);
		console.log("x:" + mouseX + ",y:" + mouseY);
		//this should see if any people underneath and who don't already have tags
	});
	*/
	
}; //end of drawTag