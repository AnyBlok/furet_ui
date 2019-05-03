import { mount, createLocalVue } from 'vue-test-utils';
import '@/components';
import { i18nConf } from '@/i18n';
import { getComponentPrototype } from '@/components/factory';
import VueI18n from 'vue-i18n';

describe('furet-ui-page-errors component', () => {
  const localVue = createLocalVue();
  localVue.use(VueI18n);
  const i18n = new VueI18n(i18nConf);

  it('snapshot without errors', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-page-errors'), { localVue, i18n });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot with one error', () => {
    const propsData = { errors: ['One Error'] };
    const wrapper = mount(getComponentPrototype('furet-ui-page-errors'), { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot with two error', () => {
    const propsData = { errors: ['One Error', { 'this is': 'Another error' }] };
    const wrapper = mount(getComponentPrototype('furet-ui-page-errors'), { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });
});
