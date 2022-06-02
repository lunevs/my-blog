import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Navbar, Nav, Alert, Container, Button, NavDropdown } from 'react-bootstrap'

import Blogs from './components/blogs'
import AuthUser from './components/authuser'
import Homepage from './components/homepage'
import RegPage from './components/regpage'
import UsersList from './components/userslist'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/authReducer'
import { initializeEvents } from './reducers/eventReducer'
import { initializeLocations } from "./reducers/locationsReducer";
import { initializeRooms } from "./reducers/roomReducer";

import './App.css'
import OneBlog from "./components/oneblog";
import UserInfo from "./components/userinfo";
import UserEdit from "./components/useredit";
import Events from "./components/events";
import AddEvent from "./components/addevent";
import RegEvent from "./components/regevent";
import EventItem from "./components/eventitem";
import Locations from "./components/locations";
import Rooms from "./components/rooms";
import Discount from "./components/discounts";


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeEvents())
        dispatch(initializeLocations())
        dispatch(initializeRooms())
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
                            <Nav.Link href='/blogs' as='span'>
                                <Link to="/blogs">Новости</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link to="/users">Пользователи</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link to="/events">Мероприятия</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link to="/questions">Опросы</Link>
                            </Nav.Link>
                            <NavDropdown title="Настройки">
                                <NavDropdown.Item href="#" as="span">
                                    <Link to="/locations">Объекты</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#" as="span">
                                    <Link to="/rooms">Комнаты</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#" as="span">
                                    <Link to="/discounts">Тарифы</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" as="span">
                                    <Link to="/settings">Пользовательские</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
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
                <Route path='/user/:id' element={user ? <UserEdit /> : <Navigate replace to='/login' />} />
                <Route path='/users' element={user ? <UsersList /> : <Navigate replace to='/login' />} />

                <Route path='/reg' element={<RegPage />} />
                <Route path='/login' element={<AuthUser />} />

                <Route path='/settings' element={<div />} />

                <Route path='/events' element={<Events />} />
                <Route path='/event/:id' element={<EventItem />} />
                <Route path='/addevent' element={<AddEvent />} />
                <Route path='/regevent/:id' element={<RegEvent />} />

                <Route path='/locations' element={<Locations />} />
                <Route path='/location/:id' element={<div />} />

                <Route path='/rooms' element={<Rooms />} />
                <Route path='/room/:id' element={<div />} />

                <Route path='/applications' element={<div />} />
                <Route path='/application/:id' element={<div />} />

                <Route path='/discounts' element={<Discount />} />
                <Route path='/discount/:id' element={<Discount />} />
            </Routes>

        </Router>
    )
}

export default App
