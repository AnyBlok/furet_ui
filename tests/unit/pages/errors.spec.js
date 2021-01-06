import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";

const localVue = global.localVue;

describe('furet-ui-page-errors component', () => {

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
