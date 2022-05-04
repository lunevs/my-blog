import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

import BlogElement from './blogelement'
import VisibilityFilter from "./visibilityfilter";
import AddBlogForm from "./addnewblog";

const Blog = () => {

    const user = useSelector(state => (Object.keys(state.user).length === 0 ? null : state.user))
    const blogs = useSelector(state => {
        if (state.filter !== '') {
            return state.blogs.filter(el => el.title.includes(state.filter))
        }
        return state.blogs
    })

    return (
        <div className='pageBody'>
            {user === null ? <div /> :
                <div>
                    <AddBlogForm />
                    <br />
                    <VisibilityFilter />
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Blog title</th>
                                <th>Blog author</th>
                                <th>Blog likes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => <BlogElement key={blog.id} blog={blog}/>)}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )
}


export default Blog


