import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const value = new Date("2020-05-06T12:20:00.000Z")

const localVue = global.localVue;
const store = global.store;
const provide = {
  partIsReadonly: () => {
    return false;
  },
  updateChangeState: () => {}
};

describe("Field.Datetime for Resource.List", () => {
  const ListDatetimeField = getComponentPrototype("furet-ui-list-field-datetime");

  it("Empty", () => {
    const wrapper = mount(ListDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value", () => {
    const wrapper = mount(ListDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
describe("Field.Datetime for Resource.Form", () => {
  const FormDatetimeField = getComponentPrototype("furet-ui-form-field-datetime");
  jest.spyOn(global.Date, 'now').mockImplementationOnce(() => value.valueOf())

  it("Empty", () => {
    const wrapper = mount(FormDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Empty and readonly", () => {
    const wrapper = mount(FormDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true
        },
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly", () => {
    const wrapper = mount(FormDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true
        },
        config: {
          name: "fieldName",
          label: "My field label"
        },
        data: {
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label and icon", () => {
    const wrapper = mount(FormDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: false
        },
        config: {
          maxlength: 10,
          placeholder: "An explicit placeholder",
          name: "fieldName",
          label: "My field label",
          icon: "user"
        },
        data: {
          fieldName: value
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("trigger value", () => {
    const updateValue = jest.fn()
    const wrapper = mount(FormDatetimeField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: false
        },
        config: {
          name: "fieldName",
        },
        data: {}
      },
      methods: {
        updateValue,
      },
    });
    expect(updateValue).not.toHaveBeenCalled()
    wrapper.vm.updateDateTimeValue(value)
    expect(updateValue).toHaveBeenCalled()
    expect(updateValue).toHaveBeenLastCalledWith('2020-05-06T12:20:00.000Z')
  });
});
