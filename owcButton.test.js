const OwcButton = require("./owcButtonSrc");

describe("owcButton test suite", () => {
  beforeAll(() => {
    customElements.define("owc-button", OwcButton);
  });

  test("Should create the component", () => {
    document.body.innerHTML = `<owc-button></owc-button>`;
    expect(document.body.innerHTML).toContain("<owc-button>");
  });

  test("Should maintain the attribute shape when value is correct", () => {
    document.body.innerHTML = `<owc-button shape="circle"></owc-button>`;
    expect(document.body.innerHTML).toContain('<owc-button shape="circle">');
  });

  test("Should maintain the attribute face when value is correct", () => {
    document.body.innerHTML = `<owc-button face="raised"></owc-button>`;
    expect(document.body.innerHTML).toContain('<owc-button face="raised">');
  });

  test("Should not have any attribute when any value is not correct", () => {
    document.body.innerHTML = `<owc-button shape="incorrectValue"></owc-button>`;
    expect(document.body.innerHTML).toBe("<owc-button></owc-button>");
  });

  test("Should contain disabled attribute when its value is true and has other correct attributes", () => {
    document.body.innerHTML = `<owc-button shape="circle" disabled="true"></owc-button>`;
    expect(document.body.innerHTML).toContain('disabled="true"');
  });

  test("Should not contain disabled attribute when its value incorrect", () => {
    document.body.innerHTML = `<owc-button disabled="incorrectValue"></owc-button>`;
    expect(document.body.innerHTML).toBe("<owc-button></owc-button>");
  });

  test("Should not contain disabled attribute when its value is true and has other incorrect attributes", () => {
    document.body.innerHTML = `<owc-button shape="incorrectValue" disabled="true"></owc-button>`;
    expect(document.body.innerHTML).toBe("<owc-button></owc-button>");
  });

  test("Should render when passing a color attribute with a color name", () => {
    document.body.innerHTML = `<owc-button color="red"></owc-button>`;
    expect(document.body.innerHTML).toBe(
      '<owc-button color="red"></owc-button>'
    );
  });

  test("Should have red background when passing a color attribute with a color red", () => {
    document.body.innerHTML = `<owc-button color="red"></owc-button>`;
    let buttonElementBg = document.querySelector("owc-button").buttonElement
      .style.background;
    expect(buttonElementBg).toBe("red");
  });

  test("Should keep the same when changing an attribute to the same value", () => {
    document.body.innerHTML = `<owc-button color="red"></owc-button>`;
    let buttonElement = document.querySelector("owc-button");
    buttonElement.setAttribute("color", "red");
    expect(document.body.innerHTML).toBe(
      '<owc-button color="red"></owc-button>'
    );
  });

  test("Should change an attribute value when changing it", () => {
    document.body.innerHTML = `<owc-button color="red"></owc-button>`;
    let buttonElement = document.querySelector("owc-button");
    buttonElement.setAttribute("color", "blue");
    expect(document.body.innerHTML).toBe(
      '<owc-button color="blue"></owc-button>'
    );
  });

  test("Should have a blue border when defining face='outline' and color='blue'", () => {
    document.body.innerHTML = `<owc-button face='outline' color='blue'></owc-button>`;
    let buttonElement = document.querySelector("owc-button").buttonElement;
    expect(buttonElement.style.border).toBe("1px solid blue");
  });

  test("Should have a blue text color when defining face='outline' and color='blue'", () => {
    document.body.innerHTML = `<owc-button face='outline' color='blue'></owc-button>`;
    let buttonElement = document.querySelector("owc-button").buttonElement;
    expect(buttonElement.style.color).toBe("blue");
  });

  test("Should have default color when passing an incorrect color code", () => {
    document.body.innerHTML = `<owc-button color='incorrectValue'></owc-button>`;
    let buttonElement = document.querySelector("owc-button").buttonElement;
    expect(buttonElement.style.background).toBe("rgb(0, 204, 153)");
  });

  test("Should have a box shadow with the attribute face='raised'", () => {
    document.body.innerHTML = `<owc-button color='incorrectValue'></owc-button>`;
    let buttonElement = document.querySelector("owc-button").buttonElement;
    expect(buttonElement.style.boxShadow).toBeDefined();
  });
});
