<!DOCTYPE HTML>
<html>
    <head>
        <style>

        </style>

        <script>
       

function getRandomInt(min, max){

	return Math.floor(Math.random() * (max - min + 1)) + min;

}

function init(){


	//NORMAL
	normal_systolic_bp = document.getElementById('normal_systolic_bp');
	normal_diastolic_bp = document.getElementById('normal_diastolic_bp');
	normal_pr = document.getElementById('normal_pr');
	normal_rr = document.getElementById('normal_rr');

	sys = getRandomInt(100,125);
	dia = getRandomInt(60,sys);
	pr = getRandomInt(60,80);
	rr = getRandomInt(12,20);

	normal_systolic_bp.innerHTML += sys;
	normal_diastolic_bp.innerHTML += dia;
	normal_pr.innerHTML += pr;		
	normal_rr.innerHTML += rr;


	//COMPENSATED SHOCK
	compensated_systolic_bp = document.getElementById('compensated_systolic_bp');
	compensated_diastolic_bp = document.getElementById('compensated_diastolic_bp');
	compensated_pr = document.getElementById('compensated_pr');
	compensated_rr = document.getElementById('compensated_rr');

	sys = getRandomInt(100,125);
	dia = getRandomInt(60,sys);
	pr = getRandomInt(95,140);
	rr = getRandomInt(18,30);

	compensated_systolic_bp.innerHTML += sys;
	compensated_diastolic_bp.innerHTML += dia;
	compensated_pr.innerHTML += pr;		
	compensated_rr.innerHTML += rr;


	//DECOMPENSATED SHOCK

	decompensated_systolic_bp = document.getElementById('decompensated_systolic_bp');
	decompensated_diastolic_bp = document.getElementById('decompensated_diastolic_bp');
	decompensated_pr = document.getElementById('decompensated_pr');
	decompensated_rr = document.getElementById('decompensated_rr');

	sys = getRandomInt(80,100);
	dia = getRandomInt(40,sys);
	pr = getRandomInt(95,140);
	rr = getRandomInt(22,30);

	decompensated_systolic_bp.innerHTML += sys;
	decompensated_diastolic_bp.innerHTML += dia;
	decompensated_pr.innerHTML += pr;		
	decompensated_rr.innerHTML += rr;

	//INCOMPATIBLE WITH LIFE (IRREVERSIBLE)
	incompatible_systolic_bp = document.getElementById('incompatible_systolic_bp');
	incompatible_diastolic_bp = document.getElementById('incompatible_diastolic_bp');
	incompatible_pr = document.getElementById('incompatible_pr');
	incompatible_rr = document.getElementById('incompatible_rr');

	sys = getRandomInt(0,20);
	dia = getRandomInt(0,sys);
	pr = getRandomInt(0,10);
	rr = getRandomInt(0,8);

	incompatible_systolic_bp.innerHTML += sys;
	incompatible_diastolic_bp.innerHTML += dia;
	incompatible_pr.innerHTML += pr;		
	incompatible_rr.innerHTML += rr;

	//DEAD
	dead_systolic_bp = document.getElementById('dead_systolic_bp');
	dead_diastolic_bp = document.getElementById('dead_diastolic_bp');
	dead_pr = document.getElementById('dead_pr');
	dead_rr = document.getElementById('dead_rr');

	sys = 0;
	dia = 0;
	pr = 0;
	rr = 0;

	dead_systolic_bp.innerHTML += sys;
	dead_diastolic_bp.innerHTML += dia;
	dead_pr.innerHTML += pr;		
	dead_rr.innerHTML += rr;


}

        </script>
    </head>
    <body onload="init();">
     
	<h1>Random Vitals</h1>

	<h2>Normal</h2>
	<ul>
	<li id="normal_systolic_bp">Systolic BP:</li>
	<li id="normal_diastolic_bp">Diastolic BP:</li>
	<li id="normal_pr">Pulse:</li>
	<li id="normal_rr">Respirations:</li>
	</ul>

	
	<h2>Compensated Shock</h2>
	<ul>
	<li id="compensated_systolic_bp">Systolic BP:</li>
	<li id="compensated_diastolic_bp">Diastolic BP:</li>
	<li id="compensated_pr">Pulse:</li>
	<li id="compensated_rr">Respirations:</li>
	</ul>

	<h2>Decompensated Shock</h2>
	<ul>
	<li id="decompensated_systolic_bp">Systolic BP:</li>
	<li id="decompensated_diastolic_bp">Diastolic BP:</li>
	<li id="decompensated_pr">Pulse:</li>
	<li id="decompensated_rr">Respirations:</li>
	</ul>

	<h2>Incompatible with Life</h2>
	<ul>
	<li id="incompatible_systolic_bp">Systolic BP:</li>
	<li id="incompatible_diastolic_bp">Diastolic BP:</li>
	<li id="incompatible_pr">Pulse:</li>
	<li id="incompatible_rr">Respirations:</li>
	</ul>


	<h2>Dead</h2>
	<ul>
	<li id="dead_systolic_bp">Systolic BP:</li>
	<li id="dead_diastolic_bp">Diastolic BP:</li>
	<li id="dead_pr">Pulse:</li>
	<li id="dead_rr">Respirations:</li>
	</ul>

    </body>
</html>
