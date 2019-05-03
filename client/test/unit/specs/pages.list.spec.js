import { mount, createLocalVue } from 'vue-test-utils';
import '@/components';
import { i18nConf } from '@/i18n';
import { getComponentPrototype } from '@/components/factory';
import VueI18n from 'vue-i18n';
import sinon from 'sinon';

describe('furet-ui-list component', () => {
  const localVue = createLocalVue();
  localVue.use(VueI18n);
  const i18n = new VueI18n(i18nConf);
  const Component = getComponentPrototype('furet-ui-list');

  jest.mock('axios', () => ({
    get(url) {
      if (url === '/test') return Promise.resolve({ data: [] });
      return Promise.resolve({ error: [] });
    },
  }));

  it('snapshot minimum', (done) => {
    const commitSpy = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $store: { commit: commitSpy },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });

  it('snapshot minimum with error', (done) => {
    const commitSpy = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $store: { commit: commitSpy },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/error',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });

  it('method startBrowsing 1', () => {
    const commitSpy = sinon.spy();
    const emitSpy = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $store: { commit: commitSpy },
      $emit: emitSpy,
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/error',
      browseFields: ['id'],
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.vm.checkedRows = [
      { id: 1, firstname: 'test1', lastname: 'test1' },
      { id: 2, firstname: 'test1', lastname: 'test2' },
      { id: 3, firstname: 'test1', lastname: 'test3' },
      { id: 4, firstname: 'test1', lastname: 'test4' },
    ];
    expect(emitSpy.called).toBe(false);
    expect(commitSpy.calledOnce).toBe(true); // mount from multi entries
    wrapper.vm.startBrowsing();
    expect(emitSpy.called).toBe(true);
    expect(emitSpy.lastCall.lastArg).toEqual({ id: 1 });
    expect(commitSpy.calledTwice).toBe(true); // mount from multi entries
    expect(commitSpy.lastCall.lastArg).toEqual({
      list: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ],
    });
  });

  it('method startBrowsing 2', () => {
    const commitSpy = sinon.spy();
    const emitSpy = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $store: { commit: commitSpy },
      $emit: emitSpy,
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/error',
      browseFields: ['id'],
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.vm.data = [
      { id: 1, firstname: 'test1', lastname: 'test1' },
      { id: 2, firstname: 'test1', lastname: 'test2' },
      { id: 3, firstname: 'test1', lastname: 'test3' },
      { id: 4, firstname: 'test1', lastname: 'test4' },
    ];
    expect(emitSpy.called).toBe(false);
    expect(commitSpy.calledOnce).toBe(true); // mount from multi entries
    wrapper.vm.startBrowsing();
    expect(emitSpy.called).toBe(true);
    expect(emitSpy.lastCall.lastArg).toEqual({ id: 1 });
    expect(commitSpy.calledTwice).toBe(true); // mount from multi entries
    expect(commitSpy.lastCall.lastArg).toEqual({
      list: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ],
    });
  });
});
