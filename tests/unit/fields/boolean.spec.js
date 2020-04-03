import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { safe_eval_boolean } from "@/components/fields/common";

const localVue = global.localVue;
const store = global.store;
const provide = {
  partIsReadonly: () => {
    return false;
  },
  updateChangeState: () => {}
};

describe("Field.Boolean for Resource.List", () => {
  const ListBooleanField = getComponentPrototype("furet-ui-list-field-boolean");

  it("Empty", () => {
    const wrapper = mount(ListBooleanField, {
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

  it("With true value", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "true"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With false value", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "false"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With security issue value", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "throw Error('this is a security issue')"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Boolean for Resource.Form", () => {
  const FormBooleanField = getComponentPrototype("furet-ui-form-field-boolean");

  it("Empty", () => {
    const wrapper = mount(FormBooleanField, {
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
});

describe("Test eval boolean", () => {
  it("test true values", () => {
    const TrulyValues = [
      [true, "true"],
      [1, "1"],
      ["1", "'1'"],
      ["True", "'True'"],
      ["true", "'true'"],
      ["t", "'t'"],
      ["yes", "'yes'"],
      ["y", "'y'"],
      ["on", "'on'"],
      [new String("1"), "new String('1')"],
      [new String("TrUe"), "new String('TrUe')"],
      [String("1"), "String('1')"],
      [String("true"), "String('true')"],
      [Boolean(true), "Boolean(true)"],
      [new Boolean(true), "new Boolean(true)"]
    ];
    TrulyValues.forEach(val => {
      expect(
        safe_eval_boolean(val[0]),
        "We expected safe_eval_boolean( `" + val[1] + "` ) to be true"
      ).toBe(true);
    });
  });
  it("test false values", () => {
    const FalsyValues = [
      [false, "false"],
      [-1, "-1"],
      [0, "0"],
      ["-1", '"-1"'],
      ["0", '"0"'],
      ["False", '"False"'],
      ["false", '"false"'],
      ["no", '"no"'],
      ["n", '"n"'],
      ["f", '"f"'],
      [12, "12"],
      ["12", '"12"'],
      [new String("-1"), 'new String("-1")'],
      [new String("0"), 'new String("0")'],
      [new String("12"), 'new String("12")'],
      [String("-1"), 'String("-1")'],
      [String("12"), 'String("12")'],
      [String("0"), 'String("0")'],
      [String("false"), 'String("false")'],
      [String("False"), 'String("False")'],
      [new Boolean(false), "new Boolean(false)"],
      [Boolean(false), "Boolean(false)"]
    ];
    FalsyValues.forEach(val => {
      expect(
        safe_eval_boolean(val[0]),
        "We expected safe_eval_boolean(`" + val[1] + "`) to be false"
      ).toBe(false);
    });
  });
  it("test null values", () => {
    const NullValues = [
      [null, "null"],
      ["null", '"null"'],
      [String("null"), 'String("null")'],
      [new String("null"), 'new String("null")'],
      [undefined, "undefined"],
      ["undefined", '"undefined"'],
      [String("undefined"), 'String("undefined")'],
      [new String("undefined"), 'new String("undefined")']
    ];
    NullValues.forEach(val => {
      expect(
        safe_eval_boolean(val[0]),
        "We expected safe_eval_boolean( `" + val[1] + "` ) to be null"
      ).toBe(null);
    });
  });
});
