/*-----------------------------------------------------------*/
// Event - object 
/*-----------------------------------------------------------*/
function Event(person){
	
	person.vitals = new BodyState('death', person.age);
	
}//end of Event

//*-----------------------------------------------------------*/
//Body State: describes the condition of the body
//Params:  body_state_type: 
//	Normal,
//	Compensated shock,
//	Decompensated shock,
//	Irreversible shock
//	Death
//Returns: Vitals
/*-----------------------------------------------------------*/
function BodyState(body_state_type, a){
	var age = parseInt(a);
	console.log("BodyState: " + body_state_type + ", age: " + age);
	
	var systolic_bp;
	var diastolic_bp;
	var pr; //pulse rate
	var rr; //respiration rate
	var other; //any other vital information
	//source: Brady Emergency Care, 11th Edition
	switch(body_state_type){
		case('normal'):
			console.log('normal and age: ' + age);
			switch(true){
				case(age < 1):
					//new born vitals
					rr = getRandomInt(20,50);
					pr = getRandomInt(80,140);
					systolic_bp = 80 + 2*age;
					diastolic_bp = (2/3) * systolic_bp;
					break;
				case((age >= 1) && (age <3)):
					//toddler
					rr = getRandomInt(20,30);
					pr = getRandomInt(80,130);
					systolic_bp = 80 + 2*age;
					diastolic_bp = (2/3) * systolic_bp;
					break;
				case((age >= 3) && (age <6)):
					//preschooler
					rr = getRandomInt(20,30);
					pr = getRandomInt(80,120);
					systolic_bp = getRandomInt(78,104);
					diastolic_bp = getRandomInt(60,70); //ave 65
					break;
				case((age >= 6) && (age <10)):
					//school age
					rr = getRandomInt(15,30);
					pr = getRandomInt(70,110);
					systolic_bp = getRandomInt(80,115);
					diastolic_bp = getRandomInt(65,74); //ave 69
					break;
				case((age >=10) && (age <15)):
					//adolescent
					rr = getRandomInt(12,20);
					pr = getRandomInt(60,105);
					systolic_bp = getRandomInt(88,120);
					diastolic_bp = getRandomInt(70,82); //ave 76
					break;
				case(age >=15 ):
					//adult
					console.log('normal adult');
					rr = getRandomInt(12,20);
					pr = getRandomInt(60,100);
					systolic_bp = getRandomInt(90,130); //ave 120
					diastolic_bp = getRandomInt(60,85); //ave 80
					console.log("normal rr: " + rr + ", pr: " + pr + "systolic_bp: " + systolic_bp + ", diastolic_bp:" + diastolic_bp);
					break;
				default:
					console.log('age not found');
					rr = 0;
					pr = 0;
					systolic_bp = 0;
					diastolic_bp = 0;
					break;
			}//end of age switch
			other = "PEARL, lung sounds present clear and bilateral";
			break;
			
		case('death'):
			rr = 0;
			pr = 0;
			systolic_bp = 0; 
			diastolic_bp = 0; 
			other = 'pupils fixed and dilated';
			break;
		
		case('compensated'):
			rr = 0;
			pr = 0;
			systolic_bp = 0; 
			diastolic_bp = 0; 
			other = 'pupils equal and reactive';
			break;
			
		case('decompensated'):
			rr = 0;
			pr = 0;
			systolic_bp = 0; 
			diastolic_bp = 0; 
			other = 'pupils equal and reactive';
			break;
		
		default:
			rr = 0;
			pr = 0;
			systolic_bp = 0;
			diastolic_bp = 0;
			other = "some other event";
			break;
			
	}//end of body_state_type switch
	
	var bp = '' + systolic_bp + '/' + diastolic_bp;
	var v = new Vitals(bp, pr, rr, other);
	return v;
	
}//end of Body State

/*-----------------------------------------------------------*/
//getRandomInt: used to get values of vitals within ranges
/*-----------------------------------------------------------*/
function getRandomInt (min, max) {
    var n = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log("Random Int between " +min+ " and " +max + "is " + n);
	return n;
}
