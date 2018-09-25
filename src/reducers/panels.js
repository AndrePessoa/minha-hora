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
        const resourcesCheck = ( values.room && values.area )
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