import update from "immutability-helper";

const defaultValues = {
  saved: false,
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
    case "UPDATE_SAVED":
      return update(state, {
        saved: { $set: action.value },
      });
    default:
      return state;
  }
};

export default panels;
