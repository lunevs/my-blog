import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './addnewblog'
import userEvent from '@testing-library/user-event'

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
    const concatNewBlog = jest.fn()

    render(<AddBlogForm concatNewBlog={concatNewBlog} />)

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save data')

    userEvent.type(input, 'testing a form...' )
    userEvent.click(sendButton)

    expect(concatNewBlog.mock.calls).toHaveLength(1)
    expect(concatNewBlog.mock.calls[0][0].content).toBe('testing a form...' )
})