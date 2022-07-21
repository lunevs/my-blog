import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {Navbar, Nav, Container, Button, Alert} from 'react-bootstrap'

import Blogs from './components/blogs'
import AuthUser from './components/authuser'
import Homepage from './components/homepage'
import RegPage from './components/regpage'

import './App.css'
import OneBlog from "./components/oneblog";
import UserInfo from "./components/userinfo";
import UserEdit from "./components/useredit";
import Events from "./components/events";
import AddEvent from "./components/addevent";
import RegEvent from "./components/regevent";
import EventEdit from "./components/eventEdit";


const Userroutes = ({user, logoutHandle, status}) => {

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
                                <Link to="/events">Мероприятия</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" as="span">
                                {user
                                    ? <div>
                                        <em>Вы вошли как <Link to='/user'>{user.username}</Link></em>{' '}
                                        <Button variant="secondary" onClick={logoutHandle}>Выйти</Button>
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
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blog/:id' element={<OneBlog />} />

                <Route path='/user' element={<UserInfo />} />
                <Route path='/user/:id' element={<UserEdit />} />

                <Route path='/reg' element={<RegPage />} />
                <Route path='/login' element={<AuthUser />} />

                <Route path='/events' element={<Events />} />
                <Route path='/event/:id' element={<EventEdit />} />
                <Route path='/addevent' element={<AddEvent />} />
                <Route path='/regevent/:id' element={<RegEvent />} />

                <Route path='/application/:id' element={<div />} />
            </Routes>

        </Router>
    )
}

export default Userroutes
