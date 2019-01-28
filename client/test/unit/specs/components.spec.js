import { mount } from 'vue-test-utils'
import { createComponents } from '@/components';
import { defineComponent, getComponentPrototype} from '@/components/factory';

describe('components factory', () => {

  it('createComponents about', () => {
    createComponents();
    const wrapper = mount({template: '<about />'});
    expect(wrapper.element).toMatchSnapshot();
  });

  it('createComponents add component and over write it', () => {
    defineComponent('fooBar', {'template': '<about />'})
    defineComponent('fooBar', {'template': '<about />'})

    const wrapper = mount(getComponentPrototype('fooBar'));
    expect(wrapper.element).toMatchSnapshot();
  });
});
