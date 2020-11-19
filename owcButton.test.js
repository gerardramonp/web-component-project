const owcButton = require("./owcButton");

describe("owcButton test suite", () => {
  customElements.define(
    "test-component",
    class extends HTMLElement {
      constructor() {
        super();
        const p = document.createElement("p");
        p.textContent = "It works!";
        this.appendChild(p);
      }
    }
  );

  test("custom elements in JSDOM", () => {
    document.body.innerHTML = `<h1>Custom element test</h1> <test-component></test-component>`;
    expect(document.body.innerHTML).toContain("It works!");
  });
});
