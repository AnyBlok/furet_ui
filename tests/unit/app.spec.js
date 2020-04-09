import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

describe('app component', () => {
  const wrapper = mount(getComponentPrototype('app'), {
    localVue, 
    router,
    i18n,
    mocks: {
      $store: {
        state: {
          global: {
            space_name: 'Test',
          },
          menus: {
            user: []
          },
        },
      },
    },
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-appbar component', () => {
  const wrapper = mount(getComponentPrototype('furet-ui-appbar'), {
    localVue, 
    router,
    i18n,
  });
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
  const wrapper = mount(getComponentPrototype('furet-ui-appbar-header'), {
    localVue, 
    router,
    i18n,
  });
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
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-user-menu'), { localVue, mocks, i18n });

    expect(wrapper.element).toMatchSnapshot();
  });
});
