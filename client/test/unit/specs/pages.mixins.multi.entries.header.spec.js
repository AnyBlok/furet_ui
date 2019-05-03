import { mount, createLocalVue } from 'vue-test-utils';
import '@/components';
import { i18nConf } from '@/i18n';
import { getComponentPrototype } from '@/components/factory';
import VueI18n from 'vue-i18n';
import sinon from 'sinon';

describe('furet-ui-page-multi-entries-header component', () => {
  const localVue = createLocalVue();
  localVue.use(VueI18n);
  const i18n = new VueI18n(i18nConf);
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
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [],
      data: [],
      total: 1,
      can_go_to_new: true,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.find('#furet-ui-page-multi-entries-header-new').trigger('click');
    expect(spyEmit.called).toBe(true);
  });

  it('click can_go_to_new', () => {
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      filters: [],
      tags: [],
      data: [],
      total: 1,
      can_go_to_new: true,
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.find('#furet-ui-page-multi-entries-header-refresh').trigger('click');
    expect(spyEmit.called).toBe(true);
  });

  // it('snapshot use slot', () => {
  //   const propsData = {
  //     title: 'Title',
  //     subtitle: 'Sub Title',
  //     filters: [],
  //     tags: [],
  //     data: [],
  //     total: 1,
  //   };
  //   const scopedSlots = {
  //     actions: '<div>Here is added scoped slot named actions {{ props.data }} </div>',
  //   }
  //   const wrapper = mount(Component, { localVue, i18n, propsData, scopedSlots });
  //   expect(wrapper.element).toMatchSnapshot();
  // });

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
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
    };
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
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyEmit.called).toBe(false);
    wrapper.find('a.furet-ui-page-multi-entries-header-toggle-tag.tag1').trigger('click');
    expect(spyEmit.called).toBe(true);
  });

  it('close tag', () => {
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
    };
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
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyEmit.called).toBe(false);
    wrapper.find('b-tag.furet-ui-page-multi-entries-header-tag.tag1').trigger('close');
    expect(spyEmit.called).toBe(true);
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
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
    };
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
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.element).toMatchSnapshot();
    expect(spyEmit.called).toBe(false);
    wrapper.find('b-tag.furet-ui-page-multi-entries-header-filter.state.fooBar').trigger('close');
    expect(spyEmit.called).toBe(true);
  });

  it('make a search', () => {
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
    };
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
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyEmit.called).toBe(false);
    wrapper.find('b-autocomplete').trigger('select');
    expect(spyEmit.called).toBe(true);
  });
});
