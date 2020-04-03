import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
import axios from 'axios';

const mockjest = jest.spyOn(axios, "get");
mockjest.mockResolvedValue({data: [], headers: {'x-total-records': 0}});

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const localVue = global.localVue;

describe('mixin-page-multi-entries component', () => {
  const Component = getComponentPrototype('mixin-page-multi-entries');
  Component.template = `
    <div>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <furet-ui-page-multi-entries-header 
        can_go_to_new
        v-bind:title="title"
        v-bind:total="total"
        v-bind:data="data"
        v-bind:filters="filters"
        v-bind:tags="tags"
        v-on:goToNew="goToNew"
        v-on:updateFilters="updateFilters"
        v-on:removeFilter="removeFilter"
        v-on:refresh="refresh"
        v-on:toggleTag="toggleTag"
        v-on:removeTag="removeTag"/>
    </div>
  `;

  jest.mock('axios', () => ({
    get(url) {
      if (url === '/test') return Promise.resolve({ data: [] });
      return Promise.resolve({ error: [] });
    },
  }));

  it('snapshot minimum', (done) => {
    const commitSpy = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $store: { commit: commitSpy },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      expect(commitSpy.called).toBe(true);
      done();
    });
  });

  it('snapshot minimum with error', (done) => {
    const mocks = {
      $route: { query: {} },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/error',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });

  it('click can_go_to_new', () => {
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
      $route: { query: {} },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyEmit.called).toBe(false);
    wrapper.find('furet-ui-page-multi-entries-header').trigger('goToNew');
    expect(spyEmit.called).toBe(true);
  });

  it('goToPage', () => {
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
      $route: { query: {} },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyEmit.called).toBe(false);
    wrapper.vm.goToPage('data');
    expect(spyEmit.called).toBe(true);
  });

  /**
  it('goToPage with selectedEntries and browseFields', () => {
    const spyEmit = sinon.spy();
    const mocks = {
      $emit: spyEmit,
      $route: {query: {}},
    }
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyEmit.called).toBe(true);
    wrapper.vm.goToPage('data')
    expect(spyEmit.called).toBe(true);
  });
  * */

  it('updateData', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
      defaultSortField: 'state',
      defaultSortOrder: 'desc',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.sortOrder).toBe('desc');
    expect(wrapper.vm.sortField).toBe('state');
    expect(spyRouter.called).toBe(false);
    wrapper.vm.updateData();
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { order: 'state,desc', page: 1 } });
  });

  it('updateFilters', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.updateFilters();
    expect(spyRouter.called).toBe(false);
  });

  it('updateFilters or-', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'foo' });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { filters: '{"filter[state]":"foo"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'bar' });
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { filters: '{"filter[state]":"foo,bar"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('updateFilters or- and opt', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          opt: 'test',
          values: [],
        },
      ],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'foo', opt: 'test' });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { filters: '{"filter[state][test]":"foo"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'bar', opt: 'test' });
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { filters: '{"filter[state][test]":"foo,bar"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('updateFilters ~ or-', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'exclude',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.updateFilters({ key: 'state', mode: 'exclude', value: 'foo' });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { filters: '{"~filter[state]":"foo"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'exclude', value: 'bar' });
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { filters: '{"~filter[state]":"foo,bar"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('updateFilters equal', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'eq',
          values: [],
        },
      ],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'foo' });
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { filters: '{"filter[state]":"foo"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'bar' });
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { filters: '{"filter[state]":"bar"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['bar']);
  });

  it('removeFilter', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: ['foo', 'bar'],
        },
      ],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.removeFilter('state', 'include', undefined, 'foo');
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { filters: '{"filter[state]":"bar"}', page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['bar']);
    wrapper.vm.removeFilter('state', 'include', undefined, 'bar');
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { page: 1 } });
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
  });

  it('toggleTag', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [
        { key: 'tag', label: 'Tag' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.tags.length).toBe(1);
    expect(wrapper.vm.tags[0].selected).toEqual(undefined);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.toggleTag(wrapper.vm.tags[0]);
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.firstCall.lastArg).toEqual({ query: { tags: 'tag', page: 1 } });
    expect(wrapper.vm.tags[0].selected).toEqual(true);
    wrapper.vm.toggleTag(wrapper.vm.tags[0]);
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { page: 1 } });
    expect(wrapper.vm.tags[0].selected).toEqual(false);
  });

  it('removeTag', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [
        { key: 'tag', label: 'Tag', selected: true },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.tags.length).toBe(1);
    expect(wrapper.vm.tags[0].selected).toEqual(true);
    expect(spyRouter.called).toBe(false);
    wrapper.vm.removeTag(wrapper.vm.tags[0]);
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { page: 1 } });
    expect(wrapper.vm.tags[0].selected).toEqual(false);
  });

  it('refresh', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyRouter.called).toBe(false);
    wrapper.vm.refresh(wrapper.vm.tags[0]);
    expect(spyRouter.called).toBe(true);
  });

  it('onPageChange', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyRouter.called).toBe(false);
    wrapper.vm.onPageChange(2);
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { page: 2 } });
    expect(wrapper.vm.page).toBe(2);
  });

  it('onSort', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {} },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(spyRouter.called).toBe(false);
    wrapper.vm.onSort('state', 'desc');
    expect(spyRouter.called).toBe(true);
    expect(spyRouter.lastCall.lastArg).toEqual({ query: { order: 'state,desc', page: 1 } });
    expect(wrapper.vm.sortField).toBe('state');
    expect(wrapper.vm.sortOrder).toBe('desc');
  });

  it('mount with queryString: page', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: { page: '2' } },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.page).toBe(2);
  });

  it('mount with queryString: order', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {
        order: 'state,desc',
      } },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.sortField).toEqual('state');
    expect(wrapper.vm.sortOrder).toEqual('desc');
  });

  it('mount with queryString: filters', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {
        filters: '{"filter[state]":"foo,bar"}',
      } },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('mount with queryString: filters with opt', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {
        filters: '{"filter[state][test]":"foo,bar"}',
      } },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          opt: 'test',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('mount with queryString: ~ filters', () => {
    const spyRouter = sinon.spy();
    const mocks = {
      $route: { query: {
        filters: '{"~filter[state]":"foo,bar"}',
        // tags: "tag1,tag2"
      } },
      $router: { push: spyRouter },
    };
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [
        {
          key: 'state',
          mode: 'exclude',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData, mocks });
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('mount with queryString: ~ filters and opt', () => {
    const propsData = {
      title: 'Title',
      query: {filters: '{"~filter[state][test]":"foo,bar"}'},
      default_filters: [
        {
          key: 'state',
          mode: 'exclude',
          label: 'State',
          op: 'or-ilike',
          opt: 'test',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('mount with queryString: tags', () => {
    const propsData = {
      title: 'Title',
      query: {tags: 'tag1,tag2'},
      default_filters: [
        {
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        },
      ],
      default_tags: [
        { key: 'tag1', label: 'Tag 1' },
        { key: 'tag2', label: 'Tag 2' },
        { key: 'tag3', label: 'Tag 3' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.tags[0].selected).toBe(true);
    expect(wrapper.vm.tags[1].selected).toBe(true);
    expect(wrapper.vm.tags[2].selected).toBe(undefined);
  });

});
