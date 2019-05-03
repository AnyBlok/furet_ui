import { mount } from 'vue-test-utils';
import '@/components';
import { getComponentPrototype } from '@/components/factory';
import sinon from 'sinon';


describe('app component', () => {
  const wrapper = mount(getComponentPrototype('app'));
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar component', () => {
  const wrapper = mount(getComponentPrototype('furet-ui-appbar'));
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-footer component', () => {
  const wrapper = mount(getComponentPrototype('furet-ui-footer'));
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-header component', () => {
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-header'));
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-header-brand component', () => {
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-header-brand'));
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-body component', () => {
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-body'));
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-footer component', () => {
  it('snapshot (empty)', () => {
    const mocks = {
      $store: { state: { menus: { spaceMenus: [] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-footer'), { mocks });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot (not empty)', () => {
    const mocks = {
      $store: { state: { menus: { spaceMenus: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-foot-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-footer'), { mocks });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-user-menu component', () => {
  it('snapshot (empty)', () => {
    const mocks = {
      $store: { state: { menus: { user: [] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-user-menu'), { mocks });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot (not empty)', () => {
    const mocks = {
      $store: { state: { menus: { user: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-head-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-user-menu'), { mocks });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-head-router-link component', () => {
  const spyRouter = sinon.spy();
  const mocks = {
    $router: { push: spyRouter },
  };
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-head-router-link'), { mocks });
  wrapper.setProps({
    label: 'fooBar',
    to: '/fooBar',
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('click', () => {
    wrapper.find('a').trigger('click');
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/fooBar');
  });
});

describe('furet-ui-appbar-head-router-link-button component', () => {
  const spyRouter = sinon.spy();
  const mocks = {
    $router: { push: spyRouter },
  };
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-head-router-link-button'), { mocks });
  wrapper.setProps({
    label: 'fooBar',
    to: '/fooBar',
    icon: 'spinner',
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('click', () => {
    wrapper.find('a').trigger('click');
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/fooBar');
  });
});

describe('furet-ui-appbar-spaces-menu component', () => {
  it('snapshot (empty)', () => {
    const mocks = {
      $store: { state: { menus: { spaces: [] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-spaces-menu'), { mocks });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot (not empty)', () => {
    const mocks = {
      $store: { state: { menus: { spaces: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-head-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-spaces-menu'), { mocks });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-space-menus component', () => {
  it('snapshot (empty)', () => {
    const mocks = {
      $store: { state: { menus: { spaceMenus: [] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-space-menus'), { mocks });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot (not empty)', () => {
    const mocks = {
      $store: { state: { menus: { spaceMenus: [
        {
          attrs: {},
          class: {},
          component: 'furet-ui-appbar-foot-router-link',
          domProps: {},
          name: 'test',
          nativeOn: {},
          on: {},
          props: {
            foo: 'bar',
          },
          style: {},
        },
      ] } } },
    };
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-space-menus'), { mocks });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar-foot-router-link component', () => {
  const spyRouter = sinon.spy();
  const mocks = {
    $router: { push: spyRouter },
  };
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-foot-router-link'), { mocks });
  wrapper.setProps({
    label: 'fooBar',
    to: '/fooBar',
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('click', () => {
    wrapper.find('a').trigger('click');
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/fooBar');
  });
});

describe('furet-ui-appbar-foot-router-link-button component', () => {
  const spyRouter = sinon.spy();
  const mocks = {
    $router: { push: spyRouter },
  };
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-foot-router-link-button'), { mocks });
  wrapper.setProps({
    label: 'fooBar',
    to: '/fooBar',
    icon: 'spinner',
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('click', () => {
    wrapper.find('a').trigger('click');
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/fooBar');
  });
});
