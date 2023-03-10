// 10/03/2023    11:07

//###########################################################################################################--------- Laberinto

allo = window.document.getElementById('mainRectangle');
//-----------------------------------------------------------Laberynth definition
const lab_def = [
  ["SE", "EW", "EW", "EW", "EW", "EW", "SEW", "EW", "EW", "SW", "E", "SEW", "EW", "SW", "SE", "W"],
  ["NS", "SE", "WS", "E", "EW", "WS", "NS", "S", "S", "NE", "EW", "WN", "S", "NS", "NE", "WS"],
  ["NSE", "NW", "NS", "SE", "WS", "NE", "NSW", "NSE", "WNE", "EW", "WS", "S", "NS", "NSE", "WE", "WN"],
  ["NE", "WE", "NWE", "WNS", "NE", "WS", "NE", "WN", "SE", "WS", "NS", "NSE", "NWE", "WNE", "WE", "WS"],
  ["E", "WES", "WE", "NWE", "W", "NS", "E", "WE", "WNS", "NE", "NW", "NS", "SE", "WE", "WS", "NS"],
  ["S", "NS", "SE", "WS", "S", "NS", "SE", "W", "NS", "E", "WE", "NW", "NS", "S", "NS", "NS"],
  ["NS", "NSE", "WN", "NE", "WNS", "NS", "NE", "WE", "NWE", "WE", "WE", "WE", "WN", "NS", "NS", "NS"],
  ["NS", "NE", "WE", "WE", "WNS", "NE", "WE", "WS", "S", "S", "S", "S", "SE", "WNS", "NS", "NS"],
  ["NS", "SE", "WE", "WE", "WN", "SE", "WE", "WN", "NS", "NSE", "WN", "NE", "WN", "NSE", "NW", "NS"],
  ["NS", "NS", "SE", "WE", "WE", "WNS", "SE", "WES", "WNS", "NS", "E", "WE", "WE", "WEN", "WS", "NS"],
  ["NE", "WN", "NS", "SE", "WS", "NS", "NS", "NS", "NS", "NS", "E", "WE", "WE", "WE", "NSW", "NS"],
  ["SE", "WE", "NW", "NS", "NS", "NSE", "NW", "NS", "NE", "NW", "SE", "WE", "WE", "WE", "WNS", "NS"],
  ["NS", "SE", "WS", "NS", "NS", "NSE", "W", "NE", "WE", "W", "NS", "E", "WE", "WS", "NS", "NS"],
  ["NS", "NS", "NS", "NS", "NS", "NE", "W", "SE", "WE", "WS", "NS", "E", "WES", "NWS", "NS", "NS"],
  ["NSE", "WNS", "NE", "WN", "NE", "WE", "WE", "NW", "S", "NE", "NWE", "W", "NS", "NS", "N", "NS"],
  ["N", "NE", "WE", "WE", "WE", "WE", "WE", "WE", "WEN", "WE", "WE", "WE", "NW", "NE", "WE", "NW"]
];
//-------------------------------------P5 function to construct Element
//'use strict'; //strict mode : declare all variables
//const fs = require('fs');
let labP5 = function(p5l) {
  var solved; // when the maze is solved = true
  var gridX, gridY; // Coordinates en Grid calculated from Mouse
  var modules = []; // trayectory Images loaded
  var tileNumber = 16; //number of tiles
  var gd; //Canvas saved png.
  var doDrawGrid = true; //activate Grid
  //---------------------------------------------------------------------Parent Dimensions
  var bord = getComputedStyle(allo, null).getPropertyValue('border');
  bord = parseFloat(bord.substring(0, bord.search("px")));
  var wiwi = getComputedStyle(allo, null).getPropertyValue('width');
  wiwi = parseFloat(wiwi.substring(0, wiwi.search("px")));
  wiwi = wiwi - bord;
  var heihei = getComputedStyle(allo, null).getPropertyValue('height');
  heihei = parseFloat(heihei.substring(0, heihei.search("px")));
  heihei = heihei - bord;
  //--------------new paradigm
  var rel_x, rel_y; //From old access point to new position
  var access_x;
  var access_y;
  var coming_from; //Entry to mase coming from WEST
  var allowed; //Variable of allowed entrances in coordinate
  var shock, restart; // shocked ocurred, restart must
  var changed; //transicion from vertical to horizontal
  var direction; // either vertical or horizontal
  var partial_img; // store trayectory by images & coordinates
  var tileSize = p5l.round(wiwi / tileNumber); //number of pixels of tiles
  //------------------------------Load images
  p5l.preload = function() {
    for (var i = 0; i < 16; i++) {
      modules[i] = p5l.loadImage('https://raw.githubusercontent.com/keinRoboter/VirtualExistence/main/uploads/' + p5l.nf(i, 2) + '.svg');

    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Initialitation of p5 Element (only one time)
  // it creates the cambas and puts the initial and final points in maze
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.setup = function() {
    solved = false;
    access_x = 0;
    access_y = 0;
    coming_from = "W";
    gd = p5l.createCanvas(wiwi, heihei); //Canvas in div - dimensions
    p5l.cursor(p5l.CROSS); //Makes the cursor a cross symbol
    p5l.rectMode(p5l.CENTER); //Changes the interpretation of arguments for rect - first 2: center coordinates => rect
    p5l.imageMode(p5l.CENTER); //Same as above but for images => image
    p5l.strokeWeight(0.15); //How thick are lines
    p5l.textSize(8); //set the size of fonts  => text
    p5l.textAlign(p5l.CENTER, p5l.CENTER); //horizontal and vertical alignement
    partial_img = [];
    //----------------------------------------------Entrance of Maze
    p5l.newModules(1, 1, 0);
    //----------------------------------------------Exit of Maze
    p5l.newModules(1, 15, 0);
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Interaction while Mouse_Pressed (everytime)
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.draw = function() {
    if (p5l.mouseIsPressed) {
      if (p5l.mouseButton == p5l.LEFT && !solved) p5l.setTile(); //Draws all the tiles in trayectory
      if (p5l.mouseButton == p5l.RIGHT) p5l.setup(); //Enable restart
    } else {
      //console.log("aja");
      shock = false;
      restart = false;
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Where does the trayectory come from?
  //-----------------------------Modify previous tile and create new tile
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.coming = function(a, b) {
    rel_x = a - access_x; //Difference between old press and new press
    rel_y = b - access_y; //Difference between old press and new press
    allowed = lab_def[b - 1][a - 1]; //Retrieve allowed entries for tile
    //console.log(allowed);      //-----Verify if Maze is well defined
    //---------------------------------------------------------------------------Tree for North
    if (rel_x == 0 && rel_y == 1) {
      evaluate = true; // a change in trayectory has ocurred so shock condition must be evaluated
      if (direction = "horizontal") {
        changed = true; // a change in direction has ocurred
      } else {
        changed = false;
      }
      //-----------------------If direction changed, previous tile must change
      if (changed) {
        //-------------------------Coming from West
        if (coming_from == "W") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b - 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 6];
        }
        //-------------------------Coming from East
        else if (coming_from == "E") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b - 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 3];
        }
      }
      p5l.newModules(a, b, 10); // New tile creation in array and redrawing of trayectory
      direction = "vertical"; // New direction
      coming_from = "N"; // Coming from north
      //console.log(coming_from);
    }
    //---------------------------------------------------------------------------Tree for South
    else if (rel_x == 0 && rel_y == -1) {
      evaluate = true;
      if (direction = "horizontal") {
        changed = true;
      } else {
        changed = false;
      }
      if (changed) {
        if (coming_from == "W") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b + 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 12];
        } else if (coming_from == "E") {
          var newposX = tileSize * a - tileSize / 2;
          var newposY = tileSize * (b + 1) - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 9];
        }
      }
      p5l.newModules(a, b, 10)
      direction = "vertical";
      coming_from = "S";
      //console.log(coming_from);
    }
    //---------------------------------------------------------------------------Tree for West
    else if (rel_x == 1 && rel_y == 0) {
      evaluate = true;
      if (direction = "vertical") {
        changed = true;
      } else {
        changed = false;
      }
      if (changed) {
        if (coming_from == "N") {
          var newposX = tileSize * (a - 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 9];
        } else if (coming_from == "S") {
          var newposX = tileSize * (a - 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 3];
        }
      }
      p5l.newModules(a, b, 5)
      direction = "horizontal";
      coming_from = "W";
      //console.log(coming_from);
    }
    //---------------------------------------------------------------------------Tree for East
    else if (rel_x == -1 && rel_y == 0) {
      evaluate = true;
      if (direction = "vertical") {
        changed = true;
      } else {
        changed = false;
      }
      if (changed) {
        if (coming_from == "N") {
          var newposX = tileSize * (a + 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 12];
        } else if (coming_from == "S") {
          var newposX = tileSize * (a + 1) - tileSize / 2;
          var newposY = tileSize * b - tileSize / 2;
          partial_img[partial_img.length - 1] = [newposX, newposY, 6];
        }
      }
      p5l.newModules(a, b, 5)
      direction = "horizontal";
      coming_from = "E";
      //console.log(coming_from);
    }
    //-------------------------------- NOT MOVING
    else if (rel_x == 0 && rel_y == 0) {
      //console.log("This is repetition");
      evaluate = false;
    }
    //-------------------------------- First Point
    else if (rel_x == 1 && rel_y == 1) {
      //console.log("This is first point");
      p5l.newModules(a, b, 1);
      evaluate = false;
    }
    //-------------------------------arbitrary start_point
    else {
      //console.log("Restart");
      restart = true;
      p5l.createCanvas(wiwi, heihei);
      setTimeout(() => {
        p5l.setup();
      }, 500);
    }
    re = allowed.search(coming_from);
    //--------------------------------------shock condition
    if (re == -1 && evaluate) {
      //console.log("shock");
      shock = true;
      p5l.createCanvas(wiwi, heihei);
      setTimeout(() => {
        p5l.setup();
      }, 500);
    }
    if (a == 1 && b == 15) {
      solved = true;
      // console.log("solved!!!!");
      how_well = partial_img.length;
      // console.log(how_well);

      if (how_well < 34) {
        window.document.getElementById('imp_sol').style.visibility = "visible";
        window.document.getElementById('betterWay2').style.visibility = "visible";
      } else if (how_well < 56 && how_well > 34) {
        window.document.getElementById('best_sol').style.visibility = "visible";
        window.document.getElementById('betterWay').style.visibility = "visible";
      } else if (how_well < 74 && how_well > 56) {
        window.document.getElementById('second_sol').style.visibility = "visible";
        window.document.getElementById('betterWay').style.visibility = "visible";
      } else {
        window.document.getElementById('worst_sol').style.visibility = "visible";
        window.document.getElementById('betterWay').style.visibility = "visible";
      }
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Definition of Tile when Mouse Pressed
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.setTile = function() {
    // convert mouse position to grid coordinates
    gridX = p5l.floor(p5l.mouseX / tileSize) + 1;
    gridX = p5l.constrain(gridX, 1, tileNumber);
    gridY = p5l.floor(p5l.mouseY / tileSize) + 1;
    gridY = p5l.constrain(gridY, 1, tileNumber);
    p5l.coming(gridX, gridY);
    if (!restart || !shock) {
      access_x = gridX;
      access_y = gridY;
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Where does the trayectory come from?
  //-----------------------------Modify previous tile and create new tile
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.drawGrid = function() {
    for (var gridX = 0; gridX < tileNumber + 2; gridX++) {
      for (var gridY = 0; gridY < tileNumber + 2; gridY++) {
        var posX = tileSize * gridX - tileSize / 2;
        var posY = tileSize * gridY - tileSize / 2;
        //p5l.fill(255);
        p5l.noFill();
        p5l.stroke(51);
        p5l.rect(posX, posY, tileSize, tileSize);
      }
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------Incorporate new tile and redraw trayectory
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.newModules = function(c, d, e) {
    var posX = tileSize * c - tileSize / 2;
    var posY = tileSize * d - tileSize / 2;
    partial_img.push([posX, posY, e]); // Incorporate new tile
    p5l.createCanvas(wiwi, heihei); // Restart canvas
    for (let i = 0; i < partial_img.length; i++) {
      p5l.image(modules[partial_img[i][2]], partial_img[i][0], partial_img[i][1], tileSize, tileSize);
    }
  }
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //-----------------------------KEY PRESS ACTIONS
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  p5l.keyPressed = function() {
    if (p5l.key == 's' || p5l.key == 'S') p5l.saveCanvas(gd, 'png');
    if (p5l.keyCode == p5l.DELETE || p5l.keyCode == p5l.BACKSPACE) {
      //       p5l.initTiles();
      p5l.setup(); //really restart
    }
    if (p5l.key == 'g' || p5l.key == 'G') {
      p5l.drawGrid();
    }
    if (p5l.key == 'd' || p5l.key == 'D') isDebugMode = !isDebugMode;
  }
}
new p5(labP5, allo);