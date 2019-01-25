import { getRoutes as factoryGetRoutes } from './factory';
import './homepage';
import './login';
import './about';

export const getRoutes = () => factoryGetRoutes();
export default {
  getRoutes,
};
