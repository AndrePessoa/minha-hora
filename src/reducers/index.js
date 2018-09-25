import { combineReducers } from 'redux'
import panels from './panels'
import inputs from './inputs'

const panelsApp = combineReducers({
  panels,
  inputs
})
  
export default panelsApp