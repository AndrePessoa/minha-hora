import StateManager from "react-select";
import coreFinMath from "./core";

export const verifyPanels = (store) => (next) => (action) => {
  switch (action.type) {
    case "UPDATE_SALARY":
    case "UPDATE_DAYS":
    case "UPDATE_HOURS":
    case "UPDATE_ASSETS":
    case "UPDATE_PLACE":
    case "UPDATE_SUB":
    case "UPDATE_SUB_VALUE":
      next(action);
      store.dispatch({
        type: "UPDATE_PANELS",
        stored: store.getState(),
      });
      break;
    default:
      return next(action);
  }
};

export const verifyResult = (store) => (next) => (action) => {
  switch (action.type) {
    case "UPDATE_SALARY":
    case "UPDATE_DAYS":
    case "UPDATE_HOURS":
    case "UPDATE_ASSETS":
    case "UPDATE_PLACE":
    case "UPDATE_SUB":
    case "UPDATE_SUB_VALUE":
      next(action);

      setTimeout(() => {
        store.dispatch({
          type: "CHECK_RESULT",
        });
      }, 1);

      break;
    case "CHECK_RESULT":
      const state = store.getState();
      const complete = Object.values(state.panels).indexOf(false) == -1;

      if (complete) {
        const inputs = store.getState().inputs;

        coreFinMath.setData(inputs);
        const perHour = coreFinMath.getPerHour();
        const percents = coreFinMath.getPercents();
        const totalHours = Math.round(coreFinMath.getTotalHours() * 100) / 100;
        const payedHours = Math.round(coreFinMath.getPayedHours() * 100) / 100;

        store.dispatch({
          type: "UPDATE_RESULT",
          perHour: perHour,
          percents: percents,
          total_hours: totalHours,
          payed_hours: payedHours,
        });

        if (perHour !== state.inputs.perHour) {
          store.dispatch({
            type: "UPDATE_SAVED",
            value: false,
          });
        }
      }

    default:
      next(action);
  }
};
