import React from 'react';
import Die from './components/Die.jsx'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti'
import Timer from './components/Timer.jsx';
function App() {
 
 
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [startTime, setStartTime] = React.useState(Date.now());
  const [endTime, setEndTime] = React.useState(Date.now());
  const [recordTime, setRecordTime] = React.useState(localStorage.getItem('time'))

  



  function randomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1
  }

 
React.useEffect(() => {
   
 
  const value = dice[0].value
  const allSame = dice.every(die => die.value === value)
  const allHeld = dice.every(die => die.held)
  if(allHeld && allSame) {
    setEndTime(Date.now())
    setTenzies(prev => !prev)
   
    
  }
}, [dice])




function rollDice() {
 
  setCount(prev => prev + 1)
  if(!tenzies) {
   
    
    setCount(prev => prev + 1)
    setDice(prevDice => prevDice.map((die, i) => {
      return die.held ? die :{ value: randomDiceNumber(), held: false,id: i}
    }))
  } else {
    setTenzies(prev => !prev)
    setDice(allNewDice())
    setCount(0)
    // Reset start time
    
    setStartTime(Date.now())
    setEndTime(Date.now())
    const time = (endTime - startTime) / 1000
   
    if(time < localStorage.getItem('time') || localStorage.getItem('time') === null) {
      localStorage.setItem('time', time)
      setRecordTime(time)
      
    }

   
  }
}

function holdDice (id) {
   
   
   setDice(prevDice => prevDice.map(die => {
    return die.id === id ? {...die, held: !die.held} : die
       
    
   }))
}



  function allNewDice() {
    const newDice = []
    
    for(let i = 0; i < 10; i++) {
      newDice.push(
        {
          value: randomDiceNumber(),
          held: false,
          id: i
        }
      )
    }
    return newDice
  }
  

 


// Do something that takes some time


 
 
const diceElements = dice.map(die => <Die {...die} key={die.id} holdDice={() =>holdDice(die.id)}/>) 

  return (
    <div className="tenzieHolder">
      <div className='confetiHolder'>
      {tenzies && <Confetti />}
      </div>
     <h1>Tenzies</h1>
     <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className='diceCont'>
     {diceElements}
    </div>
    <div className='roll mt-4'>
    <button type="button" className="btn btn-primary btn-lg mb-4" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    
    
    <h1>Personal Best: {Math.ceil(recordTime)}s</h1>
    <div className='timer'>
    <h1>Current Time</h1>
    {!tenzies && <Timer />}
    </div>
    </div>
    </div>
  )
}

export default App
