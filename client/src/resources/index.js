import { getRoutes as factoryGetRoutes } from './factory';
import './homepage';
import './login';

export const getRoutes = () => factoryGetRoutes();
export default {
  getRoutes,
};
