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

let fire = new Audio();
let background_music = new Audio();
background_music.addEventListener('ended', function() 
    {
    this.currentTime = 0;
    this.play();
    }, false);
background_music.play();


// IMAGES

let ship_img = new Image();
let plasma_img = new Image();
let enemy_0_img = new Image();
let enemy_1_img = new Image();
let enemy_2_img = new Image();


// VARIABLES (global)

//game vars
let power = 100;
let score = 0;
let plasma_units = 1000;
//own ship
let x = (640 / 2) - ( 64 / 2);
let y = 480 - 64 - 16;
//plasma
let counter_plasmas = -1;
let fire_x;
let fire_y;
let array_plasmas = new Array();
//enemys array in class variables
let counter_enemys = -1;
let random_enemy_type = Math.floor(Math.random() * 3);
let random_x_enemy = Math.floor(Math.random() * (640-64));
let random_y_enemy = -64;
//enemys array in main loop variables
let random_interval_new_enemy = 2000 + Math.floor(Math.random() * 5000);
/*delete
//let random_velocity_y_enemy = 20 + Math.floor(Math.random() * 60);
//let move_x_enemy = Math.floor(Math.random() * 60);
//let current_enemy_array_move_to_draw = counter_enemys;
*/
//enemys array with all variables
const array_enemys = new Array();


// CLASS ENEMY

class enemy
	{
	constructor( counter_enemys ) 
		{
		this.counter_enemys = counter_enemys;
		this.random_enemy_type = Math.floor(Math.random() * 3);
		this.random_x_enemy = Math.floor(Math.random() * (640-64));
		this.random_y_enemy = -64;
		}
    update_values_enemys()
		{
		return( this.counter_enemys, this.random_enemy_type, this.random_x_enemy, this.random_y_enemy );		
/*		if (this.random_y_enemy < 480)
		    {			
    		this.random_velocity_y_enemy = 20 + Math.floor(Math.random() * 60);
	    	this.move_x_enemy = Math.floor(Math.random() * 60);
	    	//enemy x left
	    	if (this.move_x_enemy < 30 && (this.random_x_enemy - this.move_x_enemy ) > 0 )
	    	    {
	    	    this.random_x_enemy = this.random_x_enemy - this.move_x_enemy;
                }
            //enemy x right
        	if (this.move_x_enemy > 29 && (this.random_x_enemy + this.move_x_enemy ) < (640-64) )
	    	    {
	    	    this.random_x_enemy = this.random_x_enemy + this.move_x_enemy - 30;
                }
            //enemy y
            if ( this.random_y_enemy < 480 )
                {        
	    	    this.random_y_enemy =  this.random_y_enemy + this.random_velocity_y_enemy;
                }
            //return not seems good idea in first time, but final is best method, I think without for loops in class function, I move to main thread, draw loop.
		    return( this.counter_enemys, this.random_enemy_type, this.random_x_enemy, this.random_y_enemy );
		    }*/ 
		}		
	update_values_enemys;
	}

// CLASS PLASMA

class Plasma
	{
	constructor(counter_plasmas,x,y) 
		{
		this.counter_plasmas = counter_plasmas;
		this.fire_x = x + ( 64 / 2 ) - ( 8 / 2 );
		this.fire_y = y - 3;
		}
	values_own_plasmas()
		{
		return( this.counter_plasmas, this.fire_x, this.fire_y );
		}
	values_own_plasmas;
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
	    enemy_0_img.setAttribute("src", "ship-enemy_0.png");
	    enemy_1_img.setAttribute("src", "ship-enemy_1.png");
	    enemy_2_img.setAttribute("src", "ship-enemy_2.png");
	    }
	//audio
    window.requestAnimationFrame(draw);	
    if (document.images) 
        {
        fire.setAttribute("src", "fire_mod.ogg");
        background_music.setAttribute("src", "mega.ogg");
	    }
    }

