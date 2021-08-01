import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

function Play({ user }) {

    const deckURL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';

    const [deckState, setDeckState] = useState({});

    const [gameState, setGameState] = useState({
        gameStarted: false
    })

    const [computerHand, setComputerHandState] = useState({
        hand: [],
    });

    let [computerHandValue, setComputerHandValue] = useState(0);

    const [playerHand, setPlayerHandState] = useState({
        hand: [],
    });

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
                // computerHand.handValue += 11;
            }
            else if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                setComputerHandValue(computerHandValue+=10)
                // computerHand.handValue += 10;
            }
            else {
                setComputerHandValue(computerHandValue+=parseInt(card.value))
                // computerHand.handValue += parseInt(card.value);
            }
            
        });
    }

    function calculatePlayerHandWorth() { 
     
        console.log(playerHandValue)
        setPlayerHandValue(playerHandValue = 0);   
        console.log(playerHandValue)
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
        if (computerHandValue > 21 && playerHandValue > 21) {
            return 'Draw';
        }
        else if (computerHandValue < 21 && playerHandValue > 21) {
            return "Computer"
        }
        else if (computerHandValue < 21 && playerHandValue === 21) {
            return "Player";
        }
        else if (playerHandValue < 21 && computerHandValue === 21) {
            return "Computer";
        }
        else if (computerHandValue < 21 && computerHandValue > playerHandValue) {
            return "Computer";
        }
        else if (playerHandValue < 21 && computerHandValue < 21 && playerHandValue > computerHandValue) {
            return "Player";
        }
        else if (playerHandValue < 21 && computerHandValue < 21 && computerHandValue > playerHandValue) {
            return "Computer";
        }
        else if (playerHandValue === computerHandValue) {
            return "Draw";
        }
        else {
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
    }


    function playAgain() {
        window.location.reload();
    }



    const gameControls = 
    <> 
    <button className="btn btn-lg" onClick={drawCardPlayer} > Hit Me </button>
    <button className="btn btn-lg" onClick={finishGame} > Stay </button>
    </>

    return (
        <>
            <Navigation user={user} />
                <div className="alert alert-dark" role="alert" id="game-over" style={{display: 'none'}}>
                    <div className="text-center">

                    <h1 className="display-1">Game Over!</h1>
                    <h2 className="display-2" id="winner"></h2>
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
                                    <img src={card.image} className="img-fluid" key={idx} id="card" />
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
                                        <img src={card.image} className="img-fluid" key={idx} id="card" />
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