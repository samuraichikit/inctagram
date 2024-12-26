export default class HomePage {
//selectors

//methods
    open = (): void => {
        cy.visit('/')
    }

    openHome = (): void => {
        cy.visit('/en')
    }

}
