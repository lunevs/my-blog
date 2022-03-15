import './App.css';
import { useState } from 'react';

const Hello = ({ age, name }) => {

    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}! You are {age} years old</p>
            <p>You were probably born in {bornYear()}</p>
        </div>
    )
}

const Display = ({counter}) => <div>{counter}</div>
const Button = ({text, onClick}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>the app is used by pressings the buttons</div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const App = () => {
    const [counter, setCounter] = useState(0);
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setClicks({...clicks, left: clicks.left + 1})
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setClicks({...clicks, right: clicks.right + 1})
    }

    const t = new Date()

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <p>It's now {t.toString()}</p>
            <Display counter={counter} />
            <Button onClick={increaseByOne} text="increaseByOne" />
            <Button onClick={decreaseByOne} text="decreaseByOne" />
            <Button onClick={setToZero} text="set to zero" />
            <br />
            <br />
            <br />

            {clicks.left}
            <Button onClick={handleLeftClick} text="left" />
            <Button onClick={handleRightClick} text="right" />
            {clicks.right}

            <History allClicks={allClicks} />
        </div>
    )
}

export default App;
