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


  it("merge + uuid: existing data", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {}
      }
    };
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __x2m_state: "ADDED",
        uuid: "fake_uuid_tag2"
      }],
      merge: {
        "model.2": {
          new: {
            fake_uuid_tag2: { name: "test 2" }
          }
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag2" }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag2: { name: "test 2" }
        }
      }
    });
  });

  it("merge + uuid: add an other x2m line", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [{ __x2m_state: "ADDED", uuid: "fake_uuid_tag1" }]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" }
        }
      }
    };
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __x2m_state: "ADDED",
        uuid: "fake_uuid_tag2"
      }],
      merge: {
        "model.2": {
          new: {
            fake_uuid_tag2: { name: "test 2" }
          }
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag2" }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
          fake_uuid_tag2: { name: "test 2" }
        }
      }
    });
  });

  it("merge new UPDATE with existing UPDATED/DELETED", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "DELETED", id: 3 },
            { __x2m_state: "UPDATED", id: 4 }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
        },
        '[["id",3]]': {id: 3, __change_state: "delete"},
        '[["id",4]]': {name: "test4"},
      }
    }
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __x2m_state: "UPDATED",
        id: 5
      }],
      merge: {
        "model.2": {
          '[["id",5]]': {name: "Test 5"},
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "DELETED", id: 3 },
            { __x2m_state: "UPDATED", id: 4 },
            { __x2m_state: "UPDATED", id: 5 }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
        },
        '[["id",3]]': {id: 3, __change_state: "delete"},
        '[["id",4]]': {name: "test4"},
        '[["id",5]]': {name: "Test 5"}
      }
    });
  });
  it("merge new DELETED with existing UPDATED/DELETED", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "DELETED", id: 3 },
            { __x2m_state: "UPDATED", id: 4 }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
        },
        '[["id",3]]': {id: 3, __change_state: "delete"},
        '[["id",4]]': {name: "test4"},
      }
    }
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __x2m_state: "DELETED",
        id: 5
      }],
      merge: {
        "model.2": {
          '[["id",5]]': {__change_state: "delete", id: 5},
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "DELETED", id: 3 },
            { __x2m_state: "UPDATED", id: 4 },
            { __x2m_state: "DELETED", id: 5 }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
        },
        '[["id",3]]': {id: 3, __change_state: "delete"},
        '[["id",4]]': {name: "test4"},
        '[["id",5]]': {id: 5, __change_state: "delete"}
      }
    });
  });

  it("revert x2m ADDED change", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag2" }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
          fake_uuid_tag2: { name: "test 2" }
        },
        '[["id",3]]': {name: "test3"},
        '[["id",4]]': {name: "test4"},
        '[["id",5]]': {name: "test5", hello: "world"}
      }
    }
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __revert: true,
        uuid: "fake_uuid_tag2"
      }],
      merge: {
        "model.2": {
          new: {
            fake_uuid_tag2: { __revert: true }
          },
          '[["id",3]]': {__revert: true},
          '[["id",5]]': {__revert: true, name: "Test 5"},
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
          fake_uuid_tag2: { __revert: true }
        },
        '[["id",3]]': {__revert: true},
        '[["id",4]]': {name: "test4"},
        '[["id",5]]': {name: "Test 5", __revert: true},
      }
    });
  });

  it("revert x2m ADDED change", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag2" }
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
          fake_uuid_tag2: { name: "test 2" }
        },
        '[["id",3]]': {name: "test3"},
        '[["id",4]]': {name: "test4"},
        '[["id",5]]': {name: "test5", hello: "world"}
      }
    }
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __revert: true,
        uuid: "fake_uuid_tag2"
      }],
      merge: {
        "model.2": {
          new: {
            fake_uuid_tag2: { __revert: true }
          },
          '[["id",3]]': {__revert: true},
          '[["id",5]]': {__revert: true, name: "Test 5"},
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
          ]
        }
      },
      "model.2": {
        new: {
          fake_uuid_tag1: { name: "test" },
          fake_uuid_tag2: { __revert: true }
        },
        '[["id",3]]': {__revert: true},
        '[["id",4]]': {name: "test4"},
        '[["id",5]]': {name: "Test 5", __revert: true},
      }
    });
  });

  it("revert x2m UPDATED change", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "UPDATED", id: 3, code: "test" },
            { __x2m_state: "UPDATED", id: 4, code: "test" }
          ]
        }
      },
      "model.2": {
        '[["id",3],["code","test"]]': {name: "test3"},
        '[["id",4],["code","test"]]': {name: "test4"}
      }
    }
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __revert: true,
        id: 3,
        code: "test"
      }],
      merge: {
        "model.2": {
          '[["id",3],["code","test"]]': {__revert: true},
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "UPDATED", id: 4, code: "test" }
          ]
        }
      },
      "model.2": {
        '[["id",3],["code","test"]]': {__revert: true},
        '[["id",4],["code","test"]]': {name: "test4"}
      }
    });
  });
  it("revert x2m DELETED change", () => {
    const state = {
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "DELETED", id: 3, code: "test" },
            { __x2m_state: "DELETED", id: 4, code: "test" }
          ]
        }
      },
      "model.2": {
        '[["id",3],["code","test"]]': {__change_state: "delete"},
        '[["id",4],["code","test"]]': {__change_state: "delete"},
      }
    }
    const action = {
      model: "model.1",
      pk: { id: 1 },
      uuid: undefined,
      fieldname: "items",
      value: [{
        __revert: true,
        id: 3,
        code: "test"
      }],
      merge: {
        "model.2": {
          '[["id",3],["code","test"]]': {__revert: true},
        }
      }
    };
    expect(update_change_object(state, action)).toEqual({
      "model.1": {
        '[["id",1]]': {
          items: [
            { __x2m_state: "DELETED", id: 4, code: "test" }
          ]
        }
      },
      "model.2": {
        '[["id",3],["code","test"]]': {__revert: true},
        '[["id",4],["code","test"]]': {__change_state: "delete"}
      }
    });
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
      __change_state: "update",
      field1: 'test 1',
      field2: 'test 2',
    }
    store.commit("UPDATE_DATA", action1);
    store.commit("UPDATE_CHANGE", action2);
    expect(store.getters.get_entry('Model.1', {id: 1})).toStrictEqual(expected);
  });
  it("get_entry: with revert change", () => {
    const state = {
      data: {
        "model.2": {
          '[["id",3]]': {name: "TEST 3"},
          '[["id",4]]': {name: "TEST 4"},
          '[["id",5]]': {name: "TEST 5"},
        }
      },
      changes: {
        "model.1": {
          '[["id",1]]': {
            items: [
            ]
          }
        },
        "model.2": {
          '[["id",3]]': {__revert: true},
          '[["id",4]]': {name: "test 4"},
          '[["id",5]]': {name: "Test 5", __revert: true},
        }
      }
    }
    const expected3 = {
      name: "TEST 3",
    }
    const expected5 = {
      __change_state: "update",
      __revert: true,  // we should probably remove this revert information
      name: "Test 5",
    }
    expect(getters.get_entry(state)('model.2', {id: 3})).toStrictEqual(expected3);
    expect(getters.get_entry(state)('model.2', {id: 5})).toStrictEqual(expected5);
  });
  it("get_new_entry: empty", () => {
    const expected = {
      "__change_state": "create",
      "__uuid": "uuid",
    }
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
      "__change_state": "create",
      "__uuid": "uuid",
      field2: 'test 2',
    }
    store.commit("UPDATE_CHANGE", action);
    expect(store.getters.get_new_entry('Model.1', 'uuid')).toStrictEqual(expected);
  });
  it("get_new_entry: with revert change", () => {
    const state = {
      changes: {
        "model.1": {
          '[["id",1]]': {
            items: [
              { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
              { __x2m_state: "ADDED", uuid: "fake_uuid_tag3" },
            ]
          }
        },
        "model.2": {
          new: {
            fake_uuid_tag1: { name: "test" },
            fake_uuid_tag2: { __revert: true },
            fake_uuid_tag3: { __revert: true, name: 'plop' },
          },
        }
      }
    }
    const expected = {
      __change_state: "create",
      __uuid: "fake_uuid_tag3",
      __revert: true,  // we should probably remove this revert information
      name: 'plop',
    }
    expect(getters.get_new_entry(state)('model.2', 'fake_uuid_tag2')).toStrictEqual({});
    expect(getters.get_new_entry(state)('model.2', 'fake_uuid_tag3')).toStrictEqual(expected);
  });
  it("get_new_entries: empty", () => {
    const expected = [];
    expect(store.getters.get_new_entries('Model.1')).toStrictEqual(expected);
  });
  it("get_new_entries: data", () => {
    const state = {
      changes: {
        "model.1": {
          '[["id",1]]': {
            items: [
              { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
              { __x2m_state: "ADDED", uuid: "fake_uuid_tag2" }
            ]
          }
        },
        "model.2": {
          new: {
            fake_uuid_tag1: { name: "test" },
            fake_uuid_tag2: { name: "test 2" }
          }
        }
      }
    }
    const expected = [
      {
        __uuid: "fake_uuid_tag1",
        __change_state: "create",
        name: "test"
      },
      {
        __uuid: "fake_uuid_tag2",
        __change_state: "create",
        name: "test 2"
      }
    ];
    expect(getters.get_new_entries(state)('model.2')).toStrictEqual(expected);
  });
  it("get_new_entries: data with revert", () => {
    const state = {
      changes: {
        "model.1": {
          '[["id",1]]': {
            items: [
              { __x2m_state: "ADDED", uuid: "fake_uuid_tag1" },
            ]
          }
        },
        "model.2": {
          new: {
            fake_uuid_tag1: { name: "test" },
            fake_uuid_tag2: { __revert: true }
          }
        }
      }
    }
    const expected = [
      {
        __uuid: "fake_uuid_tag1",
        __change_state: "create",
        name: "test"
      }
    ];
    expect(getters.get_new_entries(state)('model.2')).toStrictEqual(expected);
  });
});
