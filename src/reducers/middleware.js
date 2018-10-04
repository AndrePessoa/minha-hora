import coreFinMath from './core';

export const verifyPanels = store => next => action => {
    switch (action.type) {
        case 'UPDATE_SALARY':
        case 'UPDATE_DAYS':
        case 'UPDATE_HOURS':
        case 'UPDATE_ASSETS':
        case 'UPDATE_PLACE':
        case 'UPDATE_SUB':
            let result = next(action);
            store.dispatch({
               type: "UPDATE_PANELS",
               stored: store.getState()
            });
            break; 
        default:
          return next(action);
    }
}

export const verifyResult = store => next => action => {
    switch (action.type) {
        case 'UPDATE_SALARY':
        case 'UPDATE_DAYS':
        case 'UPDATE_HOURS':
        case 'UPDATE_ASSETS':
        case 'UPDATE_PLACE':
        case 'UPDATE_SUB':
            next(action);

            setTimeout(()=>{
                store.dispatch({
                    type: "CHECK_RESULT"
                });
            },1);

            break;
        case 'CHECK_RESULT': 
            const values = store.getState();
            const complete = Object.values(values.panels).indexOf(false) == -1;

            if( complete ){
                const inputs = store.getState().inputs;
                
                coreFinMath.setData(inputs);
                const perHour = coreFinMath.getPerHour();
                const percents = coreFinMath.getPercents(); 

                store.dispatch({
                    type: "UPDATE_RESULT",
                    perHour: perHour,
                    percents: percents
                });
            }

        default:
            next(action);
    }
} 