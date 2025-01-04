// Creates a task for the last user it finds in the list of users. 
// If no users exist, it creates a new user and then creates a task for that user. 

describe('Create Task for User', () => {
    const userApiUrl = '/api/users';  // The API endpoint for users
    const taskApiUrl = '/api/tasks';  // The API endpoint for tasks
  
    var user: any;
  
    beforeEach(() => {
      // Check if any user exists
      cy.request('GET', userApiUrl)
        .then((response) => {
          if (response.body.length === 0) {
            // If no users exist, create a new one
            const newUser = {
              userName: 'NewUser123',
              avatar: 'assets/users/user-4.jpg',  // Optional field
            };
  
            cy.request('POST', userApiUrl, newUser)
              .then((response) => {
                user = response.body;  // Store the newly created user
              });
          } else {
            // If users exist, select the last user
            user = response.body[response.body.length - 1];
          }
        });
    });
  
    it('should create a task for the user programmatically via API', () => {
      cy.wait(1000);  // Wait for the user creation process to finish
  
      // Create a task for the selected user
      const task = {
        title: 'New Task for ' + user.userName,
        summary: 'This is a test task',
        dueDate: "10/03/2025",
        appUserId: user.id,  // Use the user's ID
      };
  
      // Send a POST request to create a task for the user
      cy.request('POST', taskApiUrl, task)
        .then((response) => {
          expect(response.status).to.eq(201);  // Assert that the task creation was successful
          expect(response.body).to.have.property('id');  // Ensure the task has an ID
          expect(response.body.title).to.eq(task.title);  // Check the task title
          expect(response.body.appUserId).to.eq(user.id);  // Verify that the task is associated with the correct user
        });
  
      // Optionally, check the UI to ensure the task appears in the user's task list
      cy.wait(1000);
      cy.visit('/'); // Navigate to the task list page
      cy.get('app-user').contains(user.userName).click();
      cy.get('#tasks ul').should('contain', 'New Task for ' + user.userName);
      cy.get('#tasks ul li').last().should('contain', 'New Task for ' + user.userName);
    });


    it('should create a task for the selected user from the UI', () => {

      cy.visit('/');

      cy.wait(1000);  // Wait for user creation if needed
  
      // Step 1: Select the user from the UI (click on the last user)
      cy.get('app-user').contains(user.userName).click();
  
      // Step 2: Verify that the user is selected (the task section should be visible)
      cy.get('#tasks').should('be.visible');
      cy.get('button').contains('Add Task').should('be.visible');
  
      // Step 3: Click on the "Add Task" button
      cy.get('button').contains('Add Task').click();
  
      // Step 4: Fill out the task form
      cy.get('input[name="title"]').type('New Task for ' + user.userName);
      cy.get('textarea[name="summary"]').type('This is a summary for the new task created by UI.');
      cy.get('input[name="due-date"]').type('2025-01-10');  // Example due date
  
      // Step 5: Submit the form to create the task
      cy.get('button[type="submit"]').click();
  
      // Step 6: Verify the task appears in the task list
      cy.get('#tasks ul').should('contain', 'New Task for ' + user.userName);
      cy.get('#tasks ul li').last().should('contain', 'New Task for ' + user.userName);
    });
  });