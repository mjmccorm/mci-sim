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
	
	//for true randomness randomly generate name and gender
	people[0] = new Person(0, 'Matt','M');
	people[1] = new Person(1, 'Cindy','F');
	
	people[1].triage_status = 'delayed';
	
	//draw them on screen for tagging
	drawPersons(canvas, people);
	
	//put vitals on screen
	listPersons(people);
		
}//end of persons_init


