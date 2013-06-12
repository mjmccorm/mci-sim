/*-----------------------------------------------------------*/
//Person
//uses getRandomInt function defined in events.js
/*-----------------------------------------------------------*/
function Person(id, name, gender, age, vitals, x, y, status){
	this.id = id || 0;
	this.name = name || 'John Doe';
	this.gender = gender || 'M';
	this.age = age || getRandomInt(1,100);
	//this.current_vitals = vitals || new Vitals('120/80', 80, 14, 'PEARL, Lung Sounds clear');
	this.current_vitals = vitals || new BodyState('normal', this.age);
	this.x = x || getRandomInt(20, 100);
	this.y = y || getRandomInt(20, 100);
	this.triage_tag_id = 0;
	this.triage_status = status || 'Not assigned';

	//keep track of vitals.
	//this.vital_history = [];
	//this.vital_history.push({ time:some time,info: vitals});
		
}//end of Person

/*-----------------------------------------------------------*/
// Determine if a point is inside the shape's bounds
/*-----------------------------------------------------------*/
Person.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
}

/*-----------------------------------------------------------*/
// PersonState - object
/*-----------------------------------------------------------*/
function PersonState(canvas) {
  // **** First some setup! ****

  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // **** Keep track of state! ****
  
  this.valid = false; // when set to false, the canvas will redraw everything
  this.persons = [];  // the collection of things to be drawn
  
  this.dragging = false; // Keep track of when we are dragging
  // the current selected object. In the future we could turn this into an array for multiple selection
  this.selection = null;
  this.dragoffx = 0; // See mousedown and mousemove events for explanation
  this.dragoffy = 0;
  
  // **** Then events! ****
  
  // This is an example of a closure!
  // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
  // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
  // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
  // This is our reference!
  var myState = this;
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
    var mouse = myState.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;
    var persons = myState.persons;
    var l = persons.length;
    for (var i = l-1; i >= 0; i--) {
      if (persons[i].contains(mx, my)) {
        var mySel = persons[i];
        // Keep track of where in the object we clicked
        // so we can move it smoothly (see mousemove)
        myState.dragoffx = mx - mySel.x;
        myState.dragoffy = my - mySel.y;
        myState.dragging = true;
        myState.selection = mySel;
        myState.valid = false;
        return;
      }
    }
    // havent returned means we have failed to select anything.
    // If there was an object selected, we deselect it
    if (myState.selection) {
      myState.selection = null;
      myState.valid = false; // Need to clear the old selection border
    }
  }, true);
  canvas.addEventListener('mousemove', function(e) {
    if (myState.dragging){
      var mouse = myState.getMouse(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      myState.selection.x = mouse.x - myState.dragoffx;
      myState.selection.y = mouse.y - myState.dragoffy;   
      myState.valid = false; // Something's dragging so we must redraw
    }
  }, true);
  canvas.addEventListener('mouseup', function(e) {
    myState.dragging = false;
	console.log('person canvas clicked');
  }, true);
 
  // **** Options! ****
  this.selectionColor = '#CC0000';
  this.selectionWidth = 2;  
  this.interval = 30;
  //setInterval(function() { myState.draw(); }, myState.interval);
}

/*-----------------------------------------------------------*/
/*-----------------------------------------------------------*/
PersonState.prototype.addPerson = function(person) {
  this.persons.push(person);
  this.valid = false;
}

/*-----------------------------------------------------------*/
// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
/*-----------------------------------------------------------*/
PersonState.prototype.draw = function() {
  
}



/*-----------------------------------------------------------*/
//Vitals - object that stores vital signs on a person
/*-----------------------------------------------------------*/
function Vitals(bp, pr, rr, other){

	this.bp = bp;
	this.pr = pr;
	this.rr = rr;
	this.other = other;
}//end of Vitals

/*-----------------------------------------------------------*/
//printVitals - returns a string with summary of current vitals
/*-----------------------------------------------------------*/
function printVitals(v){
	var vital_string =  "BP:" + v.bp + ", " +
						"PR:" + v.pr + ", " +
						"RR:" + v.rr;
	return vital_string;
}//end of printVitals

/*-----------------------------------------------------------*/
//drawPerson - prints an individual person on canvas for tagging
/*-----------------------------------------------------------*/
function drawPerson(c, p){

	var ctx = c.getContext('2d');
    var radius = 10;
	
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
	
}

/*-----------------------------------------------------------*/
//displayPerson - updates the vitals on screen
/*-----------------------------------------------------------*/
function displayPerson(p){

	var v = p.current_vitals;
	
	//create elements on screen
	//opacity
	//start point this.x, this.y

	//create info bubble
	//or update vitals section divs

	$('#selected_name').text(p.name);
	$('#selected_bp').text(v.bp);
	$('#selected_rr').text(v.rr);
	$('#selected_pr').text(v.pr);
	$('#selected_other').text(v.other);
	
}//end of displayPerson

/*-----------------------------------------------------------*/
// drawPersons - puts all people on canvas for tagging
/*-----------------------------------------------------------*/
function drawPersons(canvas, people){
	for(var i=0; i<people.length; i++){
		drawPerson(canvas, people[i]);
	}
}//end of drawPersons

/*-----------------------------------------------------------*/
// listPersons - puts all people's vitals on screen
/*-----------------------------------------------------------*/
function listPersons(people){

	var plist = $('#persons_list');
	plist.empty();

	for(var i=0; i<people.length; i++){
		console.log(i);
		console.log(people[i].name);
		console.log(people[i].current_vitals.bp);
		plist.append(
				"<table>" +
				"<tr>" +
				"<td class='vitals_label'>Name:</td>" +
				"<td id='p-" + i + "'>" + people[i].name + "</td>" +
				"</tr>" +
				"<tr>" +
				"<td class='vitals_label'>Triage Status:</td>" +
				"<td>" + people[i].triage_status +"</td>" +
				"</tr>" +
				"<tr><td class='vitals_label'>Vitals:</td><td>" + printVitals(people[i].current_vitals) + "</td></tr>" +
				"</table>");
	}
}//end of listPersons

/*-----------------------------------------------------------*/
// persons_init - reads in scenario and starts 
/*-----------------------------------------------------------*/
function persons_init(canvas, people){

	/* You can define People explicitly */
	//people[0] = new Person(0, 'Matt', 'M', '31', new Vitals('80/60', 140, 28, 'PEARL, Lung Sounds clear bilateral'), 20,200);
	//people[1] = new Person(1, 'Cindy','M', '29', new Vitals('120/80', 88, 16, 'PEARL, Lung Sounds clear bilateral'), 200, 400);
	/* You can let People be defined randomly */
	
	var s = new PersonState(canvas);
	//for true randomness randomly generate name and gender
	people[0] = new Person(0, 'Matt','M');
	s.addPerson(people[0]);
	
	people[1] = new Person(1, 'Cindy','F');
	s.addPerson(people[1]);
	
	people[1].triage_status = 'delayed';
	
	//draw them on screen for tagging
	drawPersons(canvas, people);	
	
	//put vitals on screen
	listPersons(people);
		
}//end of persons_init


