import { createLocalVue } from "@vue/test-utils";
import { getters, defaultState, mutations, pk2string, update_change_object } from "@/store/modules/data";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store data module: pk2string function", () => {
  it("one pk", () => {
    expect(pk2string({id: 1})).toBe("[[\"id\",1]]");
  });
  it("tow pk", () => {
    expect(pk2string({id: 1, foo: 'bar'})).toBe("[[\"foo\",\"bar\"],[\"id\",1]]");
  });
  it("pk with state status", () => {
    expect(pk2string({id: 1, __x2m_state: 'ADDED'})).toBe("[[\"id\",1]]");
  });
});

describe("store data module: update_change_object function", () => {
  it("pk: update once model", () => {
    const change = {}
    const action = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'fieldName',
      value: 'test',
    }
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "fieldName": "test",
        },
      },
    }
    expect(update_change_object(change, action)).toStrictEqual(expected)
  });
  it("pk: update once model twice", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field1',
      value: 'test1',
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field2',
      value: 'test2',
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field1": "test1",
          "field2": "test2",
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("pk: update once model twice on same field", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field',
      value: 'test1',
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field',
      value: 'test2',
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field": "test2",
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("uuid: update once model", () => {
    const change = {}
    const action = {
      model: 'Model.1',
      uuid: 'uuid',
      fieldname: 'fieldName',
      value: 'test',
    }
    const expected = {
      "Model.1": {
        new: {
          'uuid': {
            "fieldName": "test",
          },
        },
      },
    }
    expect(update_change_object(change, action)).toStrictEqual(expected)
  });
  it("uuid: update once model twice", () => {
    const action1 = {
      model: 'Model.1',
      uuid: 'uuid',
      fieldname: 'field1',
      value: 'test1',
    }
    const action2 = {
      model: 'Model.1',
      uuid: 'uuid',
      fieldname: 'field2',
      value: 'test2',
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        new: {
          'uuid': {
            "field1": "test1",
            "field2": "test2",
          },
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("uuid: update once model twice on same field", () => {
    const action1 = {
      model: 'Model.1',
      uuid: 'uuid',
      fieldname: 'field',
      value: 'test1',
    }
    const action2 = {
      model: 'Model.1',
      uuid: 'uuid',
      fieldname: 'field',
      value: 'test2',
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        new: {
          'uuid': {
            "field": "test2",
          },
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("merge + pk: update once model", () => {
    const change = {}
    const action = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'fieldName',
      value: 'test',
      merge: {
        'Model.2': {
          "[[\"id\",1]]": {
            "fieldName": "test",
          }
        }
      }
    }
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "fieldName": "test",
        },
      },
      "Model.2": {
        "[[\"id\",1]]": {
          "fieldName": "test",
        },
      },
    }
    expect(update_change_object(change, action)).toStrictEqual(expected)
  });
  it("merge + pk: update once model twice", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field1',
      value: 'test1',
      merge: {
        'Model.2': {
          "[[\"id\",1]]": {
            "field1": "test1",
          }
        }
      }
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field2',
      value: 'test2',
      merge: {
        'Model.2': {
          "[[\"id\",1]]": {
            "field2": "test2",
          }
        }
      }
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field1": "test1",
          "field2": "test2",
        },
      },
      "Model.2": {
        "[[\"id\",1]]": {
          "field1": "test1",
          "field2": "test2",
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("merge + pk: update once model twice on same field", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field',
      value: 'test1',
      merge: {
        'Model.2': {
          "[[\"id\",1]]": {
            "field": "test1",
          }
        }
      }
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field',
      value: 'test2',
      merge: {
        'Model.2': {
          "[[\"id\",1]]": {
            "field": "test2",
          }
        }
      }
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field": "test2",
        },
      },
      "Model.2": {
        "[[\"id\",1]]": {
          "field": "test2",
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("merge + uuid: update once model", () => {
    const change = {}
    const action = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'fieldName',
      value: 'test',
      merge: {
        'Model.2': {
          new: {
            'uuid': {
              "fieldName": "test",
            }
          }
        }
      }
    }
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "fieldName": "test",
        },
      },
      "Model.2": {
        new: {
          'uuid': {
            "fieldName": "test",
          },
        },
      },
    }
    expect(update_change_object(change, action)).toStrictEqual(expected)
  });
  it("merge + uuid: update once model twice", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field1',
      value: 'test1',
      merge: {
        'Model.2': {
          new: {
            'uuid': {
              "field1": "test1",
            }
          }
        }
      }
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field2',
      value: 'test2',
      merge: {
        'Model.2': {
          new: {
            'uuid': {
              "field2": "test2",
            }
          }
        }
      }
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field1": "test1",
          "field2": "test2",
        },
      },
      "Model.2": {
        new: {
          'uuid': {
            "field1": "test1",
            "field2": "test2",
          },
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
  it("merge + uuid: update once model twice on same field", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field',
      value: 'test1',
      merge: {
        'Model.2': {
          new: {
            'uuid': {
              "field": "test1",
            }
          }
        }
      }
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field',
      value: 'test2',
      merge: {
        'Model.2': {
          new: {
            'uuid': {
              "field": "test2",
            }
          }
        }
      }
    }
    const change = update_change_object({}, action1)
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field": "test2",
        },
      },
      "Model.2": {
        new: {
          'uuid': {
            "field": "test2",
          },
        },
      },
    }
    expect(update_change_object(change, action2)).toStrictEqual(expected)
  });
});

