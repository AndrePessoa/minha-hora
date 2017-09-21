import data from "../models/Data.js";

export default Object.assign({
    // public methods
    checkData(step){
        let ret = false;
        switch(step){
            case 0:
                ret = this.salary > 0;
            break;
            case 1:
                ret = this.days > 0 && this.days <= 7;
                ret = ret && this.hours > 0 && this.hours <= 24;
            break;
            case 2:
                ret = this.area !== null;
                ret = ret && this.room !== null;
            break;
            case 3:
                ret = this.checkData(0) && this.checkData(1) && this.checkData(2);
            break;
            case 4:
                ret = this.checkData(0) && this.checkData(1) && this.checkData(2);
            break;
            default:
                ret = false;
        }
        return ret;
    },  
    getResult(){
        let total_salary = ( this.annual_bonus ? 13 : 12 ) * this.salary; 

        let total_days = 365 - this.vacation;
        let workdays = ( ( total_days / 7 ) * this.days ) - ( this.holidays ? this._holidaysPerYear : 0 );
        let total_hours = workdays * this.hours;
        
        let reserve_time = this.admin_time + this.selfprojects_time + this.prospect_time + this.securitymargin_time;
        let payed_hours = total_hours * ( 1 - reserve_time );
        
        let total_income = total_salary + 
                            this._calcPlaceCost() +
                            this._calcHardwareCost() +
                            this._calcSoftwareCost() +
                            this._calcPersonalCost()

        let tax = this.tax ? this.tax : this._calcAutoTax( total_income / 12 );

        total_income = total_income + tax;

        let result = total_income / payed_hours;

        // /debugger;

        return this._toCurrency( result ) ;
    },
    toJSON(){
        let result = {};
        for (var key in this) {
            if ( key !== 'toJSON' && this.hasOwnProperty(key)) {
                result[key] = this[key];                
            }
        }
        return JSON.stringify( result );
    },
    // private methods
    _toCurrency( float ) {
        ( ( Number.isNaN(float) || float === Infinity ) &&  ( float = 0 ) );
        var cents = ( float % 1 ).toFixed(2).toString().split('.').pop();
        var integer = ( Math.floor( float ) );

        var r = (integer>0)?integer.toString():"0";
       
        for (let p = r.length - 3; p>=1; (p-=3)) {
            r = r.substr(0,p)+"."+r.substr(p);
        }
        
        r = r+","+cents;
        r = "R$ "+r;
        
        return r;
    },
    _calcAutoTax( value ){
        let result = 0;
        switch( true ){
            // MEI
            case ( value < 5000 ):
                result = 50;
            break;
            // Simples
            case ( value > 5000 ):
                result = value * 0.16;
            break;
            default:
        }
        return result;
    },
    _calcHardwareCost(){
        if( this.area === null ) return 0;
        return ( this.hardware_buy_cost - this.hardware_sell_cost ) / 3 ;
    },
    _calcSoftwareCost(){
        if( this.area === null ) return 0;
        return this.software_buy_cost + this.software_rent_cost * 12;
    },
    _calcPlaceCost(){
        if( this.room === null ) return 0;
        return ( ( this.place_rent + this.place_bills + this.place_internet ) * this.place_percent ) * 12;
    },
    _calcPersonalCost(){        
        return ( this.pension + this.health_plan ) * 12;
    }
}, data);