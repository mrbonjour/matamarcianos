// license

      /*    
        @licstart  The following is the entire license notice for the 
        JavaScript code in this page.

        Copyright (C) 2022,2023  misterwww,mrbonjour

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

// AUDIO

var fire = new Audio();

// IMAGES

var ship_img = new Image();
var plasma_img = new Image();

// VARIABLES (gloval)

var counter = -1;
var x = (640 / 2) - ( 64 / 2);
var y = 480 - 64 - 16;
var fire_x;
var fire_y;
var array_plasmas = new Array();


// CLASS PLASMA

class Plasma
	{
	constructor(counter,x,y) 
		{
		this.counter = counter;
		this.fire_x = x + ( 64 / 2 ) - ( 8 / 2 );
		this.fire_y = y - 3;
		}
	values()
		{
		return( this.counter, this.fire_x, this.fire_y );
		}
	values;
	}

// PRELOAD IMAGES

addLoadEvent(preloader);

function preloader() 
    {
    //images
    window.requestAnimationFrame(draw);	
    if (document.images) 
        {
        ship_img.setAttribute("src", "ship.png");
		plasma_img.setAttribute("src", "plasma.png");
	    }
	//audio
    window.requestAnimationFrame(draw);	
    if (document.images) 
        {
        fire.setAttribute("src", "fire.ogg");
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

// KEYBOARD:

// ON PRESS

document.onkeydown = checkKeyDown;

function checkKeyDown(e) 
    {
    if ( e.keyCode == '37' && x > 0) //left
        {
		x = x - 20;
        }
    if ( e.keyCode == '39' && x < (640-64)) //right
        { 
        x = x + 20;
        }
    if ( e.keyCode == '90' ) //z attack/fire/plasma
        {
		counter++;
		fire_x = x;
		fire_y = y - 2;
		array_plasmas[counter] = new Plasma( counter, fire_x, fire_y );
		fire.play();
        }   
    }

document.onkeyup = checkKeyUp;

// ON RELASE
function checkKeyUp(e) 
    {
    if (e.keyCode == '37') //left cursor
        {
		  
        }
    if (e.keyCode == '39') //right cursor
        { 

        }
    if (e.keyCode == '90') //z attack/fire/plasma
        {

        }
    }

function draw() 
    {
	// remove last frame
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 640, 480);
	// set and print text
    ctx.fillStyle = 'white';
    ctx.font = '30px Courrier';
    ctx.fillText("Arcade spaceships game (matamarcianos)", 10, 25);
    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.fillText("X(ship)=" + x, 10, 50);
	// draw spaceship
    ctx.drawImage(ship_img, 0, 0, 64, 64, x, 480-64-5, 64, 64);
	// draw screen plasmas if are existing
	for ( var i = counter; i > -1; i-- )
		{
		// draw all next plasmas
		if (array_plasmas[i].fire_y > -20) { array_plasmas[i].fire_y = array_plasmas[i].fire_y - 6}
   		ctx.drawImage( plasma_img,0,0,8,16, array_plasmas[i].fire_x, array_plasmas[i].fire_y,8,16 );
		}
   	}

setInterval(draw, 20);

