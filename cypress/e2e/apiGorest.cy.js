const faker = require('faker');

describe('Teste de API Gorest', { env: { hideCredentials: true } }, () => {

  
  it('Listar todos os usuários', () => {
    cy.getUser().should((response) => {
  
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).to.be.not.null
      expect(300).to.be.below(2000)

    })
  })


  it('Deve cadastrar um novo usuário', () => {
    
    cy.postCreate().should((response) => {
      let users = null;
      cy.fixture('users.json').then((userData) => {
        users = userData;

        expect(response.status).to.eq(201)
        expect(response.statusText).to.eq('Created')
        expect(response.body.name).to.eq(users[0].name)
        expect(response.body.email).to.eq(users[0].email)
        expect(300).to.be.below(2000)
      
      })
    
    })
    
  })

  it('Não deve cadastrar um usuário já existente', () => {
    
    cy.postCreateExisting().should((response) => {

      const email  = response.body[0].field
      const message = response.body[0].message

      expect(response.status).to.eq(422)
      expect(response.body[0].field).to.eq('email')
      expect(response.body[0].message).to.eq('has already been taken')
      expect(300).to.be.below(2000)

    })

  })

  it('Deve excluir um usuário existente', () => {
    cy.deleteUser().should(({ status }) => {
      expect(status).to.eq(204)
      expect(300).to.be.below(2000)
   })

  })
  
  it('Deve atualizar todos os campos de um usuário', () => {
    cy.updateUserPut().should((response) => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(300).to.be.below(2000)
   }) 

  })

  it('Deve atualizar o email de um usuário', () => {
    cy.updateUserPatch().should((response) => {
      let updatePatch = null;
      cy.fixture('updatePatch.json').then((userData) => {
        updatePatch = userData

      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body.email).to.eq(updatePatch[0].email)
      expect(300).to.be.below(2000)
    }) 

  })
  
})

})