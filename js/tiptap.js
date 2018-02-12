var horizontalMax;
var verticalMax;
var removetimer;
var lifes = 2;
var score = 0;
var apparitionTimer = 2000;
var disapearanceTimer = 1800;

$(document).ready(function()
{
  renderGameboard(5,5);
  interval = setInterval(displayTarget, 2000);
  $('body').on('click','#target img', function()
    {
      clearTimeout(removetimer);
      playsound('#');
      removeTarget(true);
    });

  function playsound(sound)
  {
    $('body').append('<audio src="' + sound + '" autoplay></audio>');
  };

  function changeLife(){
  $('h2[data="life"]').html("life:" + lifes);
  };

  function changeScore()
  {
  $('h1[data="score"]').html("score:" + score);
  };

  function incrementScore(increment)
  {
    score = score + increment;
    changeScore();
    apparitionTimer -= 100;
    disapearanceTimer = apparitionTimer;
    clearInterval(interval);
    interval = setInterval(displayTarget, apparitionTimer);
  };

 // Display an alert containing Game Over
  function gameOver()
  {
    //alert('Game Over');

  };
  // Decrement the lifes, and display Game Over
   // if lifes is equal or below 0
  function loseLife()
  {
    lifes --;
    changeLife()
    if(lifes <=0)
    {
      gameOver();
      console.log('perdu', lifes);
    }
  };
  // Remove the target
   // If Status == true, increment score
   // Else execute loseLife
  function removeTarget(status)
  {
    $('#target').remove();
    clearTimeout(removetimer);
    if(status) {
      incrementScore(1);
    } else{
      loseLife();
    }
  };
  // Generate pseudo-random position for the target.
  // Launch countdown to disparition.
  function displayTarget()
  {
    var hor = 1 + Math.floor(Math.random() * horizontalMax);
    var ver = 1 + Math.floor(Math.random() * verticalMax);
    $('div[data-vertical="' + ver + '"] div[data-horizontal="' + hor + '"]').html('<div id="target" class="imgDiv"><img src="./target.png">');
    removetimer = setTimeout(function()
    {
      removeTarget(false);
    }, 1800);
  };

  function renderGameboard(horizontal = 10, vertical = 10)
  {
    horizontalMax = horizontal;
    verticalMax = vertical;
    var gameboard = "";
    for (var i = 1; i <= vertical ; i++)
    {
      gameboard += "<div data-vertical='" + i + "'>" ;
      for (var j = 1; j <= horizontal ; j++)
      {
        gameboard += "<div style= 'height:" + 100 / vertical + "vh;width:" + 100 / horizontal + "%; 'data-horizontal='" + j + "'></div>";
      }
      gameboard += "</div>" ;
    }
    $('section[data-use="gameboard"]').html(gameboard);
  };

});
