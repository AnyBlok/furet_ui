import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

describe('app component: unlogged', () => {
  const wrapper = mount(getComponentPrototype('app'), {
    localVue, 
    router,
    i18n,
    mocks: {
      $store: {
        getters: {
          loggedIn: false,
        },
        state: {
          global: {
            root_menus: [],
          },
        },
      },
    },
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('app component: logged', () => {
  const wrapper = mount(getComponentPrototype('app'), {
    localVue, 
    router,
    i18n,
    mocks: {
      $store: {
        getters: {
          loggedIn: true,
        },
        state: {
          global: {
            root_menus: [],
            user_menus: [
              {label: 'Plop 1', path: 'path1'},
              {label: 'Plop 2', path: 'path2'},
              {label: 'Plop 3', path: 'path3'},
              {label: 'Plop 4', path: 'path4'},
            ],
          },
        },
      },
    },
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('app component: with root menus', () => {
  const wrapper = mount(getComponentPrototype('app'), {
    localVue, 
    router,
    i18n,
    mocks: {
      $store: {
        getters: {
          loggedIn: true,
        },
        state: {
          global: {
            root_menu: [
              {code: 'menu1', label: 'Menu 1', icon: {code: 'bars', type: 'is-success'}, description: 'One menu for Furet UI', path: '/spaces/1/resource/1'},
              {code: 'menu2', label: 'Menu 2', icon: {code: 'users', type: 'is-danger'}, path: '/spaces/1/resource/1'},
              {code: 'menu3', label: 'Menu 3', path: '/spaces/1/resource/1'},
              {code: 'menu4', label: 'Menu 4', icon: {code: 'bars'}, path: '/spaces/1/resource/1'},

            ],
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
    const wrapper = mount(getComponentPrototype('furet-ui-appbar-footer'));
    expect(wrapper.element).toMatchSnapshot();
  });
});
