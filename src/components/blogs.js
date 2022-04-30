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
        <div>
            {user === null ? <div/> :
                <div>
                    <AddBlogForm />
                    <VisibilityFilter />
                    <Table striped>
                        <thead>
                            <tr>
                                <td>Blog title</td>
                                <td>Blog author</td>
                                <td>Blog likes</td>
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


