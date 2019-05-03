import { mount } from 'vue-test-utils';
import '@/components';
import { getComponentPrototype } from '@/components/factory';


describe('about component', () => {
  const wrapper = mount(getComponentPrototype('about'));
  it('should render correct contents', () => {
    expect(wrapper.html()).toContain(
      '<h1>About Furet UI</h1>',
    );
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
