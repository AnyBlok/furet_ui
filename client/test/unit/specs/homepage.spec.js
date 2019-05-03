import { mount } from 'vue-test-utils';
import '@/components';
import { getComponentPrototype } from '@/components/factory';


describe('homepage component', () => {
  const wrapper = mount(getComponentPrototype('homepage'));
  it('should render correct contents', () => {
    expect(wrapper.html()).toContain(
      '<h1 class="title">Welcome in Furet UI</h1>',
    );
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
