import { defineResource, getRoutes, resourceNames, removeResource } from '@/resources/factory';

describe('components factory', () => {
  beforeEach(() => {
    resourceNames.forEach((resourceName) => {
      removeResource(resourceName);
    });
  });

  it('createComponents enpty resources', () => {
    const routes = getRoutes();
    expect(routes.length).toBe(0);
  });

  it('defineResource minimum route', () => {
    defineResource('test', {});
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test');
    expect(routes[0].props).toBe(false);
    expect(routes[0].component.template).toBe('<test />');
    expect(routes[0].children).toBe(undefined);
    expect(routes[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource path route', () => {
    defineResource('test', { path: 'other' });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/other');
    expect(routes[0].props).toBe(false);
    expect(routes[0].component.template).toBe('<test />');
    expect(routes[0].children).toBe(undefined);
    expect(routes[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource mustBeAuthenticated route', () => {
    defineResource('test', { mustBeAuthenticated: true });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test');
    expect(routes[0].props).toBe(false);
    expect(routes[0].component.template).toBe('<test />');
    expect(routes[0].children).toBe(undefined);
    expect(routes[0].meta.requiresAuth).toBe(true);
  });

  it('defineResource props route', () => {
    defineResource('test', { props: ['foo', 'bar'] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test/:foo/:bar');
    expect(routes[0].props).toBe(true);
    expect(routes[0].component.template).toBe('<test v-bind:foo="foo" v-bind:bar="bar" />');
    expect(routes[0].children).toBe(undefined);
    expect(routes[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource simple child route', () => {
    defineResource('test', { children: [{ name: 'sub' }] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test');
    expect(routes[0].props).toBe(false);
    expect(routes[0].component.template).toBe('<router-view />');
    expect(routes[0].meta.requiresAuth).toBe(false);
    expect(routes[0].children.length).toBe(1);
    expect(routes[0].children[0].name).toBe('test_sub');
    expect(routes[0].children[0].path).toBe('/sub');
    expect(routes[0].children[0].component.template).toBe('<sub />');
    expect(routes[0].children[0].props).toBe(false);
    expect(routes[0].children[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource child path route', () => {
    defineResource('test', { children: [{ name: 'sub', path: 'other' }] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test');
    expect(routes[0].props).toBe(false);
    expect(routes[0].component.template).toBe('<router-view />');
    expect(routes[0].meta.requiresAuth).toBe(false);
    expect(routes[0].children.length).toBe(1);
    expect(routes[0].children[0].name).toBe('test_sub');
    expect(routes[0].children[0].path).toBe('/other');
    expect(routes[0].children[0].component.template).toBe('<sub />');
    expect(routes[0].children[0].props).toBe(false);
    expect(routes[0].children[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource sub mustBeAuthenticated route', () => {
    defineResource('test', { children: [{ name: 'sub', mustBeAuthenticated: true }] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test');
    expect(routes[0].props).toBe(false);
    expect(routes[0].component.template).toBe('<router-view />');
    expect(routes[0].meta.requiresAuth).toBe(false);
    expect(routes[0].children.length).toBe(1);
    expect(routes[0].children[0].name).toBe('test_sub');
    expect(routes[0].children[0].path).toBe('/sub');
    expect(routes[0].children[0].component.template).toBe('<sub />');
    expect(routes[0].children[0].props).toBe(false);
    expect(routes[0].children[0].meta.requiresAuth).toBe(true);
  });

  it('defineResource props route', () => {
    defineResource('test', { children: [{ name: 'sub', props: ['bar'] }], props: ['foo'] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test/:foo');
    expect(routes[0].props).toBe(true);
    expect(routes[0].component.template).toBe('<router-view />');
    expect(routes[0].meta.requiresAuth).toBe(false);
    expect(routes[0].children.length).toBe(1);
    expect(routes[0].children[0].name).toBe('test_sub');
    expect(routes[0].children[0].path).toBe('/sub/:bar');
    expect(routes[0].children[0].component.template).toBe('<sub v-bind:foo="foo" v-bind:bar="bar" />');
    expect(routes[0].children[0].props).toBe(true);
    expect(routes[0].children[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource complexe route create with inherit', () => {
    defineResource('test', { props: ['foo'], templateName: 'other' });
    defineResource('test', { children: [{ name: 'sub', props: ['bar'] }] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test/:foo');
    expect(routes[0].props).toBe(true);
    expect(routes[0].component.template).toBe('<other v-bind:foo="foo" />');
    expect(routes[0].meta.requiresAuth).toBe(false);
    expect(routes[0].children.length).toBe(1);
    expect(routes[0].children[0].name).toBe('test_sub');
    expect(routes[0].children[0].path).toBe('/sub/:bar');
    expect(routes[0].children[0].component.template).toBe('<sub v-bind:foo="foo" v-bind:bar="bar" />');
    expect(routes[0].children[0].props).toBe(true);
    expect(routes[0].children[0].meta.requiresAuth).toBe(false);
  });

  it('defineResource complexe route create complexe with multi injerit', () => {
    defineResource('test', { props: ['foo'], templateName: 'other' });
    defineResource('test', { children: [{ name: 'sub', templateName: 'sub2' }] });
    defineResource('test', { children: [{ name: 'sub', props: ['bar'] }] });
    const routes = getRoutes();
    expect(routes.length).toBe(1);
    expect(routes[0].name).toBe('test');
    expect(routes[0].path).toBe('/test/:foo');
    expect(routes[0].props).toBe(true);
    expect(routes[0].component.template).toBe('<other v-bind:foo="foo" />');
    expect(routes[0].meta.requiresAuth).toBe(false);
    expect(routes[0].children.length).toBe(1);
    expect(routes[0].children[0].name).toBe('test_sub');
    expect(routes[0].children[0].path).toBe('/sub/:bar');
    expect(routes[0].children[0].component.template).toBe('<sub2 v-bind:foo="foo" v-bind:bar="bar" />');
    expect(routes[0].children[0].props).toBe(true);
    expect(routes[0].children[0].meta.requiresAuth).toBe(false);
  });

  it('removeResource unexisting resource', () => {
    removeResource('unexisting');
  });
});
