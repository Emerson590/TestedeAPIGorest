const faker = require('faker')
const deleteUser = require('../fixtures/deleteUser.json')
const authorization = `Bearer ${Cypress.env('token')}`
const API_URL = Cypress.env('API_URL')

// Comando para listar usuários
Cypress.Commands.add('getUser', () => {
  cy.api({
    method: 'GET',
    url: `${API_URL}`,
    headers: { authorization },
    failOnStatusCode: false
  })
})

// Comando para criar novos usuários
Cypress.Commands.add('postCreate', () => {
    const newUsers = []
  for (let i = 0; i < 5; i++) {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      gender: faker.random.arrayElement(['Male', 'Female']),
      status: faker.random.arrayElement(['Active', 'Inactive']),
    }
    newUsers.push(user)
    
  }
  
  // Salvar os usuários gerados em um arquivo JSON  
  cy.writeFile('cypress/fixtures/users.json', newUsers)
  cy.log('Novos usuários gerados: ', newUsers)

// Enviar uma requisição POST com um dos usuários gerados
  cy.api({
    method: 'POST',
    url: `${API_URL}`,
    headers: { authorization },
    body: newUsers[0],
    failOnStatusCode: false
  })
})

// Comando para criar um usuário já existente
Cypress.Commands.add('postCreateExisting', () => {
  cy.api({
    method: 'GET',
    url: `${API_URL}`,
    headers: { authorization },
    failOnStatusCode: false
  }).should((response) => {
  
    expect(response.status).to.eq(200)
    expect(response.statusText).to.equal('OK')
    expect(response.body).to.be.not.null
    expect(300).to.be.below(2000)
    const user = response.body[1]

    cy.api({
      method: 'POST',
      url: `${API_URL}`,
      headers: { authorization },
      body: user,
      failOnStatusCode: false
    })
 })
 
})

// Comando para deletar um usuário
Cypress.Commands.add('deleteUser', () => {

  cy.api({
    method: 'POST',
    url: `${API_URL}`,
    headers: { authorization },
    body: deleteUser,
    failOnStatusCode: false
  }).should((response) => {
   
        expect(response.status).to.eq(201)
        expect(response.statusText).to.equal('Created')
        expect(response.body.name).to.eq(deleteUser.name)
        expect(response.body.email).to.eq(deleteUser.email)
        const id = response.body.id
          cy.api({
          method: 'DELETE',
          url: `${API_URL}/${id}`,
          headers: { authorization },
          failOnStatusCode: false

        
        })
     })
   })

// Comando para atualizar um usuário via PUT
Cypress.Commands.add('updateUserPut', () => {
    const userPut = []
  for (let i = 0; i < 2; i++) {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      gender: faker.random.arrayElement(['Male', 'Female']),
      status: faker.random.arrayElement(['Active', 'Inactive']),
    }
    userPut.push(user)
    
  }
  
  // Salvar os usuários gerados em um arquivo JSON
  cy.writeFile('cypress/fixtures/updatePut.json', userPut)
  cy.log('Novos usuários gerados: ', userPut)
 
  cy.api({
    method: 'POST',
    url: `${API_URL}`,
    headers: { authorization },
    body: userPut[0],
    failOnStatusCode: false
  }).should((response) => {

    let updatePut = null;
      cy.fixture('updatePut.json').then((userData) => {
        updatePut = userData;

        expect(response.status).to.eq(201)
        expect(response.statusText).to.equal('Created')
        expect(response.body.name).to.eq(updatePut[0].name)
        expect(response.body.email).to.eq(updatePut[0].email)
        const id = response.body.id
          cy.api({
          method: 'PUT',
          url: `${API_URL}/${id}`,
          headers: { authorization },
          body: updatePut[1],
          failOnStatusCode: false
       
        })
     })
   })
})

// Comando para atualizar um usuário via PATCH
Cypress.Commands.add('updateUserPatch', () => {
  const userPatch = []
for (let i = 0; i < 2; i++) {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(['Male', 'Female']),
    status: faker.random.arrayElement(['Active', 'Inactive']),
  }
  userPatch.push(user)
  
}

// Salvar os usuários gerados em um arquivo JSON
cy.writeFile('cypress/fixtures/updatePatch.json', userPatch)
cy.log('Novos usuários gerados: ', userPatch)

cy.api({
  method: 'POST',
  url: `${API_URL}`,
  headers: { authorization },
  body: userPatch[0],
  failOnStatusCode: false
}).should((response) => {

  let updatePatch = null;
    cy.fixture('updatePatch.json').then((userData) => {
      updatePatch = userData;

      expect(response.status).to.eq(201)
      expect(response.statusText).to.equal('Created')
      expect(response.body.name).to.eq(updatePatch[0].name)
      expect(response.body.email).to.eq(updatePatch[0].email)
      const id = response.body.id
      const newEmail = response.body.email
        cy.api({
        method: 'PATCH',
        url: `${API_URL}/${id}`,
        headers: { authorization },
        body: newEmail,
        failOnStatusCode: false
     
      })
   })
 })
})



