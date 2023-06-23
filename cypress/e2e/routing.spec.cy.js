describe("роутинг приложения", () => {
    const baseUrl = 'http://localhost:3000';
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    const pages = [
      { url: `/recursion`, title: "Строка" },
      { url: `/fibonacci`, title: "Последовательность Фибоначчи" },
      { url: `/sorting`, title: "Сортировка массива" },
      { url: `/stack`, title: "Стек" },
      { url: `/queue`, title: "Очередь" },
      { url: `/list`, title: "Связный список" },
    ];
  
    pages.forEach(({ url, title }) => {
      it(`должна открываться страница ${url}`, () => {
        cy.visit(`${baseUrl}${url}`);
        cy.contains(title);
      });
    });
  });