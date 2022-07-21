import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Events = () => {

    const eventsList = useSelector(state => state.events)
    const applicationList = useSelector(state => state.applications)

    return (
        <div className='pageBody'>

            <Link to='/addevent'>Добавить мероприятие</Link>

            <Table striped>
                <thead>
                    <tr>
                        <th>Мероприятие</th>
                        <th>Начало</th>
                        <th>Регистрация</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {eventsList.map((e, idx) =>
                        <tr key={idx}>
                            <td><Link to={`/event/${e.id}`}>{e.title}</Link></td>
                            <td>{new Date(e.startDate).toDateString()}</td>
                            <td>{e.isRegistrationOpen ? 'открыта' : 'закрыта'}</td>
                            <td>{
                                e.isRegistrationOpen
                                    ? applicationList.find(el => el.event.id === e.id) !== undefined
                                        ? <Link to={`/regevent/${e.id}`}>моя заявка</Link>
                                        : <Link to={`/regevent/${e.id}`}>зарегистрироваться</Link>
                                    : <div />
                            }</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Events