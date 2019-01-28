import { createComponents as factoryCreateComponents, getComponentPrototype as factoryGetComponentPrototype } from './factory';
import './mixins';
import './app';
import './homepage';
import './login';
import './logout';
import './about';

export const createComponents = () => factoryCreateComponents();
export const getComponentPrototype = elementName => factoryGetComponentPrototype(elementName);
export default {
  createComponents,
  getComponentPrototype,
};
