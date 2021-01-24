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
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });

  it('snapshot minimum with error', (done) => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/error',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData});
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
      done();
    });
  });

  it('click can_go_to_new', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData});
    expect(wrapper.emitted()['go-to-new']).toBe(undefined);
    wrapper.vm.goToNew();
    expect(wrapper.emitted()['go-to-new'][0]).toStrictEqual([undefined]);
  });

  it('goToPage', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData});
    expect(wrapper.emitted()['go-to-page']).toBe(undefined);
    wrapper.vm.goToPage('data');
    expect(wrapper.emitted()['go-to-page'][0]).toStrictEqual(["data", {offset: -1, query: undefined}]);
  });
  it('updateData', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
      defaultSortField: 'state',
      defaultSortOrder: 'desc',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData});
    expect(wrapper.vm.sortingPriority).toStrictEqual([{field: 'state', order: 'desc'}]);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.updateData();
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{orders: 'state:desc', page: 1}]);
  });

  it('updateFilters', () => {
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.updateFilters();
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
  });

  it('updateFilters or-', () => {
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'foo' });
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{filters: '{"filter[state]":"foo"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'bar' });
    expect(wrapper.emitted()['update-query-string'][1]).toStrictEqual([{filters: '{"filter[state]":"foo,bar"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('updateFilters or- and opt', () => {
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'foo', opt: 'test' });
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{filters: '{"filter[state][test]":"foo"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'bar', opt: 'test' });
    expect(wrapper.emitted()['update-query-string'][1]).toStrictEqual([{filters: '{"filter[state][test]":"foo,bar"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('updateFilters ~ or-', () => {
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.updateFilters({ key: 'state', mode: 'exclude', value: 'foo' });
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{filters: '{"~filter[state]":"foo"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'exclude', value: 'bar' });
    expect(wrapper.emitted()['update-query-string'][1]).toStrictEqual([{filters: '{"~filter[state]":"foo,bar"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('updateFilters equal', () => {
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'foo' });
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{filters: '{"filter[state]":"foo"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['foo']);
    wrapper.vm.updateFilters({ key: 'state', mode: 'include', value: 'bar' });
    expect(wrapper.emitted()['update-query-string'][1]).toStrictEqual([{filters: '{"filter[state]":"bar"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['bar']);
  });

  it('removeFilter', () => {
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.filters.length).toBe(1);
    expect(wrapper.vm.filters[0].values.length).toBe(2);
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.removeFilter('state', 'include', undefined, 'foo');
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{filters: '{"filter[state]":"bar"}', page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(1);
    expect(wrapper.vm.filters[0].values).toEqual(['bar']);
    wrapper.vm.removeFilter('state', 'include', undefined, 'bar');
    expect(wrapper.emitted()['update-query-string'][1]).toStrictEqual([{page: 1}]);
    expect(wrapper.vm.filters[0].values.length).toBe(0);
    expect(wrapper.vm.filters[0].values).toEqual([]);
  });

  it('toggleTag', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [
        { key: 'tag', label: 'Tag' },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.tags.length).toBe(1);
    expect(wrapper.vm.tags[0].selected).toEqual(undefined);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.toggleTag(wrapper.vm.tags[0]);
    expect(wrapper.emitted()['update-query-string'][0]).toStrictEqual([{tags: 'tag', page: 1}]);
    expect(wrapper.vm.tags[0].selected).toEqual(true);
    wrapper.vm.toggleTag(wrapper.vm.tags[0]);
    expect(wrapper.emitted()['update-query-string'][1]).toStrictEqual([{page: 1}]);
    expect(wrapper.vm.tags[0].selected).toEqual(false);
  });

  it('removeTag', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [
        { key: 'tag', label: 'Tag', selected: true },
      ],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.vm.tags.length).toBe(1);
    expect(wrapper.vm.tags[0].selected).toEqual(true);
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.removeTag(wrapper.vm.tags[0]);
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"page": 1}]]);
    expect(wrapper.vm.tags[0].selected).toEqual(false);
  });

  it('refresh', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.refresh();
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"page": 1}]]);
  });

  it('onPageChange', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.onPageChange(2);
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"page": 2}]]);
    expect(wrapper.vm.page).toBe(2);
  });

  it('onSort', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.onSort('state', 'desc');
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"orders": "state:desc", "page": 1}]]);
    expect(wrapper.vm.sortingPriority).toEqual([{"field": "state", "order": "desc"}]);
  });
  it('onSort multi', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: {orders: 'state:desc'},
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.onSort('other', 'asc');
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"orders": "state:desc,other:asc", "page": 1}]]);
    expect(wrapper.vm.sortingPriority).toEqual([
        {"field": "state", "order": "desc"},
        {"field": "other", "order": "asc"},
    ]);
  });
  it('onSort remove', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: {orders: 'state:desc,other:asc'},
      default_filters: [],
      default_tags: [],
      rest_api_url: '/test',
    };
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.emitted()['update-query-string']).toBe(undefined);
    wrapper.vm.onSortingPriorityRemoved('other');
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"orders": "state:desc", "page": 1}]]);
    expect(wrapper.vm.sortingPriority).toEqual([{"field": "state", "order": "desc"}]);
  });

  it('mount with queryString: page', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: { page: '2' },
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
    expect(wrapper.vm.page).toBe(2);
  });

  it('mount with queryString: order', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: {orders: 'state:desc'},
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
    expect(wrapper.vm.sortingPriority).toEqual([{"field": "state", "order": "desc"}]);
  });

  it('mount with queryString: filters', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: {filters: '{"filter[state]":"foo,bar"}'},
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
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('mount with queryString: filters with opt', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: {filters: '{"filter[state][test]":"foo,bar"}'},
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.filters[0].values).toEqual(['foo', 'bar']);
  });

  it('mount with queryString: ~ filters', () => {
    const propsData = {
      title: 'Title',
      subtitle: 'Sub Title',
      query: {filters: '{"~filter[state]":"foo,bar"}'},
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
    const wrapper = mount(Component, { localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot()
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
    expect(wrapper.element).toMatchSnapshot()
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
    expect(wrapper.vm.tags[2].selected).toBe(false);
  });

});
