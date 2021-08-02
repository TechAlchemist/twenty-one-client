import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

function Play({ user, handleLogout }) {

    const deckURL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';

    const [deckState, setDeckState] = useState({});

    const [gameState, setGameState] = useState({
        gameStarted: false
    })
    // eslint-disable-next-line
    const [computerHand, setComputerHandState] = useState({
        hand: [],
    });

    let [computerHandValue, setComputerHandValue] = useState(0);
    // eslint-disable-next-line
    const [playerHand, setPlayerHandState] = useState({
        hand: [],
    });
    // eslint-disable-next-line
    let [playerHandValue, setPlayerHandValue] = useState(0);

    useEffect(() => {
        fetch(deckURL)
        .then(response => response.json())
        .then(deck => setDeckState({ deck }))
    }, [])


    
    function dealComputerHand() {
        computerHand.hand.push(deckState.deck.cards.pop());
        computerHand.hand.push(deckState.deck.cards.pop());
    }

    function calculateComputerHandWorth() {     
        computerHand.hand.forEach(card => {
            if (card.value === "ACE") {
                setComputerHandValue(computerHandValue+=11)
            }
            else if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                setComputerHandValue(computerHandValue+=10)
            }
            else {
                setComputerHandValue(computerHandValue+=parseInt(card.value))
            }
            
        });
    }

    function calculatePlayerHandWorth() {  
        setPlayerHandValue(playerHandValue = 0);   
        playerHand.hand.forEach(card => {
            if (card.value === "ACE") {
                setPlayerHandValue(playerHandValue += 11);
            }
            else if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                setPlayerHandValue(playerHandValue += 10);
            }
            else {
                setPlayerHandValue(playerHandValue += parseInt(card.value));
            }
            
        });
    }

    function dealPlayerHand() {
        playerHand.hand.push(deckState.deck.cards.pop());
        playerHand.hand.push(deckState.deck.cards.pop());
    }

    function drawCardPlayer() {
        playerHand.hand.push(deckState.deck.cards.pop());
        calculatePlayerHandWorth();
    }

    function triggerGameStart() {
        if (gameState.gameStarted === false) {
            setGameState({gameStarted: true});
            dealComputerHand();
            calculateComputerHandWorth();
            dealPlayerHand();
            calculatePlayerHandWorth();
        }
    }

    function determineWinner() {
        // **important** this can happen if you draw 2 aces
        // TODO: Allow Aces to count as 11 or 1
        var playerName;
        if (user) playerName = user.username;
        else playerName = "Player 1";

        if (computerHandValue > 21 && playerHandValue > 21) {
            return 'Draw';
        }
        else if ((computerHandValue <= 21 && playerHandValue < 21 && computerHandValue > playerHandValue) || (computerHandValue <= 21 && playerHandValue > 21)) {
            return "Computer";
        }
        else if ((playerHandValue <= 21 && computerHandValue < 21 && playerHandValue > computerHandValue) || (playerHandValue <= 21 && computerHandValue > 21)) {
            return playerName;
        }
        else if (playerHandValue === computerHandValue) {
            return "Draw";
        }
        else {
            console.log('player hand: ' + playerHandValue + '   computerHandValue: ' + computerHandValue)
            alert('Oh no, something went horribly terribly wrong.');
        }
    }

    var winner = '';
    function finishGame() {
        winner = determineWinner();
        const wrapper = document.querySelector('#game-wrapper');
        wrapper.innerHTML = '';
        const gameOver = document.getElementById('game-over');
        const winnerTitle = document.getElementById('winner');
        if (winner === 'Draw') winnerTitle.innerHTML = "Draw!";
        else winnerTitle.innerHTML = winner += " wins!";
        gameOver.style.display = 'block';
        if (user) recordGame(winner);
    }


    function playAgain() {
        window.location.reload();
    }

    async function recordGame(winner) {
        // **important** API only handles wins and losses. 
        // TODO: Add ability to record draws.
        var gameStatus = '';
        if (!user) return;
        
        if (winner.trim() === 'Computer wins!' || winner === 'Draw') gameStatus = 'loss';
        else gameStatus = 'won';
        if (gameStatus !== '') fetch(`https://twenty-one-api.herokuapp.com/${user._id}?gameWon=${gameStatus}`, {method: 'POST'});
    }

    const gameControls = 
    <> 
    <button className="btn btn-lg" onClick={drawCardPlayer} > Hit Me </button>
    <button className="btn btn-lg" onClick={finishGame} > Stay </button>
    </>

    return (
        <>
            <Navigation user={user} handleLogout={handleLogout}/>
                <div className="alert alert-dark" role="alert" id="game-over" style={{display: 'none'}}>
                    <div className="text-center">

                    <h1 className="display-1">Game Over!</h1>
                    {/* // eslint-disable-next-line */}
                    <h2 className="display-2" id="winner">s</h2>
                    <br />
                    <button className="btn" id="play-button" onClick={playAgain}> Play Again? </button>
                    <Link to="/"> <button className="btn" id="play-button"> Home </button> </Link>
                    
                    </div>
                </div>
            <div className="game-wrapper" id="game-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="computer-banner">
                            <h1 className="display-3 text-center text-white"> Computer </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="computer-cards">
                            {computerHand.hand && computerHand.hand.map((card, idx) => 
                                <>
                                    <img src={card.image} className="img-fluid" key={idx} id="card"alt="Playing card." />
                                </>
                            )}
                        </div>
                        <div className="row">
                            {computerHandValue ? <p className="fs-1 text-white text-center"> HAND WORTH: {computerHandValue} </p> : <></> }
                        </div>
                    </div>
                </div>
                
                <div className="container">
                        <div className="row" id="gameboard-divider">
                            <p className="fs-1 text-center"> The Game is Blackjack</p>
                        </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="player-banner">
                            <h1 className="display-3 text-center text-white"> {user ? user.username : <> Player 1 </>} </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="player-cards">
                            {
                                playerHand.hand && playerHand.hand.map((card, idx) => 
                                    <>
                                        <img src={card.image} className="img-fluid" key={idx} id="card" alt="Playing card."/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="row">
                            {playerHandValue ? <p className="fs-1 text-white text-center"> Hand Worth: {playerHandValue} </p> : <></> }
                        </div>
                </div>
                
                <div className="container py-4">
                    { gameState.gameStarted === false ? <button className="btn" id="play-button" onClick={triggerGameStart}> <i className="bi bi-suit-spade-fill"> </i> Play Game <i className="bi bi-suit-spade-fill"> </i> </button> :  gameControls}
                </div>

            </div>
        </>
    );
}

export default Play;
