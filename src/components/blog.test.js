import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogElement from './blogelement'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blogElement = {
        title: 'some test title',
        author: 'Ivan Ivanovich',
        likes: 10,
        url: 'http://localhost/id/123'
    }

    const { container } = render(<BlogElement blog={blogElement} />)
    const div = container.querySelector('.blog')
    //screen.debug(div)
    expect(div).toBeDefined()
})

test('renders content 2', () => {
    const blogElement = {
        title: 'some test title',
        author: 'Ivan Ivanovich',
        likes: 10,
        url: 'http://localhost/id/123'
    }
    const mockHandler = jest.fn()
    const { container } = render(
        <BlogElement
            blog={blogElement}
            blogLikes={mockHandler}
            deleteBlog={() => console.log('empty')}
            likeCurrentBlog={() => console.log('empty')}
        />)
    const button = screen.getByText('like')
    screen.debug(button)
    userEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})