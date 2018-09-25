import coreFinMath from './core';

export const verifyPanels = store => next => action => {
    switch (action.type) {
        case 'UPDATE_SALARY':
        case 'UPDATE_DAYS':
        case 'UPDATE_HOURS':
        case 'UPDATE_ASSETS':
        case 'UPDATE_PLACE':
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
            const values = store.getState();
            const complete = Object.values(values.panels).indexOf(false) == -1;

            if( complete ){
                const inputs = store.getState().inputs;
                const result = coreFinMath.getResult(inputs);

                store.dispatch({
                    type: "UPDATE_RESULT",
                    value: result
                 });
            }
            next(action);
            break;
        default:
            next(action);
    }
} 