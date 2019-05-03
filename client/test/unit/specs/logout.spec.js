import { mount, createLocalVue } from 'vue-test-utils';
import '@/components';
import { i18nConf } from '@/i18n';
import { getComponentPrototype } from '@/components/factory';
import VueI18n from 'vue-i18n';
import sinon from 'sinon';

describe('logout component', () => {
  const spyStore = sinon.spy();
  const spyRouter = sinon.spy();
  const localVue = createLocalVue();
  localVue.use(VueI18n);
  const i18n = new VueI18n(i18nConf);
  const mocks = {
    $store: { commit: spyStore, state: { global: { userName: 'Foo Bar' } } },
    $router: { push: spyRouter },
    $route: { query: {} },
  };
  const wrapper = mount(
    getComponentPrototype('furet-ui-appbar-user-dropmenu'), { localVue, i18n, mocks });

  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('click on button without redirect', () => {
    wrapper.find('a.button').trigger('click');
    expect(spyStore.called).toBe(true);
    expect(spyStore.firstCall.lastArg).toMatchObject({
      user: [
        {
          component: 'furet-ui-appbar-head-router-link-button',
          name: 'login',
        },
      ],
    });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/');
  });
});
