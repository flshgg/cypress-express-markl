/// <reference types="cypress" />

//import {faker} from '@faker-js/faker'

// //button[contains(text(), "Create")] -> xpath

describe('tasks', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then((data) => {
            testData = data
        })
    })

    context('cadastro', () => {

            it('deve ser possível criar uma nova tarefa', () => {

        const taskname = 'Comprar Ketchup'

        cy.deleteTaskByName(taskname)
        cy.createTask(taskname)

        cy.contains('main div p', taskname)
            .should('be.visible')
    })

        it('não deve permitir tarefa duplicada', () => {

            const task = testData.dup

        cy.deleteTaskByName(task.name)
        cy.posttask(task)
        cy.createTask(task.name)
            //Dado que eu tenho uma tarefa duplicada


            // Quando faço o cadastro dessa tarefa

            //Então vejo a mensagem de duplicidade

            cy.get('.swal2-html-container')
                .should('be.visible')
                .and('have.text', 'Task already exists!')
    })

    it('campo obrigatório', () => {
        cy.createTask()
        cy.isRequired('This is a required field')

    })

})

    context('atualização', () => {
        
        it('deve concluir uma tarefa', () => {

            const task = {
                name: 'Jogar RL',
                is_done: false
            }

            cy.deleteTaskByName(task.name)
            cy.posttask(task)
            
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
    
            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
            })
    })
    context('exclusão', () => {
        
        it('deve remover uma tarefa', () => {

            const task = {
                name: 'Estudar Cypress',
                is_done: false
            }

            cy.deleteTaskByName(task.name)
            cy.posttask(task)
            
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
    
            cy.contains(task.name)
                .should('not.exist')
            })
    })
})
