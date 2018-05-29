/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var active_player, current_score, global_score;
active_player = Math.floor(Math.random() *2);
current_score = 0;
global_score = [0, 0];

document.querySelector('.player-' + active_player + '-panel').classList.add('active');
document.querySelector('.dice').style.display = 'none';
document.querySelector('.btn-roll').addEventListener('click', function(event) {
    //generate a random number
    var die_face = Math.floor(Math.random() * 6 + 1);

    //update the die face to be shown
    document.querySelector('.dice').src = 'dice-' + die_face + '.png';
    document.querySelector('.dice').style.display = 'block';

    //update the current score of the player
    if (die_face !== 1){
        current_score += die_face;
        document.querySelector('#current-' + active_player).innerHTML = current_score;
    }
    else{
        current_score = 0;
        document.querySelector('#current-' + active_player).innerHTML = current_score;
        update_active_player();
    }

});

function update_active_player(){
    if (active_player === 0) {
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        active_player = 1
    }
    else {
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        active_player = 0;
    }
}

document.querySelector('.btn-hold').addEventListener('click', function(event) {
    // update global score
    global_score[active_player] += current_score;
    document.querySelector('#score-' + active_player).innerHTML = global_score[active_player];
    if (global_score[active_player] >= 100) {
        alert('Player ' + (active_player + 1) + ' has won! \n GAME OVER!');
        reset();
    }
    current_score = 0;
    document.querySelector('#current-' + active_player).innerHTML = current_score;
    update_active_player();
});

document.querySelector('.btn-new').addEventListener("click", function(event) {
    reset();
});

function reset() {
    document.querySelector('.dice').style.display = 'none';
    global_score = [0, 0];
    current_score = 0;
    active_player = Math.floor(Math.random() *2);
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 0;
    if (active_player === 1){
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    }
    else {
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
}