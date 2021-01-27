import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
import axios from 'axios';

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const mock = jest.spyOn(axios, "post");
mock.mockResolvedValue({data: [], headers: {'x-total-records': 0}});

const store = global.store

const mockAxios = jest.spyOn(axios, "post");
mockAxios.mockImplementationOnce(() =>
  Promise.resolve({ data: "redirect/uri" })
);
const mockAxios2 = jest.spyOn(axios, "get");
mockAxios2.mockImplementationOnce(() =>
  Promise.resolve({})
);

const data = {
  'Model.1': {
    1: {id: 1, title: 'Entry 1', color: 'red'},
    2: {id: 2, title: 'Entry 2', color: 'blue'},
    3: {id: 3, title: 'Entry 3', color: 'blue'},
    4: {id: 4, title: 'Entry 4', color: 'blue'},
    5: {id: 5, title: 'Entry 5', color: 'blue'},
    6: {id: 6, title: 'Entry 6', color: 'blue'},
    7: {id: 7, title: 'Entry 7', color: 'blue'},
  }
}

const getEntry = (model, pk) => {
  return data[model][pk.id];
}

describe('furet-ui-resource-thumbnail component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'thumbnail', 
    'pks': ['id'],
    'title': 'Templates', 
    'model': 'Model.1', 
    'filters': [], 
    'tags': [], 
    'fields': ['id', 'title', 'color'],
    'header_template': `
      <header class="card-header">
        {{ data.title }}
      </header>
    `,
    'body_template': `
      <div class="columns">
        <div class="column">
          <furet-ui-field :resource="resource" :data="data" :config="{'type':'string', 'name': 'title', 'label': 'Title'}" />
        </div>
        <div class="column">
          <furet-ui-field :resource="resource" :data="data" :config="{'type':'string', 'name': 'color'}" />
        </div>
      </div>
    `,
    'footer_template': `
      <footer class="card-footer">
        <div class="card-footer-item" id="button1">
          <furet-ui-thumbnail-footer-button
            :resource="resource"
            :data="data"
            :config="{'label': 'Test 1', 'call': 'test'}"
          />
        </div>
        <div class="card-footer-item" id="button2">
          <furet-ui-thumbnail-footer-button
            :resource="resource"
            :data="data"
            :config="{'label': 'Test 2', 'icon': 'th', 'open-resource': 'test'}"
          />
        </div>
      </footer>
    `,
  }]});

  const getWrapper = () => {
    return mount(getComponentPrototype("furet-ui-resource-thumbnail"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {},
      },
      provide: {
        getEntry,
        getNewEntries: () => {return []}
      },
    });
  }

  beforeEach(() => {
    mockAxios.mockClear();
    mockAxios2.mockClear();
  });

  it('furet-ui-resource-thumbnail without data', () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('furet-ui-resource-thumbnail with data', () => {
    const response = {
      pks: [{id: 1}, {id: 2}],
      total: 2,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper();
    const thumbnail = wrapper.vm.$refs.thumbnail;
    wrapper.vm.api_formater(thumbnail, response)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
    })
  });
  it('furet-ui-resource-thumbnail breadscrumb', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.getBreadcrumbInfo().icon).toBe('th');
  });
  it('furet-ui-resource-thumbnail click button 1', async () => {
    const response = {
      pks: [{id: 1}],
      total: 1,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper();
    const thumbnail = wrapper.vm.$refs.thumbnail;
    wrapper.vm.api_formater(thumbnail, response)
    await wrapper.vm.$nextTick()
    const button = wrapper.find('#button1').find('a');
    button.trigger('click')
    expect(mockAxios).toBeCalledWith(
      "/furet-ui/resource/1/model/Model.1/call/test", 
      {pks: {id: 1}}
    );
  });
  it('furet-ui-resource-thumbnail click button 2', async () => {
    const response = {
      pks: [{id: 1}],
      total: 1,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper();
    const thumbnail = wrapper.vm.$refs.thumbnail;
    wrapper.vm.api_formater(thumbnail, response)
    await wrapper.vm.$nextTick()
    const button = wrapper.find('#button2').find('a');
    button.trigger('click')
    expect(mockAxios).toBeCalledWith(
      "/furet-ui/open/resource/test", 
      {params: {}, resource_type: undefined, route: null}
    );
  });
  it('furet-ui-resource-thumbnail updateQueryString', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.updateQueryString({})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted()['update-query-string']).toBeTruthy()
    })
  });
  it('furet-ui-resource-thumbnail goToPage not deleted', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-page']).toBe(undefined)
    wrapper.vm.goToPage({}, {})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    })
  });
  it('furet-ui-resource-thumbnail goToPage deleted', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-page']).toBe(undefined)
    wrapper.vm.goToPage({__change_state: 'delete'}, {})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted()['go-to-page']).toBe(undefined)
    })
  });
  it('furet-ui-resource-thumbnail goToNew', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-new']).toBe(undefined)
    wrapper.vm.goToNew({})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted()['go-to-new']).toBeTruthy()
    })
  });
  it('furet-ui-resource-thumbnail revert_modification', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['revert-data']).toBe(undefined)
    wrapper.vm.revert_modification({})
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted()['revert-data']).toBeTruthy()
    })
  });
  it('furet-ui-resource-thumbnail click button 1', () => {
    const response = {
      pks: [{id: 1}],
      total: 1,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper();
    wrapper.vm.refresh()
    expect(mockAxios2).toBeCalledWith(
      "/furet-ui/resource/1/crud", 
      {
        params: {
          'context[fields]': "id,title,color",
          'context[model]': "Model.1",
          limit: 25,
          offset: 0,
        }
      }
    );
  });
});
