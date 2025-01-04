describe('Tasks API Tests', () => {
    const apiUrl = '/api/tasks'; // Update this to match your endpoint
  
    it('should retrieve tasks with the correct structure and types', () => {
      cy.request('GET', apiUrl).then((response) => {
        // Ensure the response status is 200
        expect(response.status).to.eq(200);
  
        // Verify the response body is an array
        expect(response.body).to.be.an('array');
  
        if (response.body.length > 0) {
          // Check the structure of the first task
          const task = response.body[0];
  
          // Validate the keys in the task object
          expect(task).to.have.all.keys('id', 'title', 'summary', 'dueDate', 'appUserId');
  
          // Validate the types of each field
          expect(task.id).to.be.a('number');
          expect(task.title).to.be.a('string');
          expect(task.summary).to.be.a('string');
          expect(new Date(task.dueDate)).to.be.a('date'); // Ensure it's a valid date
          expect(task.appUserId).to.be.a('number');
        }
      });
    });
  });
  