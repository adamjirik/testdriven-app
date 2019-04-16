const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'atleast8';

describe('Register', () => {

    it("Should display the register form correctly", () => {
        cy
        .visit('/register')
        .get('h1').contains('Register')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list')
            .get('.validation-list > .error').first().contains(
                'Username must be greater than 5 characters.'
            );;
    });

    it('Should allow user to register', () => {
        // register user
        cy
        .visit('/register')
        .get('input[name="username"]').type(username)
        .get('input[name="email"]').type(email)
        .get('input[name="password"]').type(password)
        .get('input[type=submit]').click()

        // assert user is redirected to '/'
        // assert '/' renders properly
        cy.contains('All Users');
        cy.contains(username);
        cy.get('.navbar-burger').click();
        cy.get('.navbar-menu').within(() => {
            cy
            .get('.navbar-item').contains('User Status')
            .get('.navbar-item').contains('Log Out')
            .get('.navbar-item').contains('Log in').should('not.be.visible')
            .get('.navbar-item').contains('Register').should('not.be.visible');
        })
    });

    it('Should validate the username field', () => {
        cy
        .visit('/register')
        .get('h1').contains('Register')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list > .error').contains('Username must be greater than 5 characters.')
        .get('input[type="text"]').type('moret5')
        .get('.validation-list')
        .get('.validation-list > .error').contains('Username must be greater than 5 characters.').should('not.be.visible')
        .get('.validation-list > .success').contains('Username must be greater than 5 characters.')
        cy.get('.navbar-burger').click();
        cy.get('.navbar-item').contains('Log In').click();
        cy.get('.navbar-item').contains('Register').click();
        cy.get('.validation-list > .error').contains(
            'Username must be greater than 5 characters.');
    });

    it('Should validate the email field', () => {
        cy
        .visit('/register')
        .get('h1').contains('Register')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list > .error').contains('Email must be greater than 5 characters.')
        .get('.validation-list > .error').contains('Email must be a valid email address.')
        .get('input[type="email"]').type('moret5')
        .get('.validation-list')
        .get('.validation-list > .error').contains('Email must be greater than 5 characters.').should('not.be.visible')
        .get('.validation-list > .success').contains('Email must be greater than 5 characters.')
        .get('input[type="email"]').type('moret5@test.com')
        .get('.validation-list')
        .get('.validation-list > .error').contains('Email must be a valid email address.').should('not.be.visible')
        .get('.validation-list > .success').contains('Email must be a valid email address.')
        cy.get('.navbar-burger').click();
        cy.get('.navbar-item').contains('Log In').click();
        cy.get('.navbar-item').contains('Register').click();
        cy.get('.validation-list > .error').contains(
            'Email must be a valid email address.');
    });

    it('Should validate the password field', () => {
        cy
        .visit('/register')
        .get('h1').contains('Register')
        .get('form')
        .get('input[disabled]')
        .get('.validation-list > .error').contains('Password must be at least 8 characters.')
        .get('input[type="password"]').type('atleast8')
        .get('.validation-list')
        .get('.validation-list > .error').contains('Password must be at least 8 characters.').should('not.be.visible')
        .get('.validation-list > .success').contains('Password must be at least 8 characters.')
        cy.get('.navbar-burger').click();
        cy.get('.navbar-item').contains('Log In').click();
        cy.get('.navbar-item').contains('Register').click();
        cy.get('.validation-list > .error').contains(
            'Password must be at least 8 characters.');
    });

});