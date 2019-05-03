import { mount, createLocalVue } from 'vue-test-utils';
import '@/components';
import { i18nConf } from '@/i18n';
import { getComponentPrototype } from '@/components/factory';
import VueI18n from 'vue-i18n';
import sinon from 'sinon';

describe('login component', () => {
  const spyNotify = sinon.spy();
  const spyStore = sinon.spy();
  const spyRouter = sinon.spy();
  const localVue = createLocalVue();
  localVue.use(VueI18n);
  const i18n = new VueI18n(i18nConf);

  it('snapshot', () => {
    const wrapper = mount(getComponentPrototype('login'), { localVue, i18n });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('click on button without redirect', () => {
    const mocks = {
      $notify: spyNotify,
      $store: { commit: spyStore },
      $router: { push: spyRouter },
      $route: { query: {} },
    };
    const wrapper = mount(getComponentPrototype('login'), { localVue, i18n, mocks });
    wrapper.find('a.button').trigger('click');
    expect(spyNotify.called).toBe(true);
    expect(spyNotify.firstCall.lastArg).toMatchObject({
      duration: 5000,
      text: 'Welcome my feret !!!',
      title: 'Your are logged',
    });
    expect(spyStore.called).toBe(true);
    expect(spyStore.firstCall.lastArg).toMatchObject({
      user: [
        {
          component: 'furet-ui-appbar-user-dropmenu',
          name: 'user',
        },
      ],
    });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/');
  });

  it('click on button redirect to /foo', () => {
    const mocks = {
      $notify: spyNotify,
      $store: { commit: spyStore },
      $router: { push: spyRouter },
      $route: { query: { redirect: '/foo' } },
    };
    const wrapper = mount(getComponentPrototype('login'), { localVue, i18n, mocks });
    wrapper.find('a.button').trigger('click');
    expect(spyNotify.called).toBe(true);
    expect(spyNotify.firstCall.lastArg).toMatchObject({
      duration: 5000,
      text: 'Welcome my feret !!!',
      title: 'Your are logged',
    });
    expect(spyStore.called).toBe(true);
    expect(spyStore.firstCall.lastArg).toMatchObject({
      user: [
        {
          component: 'furet-ui-appbar-user-dropmenu',
          name: 'user',
        },
      ],
    });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toBe('/');
  });
});
