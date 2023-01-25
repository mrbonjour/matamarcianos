// license
      /*    
        @licstart  The following is the entire license notice for the 
        JavaScript code in this page.

        Copyright (C) 2022  misterwww,mrbonjour

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.   


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
        */



// IMAGES
var ship=new Image();

// VARIABLES
var x=(640/2)-(64/2);

// PRELOAD IMAGES
addLoadEvent(preloader);

function preloader() 
    {
    window.requestAnimationFrame(draw);	
    if (document.images) 
        {
        ship.setAttribute("src", "ship.png");
	    }
    }
function addLoadEvent(func) 
    {	
	var oldonload = window.onload;
	if (typeof window.onload != 'function') 
        {
		window.onload = func;
	    } 
    else 
        {
    	window.onload = function() 
            {
			if (oldonload) 
                {
				oldonload();
			    }
			func();
		    }
    	}
    }



// CANVAS
var canvas = document.getElementById('canvas');
if (canvas.getContext) 
    {
    var ctx = canvas.getContext('2d');
    }




// KEYBOARD

//ON PRESS

document.onkeydown = checkKeyDown;
function checkKeyDown(e) 
    {
 
    if (e.keyCode == '37' ) //left
        {
		  x=x-10;
        }
    if (e.keyCode == '39' ) //right
        { 
        x=x+10;
        }

    if (e.keyCode == '90') //z attack
        {

        }
        
    }
document.onkeyup = checkKeyUp;
//ON RELASE
function checkKeyUp(e) 
    {
    if (e.keyCode == '37') //left cursor
        {
		  
        }
    if (e.keyCode == '39') //right cursor
        { 

        }

    if (e.keyCode == '90') //z attack
        {
	
        }

    }
	
function draw() 
    {	
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 640, 480);
    ctx.clearRect(0, 0, 600, 480); 
    ctx.fillStyle = 'white';
    ctx.font = "50px arial";
    ctx.fillText("x="+x, 10, 45);
    ctx.drawImage(ship,0,0,64,64,x,480-64-5,64,64);
	 setTimeout(draw,50)
    }
