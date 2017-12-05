
function buildDeck(){
var face = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
var suit = ["diamonds", "hearts", "spades", "clubs", ];

var result = []; //nested loop, instead of actually typing it all out manually, much lighter
for (q = 0; q < 4; q++) {
  for (i = 0; i < 13; i++) {
    result.push([face[i], suit[q]]);
  }
}
return result;
}


deal(shuffle(buildDeck()));

function shuffle(array) { //fisher-yates shuffle
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//syntax for JSONobjectconsole.looping

//deck is utilized above as shuffle(buildDeck())
//two cards will be dealt at the start:
//row[0]cells[0]; row[0]cells[1];row[1]cells[0];row[1]cells[1]

function deal(deck) {

  var face = ''; //empty string ''
  var suit = '';
  var table = document.getElementById("hands");
  var inputDeck = document.getElementById("inputDeck"); //hidden html element
  var playerHand = [] //empty arrays[]
  var cpuHand = []
  var button = document.getElementById("hit");
  button.hidden = false;
  var button = document.getElementById("stand");
  button.hidden = false;
  var img = document.getElementById("YouWin");
  img.style.visibility = "hidden";
  var img = document.getElementById("CPUwin");
  img.style.visibility = "hidden";
  var img = document.getElementById("Bust");
  img.style.visibility = "hidden";
  var img = document.getElementById("cpuBust");
  img.style.visibility = "hidden";

//The following deals two cards to the CPU, with the first card being face down

  for (i = 0; i < 2; i++) {
    face = deck[0][0];
    suit = deck[0][1];
    if (i == 0) {
      table.rows[0].cells[i].innerHTML = '<img src=./Cards/back.jpg>'; //sets first row and cell inner html (i.e. players first card)=img of back of card 
    } else {
      table.rows[0].cells[i].innerHTML = '<img src=./Cards/' + face + "_of_" + suit + '.svg>';//for all over instances sets it equal to selected card
    }
    deck.shift(); //removes element from array 'deck' i.e. removes 'drawn' card from deck
    cpuHand.push([face, suit]); //adds element (face, suit) to end of array (cpuHand) i.e. adds drawn card to cpuHand
  }


  for (i = 0; i < 2; i++) { //looping through table
    face = deck[0][0]; //2 elements in each array, first element is always face [0][0], second is suit [0][1]
    suit = deck[0][1]; 
    table.rows[1].cells[i].innerHTML = '<img src=./Cards/' + face + "_of_" + suit + '.svg>';
    deck.shift(); 
    playerHand.push([face, suit]); 
  }

  inputDeck.value = JSON.stringify(deck);
  document.getElementById('cpuHand').value = JSON.stringify(cpuHand); //right goes into left
  document.getElementById('playerHand').value = JSON.stringify(playerHand);

if (evaluate(playerHand)==21) {
win();
showScore();
}

}


function hit() {
  var deck = JSON.parse(document.getElementById('inputDeck').value); //dumping values from hidden input 'inputDeck'
  //into deck; 'inputDeck' has cards already drawn removed. This is our new deck we are "drawing" from.
  var playerHand = JSON.parse(document.getElementById('playerHand').value); //dumping values from hidden input 'playerHand'
  //into player hand
  var face = deck[0][0];
  var suit = deck[0][1];
  var table = document.getElementById("hands");
  table.rows[1].cells[playerHand.length].innerHTML = '<img src=./Cards/' + face + "_of_" + suit + '.svg>';
  deck.shift();
  playerHand.push([face, suit]); //adds card dealt to array playerHand
  document.getElementById('inputDeck').value = JSON.stringify(deck);
  //inputDeck being rewritten by new deck (which is absent a card due to shift() removing a card from the discard)
  document.getElementById('playerHand').value = JSON.stringify(playerHand);
  //dumps resulting array into hidden input
  var score = evaluate(playerHand); //returns 'result' from
  if (score > 21) {
    bust();

  } else {
    cpuDecision();
  }


}


function cpuDecision()
{

  var deck = JSON.parse(document.getElementById('inputDeck').value); //parses out string to give array, new deck we draw from that has cards already drawn removed
  var cpuHand = JSON.parse(document.getElementById('cpuHand').value); //cpuHand = resulting array values from hidden input 'cpuHand'
  var playerHand = JSON.parse(document.getElementById('playerHand').value);
  var face = deck[0][0];
  var suit = deck[0][1];
  var table = document.getElementById("hands");
  var cpuScore = evaluate(cpuHand);
  var playerScore = evaluate(playerHand);
  var button = document.getElementById("hit");


  if (cpuScore > 21) {
    cpuBust();
  } else if (cpuScore < 18 | cpuScore<playerScore) {
    table.rows[0].cells[cpuHand.length].innerHTML = '<img src=./Cards/' + face + "_of_" + suit + '.svg>';//cpu HITS
    deck.shift();
    cpuHand.push([face, suit]); //adds card dealt to array cpuHand (to end)
    document.getElementById('inputDeck').value = JSON.stringify(deck);
    //inputDeck being rewritten by new deck (which is absent a card due to shift() removing a card from the discard)
    document.getElementById('cpuHand').value = JSON.stringify(cpuHand);
    //dumps resulting array into hidden input 'cpuHand'
    cpuScore = evaluate(cpuHand);
    if (cpuScore < 18 && button.hidden) {//button.hidden meaning player has hit stand (HIT disappears), cpu continues AI loop
      cpuDecision();
    }
  }
  if (cpuScore >= 18 && cpuScore < 22 && button.hidden) {
    compare();
  } else if (cpuScore > 21) {
    cpuBust();
  }
}

function evaluate(hand) //returns numeric values for cards
{

  var result = 0;
  var aceCount = 0; //initialize at zero for counter
  for (i = 0; i < hand.length; i++) {
    if (isNaN(hand[i][0])) { //if return value is not a number-NaN
      switch (hand[i][0]) {
        case 'ace':

          if (result <= 10) {
            result += 11;
            aceCount += 1;
          } //ace=11 when score<=10
          else if (result > 10) {
            result += 1;
          }
          break;
        default:
          result += 10; //King, Queen, Jack = 10
      }

    } else {
      result += parseInt(hand[i][0]); //otherwise parse string to actual number (without parse it just slams together the integers)
    }

  }
  if (result > 21 && aceCount >= 1) {

    result -= 10

  }


  return result;

}

function win() { //PLAYER win
  var img = document.getElementById("YouWin");
  img.style.visibility = "visible";
  img.style.width = "auto";
  var lblWin = document.getElementById("win");
  var win = lblWin.textContent;
  lblWin.textContent = parseInt(win) + 1;
  var button = document.getElementById("hit");
  button.hidden = true;
  var button = document.getElementById("stand");
  button.hidden = true;
  var button = document.getElementById("deal");
  button.hidden = false;
  show();


}

function loss() { //PLAYER loss
  var img = document.getElementById("CPUwin");
   img.style.visibility = "visible";
   img.style.width = "auto";
  var lblLose = document.getElementById("loss");
  var loss = lblLose.textContent;
  lblLose.textContent = parseInt(loss) + 1;
  var button = document.getElementById("hit");
  button.hidden = true;
  var button = document.getElementById("stand");
  button.hidden = true;
  var button = document.getElementById("deal");
  button.hidden = false;
  show();
  /*var deck = JSON.parse(document.getElementById('inputDeck').value);
  deal(deck);*/
}

function tie() {

 
  var cpuHand = JSON.parse(document.getElementById('cpuHand').value);
  var playerHand = JSON.parse(document.getElementById('playerHand').value);


  if (playerHand.length > cpuHand.length) {
    loss();
  } else if (playerHand.length < cpuHand.length) {
    win();
  } else if ((cpuHand.includes('ace') == true && cpuHand.length == 2 && evaluate(cpuHand) == 21) &&
  	(playerHand.includes('ace') == true && playerHand.length == 2 && evaluate(playerHand) == 21)) {
    win();
  } else if (playerHand.includes('ace') == true && playerHand.length == 2 && evaluate(playerHand) == 21) {
    win();
  } else {
    loss();  
  }
  show();
  
}

function bust() { //should be an outcome that results from compare

  var img = document.getElementById("Bust");
  img.style.visibility = "visible";
  img.style.width = "auto";
  var button = document.getElementById("deal");
  button.hidden = false;
  var lblLose = document.getElementById("loss");
  var loss = lblLose.textContent;
  lblLose.textContent = parseInt(loss) + 1;
  var button = document.getElementById("hit");
  button.hidden = true;
  var button = document.getElementById("stand");
  button.hidden = true;
  show();
  showScore();
}

function cpuBust() { //should be an outcome that results from compare 


  var img = document.getElementById("cpuBust");
  img.style.visibility = "visible";
  img.style.width = "auto";
  var button = document.getElementById("deal");
  button.hidden = false;
  var lblWin = document.getElementById("win");
  var win = lblWin.textContent;
  lblWin.textContent = parseInt(win) + 1;
  var button = document.getElementById("hit");
  button.hidden = true;
  var button = document.getElementById("stand");
  button.hidden = true;
  show();
  showScore();
}

function stand() {

  var button = document.getElementById("hit");
  button.hidden = true;
  var button = document.getElementById("stand");
  button.hidden = true;
  var playerHand = JSON.parse(document.getElementById('playerHand').value);
  button.hidden = true;
  cpuDecision();
  show();
}

function reset() {

  var button = document.getElementById("deal");
  button.hidden = true;
  var deck = JSON.parse(document.getElementById('inputDeck').value);
  var table = document.getElementById("hands");
  table.rows[0].cells[6].innerHTML=''
  table.rows[1].cells[6].innerHTML=''
  for (i = 0; i < 6; i++) {
    for (q = 0; q < 2; q++) {
      table.rows[q].cells[i].innerHTML = '';
    }
  }
  document.getElementById('cpuHand').value = '';
  document.getElementById('playerHand').value = '';
  if (deck.length<12){
	deal(shuffle(buildDeck())); //play with new shuffled deck 
  	}
	else if (deck.length>=12) { deal(deck);//keep playing with current deck
	}
}



function showScore(){
  var table = document.getElementById("hands");
  var playerHand = JSON.parse(document.getElementById('playerHand').value);
  var cpuHand = JSON.parse(document.getElementById('cpuHand').value);
  var cpuScore = evaluate(cpuHand);
  var playerScore = evaluate(playerHand);
  table.rows[0].cells[6].innerHTML= "= "+ cpuScore.toString();
  table.rows[1].cells[6].innerHTML= "= "+ playerScore.toString();

}

function compare() {
  var playerHand = JSON.parse(document.getElementById('playerHand').value);
  var cpuHand = JSON.parse(document.getElementById('cpuHand').value);
  var cpuScore = evaluate(cpuHand);
  var playerScore = evaluate(playerHand);

  var face = cpuHand[0][0];
  var suit = cpuHand[0][1];
  var table = document.getElementById("hands");
  table.rows[0].cells[0].innerHTML = '<img src=./Cards/' + face + "_of_" + suit + '.svg>';
  showScore();

  

  if (playerScore > cpuScore) {
    win();
  }
  if (playerScore < cpuScore) {
    loss();
  } else if (cpuScore == playerScore) {
    tie();
  }
}

function show() {
  var cpuHand = JSON.parse(document.getElementById('cpuHand').value);
  var face = cpuHand[0][0];
  var suit = cpuHand[0][1];
  var table = document.getElementById("hands");
  table.rows[0].cells[0].innerHTML = '<img src=./Cards/' + face + "_of_" + suit + '.svg>';
}
