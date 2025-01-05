describe('Delete User Tests', () => {
    const apiUrl = '/api/users'; 

    var user: any;
  
    beforeEach(() => {
      // Visit the page before each test
      cy.visit('/');
  
      // Check if any user exists
      cy.request('GET', apiUrl)
        .then((response) => {
          if (response.body.length === 0) {
            // If no users exist, create a new one
            const newUser = {
              userName: 'NewUserToDelete',
              avatar: 'assets/users/user-4.jpg', 
            };
  
            cy.request('POST', apiUrl, newUser)
              .then((response) => {
                user = response.body; // Store the newly created user
              });
          } else {
            // If users exist, select the last user
            user = response.body[response.body.length - 1];
          }
        });
    });
  
    // Approach 1: Delete User via API Request
    it('should delete a user via API', () => {
      cy.wait(1000); 
  
      // Delete the user using API request
      cy.request('DELETE', `${apiUrl}/${user.id}`).then((response) => {
        expect([200, 204]).to.include(response.status);
  
        // Verify the user no longer exists
        cy.request('GET', apiUrl).then((getResponse) => {
          expect(getResponse.body).to.not.include.deep.members([user]);
        });
      });
    });
  
    // Approach 2: Delete User via UI Interaction (Clicking the Bin Icon)
    it('should delete a user via UI', () => {

    // Because the first user will be deleted we have to pick/create an other 
    // Check if any user exists
      cy.request('GET', apiUrl)
      .then((response) => {
        if (response.body.length === 0) {
          // If no users exist, create a new one
          const newUser = {
            userName: 'NewUserToDelete',
            avatar: 'assets/users/user-4.jpg', 
          };

          cy.request('POST', apiUrl, newUser)
            .then((response) => {
              user = response.body; // Store the newly created user
            });
        } else {
          // If users exist, select the last user
          user = response.body[response.body.length - 1];
        }
      });

      cy.wait(1000);
  
      // Step 1: Select the user from the UI
      cy.get('app-card').contains(user.userName).click();
  
      // Step 3: Click the "bin" icon to delete the user
      cy.get('button').contains(user.userName).parents('app-card').find('.delete-icon').click();
  
      // Step 4: Verify that the user is no longer in the list (after deletion)
      cy.get('app-card').should('not.contain', user.userName);
  
      // Verify the user is deleted via the API as well
      cy.request('GET', apiUrl).then((getResponse) => {
        expect(getResponse.body).to.not.include.deep.members([user]);
      });
    });
  });