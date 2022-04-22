

describe('Blog app', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Blogs')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
        cy.get('#username').type('admin')
        cy.get('#password').type('qwe123qwe')
        cy.get('#login-button').click()

        cy.contains('logged-in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'admin', password: 'qwe123qwe' })
        })

        it('a new blog can be created', function() {
            cy.contains('add').click()
            cy.get('#addBlogTitle').type('blog title created by cypress')
            cy.get('#addBlogAuthor').type('Ivan Ivanov')
            cy.get('#addBlogUrl').type('http://localhost:3000')
            cy.contains('save').click()
            cy.contains('blog title created by cypress')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'some test title 44',
                    author: 'Test Author',
                    url: 'http://localhost:8080'
                })
            })

            it('it can be made important', function () {
                // ...
            })
        })
    })

})

