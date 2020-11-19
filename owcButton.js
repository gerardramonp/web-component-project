const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }
 
    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      height: 50px;
      width: 150px;
      box-sizing: border-box;
      border: none;
      background: #00cc99;
      color: #363636;
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
    }

    button:hover {
      transform: scale(1.06);
    }

    .pill {
      border-radius: 50px;
    }
    .rectangle{
      border-radius: 5px;
    }
    .circle{
      border-radius: 100%;
      width: 50px
    }
    .square{
      width: 50px;
      border-radius: 5px;
    }

    .outline {
      background: none !important;
    }
    .text {
      border: none !important;
      background: unset !important;
    }
    .raised {
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
    }

    .disabled {
      background: lightgray !important;
      border: 1px solid gray !important;
      cursor: not-allowed !important;
      color: gray !important;
      transition: unset !important;
    }
    .disabled:hover {
      transform: none !important;
    }

  </style>
 
  <div class="container">
    <button>label</button>
  </div>
`;

class OwcButton extends HTMLElement {
  constructor() {
    super();

    this.label = "label text";
    this.shape = "rectangle";
    this.face = "fill";
    this.color = "#00cc99";
    this.textcolor = "black";
    this.disabled = false;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.buttonElement = this._shadowRoot.querySelector("button");

    this.buttonElement.style.background = this.color;
    this.buttonElement.style.border = `1px solid ${this.color}`;
  }

  static get observedAttributes() {
    return ["label", "shape", "color", "face", "disabled", "textcolor"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    this[attributeName] = newValue;

    console.log(`${attributeName} old: ${oldValue} new: ${newValue}`);

    this.buttonElement.classList.remove("disabled");
    if (attributeName === "disabled" && newValue) {
      this.disabled = true;
    }

    this.buttonElement.style.background = this.color;
    this.buttonElement.style.color = this.textcolor;
    this.buttonElement.style.border = `1px solid ${this.test}`;

    if (oldValue !== newValue) {
      this.applyShape(this.shape);
      this.applyFace(this.face);
      this.applyIsDisabled();
      this.buttonElement.style.background = this.color;
    }

    this.render();
  }

  connectedCallback() {
    this.applyShape(this.shape);
    this.applyFace(this.face);
    this.applyIsDisabled();
    this.buttonElement.style.background = this.color;
  }

  applyShape(shapeType) {
    const shapeList = ["rectangle", "pill", "circle", "square"];
    const missingShapes = shapeList.filter((element) => element !== shapeType);
    missingShapes.forEach((element) => {
      this.buttonElement.classList.remove(element);
    });

    this.buttonElement.classList.add(shapeType);
  }

  applyFace(faceType) {
    const faceList = ["fill", "outline", "text", "raised"];
    const missingFaces = faceList.filter((element) => element !== faceType);
    missingFaces.forEach((face) => {
      this.buttonElement.classList.remove(face);
    });

    this.buttonElement.classList.add(faceType);
    if (faceType === "outline" || faceType === "text") {
      this.buttonElement.style.color = this.color;
      this.buttonElement.style.border = `1px solid ${this.color}`;
    }
  }

  applyIsDisabled() {
    if (this.disabled) {
      this.buttonElement.classList.add("disabled");
    } else {
      this.buttonElement.classList.remove("disabled");
    }
  }

  checkAttributes() {
    // check if attributes are correct and if not, apply default class
  }

  render() {
    this.buttonElement.innerHTML = this.label;
  }
}

window.customElements.define("owc-button", OwcButton);
