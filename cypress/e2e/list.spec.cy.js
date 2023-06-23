import {
  changingStyle,
  circleCircle,
  circleContent,
  circleHead,
  circleLetter,
  circleSmall,
  circleTail,
  defaultStyle,
  modifiedStyle,
} from "./constants";

describe("Список", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("дефолтный список отрисовывается корректно", () => {
    cy.clock();
    cy.get(circleContent).should("have.length.at.least", 4);
    cy.get(circleLetter).not("be.empty");
    cy.get(circleHead).eq(0).contains("head");
    cy.get(circleTail).last().contains("tail");
  });

  it("элемент корректно добавляется в head", () => {
    cy.clock();
    let length = 0;
    cy.get(circleContent).then((chain) => {
      length = chain.length;
    });

    cy.get("input").eq(0).type("one");
    cy.get("button").contains("Добавить в head").click();
    cy.tick(500);

    cy.wait(500);
    cy.get(circleContent)
      .its("length")
      .should((count) => {
        expect(count).to.eq(length + 1);
      });

    cy.get(circleCircle)
      .eq(0)
      .should("have.attr", "class")
      .and("match", modifiedStyle);
    cy.get(circleLetter).eq(0).contains("one");
    cy.tick(500);
    cy.clock().invoke("restore");
    cy.get(circleCircle)
      .eq(0)
      .should("have.attr", "class")
      .and("match", defaultStyle);
  });

  it("элемент корректно добавляется в tail", () => {
    cy.get("input").eq(0).type("some");
    let length = 0;
    cy.get(circleContent).then((count) => {
      length = count.length;
    });
    cy.get("button").contains("Добавить в tail").click();
    cy.wait(500 * 6);
    cy.get(circleContent)
      .its("length")
      .should((count) => {
        expect(count).to.eq(length + 1);
      });
    cy.get(circleLetter).last().contains("some");
    cy.wait(500);
    cy.get(circleCircle)
      .last()
      .should("have.attr", "class")
      .and("match", defaultStyle);
  });

  it("элемент корректно добавляется по индексу", () => {
    let length = 0;
    cy.get(circleContent).then((count) => {
      length = count.length;
    });
    const index = 2;
    cy.get("input").eq(0).type("one");
    cy.get("input").eq(1).type(index);
    cy.get("button").contains("Добавить по индексу").click();
    cy.wait(3000);
    cy.get(circleCircle)
      .eq(2)
      .should("contain", "one")
      .should("have.attr", "class")
      .and("match", defaultStyle);
    cy.get(circleContent)
      .its("length")
      .should((count) => {
        expect(count).to.eq(length + 1);
      });
  });

  it("удаление элемента из head", () => {
    cy.clock();
    cy.get("button").contains("Удалить из head").click();
    cy.get(circleContent).each(($circle) => {
      cy.wrap($circle).should("not.have.text");
    });
    cy.tick(500);
    cy.get(circleContent)
      .should("have.length", 3)
      .each(($circle) => {
        cy.wrap($circle).invoke("text").should("not.be.empty");
      });
    cy.get(circleHead).first().contains("head");
    cy.get(circleTail).last().contains("tail");
  });
  

  it("элемент корректно удаляется из tail", () => {
    cy.get("button").contains("Удалить из tail").click();
    cy.get(circleCircle).last().prev().should("have.text", "")
    cy.get(circleCircle).last().should("have.attr", "class").and("match", changingStyle);
    cy.get(circleCircle).last().should("have.attr", "class").and("match", modifiedStyle);
    cy.get(circleSmall).should("not.exist");
    cy.get(circleCircle).each(($el) => {
      cy.wrap($el).should("not.to.be.empty");
      cy.wrap($el).should("have.attr", "class").and("match", defaultStyle)
    });
    cy.get(circleHead).first().contains("head");
    cy.get(circleTail).last().contains("tail");
  });

  
  

  it("элемент корректно удаляется по индексу", () => {
    cy.clock();
    const index = 2;
    cy.get("input").eq(1).type(String(index));
    let oldLength = 0;
    cy.get(circleCircle).its('length').then((length) => {
      oldLength = length
    });
    cy.get("button").contains("Удалить по индексу").click();
    cy.get(circleCircle).first().should("have.attr", "class").and("match", changingStyle);
    cy.tick(500)
    cy.get(circleCircle).each(($el, pos)  => {
       if (pos <= index) {
        cy.tick(500)
        cy.wrap($el).should("have.attr", "class").and("match", changingStyle)
       }
    })
    cy.tick(500)
    cy.get(circleCircle).eq(2).invoke("text").should("be.empty");
    cy.get(circleSmall).should("have.attr", "class").and("match", changingStyle);
    cy.tick(1000);
    cy.get(circleSmall).should("not.exist");
    cy.get(circleCircle).each($el => {
      cy.wrap($el).should("have.attr", "class").and("match", defaultStyle)
    })
   
    cy.get(circleCircle).its('length').then((length) => {
      expect(length).to.be.least(oldLength-1)
    });
  });

});
