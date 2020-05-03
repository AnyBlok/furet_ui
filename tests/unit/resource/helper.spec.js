import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
import { eval_counter } from "@/components/resource/helper";

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

describe('furet-ui-fieldset component', () => {
  it('snapshot', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-fieldset'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {},
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot readonly 1', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-fieldset'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {},
      },
      provide: {
        partIsReadonly: () => true,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot readonly 2', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-fieldset'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          readonly: true
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot: hidden', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-fieldset'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          hidden: true
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-tabs/furet-ui-tab component', () => {
  it('snapshot', () => {
    const tab = getComponentPrototype('furet-ui-tab')
    const wrapper = mount(getComponentPrototype('furet-ui-tabs'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          tabs: {}
        },
        data: {},
        config: {
          name: 'tabs',
        },
      },
      slots: {
        default: ['<furet-ui-tab :resource="{}" :data="{}" :config="{}" />']
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot counter', () => {
    const tab = getComponentPrototype('furet-ui-tab')
    const wrapper = mount(getComponentPrototype('furet-ui-tabs'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          tabs: {}
        },
        data: {},
        config: {
          name: 'tabs',
        },
      },
      slots: {
        default: ['<furet-ui-tab :resource="{}" :data="{}" :config="{}" counter="1"/>']
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot hidden', () => {
    const tab = getComponentPrototype('furet-ui-tab')
    const wrapper = mount(getComponentPrototype('furet-ui-tabs'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          tabs: {}
        },
        data: {},
        config: {
          name: 'tabs',
        },
      },
      slots: {
          default: ['<furet-ui-tab :resource="{}" :data="{}" :config="{hidden: true}" />']
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('eval_counter', () => {
    expect(eval_counter(1, {})).toBe(0)
  });
  it('eval_counter', () => {
    expect(eval_counter(undefined, {field: 'test'})).toBe(0)
  });
  it('eval_counter 1', () => {
    expect(eval_counter('fields.field', {field: 1})).toBe(1)
  });
  it('eval_counter 2', () => {
    expect(eval_counter('fields.field', {field: [1, 2]})).toBe(2)
  });
  it('eval_counter 3', () => {
    expect(eval_counter('fields.field', {field: {count: 3}})).toBe(3)
  });
});

describe('furet-ui-div component', () => {
  it('snapshot', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-div'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {},
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('is readonly 1', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-div'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {},
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.vm.isReadonly).toBe(false)
  });
  it('is readonly 2', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-div'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          readonly: false,
          writable: true
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.vm.isReadonly).toBe(false)
  });
  it('snapshot: hidden', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-div'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          hidden: true,
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-selector component', () => {
  it('snapshot', () => {
    const selectors = {}
    const wrapper = mount(getComponentPrototype('furet-ui-selector'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          selectors,
        },
        data: {},
        config: {
          name: 'selector',
          selections: {
            field1: 'Value 1',
            field2: 'Value 2',
            field3: 'Value 3',
          },
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot: readonly by provide', () => {
    const selectors = {}
    const wrapper = mount(getComponentPrototype('furet-ui-selector'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          selectors,
        },
        data: {},
        config: {
          name: 'selector',
          selections: {
            field1: 'Value 1',
            field2: 'Value 2',
            field3: 'Value 3',
          },
        },
      },
      provide: {
        partIsReadonly: () => true,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot: readonly by config', () => {
    const selectors = {}
    const wrapper = mount(getComponentPrototype('furet-ui-selector'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          selectors,
        },
        data: {},
        config: {
          name: 'selector',
          readonly: true,
          selections: {
            field1: 'Value 1',
            field2: 'Value 2',
            field3: 'Value 3',
          },
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot: hidden', () => {
    const selectors = {}
    const wrapper = mount(getComponentPrototype('furet-ui-selector'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          selectors,
        },
        data: {},
        config: {
          name: 'selector',
          hidden: true,
          selections: {
            field1: 'Value 1',
            field2: 'Value 2',
            field3: 'Value 3',
          },
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot: updateValue', () => {
    const selectors = {}
    const wrapper = mount(getComponentPrototype('furet-ui-selector'), {
      localVue, 
      router,
      i18n,
      propsData: {
        resource: {
          selectors,
        },
        data: {},
        config: {
          name: 'selector',
          hidden: true,
          selections: {
            field1: 'Value 1',
            field2: 'Value 2',
            field3: 'Value 3',
          },
        },
      },
      provide: {
        partIsReadonly: () => false,
      }
    });
    wrapper.vm.updateValue('field1')
    expect(selectors).toStrictEqual({"selector": "field1"})
  });
});
