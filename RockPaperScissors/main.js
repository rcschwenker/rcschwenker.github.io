function select(id){

  var choice=id; //remembers player selection//
  var cpuChoice="";
  var rand=Math.random();

  if (rand>=0 &&rand<=0.33){
    cpuChoice="rock";
  }
  if (rand>=0.34 &&rand<=0.66){
    cpuChoice="paper";
  }
  if (rand>=0.67 &&rand<=1){
    cpuChoice='scissors';
  }
  evaluate(cpuChoice, choice);
}
function evaluate(cpuChoice, choice){
  if (cpuChoice==choice) {
    window.alert("tie!");
  }
  if (choice=="rock" && cpuChoice=="scissors"){
    win();
  }
  if (choice=="rock" && cpuChoice=="paper"){
    lose();
  }
  if (choice=="paper"&& cpuChoice=="scissors"){
    lose();
  }
  if (choice=="paper"&& cpuChoice=="rock"){
    win();
  }
  if (choice=="scissors" && cpuChoice=="paper"){
    win();
  }
  if (choice=="scissors" && cpuChoice=="rock"){
    lose();
  }
}
function win(){
  var lblWin=document.getElementById("wins");
  var win=lblWin.textContent;
  alert("You win!");
  lblWin.textContent=parseInt(win)+1; //0 not recognized as integer in 'win+1'
  //so 'parseInt(win)'converts 'win' into an integer
}
function lose(){
  var lblLose=document.getElementById("losses");
  var losses = lblLose.textContent;
  alert("You Lose!");
  lblLose.textContent=parseInt(losses)+1;
}