describe("store data module: mutation", () => {
  let state;
  let store;

  beforeEach(() => {
    // Make test predictable deep copying state before each test
    state = JSON.parse(JSON.stringify(defaultState));
    store = new Vuex.Store({
      getters,
      state,
      mutations
    });
  });

  it("UPDATE_DATA : unexisting data", () => {
    const action = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field1: 'test 1'},
    }
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field1": "test 1",
        },
      },
    }
    store.commit("UPDATE_DATA", action);
    expect(state.data).toStrictEqual(expected);
  });
  it("UPDATE_DATA : existing data", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field1: 'test 1'},
    }
    const action2 = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field2: 'test 2'},
    }
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "field1": "test 1",
          "field2": "test 2",
        },
      },
    }
    store.commit("UPDATE_DATA", action1);
    store.commit("UPDATE_DATA", action2);
    expect(state.data).toStrictEqual(expected);
  });

  it("DELETE_DATA : unexisting data", () => {
    const action = {
      model: 'Model.1',
      pks: {id: 1},
    }
    const expected = {}
    store.commit("DELETE_DATA", action);
    expect(state.data).toStrictEqual(expected);
  });
  it("DELETE_DATA : existing data", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field1: 'test 1'},
    }
    const action2 = {
      model: 'Model.1',
      pks: {id: 1},
    }
    const expected = {"Model.1": {}}
    store.commit("UPDATE_DATA", action1);
    store.commit("DELETE_DATA", action2);
    expect(state.data).toStrictEqual(expected);
  });
  it("UPDATE_CHANGE", () => {
    const action = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'fieldName',
      value: 'test',
    }
    const expected = {
      "Model.1": {
        "[[\"id\",1]]": {
          "fieldName": "test",
        },
      },
    }
    store.commit("UPDATE_CHANGE", action);
    expect(state.changes).toStrictEqual(expected)
  });
  it("CLEAR_CHANGE", () => {
    const action = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'fieldName',
      value: 'test',
    }
    const expected = {}
    store.commit("UPDATE_CHANGE", action);
    store.commit("CLEAR_CHANGE");
    expect(state.changes).toStrictEqual(expected)
  });
  it("CLEAR_DATA", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field1: 'test 1'},
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'fieldName',
      value: 'test',
    }
    const expected = {data: {}, changes: {}}
    store.commit("UPDATE_DATA", action1);
    store.commit("UPDATE_CHANGE", action2);
    store.commit("CLEAR_DATA");
    expect(state).toStrictEqual(expected)
  });
});

describe("store data module: getter", () => {
  let state;
  let store;

  beforeEach(() => {
    // Make test predictable deep copying state before each test
    state = JSON.parse(JSON.stringify(defaultState));
    store = new Vuex.Store({
      getters,
      state,
      mutations
    });
  });

  it("get_entry: empty", () => {
    const expected = {}
    expect(store.getters.get_entry('Model.1', {id: 1})).toStrictEqual(expected);
  });
  it("get_entry: with data", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field1: 'test 1'},
    }
    const expected = {field1: 'test 1'}
    store.commit("UPDATE_DATA", action1);
    expect(store.getters.get_entry('Model.1', {id: 1})).toStrictEqual(expected);
  });
  it("get_entry: with data and change", () => {
    const action1 = {
      model: 'Model.1',
      pk: {id: 1},
      data: {field1: 'test 1'},
    }
    const action2 = {
      model: 'Model.1',
      pk: {id:1},
      fieldname: 'field2',
      value: 'test 2',
    }
    const expected = {
      field1: 'test 1',
      field2: 'test 2',
    }
    store.commit("UPDATE_DATA", action1);
    store.commit("UPDATE_CHANGE", action2);
    expect(store.getters.get_entry('Model.1', {id: 1})).toStrictEqual(expected);
  });
  it("get_new_entry: empty", () => {
    const expected = {}
    expect(store.getters.get_new_entry('Model.1', 'uuid')).toStrictEqual(expected);
  });
  it("get_new_entry: with change", () => {
    const action = {
      model: 'Model.1',
      uuid: 'uuid',
      fieldname: 'field2',
      value: 'test 2',
    }
    const expected = {
      field2: 'test 2',
    }
    store.commit("UPDATE_CHANGE", action);
    expect(store.getters.get_new_entry('Model.1', 'uuid')).toStrictEqual(expected);
  });
});
