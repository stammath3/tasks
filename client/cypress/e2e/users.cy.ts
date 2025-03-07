describe('Users API Tests', () => {
    const apiUrl = '/api/users'; 
  
    it('should retrieve users with the correct structure and types', () => {
      cy.request('GET', apiUrl).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.be.an('array');
  
        if (response.body.length > 0) {
          // Check the structure of the first user
          const user = response.body[0];
  
          // Validate the keys in the user object
          expect(user).to.have.all.keys('id', 'userName', 'avatar');
  
          // Validate the types of each field
          expect(user.id).to.be.a('number');
          expect(user.userName).to.be.a('string');
          if (user.avatar) {
            expect(user.avatar).to.be.a('string');
          } else {
            expect(user.avatar).to.be.null;
          }
        }
      });
    });
  });