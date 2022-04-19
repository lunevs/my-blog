import React from 'react'

const Statistics = ({ pos, neg, neu }) => {
    if (pos + neg + neu === 0) {
        return <div>No feedback given</div>
    }
    return (
        <div>
            <h1>statistics:</h1>
            <p>good: {pos}</p>
            <p>neutral: {neu}</p>
            <p>bad: {neg}</p>
            <p>all: {neg + pos + neu}</p>
            <p>average: {(pos - neg)/(neg + pos + neu)}</p>
            <p>positive: {100 * pos / (neg + pos + neu)}</p>
        </div>
    )
}

export default Statistics

