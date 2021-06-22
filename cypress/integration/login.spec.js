/// <reference types = "cypress"/>

it('Testing the Login Page of Heroku', () => {
    // Load the page
    cy.visit('https://the-internet.herokuapp.com/login');
    
    // Verifying if the page title is correct
    cy.title().should('include', 'The Internet');
    cy.wait(1000);

    // Fill the username
    cy.get('#username').type('tomsmith');
    cy.wait(1000);
    
    // Fill the password
    cy.get('#password').type('SuperSecretPassword!');
    cy.wait(1000);

    // Click on Login
    cy.get('button.radius:nth-child(3)').click();
    
    // Verify the secure login by checking the "Logout" text visible or not
    // We can also put "Logout" to check out but in this case, prompt check should be more stable UI validation
    cy.contains('You logged into a secure area!').should('be.visible');
    
    // Logout from the Secure Area successfully
    cy.get('a.button.secondary.radius:nth-child(3)').click();
    
    // Verify the user redirected to login page after logging out 
    // We can also put "Login" to check out but in this case, prompt check should be more stable UI validation
    cy.contains('You logged out of the secure area!').should('be.visible');

    // WRONG USERNAME & PASSWORD ENTRY SCENARIOS

    // 1 - Entering wrong username and password => Warning is "Your username is invalid!"
    cy.get('#username').type('hakanyorganci');
    cy.wait(1000);
    cy.get('#password').type('911turboisbetterthanferrari');
    cy.wait(1000);

    // Click on Login
    cy.get('button.radius:nth-child(3)').click();

    // Verify if the wrong credential entry prompt pops out and it is visible
    cy.contains('Your username is invalid!').should('be.visible');

    // 2 - Entering correct username but wrong password => Warning is "Your password is invalid!"
    cy.get('#username').type('tomsmith');
    cy.wait(1000);
    cy.get('#password').type('911turboisbetterthanferrari');
    cy.wait(1000);

    // Click on Login
    cy.get('button.radius:nth-child(3)').click();

    // Verify if the wrong credential entry prompt pops out and it is visible
    cy.contains('Your password is invalid!').should('be.visible');

    
    // 3 - Entering wrong username but correct password => Warning is "Your password is invalid!"
    cy.get('#username').type('hakanyorganci');
    cy.wait(1000);
    cy.get('#password').type('SuperSecretPassword!');
    cy.wait(1000);

    // Click on Login
    cy.get('button.radius:nth-child(3)').click();

    // Verify if the wrong credential entry prompt pops out and it is visible
    cy.contains('Your username is invalid!').should('be.visible');

   
    /* 
    BONUS TCs:

    - Clicking on "Fork me on GitHub" button on the top right corner
    cy.get('[alt="Fork me on GitHub"]').click();
    cy.wait(2000);

    - Verifying if the GitHub page URL is launched
    cy.url().should('eq', 'https://github.com/saucelabs/the-internet');

    - Returning back to Login page
    cy.go('back');

    NOTE: I commented out all because origin page is different than the GitHub URL so
    I had to construct a different setup for it.
    Additionally I could not be able to sure if that link is the part of the test or not.
    */

    /* 
    Additional Note: Login pages must not show "Invalid Username" or "Invalid password" prompts specifically.
    It should show Wrong username or password entered
    */
}) 