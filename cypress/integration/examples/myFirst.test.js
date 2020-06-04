describe('FOOD page', () => {
    it('sould display La Carte with all foods', () => {
        // Go to login form
        cy.visit('/auth');
        cy.get("#user")
            .type('ubuntu');
        cy.get('#password')
            .type('ubuntu');
        cy.get('#login')
            .click();

        //Wait for authentification
        cy.wait(2000);

        //Go to 'La Carte'
        cy.visit('/carte');
        //Fill create food form;
        cy.get('.mat-content')
            .click();
        cy.get('#name')
            .type('Cy-test');
        cy.get('#type-selector')
            .click();
        cy.get('.myOption')
            .contains('Entrées')
            .then(option => {
                option[0].click();
            });
        // //Valid form
        cy.get('#create')
            .click();
        // //Wait for server response
        cy.wait(2000);

        //Open edition modal
        cy.contains('Cy-test')
            .siblings('div')
            .find('#edition')
            .click();
        //Change name input
        cy.get('#edition-name')
            .type('-Modified');
        //Change type
        cy.get('#type-selector-edition')
            .click()
        cy.get('.editionOption')
            .contains('Plats')
            .then(option => {
                option[0].click();
            });
        cy.get('#validate-edition')
            .click();
        cy.wait(2000);
        //Find delete btn
        cy.contains('Cy-test-Modified')
            .siblings('div')
            .find('#delete')
            .click();
        //Confirm delete into modal
        cy.contains('Confirmer')
            .click();
        // the target should not exist
        cy.contains('Cy-test-Modified').should('not.exist');
    });
});