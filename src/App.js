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


const App = () => {
    const [counter, setCounter] = useState(0);

    const t = new Date()
    const a = 4

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Hello name="Ivan" age={5 + 7} />
            <Hello name="John" age={a * 5}/>
            <Hello name="April" age="0" />
            <p>It's now {t.toString()}</p>
            <Display counter={counter} />
            <Button onClick={increaseByOne} text="add one" />
            <Button onClick={decreaseByOne} text="minus one" />
            <Button onClick={setToZero} text="set to zero" />
        </div>
    )
}

export default App;
