import update from 'immutability-helper';

const defaultValues = {
  salary: false,
  hours: false,
  resources: false,
  result: false
}

const panels = (state = defaultValues, action) => {
    switch (action.type) {
      case 'UPDATE_PANELS':
        const values = action.stored.inputs;

        const salaryCheck = ( values.salary > 0 )
        const hoursCheck =  (( values.days > 0 && values.days <= 7 ) && ( values.hours > 0 && values.hours <= 24 ))
        const resourcesCheck = ( values.room !== null && values.area !== null ) || ( values.place_rent > 0 && values.hardware_buy_cost > 0 )
        const resultCheck = ( salaryCheck && hoursCheck && resourcesCheck )

        return update( state, { 
          salary: {$set: salaryCheck },
          hours:  {$set: hoursCheck },
          resources: {$set: resourcesCheck },
          result: {$set: resultCheck }
        } );
      default:
        return state
    }
  }
  
  export default panels