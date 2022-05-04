import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Navbar, Nav, Alert, Container, Button } from 'react-bootstrap'

import Blogs from './components/blogs'
import AuthUser from './components/authuser'
import Homepage from './components/homepage'
import RegPage from './components/regpage'
import UsersList from './components/userslist'

import { initializeBlogs } from './reducers/blogReducer'
import {initializeUser, logoutUser} from './reducers/authReducer'

import './App.css'
import OneBlog from "./components/oneblog";
import UserInfo from "./components/userinfo";


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
    }, [dispatch])

    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))
    const status = useSelector(state => (Object.keys(state.status).length === 0 ? null : state.status))


    return (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href='/'>Мы верим</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='#' as='span'>
                                <Link to="/blogs">Гостевая книга</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link to="/users">Пользователи</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" as="span">
                                {user
                                    ? <div>
                                        <em>Вы вошли как <Link to='/user'>{user.username}</Link></em>{' '}
                                        <Button variant="secondary" onClick={() => dispatch(logoutUser())}>Выйти</Button>
                                      </div>
                                    : <Link to="/login">login</Link>
                                }
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {status
                ? <Alert variant={status.type}>{status.message}</Alert>
                : <div />
            }


            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/blogs' element={user ? <Blogs /> : <Navigate replace to='/login' />} />
                <Route path='/blog/:id' element={user ? <OneBlog /> : <Navigate replace to='/login' />} />
                <Route path='/user' element={user ? <UserInfo /> : <Navigate replace to='/login' />} />
                <Route path='/user/:id' element={user ? <UserInfo /> : <Navigate replace to='/login' />} />
                <Route path='/users' element={user ? <UsersList /> : <Navigate replace to='/login' />} />
                <Route path='/reg' element={<RegPage />} />
                <Route path='/login' element={<AuthUser />} />
            </Routes>

        </Router>
    )
}

export default App
