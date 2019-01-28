import { createComponents as factoryCreateComponents, createUnitTestComponent as factoryCreateUnitTestComponent } from './factory';
import './mixins';
import './app';
import './homepage';
import './login';
import './logout';
import './about';

export const createComponents = () => factoryCreateComponents();
export const createUnitTestComponent = elementName => factoryCreateUnitTestComponent(elementName);
export default {
  createComponents,
  createUnitTestComponent,
};
