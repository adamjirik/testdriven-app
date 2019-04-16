const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'atleast8';


describe('Login', () => {

    it('should display the login form', () => {
        cy
            .visit('/login')
            .get('h1').contains('Log In')
            .get('form')
            .get('input[disabled]')
            .get('.validation-list')
            .get('.validation-list > .error').first().contains(
                'Email is required.'
            );
    });

    it('should allow a user to sign in', () => {
        // register user
        cy
            .visit('/register')
            .get('input[name="username"]').type(username)
            .get('input[name="email"]').type(email)
            .get('input[name="password"]').type(password)
            .get('input[type="submit"]').click()

        // log a user out
        cy.get('.navbar-burger').click();
        cy.contains('Log Out').click();

        // log a user in
        cy
            .get('a').contains('Log In').click()
            .get('input[name="email"]').type(email)
            .get('input[name="password"]').type(password)
            .get('input[type="submit"]').click()
            .wait(100);

        // assert user is redirected to '/'
        // assert '/' is displayed properly
        cy.contains('All Users');
        cy
            .get('table')
            .find('tbody > tr').last()
            .find('td').contains(username);
        cy.get('.navbar-burger').click();
        cy.get('.navbar-menu').within(() => {
            cy
                .get('.navbar-item').contains('User Status')
                .get('.navbar-item').contains('Log Out')
                .get('.navbar-item').contains('Log In').should('not.be.visible')
                .get('.navbar-item').contains('Register').should('not.be.visible');
        });
    });

    it('Should validate the email field', () => {
        cy
        .visit('/login')
        .get('h1').contains('Log In')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list > .error').contains('Email is required.')
        .get('input[type="email"]').type('moret5')
        .get('.validation-list')
        .get('.validation-list > .error').contains('Email is required.').should('not.be.visible')
        .get('.validation-list > .success').contains('Email is required.')
        cy.get('.navbar-burger').click();
        cy.get('.navbar-item').contains('Register').click();
        cy.get('.navbar-item').contains('Log In').click();
        cy.get('.validation-list > .error').contains(
            'Email is required.');
    });

    it('Should validate the password field', () => {
        cy
        .visit('/login')
        .get('h1').contains('Log In')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list > .error').contains('Password is required.')
        .get('input[type="password"]').type('moret5')
        .get('.validation-list')
        .get('.validation-list > .error').contains('Password is required.').should('not.be.visible')
        .get('.validation-list > .success').contains('Password is required.')
        cy.get('.navbar-burger').click();
        cy.get('.navbar-item').contains('Register').click();
        cy.get('.navbar-item').contains('Log In').click();
        cy.get('.validation-list > .error').contains(
            'Password is required.');
    });

});