var bodyParts = [
	'head',
	'armR',
	'armL',
	'torso',
	'pelvis',
	'legR',
	'legL'
];
	
var injuries = [
	{
	name: 'amputation',
	color: 'rgb(255,255,255)',
	bodyParts: {
		head: 'images/builder/head-amputation.png',
		armL: 'images/builder/left-arm-amputation.png',
		torso: 'images/builder/torso-amputation.png',
		pelvis: 'images/builder/pelvis-gsw.png',
		legR: 'images/builder/right-leg-amputation.png',
		legL: 'images/builder/left-leg-amputation.png'
		},
	},
	{
	name: 'contusion',
	color: 'rgb(166, 27,73)',
		bodyParts: {
		head: 'images/builder/head-contusion.png',
		armR: 'images/builder/right-arm-contusion.png',
		armL: 'images/builder/left-arm-contusion.png',
		torso: 'images/builder/torso-contusion.png',
		pelvis: 'images/builder/pants.png',
		legR: 'images/builder/right-leg-contusion.png',
		legL: 'images/builder/left-leg-contusion.png'
		},
	},
	{
	name: 'blast',
	color: 'rgb(26, 19, 171)',
		color: 'rgb(166, 27,73)',
		bodyParts: {
		head: 'images/builder/blast-head.png',
		armR: 'images/builder/right-arm-shrapnel.png',
		armL: 'images/builder/left-arm-blast.png'
		},
	}
	
];
	
function getRandomBodyPart(){

	var min = 0;
	var max = bodyParts.length - 1;
	var index = Math.floor(Math.random() * (max - min + 1)) + min;
	
	return bodyParts[index];
	
}//end of getRandomPart

function getRandomInjuredPart(injury){

	var parts = injury.bodyParts;
	var partsNames = [];
	var partsImages = [];
	
	/*  figure out how many properties/attributes are in parts object */
	
	for (var key in parts) {
		if (parts.hasOwnProperty(key)) {
			partsNames.push(key);
			partsImages.push(parts[key]);
		}
	};

	/* pick a random injured body part */
	var min = 0;
	var max = partsNames.length - 1;
	var index = Math.floor(Math.random() * (max - min + 1)) + min;
	
	var obj = {
		name: partsNames[index],
		imgSrc: partsImages[index],
		injury: injury.name
		};
		
	return obj;

}//end of getRandomInjuredPart
function getRandomInjury(){

	var min = 0;
	var max = injuries.length - 1;
	var index = Math.floor(Math.random() * (max - min + 1)) + min;
	
	return injuries[index];
	
}//end of getRandomPart

function getRandomColor(){

	var greys = [0, 105, 128, 169, 192, 211, 220]
	var min = 0;
	var max = greys.length-1;
	var index = Math.floor(Math.random() * (max - min + 1)) + min;

	var hue = 'rgb(' + greys[index] + ',' + greys[index] + ',' + greys[index] + ')';
	//var hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ')';
	//return 'rgb(128,128,128)';
	return hue;
}
