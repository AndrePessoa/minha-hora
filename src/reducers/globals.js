import update from "immutability-helper";

const defaultValues = {
  areas: [],
  rooms: [],
};

const panels = (state = defaultValues, action) => {
  switch (action.type) {
    case "UPDATE_GLOBALS":
      const { areas, rooms } = action.value;

      return update(state, {
        areas: { $set: areas },
        rooms: { $set: rooms },
      });
    default:
      return state;
  }
};

export default panels;
