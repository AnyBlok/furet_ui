import Vue from 'vue';

const components = {};
const componentNames = [];

export const defineComponent = (elementName, declaration) => {
  let klass;
  if (elementName in components) {
    klass = components[elementName];
  } else {
    klass = {
      template: undefined,
      extend: [],
      prototypes: [],
    };
    components[elementName] = klass;
    componentNames.push(elementName);
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
};

window.defineComponent = defineComponent;

const getPrototypeFor = (elementName) => {
  const component = components[elementName];
  const prototypes = [];
  if (component.extend.length !== 0) {
    component.extend.forEach((otherElementName) => {
      prototypes.push(...getPrototypeFor(otherElementName));
    });
  }
  prototypes.push(...component.prototypes);
  return prototypes;
};

export const getComponentPrototype = (elementName) => {
  const component = components[elementName];
  const mixins = getPrototypeFor(elementName);
  return {
    template: component.template,
    mixins,
  };
};

export const createComponents = () => {
  componentNames.forEach((elementName) => {
    Vue.component(elementName, (resolve) => {
      resolve(getComponentPrototype(elementName));
    });
  });
};
