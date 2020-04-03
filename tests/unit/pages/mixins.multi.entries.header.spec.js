import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";

const localVue = global.localVue;

describe('furet-ui-page-multi-entries-header component', () => {
  const Component = getComponentPrototype('furet-ui-page-multi-entries-header');

  it('snapshot minimum', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot can_go_to_new', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [],
      data: [],
      total: 1,
      can_go_to_new: true,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('click can_go_to_new', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [],
      data: [],
      total: 1,
      can_go_to_new: true,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted()['go-to-new']).toBe(undefined);
    wrapper.vm.goToNew();
    expect(wrapper.emitted()['go-to-new'].length).toBe(1);
  });

  it('click can_go_to_new', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [],
      data: [],
      total: 1,
      can_go_to_new: true,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted().refresh).toBe(undefined);
    wrapper.vm.refresh();
    expect(wrapper.emitted().refresh.length).toBe(1);
  });
  it('snapshot with tags no selected', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
      ],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot with tags one selected', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [
        { key: 'tag1', label: 'Tag 1', selected: true },
        { key: 'tag2', label: 'Tag 2' },
      ],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('snapshot with tags two selected', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [
        { key: 'tag1', label: 'Tag 1', selected: true },
        { key: 'tag2', label: 'Tag 2', selected: true },
      ],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('toggle tag', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [
        { key: 'tag1', label: 'Tag 1', selected: true },
        { key: 'tag2', label: 'Tag 2' },
      ],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted().toggleTag).toBe(undefined);
    wrapper.vm.toggleTag();
    expect(wrapper.emitted().toggleTag.length).toBe(1);
  });

  it('close tag', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [
        { key: 'tag1', label: 'Tag 1', selected: true },
        { key: 'tag2', label: 'Tag 2' },
      ],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted().removeTag).toBe(undefined);
    wrapper.vm.removeTag();
    expect(wrapper.emitted().removeTag.length).toBe(1);
  });

  it('empty filter', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      tags: [],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('filter one value', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: ['fooBar'],
        },
      ],
      tags: [],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('filter two value', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: ['foo', 'bar'],
        },
      ],
      tags: [],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('filter close value', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: ['fooBar'],
        },
      ],
      tags: [],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.emitted().removeFilter).toBe(undefined);
    wrapper.vm.removeFilter();
    expect(wrapper.emitted().removeFilter.length).toBe(1);
  });

  it('make a search', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: ['fooBar'],
        },
      ],
      tags: [],
      data: [],
      total: 1,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted().updateFilters).toBe(undefined);
    wrapper.vm.updateFilters();
    expect(wrapper.emitted().updateFilters.length).toBe(1);
  });
});
