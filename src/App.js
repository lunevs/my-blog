import './App.css';
import { useState } from 'react';
import Note from './components/notes';
import Statistics from './components/stats';
import History from "./components/history";
import Course from './components/course';
import Phonebook from './components/phonebook';

const Display = ({counter}) => <div>{counter}</div>
const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = ({notes}) => {

    const [counter, setCounter] = useState(0);
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })
    const [allClicks, setAll] = useState([])
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    })

    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const nextAnecdote = () => {
        if (selected >= anecdotes.length-1)
            setSelected(0)
        else
            setSelected(selected + 1)
    }
    const voteAnecdote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setClicks({...clicks, left: clicks.left + 1})
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setClicks({...clicks, right: clicks.right + 1})
    }

    const t = new Date()

    const goodFeedback = () => setFeedback({...feedback, good: feedback.good + 1})
    const neutralFeedback = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
    const badFeedback = () => setFeedback({...feedback, bad: feedback.bad + 1})

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    const getMaxOfArray = (arr) => Math.max.apply(null, arr)

    return (
        <div>

            <Phonebook />

            <br />
            <hr />
            <br />
            <br />

            <Course />

            <br />
            <hr />
            <br />
            <br />

            <Note notes={notes} />


            <br />
            <hr />
            <br />
            <br />

            <p>It's now {t.toString()}</p>
            <Display counter={counter} />
            <Button handleClick={increaseByOne} text="increaseByOne" />
            <Button handleClick={decreaseByOne} text="decreaseByOne" />
            <Button handleClick={setToZero} text="set to zero" />
            <br />
            <hr />
            <br />
            <br />

            {clicks.left}
            <Button handleClick={handleLeftClick} text="left" />
            <Button handleClick={handleRightClick} text="right" />
            {clicks.right}

            <History allClicks={allClicks} />

            <br />
            <hr />
            <br />
            <br />

            <h1>give feedback</h1>
            <Button handleClick={goodFeedback} text="good job" />
            <Button handleClick={neutralFeedback} text="I am neutral" />
            <Button handleClick={badFeedback} text="oy, bad!" />
            <Statistics neg={feedback.bad} pos={feedback.good} neu={feedback.neutral} />

            <br />
            <hr />
            <br />
            <br />

            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <p>has {votes[selected]} votes</p>
            <Button handleClick={voteAnecdote} text="vote" />
            <Button handleClick={nextAnecdote} text="next anecdote" />
            <br />
            <h1>Anecdote with the most votes</h1>
            <div>{anecdotes[votes.indexOf(getMaxOfArray(votes))]}</div>
            <p>has {getMaxOfArray(votes)} votes</p>


        </div>
    )
}

export default App;
