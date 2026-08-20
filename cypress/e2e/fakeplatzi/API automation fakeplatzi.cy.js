describe('Fake API Platzi - Categories API', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1';

  let categoryId;
  let secondCategoryId;

  const categoryName = `Cypress Category ${Date.now()}`;
  const secondCategoryName = `Cypress Second Category ${Date.now()}`;

  const updatedCategoryName = `Updated Category ${Date.now()}`;

  before(() => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories`,
      body: {
        name: categoryName,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(categoryName);

      categoryId = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories`,
      body: {
        name: secondCategoryName,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(secondCategoryName);

      secondCategoryId = response.body.id;
    });

  });

  it('TC01 - Get all categories', () => {

    cy.request('GET', `${baseUrl}/categories`)
      .then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body).to.be.an('array');

        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('name');

      });

  });

  it('TC02 - Get category by ID', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/1`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', 1);

      expect(response.body.name).to.be.a('string');

    });

  });

  it('TC03 - Get category ID 2', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/2`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', 2);

      expect(response.body.name).to.be.a('string');

    });

  });

  it('TC04 - Get invalid category', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/999999`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.be.oneOf([400, 404]);

      expect(response.body).to.exist;

    });

  });

  it('TC05 - Verify created category', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/${categoryId}`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', categoryId);

      expect(response.body.name).to.eq(categoryName);

    });

  });

  it('TC06 - Verify second created category', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/${secondCategoryId}`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', secondCategoryId);

      expect(response.body.name).to.eq(secondCategoryName);

    });

  });

  it('TC07 - Update category', () => {

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/categories/${categoryId}`,
      body: {
        name: updatedCategoryName,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', categoryId);

      expect(response.body.name).to.eq(updatedCategoryName);

    });

  });

  it('TC08 - Verify updated category', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/${categoryId}`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', categoryId);

      expect(response.body.name).to.eq(updatedCategoryName);

    });

  });

  it('TC09 - Delete first category', () => {

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/categories/${categoryId}`
    }).then((response) => {

      expect(response.status).to.be.oneOf([200, 204]);

    });

  });

  it('TC10 - Verify first category deleted', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/${categoryId}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.be.oneOf([400, 404]);

      expect(response.body).to.exist;

    });

  });

  it('TC11 - Delete second category', () => {

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/categories/${secondCategoryId}`
    }).then((response) => {

      expect(response.status).to.be.oneOf([200, 204]);

    });

  });

  it('TC12 - Verify categories endpoint is accessible', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.be.an('array');

      expect(response.body.length).to.be.greaterThan(0);

    });

  });

});