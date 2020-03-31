import { renderToString } from "@vue/server-test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

describe("One2Many field for form View", () => {
  const component = getComponentPrototype("furet-ui-form-field-one2many");
  it("test furet ui form field one2many", async () => {
    const wrapper = await renderToString(component, {
      store,
      localVue,
      propsData: {
        resource: {
          name: 'test'
        },
        data: {
          test: [{id: 1}]
        },
        config: {}
      },
      provide: {
        partIsReadonly: () => {
          return false;
        },
        updateChangeState: () => {},
        getEntry: () => {return {}},
        getNewEntry: () => {return {}}
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