function addLoadEvent(func) 
    {	
	let oldonload = window.onload;
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
const canvas = document.getElementById('canvas');
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
		x = x - 40;
        }
    if ( e.keyCode == '39' && x < (640-64)) //right
        { 
        x = x + 40;
        }
    if ( e.keyCode == '90' ) //z attack/fire/plasma
        {
		counter_plasmas++;
		plasma_units--;
		fire_x = x;
		fire_y = y - 5;
		array_plasmas[counter_plasmas] = new Plasma( counter_plasmas, fire_x, fire_y );
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

function new_enemy()
    {
    counter_enemys++;
    array_enemys[counter_enemys] = new enemy( counter_enemys );
    let random_interval_new_enemy = 1000 + Math.floor(Math.random() * 4000);
    setTimeout(new_enemy, random_interval_new_enemy);
    }

function update_values_enemys(current_enemy_array_move_to_draw)
	{
    let random_velocity_y_enemy = 1 + Math.floor(Math.random() * 6);
   	let move_x_enemy = Math.floor(Math.random() * 60);
   	//enemy x left
   	if ( move_x_enemy < 30 && (array_enemys[current_enemy_array_move_to_draw].random_x_enemy - move_x_enemy ) > 0 )
   	    {
   	    array_enemys[current_enemy_array_move_to_draw].random_x_enemy = array_enemys[current_enemy_array_move_to_draw].random_x_enemy - move_x_enemy;
        }
    //enemy x right
  	if ( move_x_enemy > 29 && (array_enemys[current_enemy_array_move_to_draw].random_x_enemy + move_x_enemy ) < (640-64) )
  	    {
   	    array_enemys[current_enemy_array_move_to_draw].random_x_enemy = array_enemys[current_enemy_array_move_to_draw].random_x_enemy + move_x_enemy - 30;
        }
    //enemy y
    array_enemys[current_enemy_array_move_to_draw].random_y_enemy =  array_enemys[current_enemy_array_move_to_draw].random_y_enemy + random_velocity_y_enemy;
    //return not seems good idea in class function in first time, but final is best method found, I think without for loops in class function, I move to main thread, draw loop or function call to it.
	return( current_enemy_array_move_to_draw, array_enemys[current_enemy_array_move_to_draw].random_x_enemy, array_enemys[current_enemy_array_move_to_draw].random_y_enemy );
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
    ctx.font = '20px Arial';
    ctx.fillStyle = 'lightgreen';
    ctx.fillText("power of armor: " + power + "%", 10, 50);
    ctx.fillStyle = 'lightblue';
    ctx.fillText("plasma: " + plasma_units + " units", 10, 75);
    ctx.fillStyle = 'yellow';
    ctx.fillText("score: " + score, 10, 100);
    // draw screen enemys if are existing
    if ( array_enemys[counter_enemys].counter_enemys > -1) 
        {
        for ( let i = counter_enemys; i > -1; i-- )
    		{ 
    		if ( array_enemys[i].random_y_enemy < 480 ) 
    		    {
    		    //update values
    		    var current_enemy_array_move_to_draw = i;	
    		    update_values_enemys(current_enemy_array_move_to_draw);  
    		    // draw all existing enemys on screen
    		    if ( array_enemys[i].random_enemy_type == 0 )
       		    ctx.drawImage( enemy_0_img,0,0,64,64, array_enemys[i].random_x_enemy, array_enemys[i].random_y_enemy,64,64 );
     		    if ( array_enemys[i].random_enemy_type == 1 )
       		    ctx.drawImage( enemy_1_img,0,0,64,64, array_enemys[i].random_x_enemy, array_enemys[i].random_y_enemy,64,64 );  		 
     		    if ( array_enemys[i].random_enemy_type == 2 )
       		    ctx.drawImage( enemy_2_img,0,0,64,64, array_enemys[i].random_x_enemy, array_enemys[i].random_y_enemy,64,64 );  		 
    		    }
    		}
    	}
    // draw spaceship
    ctx.drawImage(ship_img, 0, 0, 64, 64, x, 480-64-5, 64, 64)
   	// draw screen plasmas if are existing
   	for ( let i = counter_plasmas; i > -1; i-- )
		{
		// draw all next plasmas
		if (array_plasmas[i].fire_y > -20) { array_plasmas[i].fire_y = array_plasmas[i].fire_y - 6}
   		ctx.drawImage( plasma_img,0,0,8,16, array_plasmas[i].fire_x, array_plasmas[i].fire_y,8,16 );
		}
   	}
   	
   	
new_enemy();
setInterval(draw, 20);

