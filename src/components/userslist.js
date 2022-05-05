import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import userService from '../services/user'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom";


const UsersList = () => {

    const [usersList, setUsersList] = useState([])
    const currentUser = useSelector(state => state.user)

    useEffect(() => {
        userService
            .getAll()
            .then(response => {

                if (currentUser.status && currentUser.status === 'admin') {
                    console.log('you are Admin', currentUser)
                    setUsersList(response)
                } else {
                    console.log('filtered list before:', response)
                    const filteredUsers = response.filter(el => el.username === currentUser.username)
                    console.log('filtered list after:', filteredUsers)
                    setUsersList(filteredUsers)
                }


                return response

            })

    }, [])

    return (
        <div className='pageBody'>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Никнейм</th>
                    <th>ФИО</th>
                    <th>Статус</th>
                    <th>Телефон</th>
                </tr>
                </thead>
                <tbody>
                    {
                        usersList.map(user =>
                            (
                                <tr key={user.id}>
                                    <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                                    <td>{`${user.surname} ${user.name}`}</td>
                                    <td>{user.status}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList
