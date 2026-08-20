describe('Fake API Platzi - API Kategori', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1';

  let idKategori;
  let idKategoriKedua;

  const namaKategori = `Kategori Cypress ${Date.now()}`;
  const namaKategoriKedua = `Kategori Cypress Kedua ${Date.now()}`;

  const namaKategoriUpdate = `Kategori Update ${Date.now()}`;

  before(() => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories`,
      body: {
        name: namaKategori,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(namaKategori);

      idKategori = response.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories`,
      body: {
        name: namaKategoriKedua,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(namaKategoriKedua);

      idKategoriKedua = response.body.id;
    });

  });


  it('TC01 - Mengambil semua data kategori', () => {

    cy.request('GET', `${baseUrl}/categories`)
      .then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body).to.be.an('array');

        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('name');

      });

  });


  it('TC02 - Mengambil kategori berdasarkan ID 1', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/1`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', 1);

      expect(response.body.name).to.be.a('string');

    });

  });


  it('TC03 - Mengambil kategori berdasarkan ID 2', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/2`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', 2);

      expect(response.body.name).to.be.a('string');

    });

  });


  it('TC04 - Mengambil kategori dengan ID yang tidak valid', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/999999`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.be.oneOf([400, 404]);

      expect(response.body).to.exist;

    });

  });


  it('TC05 - Memverifikasi kategori pertama berhasil dibuat', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/${idKategori}`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', idKategori);

      expect(response.body.name).to.eq(namaKategori);

    });

  });


  it('TC06 - Memverifikasi kategori kedua berhasil dibuat', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/${idKategoriKedua}`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', idKategoriKedua);

      expect(response.body.name).to.eq(namaKategoriKedua);

    });

  });


  it('TC07 - Memperbarui data kategori pertama', () => {

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/categories/${idKategori}`,
      body: {
        name: namaKategoriUpdate,
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', idKategori);

      expect(response.body.name).to.eq(namaKategoriUpdate);

    });

  });


  it('TC08 - Memverifikasi kategori berhasil diperbarui', () => {

    cy.request(
      'GET',
      `${baseUrl}/categories/${idKategori}`
    ).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('id', idKategori);

      expect(response.body.name).to.eq(namaKategoriUpdate);

    });

  });


  it('TC09 - Menghapus kategori pertama', () => {

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/categories/${idKategori}`
    }).then((response) => {

      expect(response.status).to.be.oneOf([200, 204]);

    });

  });


  it('TC10 - Memverifikasi kategori pertama sudah terhapus', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/${idKategori}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.be.oneOf([400, 404]);

      expect(response.body).to.exist;

    });

  });


  it('TC11 - Menghapus kategori kedua', () => {

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/categories/${idKategoriKedua}`
    }).then((response) => {

      expect(response.status).to.be.oneOf([200, 204]);

    });

  });


  it('TC12 - Memastikan endpoint kategori dapat diakses', () => {

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