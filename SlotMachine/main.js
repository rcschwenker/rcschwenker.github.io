function choice() { //naming function allows us to call on it, meaning it will only run when
  //called on

  Math.seedrandom();

  var rand = Math.random(); //always = when declaring a function/giving something a value
  var cpuChoice = ""; //semicolon for commands

  if (rand >= 0 && rand < 0.2) {
    cpuChoice = "cherry";
  }
  if (rand >= 0.20 && rand < 0.4) {
    cpuChoice = "seven";
  }
  if (rand >= 0.40 && rand < 0.6) {
    cpuChoice = 'lemon';
  }
  if (rand >= 0.60 && rand < 0.8) {
    cpuChoice = "pear";
  }
  if (rand >= 0.80 && rand <= 1) {
    cpuChoice = 'five';
  }
  return cpuChoice;

}

function myLoop(q) { //  create a loop function
  //for (q = 0; q < 5; q++) **Replaced below with a manual loop**
  var row = document.getElementById("slotMachine").rows[0]; 
  var array = [];
  setTimeout(function() {
    for (i = 0; i < 3; i++) {
      var result = choice().toString();
      if (q == 5) {
        array[i] = result;
      }
      row.cells[i].innerHTML = '<img src="' + result + '.png"/>'; //must be in loop
    }
    q++; //  increment the counter
    if (q < 6) {

      myLoop(q);
    }
    if (q == 6) {


      evaluate(array);
    }

    //  ..  setTimeout()
  }, 150)

}



function pullSlot() {

  var lblWin = document.getElementById("bank");
  var win = lblWin.textContent;
  var img = document.getElementById("kek");
  img.hidden = true;
  var gif = document.getElementById("jackpot");
  gif.hidden = true;
  lblWin.textContent = parseInt(win) - 1; //bad name
  var button = document.getElementById("lever");
  button.hidden = true;
  myLoop(0);


}

function evaluate(array) { //open curly bracket, no semicolon (semicolon for commands like assigning/declaring a variable)
  if (array[0] == array[1] && array[1] == array[2] && array.length > 0)

  {
    win(array[0]);
  } else {
    
  }
  
  var button = document.getElementById("lever");
  button.hidden = false;

  //if (array[0] == array[1] || array[1] == array[2] || array[0] == array[2] && array.length > 0)
  if (array[0] == array[1] || array[0] == array[2] && array.length > 0) {
    partialWin(array[0]);
  } else if (array[1] == array[2] && array.length > 0) {
    partialWin(array[1]);
  } else {
    
  }
  
  var button = document.getElementById("lever");
  button.hidden = false;
}


function win(result) {
  var lblWin = document.getElementById("bank");
  var win = lblWin.textContent;
  var dollars = 0;
  var img = document.getElementById("kek");
  img.hidden = false;
  if (result == "cherry") {
    dollars = 25;
  }
  if (result == "seven") {
    dollars = 150;
    var gif = document.getElementById("jackpot");
    gif.hidden = false;
    img.hidden = true;
  }
  if (result == "lemon") {
    dollars = 15;
  }
  if (result == "pear") {
    dollars = 35;
  }
  if (result == "five") {
    dollars = 50;
  }

  lblWin.textContent = parseInt(win) + dollars;

}
function partialWin(result) {
  var lblWin = document.getElementById("bank");
  var win = lblWin.textContent;
  var dollars = 0;
  var img = document.getElementById("kek");
  img.hidden = false;
  if (result == "cherry") {
    dollars = 25;
  }
  if (result == "seven") {
    dollars = 75;
  }
  if (result == "lemon") {
    dollars = 1;
  }
  if (result == "pear") {
    dollars = 25;
  }
  if (result == "five") {
    dollars = 25;
  }

  lblWin.textContent = parseInt(win) + dollars;

}
