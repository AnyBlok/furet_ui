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

describe('furet-ui-resource-form component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'form', 
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
    return mount(getComponentPrototype("furet-ui-resource-form"), {
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

  it('furet-ui-resource-form: snapshot', () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('furet-ui-resource-form: getBreadcrumbInfo', () => {
    const wrapper = getWrapper();
    const info = wrapper.vm.getBreadcrumbInfo()
    expect(info).toStrictEqual({icon: "newspaper", label: ""})
  });
  it('refresh callback', () => {
    const wrapper = getWrapper();
    wrapper.vm.registryRefreshCallback(() => {});
    wrapper.vm.refresh()
  });
  it('furet-ui-resource-form: readonly.', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.isReadonly()).toBe(wrapper.vm.readonly);
  });
  it('furet-ui-resource-form: loadAsyncData.', () => {
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
  it('furet-ui-resource-form: refresh.', () => {
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
  it('furet-ui-resource-form: getDefault.', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-resource-form"), {
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
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.goToNew()
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{"mode": "form"}]])
  });
  it('goToNew with polymorphism', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.goToNew({waiting_value: {field: 'value'}, resource_id: 1})
    expect(wrapper.emitted()['update-query-string']).toStrictEqual([[{
      mode: "form",
      resource_id: 1,
      waiting_value: "{\"field\":\"value\"}",
    }]])
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
  it('deleteEntry', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['delete-data']).toBe(undefined)
    wrapper.vm.deleteEntry()
    expect(wrapper.emitted()['delete-data']).toBeTruthy()
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

describe('furet-ui-form-button component', () => {
  it('snapshot isReadonly', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-form-button"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        resource: {
        },
        data: {},
        config: {
          label: 'Test',
          icon: 'th',
        },
      },
      provide: {
        partIsReadonly: () => {},
        currentResource: {
          uuid: null,
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot not isReadonly', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-form-button"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        resource: {
          readonly: true,
        },
        data: {},
        config: {
          readonly: false,
          label: 'Test',
          icon: 'th',
        },
      },
      provide: {
        partIsReadonly: () => true,
        currentResource: {
          uuid: null,
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot with class', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-form-button"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        resource: {
          readonly: true,
        },
        data: {},
        config: {
          readonly: false,
          label: 'Test',
          icon: 'th',
          class: ['c1', 'c2']
        },
      },
      provide: {
        partIsReadonly: () => true,
        currentResource: {
          uuid: null,
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot isHidden', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-form-button"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        resource: {
        },
        data: {},
        config: {
          hidden: true,
          label: 'Test',
          icon: 'th',
        },
      },
      provide: {
        partIsReadonly: () => {},
        currentResource: {
          uuid: null,
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot server_call', () => {
    const wrapper = mount(getComponentPrototype("furet-ui-form-button"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        resource: {
          pks: {id: 1},
          model: 'Model.1',
          id: 1
        },
        data: {},
        config: {
          label: 'Test',
          icon: 'th',
          call: 'test',
        },
      },
      provide: {
        partIsReadonly: () => {},
        currentResource: {
          uuid: null,
        }
      }
    });
    wrapper.vm.server_call()
    expect(mockAxios).toBeCalledWith(
      "/furet-ui/resource/1/model/Model.1/call/test", 
      {pks: {id: 1}}
    );
  });
});
