/*
 *
 * But
 *
 *     AnyBlokJS.register(element_name, {
 *       template: #id,
 *       extend: [All class names],
 *       prototype: {
 *       }
 *     });
 *
 *     AnyBlokJS.new('My class name');
 */
import Vue from 'vue';

class AnyBlokJS {
  constructor() {
    this.components = {};
    this.component_names = [];
  }

  register = (elementName, declaration) => {
    let klass;
    if (elementName in this.components) {
      klass = this.components[elementName];
    } else {
      klass = {
        template: undefined,
        extend: [],
        prototypes: [],
      };
      this.components[elementName] = klass;
      this.component_names.push(elementName);
    }
    if (declaration.template !== undefined) klass.template = declaration.template;
    if (declaration.prototype !== undefined) {
      klass.prototypes.push(declaration.prototype);
    }
    if (declaration.extend !== undefined) {
      declaration.extend.forEach((extend) => {
        klass.extend.push(extend);
      });
    }
  }

  getPrototypeFor = (elementName) => {
    const component = this.components[elementName];
    const prototypes = [];
    component.extend.forEach((otherElementName) => {
      prototypes.push(...this.getPrototypeFor(otherElementName));
    });
    prototypes.push(...component.extend);
    return prototypes;
  }

  createComponents = () => {
    this.component_names.forEach((elementName) => {
      const component = this.components[elementName];
      const mixins = this.getPrototypeFor(elementName);
      Vue.component(elementName, (resolve) => {
        // eslint-disable-next-line
        console.log(' ==> vue', elementName);
        resolve({
          template: component.template,
          mixins,
        });
      });
    });
  }
}

const anyblok = new AnyBlokJS();

window.defineComponent = anyblok.register;

// eslint-disable-next-line
export function createComponents() {
  anyblok.createComponents();
}
