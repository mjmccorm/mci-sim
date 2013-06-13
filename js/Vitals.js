/*-----------------------------------------------------------*/
//Vitals - object that stores vital signs on a person
/*-----------------------------------------------------------*/
function Vitals(config){

	this.systolic_bp = config.systolic_bp || 0;
	this.diastolic_bp = config.diastolic_bp || 0;
	this.pr = config.pr || 0;
	this.rr = config.rr || 0;
	this.osat = config.osat || 0;
	this.etco2 = config.etco2 || 0;
	this.other = config.other || "";
	
}//end of Vitals

Vitals.prototype.increaseVitals = function(){

	
}; //end increaseVitals


Vitals.prototype.decreaseVitals = function(){

	

}; //end decreaseVitals