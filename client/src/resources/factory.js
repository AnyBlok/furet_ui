import _ from 'underscore';

const resources = {};
const resourceNames = [];

// TODO removeResource = (resourceName) => {}

export const defineResource = (resourceName, declaration) => {
  let klass;
  if (resourceName in resources) {
    klass = resources[resourceName];
  } else {
    klass = {
      /*
       * {
       *    name:
       *    path:
       *    template_name:
       *    props: []
       *    transition : {}
       * }
       * */
      views: [],
      path: resourceName,
      templateName: resourceName,
      mustBeAuthenticated: false,
    };
    resources[resourceName] = klass;
    resourceNames.push(resourceName);
  }
  if (declaration.path !== undefined) klass.path = declaration.path;
  if (declaration.mustBeAuthenticated !== undefined) {
    klass.mustBeAuthenticated = declaration.mustBeAuthenticated;
  }
  if (declaration.views !== undefined) {
    declaration.views.forEach((view) => {
      let viewDefinition = _.find(klass.view, v => v.name === view.name);
      if (viewDefinition === undefined) {
        viewDefinition = {
          name: view.name,
          template: '',
          props: [],
          transition: {},
        };
        klass.view.push(viewDefinition);
      }
      if (view.path !== undefined) viewDefinition.path = view.path;
      if (view.template !== undefined) viewDefinition.template = view.template;
      if (view.props !== undefined) viewDefinition.props.push(...view.props);
      if (view.transition !== undefined) {
        viewDefinition.transition = Object.assign(viewDefinition.transition, view.transition);
      }
    });
  }
};

window.defineResource = defineResource;

export const getRoutes = () => {
  const routes = [];
  resourceNames.forEach((resourceName) => {
    const resource = resources[resourceName];
    const route = {
      name: resourceName,
      path: `/${resource.path}`,
    };
    if (resource.views.length === 0) {
      route.component = {
        template: `<${resource.templateName}></${resource.templateName}>`,
      };
      route.meta = { requiresAuth: resource.mustBeAuthenticated };
    }
    routes.push(route);
  });
  return routes;
};
