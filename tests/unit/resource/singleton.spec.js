import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
// import { eval_counter } from "@/components/resource/helper";
import axios from 'axios';

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const mock = jest.spyOn(axios, "get");
mock.mockResolvedValue({data: [], headers: {'x-total-records': 0}});

const mockAxios = jest.spyOn(axios, "post");
mockAxios.mockImplementationOnce(() =>
  Promise.resolve({ data: "redirect/uri" })
);

const store = global.store

const getEntry = (model, pk) => {
  model;
  pk;
  return {title: 'Entry 1', color: 'red'};
}

const getNewEntry = (model, uuid) => {
  model;
  uuid;
  return {title: 'New Entry 1', color: 'red'};
}

const updateChangeState = () => {}

describe('furet-ui-resource-singleton component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'singleton', 
    'model': 'Model.1', 
    'header_template': `
      <nav class="level">
        <div class="level-left">
          <div class="level-item content">
            <h1 class="is-large">{{ data.title }}</h1>
          </div>
        </div>
      </nav>
    `,
    'body_template': `
      <div 
        id="id" 
        key="key"
      >
        <div class="columns">
          <div class="column">
            <furet-ui-field 
              name="title" 
              v-bind:config="{name: 'title', type: 'string', label: 'Title'}" 
              v-bind:resource="resource"
              v-bind:data="data"
            >
            </furet-ui-field>
          </div>
          <div class="column">
            <furet-ui-field 
              name="color" 
              v-bind:config="{name: 'color', type: 'string', label: 'Color'}" 
              v-bind:resource="resource"
              v-bind:data="data"
            >
            </furet-ui-field>
          </div>
        </div>
      </div>
    `,
    'footer_template': `
      <nav class="level">
        <div class="level-left">
          <div class="level-item content">
            <h1 class="is-large">{{ data.title }}</h1>
          </div>
        </div>
      </nav>
    `,
    'fields': ['id', 'title', 'color']
  }]});

  const getWrapper = () => {
    return mount(getComponentPrototype("furet-ui-resource-singleton"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {query: {pks: JSON.stringify({id: 1})}},
      },
      provide: {
        getEntry,
        getNewEntry,
        updateChangeState,
      }
    });
  }

  beforeEach(() => {
    mock.mockClear();
    mockAxios.mockClear();
  });

  it('furet-ui-resource-singleton: snapshot', () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('furet-ui-resource-singleton: getBreadcrumbInfo', () => {
    const wrapper = getWrapper();
    const info = wrapper.vm.getBreadcrumbInfo()
    expect(info).toStrictEqual({icon: "newspaper", label: ""})
  });
  it('refresh callback', () => {
    const wrapper = getWrapper();
    wrapper.vm.registryRefreshCallback(() => {});
    wrapper.vm.refresh()
  });
  it('furet-ui-resource-singleton: readonly.', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.isReadonly()).toBe(wrapper.vm.readonly);
  });
  it('furet-ui-resource-singleton: loadAsyncData.', () => {
    const wrapper = getWrapper();
    wrapper.vm.loadAsyncData()
    expect(mock).toBeCalledWith(
      "/furet-ui/resource/1/crud", 
      {
        params: {
          "context[fields]": "id,title,color",
          "context[model]": "Model.1",
          "filter[id][eq]": 1,
        }
      }
    );
  });
  it('furet-ui-resource-singleton: refresh.', () => {
    const wrapper = getWrapper();
    wrapper.vm.refresh()
    expect(mock).toBeCalledWith(
      "/furet-ui/resource/1/crud", 
      {
        params: {
          "context[fields]": "id,title,color",
          "context[model]": "Model.1",
          "filter[id][eq]": 1,
        }
      }
    );
  });
  it('furet-ui-resource-singleton: getDefault.', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-resource-singleton"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {query: {waiting_value: JSON.stringify({foo: 'bar'}), uuid: 'test'}},
      },
      provide: {
        getEntry,
        getNewEntry,
        updateChangeState,
      }
    });
    wrapper.vm.getDefault()
    expect(mockAxios).toBeCalledWith(
      "/furet-ui/resource/1/model/Model.1/call/default_values", 
      {data: {uuid: 'test'}}
    );
  });
  it('goToList', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-list']).toBe(undefined)
    wrapper.vm.goToList()
    expect(wrapper.emitted()['go-to-list']).toBeTruthy()
  });
  it('goToNew', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.readonly).toBe(true)
    wrapper.vm.goToEdit()
    expect(wrapper.vm.readonly).toBe(false)
  });
  it('goToPage', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['modify-state']).toBe(undefined)
    wrapper.vm.goToPage()
    expect(wrapper.emitted()['modify-state']).toBeTruthy()
  });
  it('save (create)', () => {
    const wrapper = getWrapper();
    wrapper.setData({uuid: 'test'})
    expect(wrapper.emitted()['create-data']).toBe(undefined)
    wrapper.vm.save()
    expect(wrapper.emitted()['create-data']).toBeTruthy()
  });
  it('save (update)', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['update-data']).toBe(undefined)
    wrapper.vm.save()
    expect(wrapper.emitted()['update-data']).toBeTruthy()
  });
});

describe('furet-ui-header-page-singleton component', () => {
  const Component = getComponentPrototype('furet-ui-header-page-singleton');

  it('snapshot minimum', () => {
    const propsData = {
      title: 'Title',
    };
    const wrapper = mount(Component, { store, localVue, i18n, propsData });
    expect(wrapper.element).toMatchSnapshot();
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
});
