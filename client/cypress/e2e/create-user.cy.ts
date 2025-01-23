describe('Create User Tests', () => {
    const apiUrl = '/api/users';
  
    beforeEach(() => {
      // Visit the main page before each test
      cy.visit('/');
    });
  
    it('should create a user programmatically via API', () => {
      const newUser = {
        userName: 'NewUserCypress',
        avatar: 'assets/users/user-2.jpg', 
      };
  
      // Send POST request to create a user
      cy.request('POST', apiUrl, newUser).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.userName).to.eq(newUser.userName);
        expect(response.body.avatar).to.eq(newUser.avatar);
      });
    });
  
    it('should create a user by interacting with the form', () => {
      // Click the "Add User" button
      cy.get('button').contains('Add User').click();
  
      // Wait for the form to be visible
      cy.get('form').should('be.visible');
  
      // Check if the "Create" button is disabled when we have not filled out the form
      cy.get('button').contains('Create').should('be.disabled');

      // Fill out the form fields
      cy.get('input[name="username"]').type('FormUserInteractive');
      cy.get('.avatar-selection img[src="assets/users/user-4.jpg"]').click();

      // Submit the form
      cy.get('button').contains('Create').click();
  
      // Verify the user is added to the list
      cy.get('#users').contains('FormUserInteractive').should('be.visible');

      cy.get('#users')
        .contains('FormUserInteractive')
        .parent() // Navigate to the parent element containing the avatar
        .find('img[src="assets/users/user-4.jpg"]')
        .should('be.visible');
    });
  });