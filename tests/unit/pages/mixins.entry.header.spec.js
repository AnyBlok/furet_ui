import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";

const localVue = global.localVue;

const mock = jest.spyOn(i18n, "_t");
mock.mockResolvedValue('');

const store = global.store

describe('furet-ui-header-page component', () => {
  const Component = getComponentPrototype('furet-ui-header-page');

  it('snapshot minimum', () => {
    const propsData = {
      title: 'Title',
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('click can_go_to_new', () => {
    const propsData = {
      title: 'Title',
      can_go_to_new: true,
      go_to_new_choices: []
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.emitted()['go-to-new']).toBe(undefined);
    wrapper.vm.goToNew();
    expect(wrapper.emitted()['go-to-new'].length).toBe(1);
  });

  it('click can_go_to_new with multi choice', () => {
    const propsData = {
      title: 'Title',
      can_go_to_new: true,
      go_to_new_choices: [
        {resource_id: 0, label: 'Resource 0'},
        {resource_id: 1, label: 'Resource 1'},
        {resource_id: 2, label: 'Resource 2'},
        {resource_id: 3, label: 'Resource 3'},
      ]
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.emitted()['go-to-new']).toBe(undefined);
    wrapper.vm.goToNewPolymorphic({resource_id: 1, label: 'Resource 1'});
    expect(wrapper.emitted()['go-to-new'].length).toBe(1);
  });

  it('click can_modify snapshot', () => {
    const propsData = {
      title: 'Title',
      can_modify: true,
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('click can_modify : edit', () => {
    const propsData = {
      title: 'Title',
      can_modify: true,
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.emitted()['go-to-edit']).toBe(undefined);
    wrapper.vm.goToEdit();
    expect(wrapper.emitted()['go-to-edit'].length).toBe(1);
  });

  it('click can_modify : to list', () => {
    const propsData = {
      title: 'Title',
      can_modify: true,
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.emitted()['go-to-list']).toBe(undefined);
    wrapper.vm.goToList();
    expect(wrapper.emitted()['go-to-list'].length).toBe(1);
  });

  it('click can_modify : save', () => {
    const propsData = {
      title: 'Title',
      can_modify: true,
      show_save: true,
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.emitted()['save']).toBe(undefined);
    wrapper.vm.save();
    expect(wrapper.emitted()['save'].length).toBe(1);
  });

  it('click can_modify : cancel', () => {
    const propsData = {
      title: 'Title',
      can_modify: true,
      show_save: true,
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.emitted()['go-to-page']).toBe(undefined);
    wrapper.vm.goToPage();
    expect(wrapper.emitted()['go-to-page'].length).toBe(1);
  });

  it('click can_delete', () => {
    const propsData = {
      title: 'Title',
      can_delete: true,
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.emitted()['delete-entry']).toBe(undefined);
    wrapper.vm.deleteEntry();
    expect(wrapper.emitted()['delete-entry'].length).toBe(1);
  });

  it('click previous page without target', () => {
    const propsData = {
      title: 'Title',
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.emitted()['go-to-page']).toBe(undefined);
    wrapper.vm.goToPreviousPage();
    expect(wrapper.emitted()['go-to-page']).toBe(undefined);
  });

  it('click next page without target', () => {
    const propsData = {
      title: 'Title',
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.emitted()['go-to-page']).toBe(undefined);
    wrapper.vm.goToNextPage();
    expect(wrapper.emitted()['go-to-page']).toBe(undefined);
  });
});
