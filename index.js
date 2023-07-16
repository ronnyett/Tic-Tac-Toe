var gameCell = document.querySelectorAll(".cell");
var alertBox = document.querySelector(".alertBox");

let music = new Audio("mp3s/music.mp3");
let turn = new Audio("mp3s/ting.mp3");
let tie = new Audio("mp3s/wrong.mp3");


let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;

$(".player1").text("Player 1 : " + currentPlayer);
$(".player2").text("Player 2 : " + nextPlayer);




//function to start game
function startGame() {
    $(".cell").click(clicking);

}



function clicking() {
    if ($(this).text() === "") {
        turn.play();
        $(this).text(playerTurn);

        if (checkWin()) {
            music.play();
            noClick();
            //console.log(playerTurn + " is a winner!");
            alertshow(playerTurn + " is the winner!");

        }
        else if (checkTie()) {
            tie.play();

            noClick();

            //console.log("Its a tie!");
            alertshow("Its a tie!");


        }
        else {
            changePlayerTurn();
            alertshow("Turn for player " + playerTurn);

        }

    }
}



//function to change player's turn

function changePlayerTurn() {


    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}      //if (playerTurn === currentPlayer) { playerTurn = nextPlayer; } else{ playerTurn = currentPlayer;}


function checkWin() {
    const winConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]

        ];
    for (var i = 0; i < winConditions.length; i++) {
        var [k, l, m] = winConditions[i];

        if (gameCell[k].textContent !== "" && gameCell[k].textContent === gameCell[l].textContent && gameCell[l].textContent === gameCell[m].textContent) {
            return true;
        }

    } return false;

}

//function to check tie

function checkTie() {

    let emptycell = 0;
    $(".cell").each(function () {

        if ($(this).text() === "") {
            emptycell++;
        }
    });

    return emptycell === 0 && !checkWin();




}

//no click after winning or tie

function noClick() {
    $(".cell").off("click");
    $(".cell").addClass("noClickClass");



}


// function to restart
function restartt() {

    $(".cell").each(function () {
        music.pause();
        $(".cell").text("");
        $(".cell").removeClass("noClickClass");

    });



    startGame();

}

function alertshow(msgg) {

    $(".alertBox").text(msgg);
    alertBox.style.display = "block";
    setTimeout(function () {
        alertBox.style.display = "none";
    }, 4000);



}





$(".restartBtn").click(restartt);







//calling startGame() function
startGame();

