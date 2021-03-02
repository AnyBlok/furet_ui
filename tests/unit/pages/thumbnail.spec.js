import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";

const localVue = global.localVue;
const mock = jest.spyOn(i18n, "_t");
mock.mockResolvedValue('');

describe('furet-ui-thumbnail component', () => {
  const Component = getComponentPrototype('furet-ui-thumbnail');

  jest.mock('axios', () => ({
    get(url) {
      if (url === '/test') return Promise.resolve({ data: [] });
      return Promise.resolve({ error: [] });
    },
  }));

  it('snapshot minimum', (done) => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData});
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });

  it('snapshot minimum with error', (done) => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/error',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });
});
