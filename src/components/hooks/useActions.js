import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function useActions() {
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.globals.areas) || [];
  const rooms = useSelector((state) => state.globals.rooms) || [];

  const doReset = useCallback(() => {
    return dispatch({
      type: "RESET",
    });
  }, [dispatch]);

  const changeSalary = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_SALARY",
        value: parseFloat(value || 0),
      });
    },
    [dispatch]
  );

  const changeDays = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_DAYS",
        value: parseInt(value || 0),
      });
    },
    [dispatch]
  );

  const changeWeekdays = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_WEEKDAYS",
        value,
      });
    },
    [dispatch]
  );

  const changeHours = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_HOURS",
        value: value ? parseInt(value) : undefined,
      });
    },
    [dispatch]
  );

  const changeArea = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_ASSETS",
        value: areas[value],
        id: value,
      });
    },
    [dispatch, areas]
  );

  const changePlace = useCallback(
    (value) => {
      return dispatch({
        type: "UPDATE_PLACE",
        value: rooms[value],
        id: value,
      });
    },
    [dispatch, rooms]
  );

  const changeSub = useCallback(
    (value, name) => {
      return dispatch({
        type: "UPDATE_SUB",
        value,
        name,
      });
    },
    [dispatch]
  );

  const changeSubArea = useCallback(
    (value, name) => {
      return dispatch({
        type: "UPDATE_AREA_SUB",
        value,
        name,
      });
    },
    [dispatch]
  );

  const changeSubPlace = useCallback(
    (value, name) => {
      return dispatch({
        type: "UPDATE_PLACE_SUB",
        value,
        name,
      });
    },
    [dispatch]
  );

  const changeSubValue = useCallback(
    (value, name) => {
      return dispatch({
        type: "UPDATE_SUB",
        value,
        name,
      });
    },
    [dispatch]
  );

  const changePerc = useCallback(
    (value, name) => {
      return dispatch({
        type: "UPDATE_SUB",
        value: value / 100,
        name,
      });
    },
    [dispatch]
  );

  const changeCheckbox = useCallback(
    (value, name) => {
      return dispatch({
        type: "UPDATE_SUB",
        value,
        name,
      });
    },
    [dispatch]
  );

  return {
    doReset,
    changeSalary,
    changeDays,
    changeWeekdays,
    changeHours,
    changeArea,
    changePlace,
    changeSub,
    changeSubArea,
    changeSubPlace,
    changeSubValue,
    changePerc,
    changeCheckbox,
  };
}

export default useActions;
