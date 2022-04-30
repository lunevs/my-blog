import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import Blogs from './components/blogs'
import AuthUser from './components/authuser'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'

import './App.css'
import OneBlog from "./components/oneblog";


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
    }, [dispatch])

    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))


    return (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link to="/">Домой</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link to="/blogs">Гостевая книга</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link to="/users">Пользователи</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {user
                                ? <em>Вы вошли как {user.username}</em>
                                : <Link to="/login">login</Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>



            <Routes>
                <Route path='/' element={user ? <AuthUser /> : <Navigate replace to='/login' />} />
                <Route path='/' element={user ? <AuthUser /> : <Navigate replace to='/login' />} />
                <Route path='/blogs' element={user ? <Blogs /> : <Navigate replace to='/login' />} />
                <Route path='/blog/:id' element={user ? <OneBlog /> : <Navigate replace to='/login' />} />
                <Route path='/users' element={user ? <div /> : <Navigate replace to='/login' />} />
                <Route path='/login' element={<AuthUser />} />
            </Routes>

        </Router>
    )
}

export default App
