describe('login ppc', () => {
    beforeEach(() => {
        // visita a plataforma antes de todos os passos
        cy.visit('https://plataforma.produzindocerto.com.br/#/auth/signin')
    })

    it('login-erro', function () {
        // tentativa de login com email e senha incorretos
        cy.get('#input-23').clear('te');
        cy.get('#input-23').type('teste@emailerrado.com');
        cy.get('#input-27').clear();
        cy.get('#input-27').type('senhaerrada');
        cy.get('.v-btn--block > .v-btn__content').click();

        // continua o teste mesmo se der o erro esperado na falha de login
        cy.on('uncaught:exception', (e, runnable) => {
            console.log('error', e)
            console.log('runnable', runnable)

            if (e.message.includes('Request failed with status code 400')) {

                return false
            }
        })
        cy.contains('span', 'Usuário ou senha incorretos.').should('be.visible')

    });


    it('login-senha-ok', function () {
        // login isolado com email e senha corretos
        cy.get('#input-23').clear();
        cy.get('#input-23').type('guilherme.cunha@produzindocerto.com.br');
        cy.get('#input-27').clear();
        cy.get('#input-27').type('Guifeitos@10');
        cy.get('.v-btn--block > .v-btn__content').click();
        cy.get('.d-sm-inline > .v-list-item > .v-list-item__content > .v-list-item__subtitle').contains('guilherme.cunha@produzindocerto.com.br')
    });

    it('login-logout', function () {
        // login e logout em sequencia
        cy.get('#input-23').clear();
        cy.get('#input-23').type('guilherme.cunha@produzindocerto.com.br');
        cy.get('#input-27').clear();
        cy.get('#input-27').type('Guifeitos@10');
        cy.get('.v-btn--block > .v-btn__content').click();
        cy.get('.v-list-item__icon > .v-btn > .v-btn__content > .v-icon').click();
        cy.wait(1700);
        cy.contains('span', 'Sair').click();

        // corrige se o url for diferente da tela de login
        cy.url().then(currentUrl => {
            if (currentUrl !== 'https://plataforma.produzindocerto.com.br/#/auth/signin') {
                cy.visit('https://plataforma.produzindocerto.com.br/#/auth/signin');

            }
        })

        cy.reload();
        cy.get('div').find('img', 'src').should('have.class', 'logo mx-9 d-none d-sm-block');
    })


})

