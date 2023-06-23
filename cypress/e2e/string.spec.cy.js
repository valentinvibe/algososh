import {
    circleLetter,
    circleCircle,
    defaultStyle,
    changingStyle,
    modifiedStyle
} from './constants.js';

import {
    CY_INPUT,
    CY_CIRCLE,
    CY_SUBMIT_BTN,
    CHANGING_COLOR,
    DEFAULT_COLOR,
    MODIFIED_COLOR,
    CY_DELAY
} from './constants.js'

describe('Строка', () => {
    const testValue = "qwer";
    beforeEach(()=> {
        cy.visit(`http://localhost:3000/recursion`);
        cy.get('button[type=submit]').as('button');
    })

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        // cy.get('button').as('button');
        cy.get('input').should('be.empty');
        cy.get('@button').should('be.disabled');
        cy.get('input').type('test');
        cy.get('@button').should('be.enabled');
    })

    it('анимация должна работать правильно', () => {
        cy.get('button').contains('Развернуть').as('button');
        cy.clock();
        cy.get('input').type('test');
        cy.get('@button').click();
        let word = 'test';
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i).contains(word[i]);
        }
        cy.get(circleCircle).each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', defaultStyle);
        });
        cy.tick(1000);
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i).contains(word[i]);
        }
        cy.get(circleCircle).each(($circle, $index) => {
            if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', changingStyle);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', defaultStyle);
            }
        });
        cy.tick(1000);
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i).contains(word[i]);
        }
        cy.get(circleCircle).each(($circle, $index) => {
            if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', modifiedStyle);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', defaultStyle);
            }
        });
        cy.tick(1000);
        word = 'test';
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i).contains(word[i]);
        }
        
        cy.get(circleCircle).each(($circle, $index) => {
             if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', modifiedStyle);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', changingStyle);
            }
        });
        cy.tick(1000);
        word='tset';
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i).contains(word[i]);
        }
        cy.get(circleCircle).each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', modifiedStyle);
       });

    })

})    
