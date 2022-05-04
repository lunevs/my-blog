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
                setUsersList(response)
                return response
            })

        if (currentUser.status && currentUser.status === 'lieder') {
            console.log('you are Admin', currentUser)
        } else {
            console.log('you are NOT admin', currentUser)
        }
    }, [])

    return (
        <div className='pageBody'>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                    {
                        usersList.map(user =>
                            (
                                <tr key={user.id}>
                                    <td>1</td>
                                    <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList
