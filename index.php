<!DOCTYPE HTML>
<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }
      #buttons {
        position: absolute;
        left: 10px;
        top: 0px;
      }
      button {
        margin-top: 10px;
        display: block;
      }

      #container {
	position: absolute;

	left: 10px;
	top: 100px;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <div id="buttons">
      <button id="toBlue">
        Move red box to blue group
      </button>
      <button id="toYellow">
        Move red box to yellow group
      </button>
    </div>
    <script src="js/kinetic-v4.5.4.min.js"></script>
    <script defer="defer">

      var stage = new Kinetic.Stage({
        container: 'container',
        width: 578,
        height: 200
      });

      var groups = [];
      var circles = [];
      var layers = [];

      var layer = new Kinetic.Layer();
      
      //var yellowGroup = new Kinetic.Group({
      groups[0] = new Kinetic.Group({
        x: 200,
        y: 100,
        draggable: true
      });

      groups[0].on('mouseover', function(){
	console.log('group');
	console.log(this.getPosition());
	console.log(this.getX() + "," + this.getY());
	console.log(this.getChildren());
	});

      //var blueGroup = new Kinetic.Group({
      groups[1] = new Kinetic.Group({
        x: 400,
        y: 80,
        draggable: true
      });

      var box = new Kinetic.Rect({
        x: 10,
        y: 10,
        width: 100,
        height: 50,
        fill: 'red',
        stroke: 'black',
	draggable: true
      });

      //var yellowCircle = new Kinetic.Circle({
      circles[0] = new Kinetic.Circle({
        x: 0,
        y: 0,
        radius: 50,
        fill: 'yellow',
        stroke: 'black'
      });

      circles[0].on('mouseover', function(){
	console.log('This: circles[0]');
	console.log(this.attrs.radius);
	

      });

      circles[0].on('mouseout', function(){
	curr = null;
	console.log('Curr: null');
      });


      //var blueCircle = new Kinetic.Circle({
      circles[1] = new Kinetic.Circle({
        x: 0,
        y: 0,
        radius: 50,
        fill: 'blue',
        stroke: 'black'
      });

      // build node tree
      //yellowGroup.add(yellowCircle);
      groups[0].add(circles[0]);
      //yellowGroup.add(box);
      //blueGroup.add(blueCircle);
      groups[1].add(circles[1]);
      layer.add(groups[0]);
      layer.add(groups[1]);
      layer.add(box);
      stage.add(layer);


      // add button event bindings
      document.getElementById('toBlue').addEventListener('click', function() {
        box.moveTo(groups[1]);
        layer.draw();
      }, false);

      document.getElementById('toYellow').addEventListener('click', function() {
        box.moveTo(groups[0]);
        layer.draw();
      }, false);

      // write out drag and drop events
      box.on('dragmove', function() {
        console.log('dragging red box');
	console.log(this.attrs.x + "," + this.attrs.y);
	
      });
      box.on('dragend', function() {
	console.log('stop dragging red box');
	var mousePos = stage.getMousePosition();
	console.log('x:' +mousePos.x + ', y:' +mousePos.y);
	//check to see if x and y exist within anyother shapes
	//x0,y0 is center of group with radius r
	//x1,y1 is point clicked
	//Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r
	//foreach shape
	// if formual true then merge into a group and break.
	//change border on shape to indicate connection
	//for(var i=0; i<groups.length; i++){
	//	console.log(groups[i].getChildren
	
      });

      box.on('mousedown', function(){
	console.log('mousedown');
	var mousePos = stage.getMousePosition();
	console.log('x:' +mousePos.x + ', y:' +mousePos.y);
	});
   
/*Create two circles
*Create box
*if box event dragend == inside shape, create group.
* group can be moved to a tarp
*/


    </script>
  </body>
</html>