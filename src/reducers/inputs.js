import update from 'immutability-helper';
import Rooms from '../models/Rooms.js';
import Areas from '../models/Areas.js';

const defaultValues = {
    perHour: 0,
    percents: {
        personal: 0.2,
        admin: 0.2,
        assets: 0.2,
        place: 0.2,
        tax: 0.2
    },
    //
    // public props
    // money out
    salary: 0,
    annual_bonus: false,
    // days
    holidays: false,
    vacation: 0,
    hours: 0,
    days: 0,
    // work cost
    area: null,
    room: null,
    place_rent: 0,
    place_bills: 0,
    place_internet: 0,
    place_percent: 0,
    software_buy_cost: 0,
    software_rent_cost: 0,
    hardware_buy_cost: 0,
    hardware_sell_cost: 0,
    hardware_life_circle: 12,
    tax: 0,
    taxModel: null,
    // personal cost
    health_plan: 0,
    pension: 0,
    // admin margins
    admin_time: 0.1,
    selfprojects_time: 0.1,
    prospect_time: 0.1,
    securitymargin_time: 0.1,
    //private props
    _holidaysPerYear: 15
}

const inputs = (state = defaultValues, action) => {
    switch (action.type) {
        case 'UPDATE_SALARY':
            return update( state, { salary: { $set: action.value } } );
        case 'UPDATE_DAYS':
            return update( state, { days: { $set: action.value } } );
        case 'UPDATE_HOURS':
            return update( state, { hours: { $set: action.value } } );
        case 'UPDATE_ASSETS':
            const areaId = action.value;
            const area = Areas[areaId];
            return update( state, { 
                area: { $set: areaId },
                software_buy_cost: { $set: area.software.buy },
                software_rent_cost: { $set: area.software.rent },
                software_life_circle: { $set: 1 },
                hardware_buy_cost: { $set: area.hardware.buy },
                hardware_sell_cost: { $set: area.hardware.sell },
                hardware_life_circle: { $set: 1 }
            } );
        case 'UPDATE_ASSETS_SUB':
            return update( state, { 
                [action.name]: { $set: action.value },
            } );
        case 'UPDATE_PLACE':
            const placeId = action.value;
            const place = Rooms[placeId];
            return update( state, { 
                room: { $set: placeId },
                place_rent: { $set: place.rent },
                place_bills: { $set: place.bills },
                place_internet: { $set: place.internet },
                place_percent: { $set: place.percent },
            } );
        // extended
        case 'UPDATE_RESULT':
            return update( state, {
                perHour: { $set: action.perHour },
                percents: { $set: action.percents } 
            } );
        case 'UPDATE_SUB':
            return update( state, { 
                [action.name]: { $set: action.value },
            } );
        default:
            return state
    }
  }
  
  export default inputs