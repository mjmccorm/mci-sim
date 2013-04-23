function Person(id, name, age, gender, vitals, x, y){
	this.id = id || 0;
	this.name = name || 'John Doe';
	this.age = age || 0;
	this.current_vitals = vitals || new Vitals('120/80', 80, 14, 'PEARL, Lung Sounds clear');
	this.x = x || 0;
	this.y = y || 0;
	this.triage_tag_id = 0;

	//keep track of vitals.
	//this.vital_history = [];
	//this.vital_history.push({ time:some time,info: vitals});
		
}//end of Person

function Vitals(bp, pr, rr, other){

	this.bp = bp;
	this.pr = pr;
	this.rr = rr;
	this.other = other;
}//end of Vitals


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

function listPersons(people){

	var plist = $('#persons_list');

	for(var i=0; i<people.length; i++){
		console.log(i);
		console.log(people[i].name);
		console.log(people[i].current_vitals.bp);
		plist.append( "<div class='person_container'>" +
				'<div id="p-' + i + '">'+ people[i].name +
				'</div>' +
				'<div>' + people[i].current_vitals.bp + 
				'</div>' +
				'</div>'
				);
	
	}




}//end of listPersons

function persons_init(people){

	people[0] = new Person(0, 'Matt', '31', 'M', new Vitals('80/60', 140, 28, 'PEARL, Lung Sounds clear bilateral'), 0,0);
	people[1] = new Person(1, 'Cindy', '29', 'M', new Vitals('120/80', 88, 16, 'PEARL, Lung Sounds clear bilateral'), 0,0);
	//people[0] = new Person(0, 'Matt', '31', 'M');

	//displayPerson(people[0]);
	
}//end of persons_init

	