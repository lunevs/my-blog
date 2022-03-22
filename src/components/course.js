import React from "react";

const CourseElement = ({items}) => {
    const total = items.parts.reduce((p, c) => p + c.exercises, 0)
    return (
        <div>
            <h1>{items.name}</h1>
            <table>
                <tbody>
                    {items.parts.map(el => (
                        <tr key={el.id}>
                            <td>{el.name}</td>
                            <td>{el.exercises}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = () => {
    const courseItems = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            {courseItems.map(el => <CourseElement key={el.id} items={el} /> )}
        </div>
    )

}

export default Course;