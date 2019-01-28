import { mount } from 'vue-test-utils'
import { createUnitTestComponent } from '@/components';


describe('about component', () => {
  const wrapper = mount(createUnitTestComponent('about'));
  it('should render correct contents', () => {
    expect(wrapper.html()).toContain(
        '<h1>About Furet UI</h1>'
    )
  });
  it('snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
