/// <reference types="cypress" />

describe('Verify Log In and Sign Up buttons exist', () => {
    beforeEach(() => {
        cy.visit('/')
        // Mock localStorage to ensure accessToken is null
        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', '');
            win.localStorage.setItem('language', 'en');//???????
        });
    });
    it(' Verify Log in button', () => {
        cy.get('[data-cy="logIn"]').should('exist').click()
        cy.url().should('include', 'auth/signIn')
        cy.get('h1').contains('Войти')
    })


    it('Verify Sign up button', () => {
        cy.get('[data-cy="signUp"]').should('exist').click()// ‼ doesn't work
        cy.get('a').contains('Зарегистрироваться').click()
        cy.url().should('include', 'auth/signUp')
        cy.get('h1').should('contain', 'Регистрация пользователя')
    })
})
