import { combineReducers } from "redux";
import panels from "./panels";
import inputs from "./inputs";
import globals from "./globals";

const panelsApp = combineReducers({
  panels,
  inputs,
  globals,
});

export default panelsApp;
