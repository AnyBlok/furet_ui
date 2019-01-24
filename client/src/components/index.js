import { createComponents as factoryCreateComponents } from './factory';
import './mixins';
import './app';
import './notifications';
import './homepage';
import './login';

export const createComponents = () => factoryCreateComponents();
export default {
  createComponents,
};
