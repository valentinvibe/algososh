import { 
  changingStyle, 
  circleCircle, 
  circleContent, 
  circleHead, 
  circleIndex, 
  circleLetter, 
  addButton,
  delButton,
  clearButton
} from "./constants";

describe('Стек', () => {
  function fill() {
    cy.get('input').type('one');
    cy.get('@addButton').click()
    cy.wait(500)
    cy.get('input').type('two');
    cy.get('@addButton').click();
    cy.wait(500)
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
    cy.get(addButton).as('addButton');
    cy.get(delButton).as('removeButton');
    cy.get(clearButton).as('clearButton');
  });
        

  it('кнопка должна быть неактивна при пустом инпуте', () => {
    cy.get('input').should('be.empty');
    cy.get('@addButton').should('be.disabled');
  });
    
  it('добавление елементов работает корректно', () => {
    cy.clock()
    cy.get('input').type('bleh');
    cy.get('@addButton').click();
    const element = cy.get(circleContent);
    cy.tick(500)
    element.within(() => {
      cy.get(circleHead).contains('top');
      cy.get(circleCircle).should('have.attr', 'class').and('match', changingStyle);
      cy.get(circleIndex).contains('0');
      cy.get(circleLetter).contains('bleh');
    });
    cy.tick(500);
    cy.get('input').type('blah');
    cy.get('@addButton').click();
    const newElement = cy.get(circleContent).eq(1);
    element.within(() => {
      cy.get(circleHead).should('be.empty');
    });
    cy.tick(500)
    newElement.within(() => {
      cy.get(circleHead).contains('top');
      cy.get(circleCircle).should('have.attr', 'class').and('match', changingStyle);
      cy.get(circleIndex).contains('1');
      cy.get(circleLetter).contains('blah');
      cy.tick(500);
    });
  });
    
  it('удаление елементов работает корректно', () => {
    fill();
    cy.clock()
    cy.get('@removeButton').click();
    cy.tick(500)
    cy.get(circleCircle).eq(0).should('have.attr', 'class').and('match', changingStyle);
    cy.get(circleContent).should('have.length', 1);
  });
    
  it('очистка стека работает корректно', () => {
    fill();
    cy.get('@clearButton').click();
    cy.get(circleContent).should('not.exist');        
  });
});