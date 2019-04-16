import _ from 'underscore';

const resources = {};
export const resourceNames = [];

export const removeResource = (resourceName) => {
  const index = resourceNames.indexOf(resourceName);
  if (index !== -1) {
    delete resources[resourceName];
    resourceNames.splice(index, 1);
  }
};

export const defineResource = (resourceName, declaration) => {
  let klass;
  if (resourceName in resources) {
    klass = resources[resourceName];
  } else {
    klass = {
      children: [],
      name: resourceName,
      path: resourceName,
      templateName: resourceName,
      props: [],
      mustBeAuthenticated: false,
    };
    resources[resourceName] = klass;
    resourceNames.push(resourceName);
  }
  if (declaration.path !== undefined) klass.path = declaration.path;
  if (declaration.templateName !== undefined) klass.templateName = declaration.templateName;
  if (declaration.props !== undefined) klass.props = declaration.props;
  if (declaration.mustBeAuthenticated !== undefined) {
    klass.mustBeAuthenticated = declaration.mustBeAuthenticated;
  }
  if (declaration.children !== undefined) {
    declaration.children.forEach((child) => {
      let childDefinition = _.find(klass.children, c => c.name === child.name);
      if (childDefinition === undefined) {
        childDefinition = {
          name: child.name,
          completeName: `${resourceName}_${child.name}`,
          templateName: child.name,
          path: child.name,
          props: [],
          mustBeAuthenticated: false,
        };
        klass.children.push(childDefinition);
      }
      if (child.path !== undefined) childDefinition.path = child.path;
      if (child.templateName !== undefined) childDefinition.templateName = child.templateName;
      if (child.props !== undefined) childDefinition.props.push(...child.props);
      if (child.mustBeAuthenticated !== undefined) {
        childDefinition.mustBeAuthenticated = child.mustBeAuthenticated;
      }
    });
  }
};

window.defineResource = defineResource;

const createRoute = (resource, defaultTemplateProps) => {
  let path = `/${resource.path}`;
  let templateProps = defaultTemplateProps || '';
  if (resource.path === resource.name) {
    if (resource.props.length !== 0) {
      resource.props.forEach((prop) => {
        path += `/:${prop}`;
        templateProps += ` v-bind:${prop}="${prop}"`;
      });
    }
  }
  const route = {
    name: resource.completeName || resource.name,
    path,
    props: templateProps !== '',
    meta: { requiresAuth: resource.mustBeAuthenticated },
    component: {},
  };
  if (resource.children === undefined || resource.children.length === 0) {
    route.component.template = `<${resource.templateName}${templateProps} />`;
  } else {
    route.children = [];
    if (resource.templateName === resource.name) {
      route.component.template = '<router-view />';
    } else {
      route.component.template = `<${resource.templateName}${templateProps} />`;
    }
    resource.children.forEach((child) => {
      route.children.push(createRoute(child, templateProps));
    });
  }
  return route;
};

export const getRoutes = () => {
  const routes = [];
  resourceNames.forEach((resourceName) => {
    const resource = resources[resourceName];
    routes.push(createRoute(resource));
  });
  return routes;
};
