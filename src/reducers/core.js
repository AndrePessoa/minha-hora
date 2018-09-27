export default Object.assign({
    // public methods 
    setData( values ){
        for ( var i in values ) this[i] = values[i];
    },
    getPerHour(){

        this.total_salary = ( this.annual_bonus ? 13 : 12 ) * this.salary; 

        let total_days = 365 - this.vacation;
        let workdays = ( ( total_days / 7 ) * this.days ) - ( this.holidays ? this._holidaysPerYear : 0 );
        let total_hours = workdays * this.hours;
        
        this.reserve_time = this.admin_time + this.selfprojects_time + this.prospect_time + this.securitymargin_time;
        this.payed_hours = total_hours * ( 1 - this.reserve_time );
        this.reserved_hours = total_hours * ( this.reserve_time );
        
        this.total_income = this.total_salary + 
                            this._calcPlaceCost() +
                            this._calcHardwareCost() +
                            this._calcSoftwareCost() +
                            this._calcPersonalCost()

        this.tax = this.tax ? this.tax : this._calcAutoTax( this.total_income / 12 ) * 12;

        this.total_income = this.total_income + this.tax;

        this.perHour = this.total_income / this.payed_hours;

        // /debugger;

        return this.perHour;
        //return this._toCurrency( result ) ;
    },
    getPercents(){
        return {
            personal: Math.floor( ( this.total_salary + this._calcPersonalCost() ) / this.total_income * 10000 ) / 100,
            admin: Math.floor( ( this.reserved_hours * this.perHour ) / this.total_income * 10000 ) / 100,
            assets: Math.floor( ( this._calcHardwareCost() + this._calcSoftwareCost() ) / this.total_income * 10000 ) / 100,
            place: Math.floor( ( this._calcPlaceCost() ) / this.total_income * 10000 ) / 100,
            tax: Math.floor( ( this.tax ) / this.total_income * 10000 ) / 100,
        }
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
        if( !this.hardware_buy_cost ) return 0;
        return ( this.hardware_buy_cost - this.hardware_sell_cost ) / ( this.hardware_life_circle / 12 );
    },
    _calcSoftwareCost(){
        if( !this.software_buy_cost && !this.software_rent_cost ) return 0;
        return this.software_buy_cost + this.software_rent_cost * 12;
    },
    _calcPlaceCost(){
        if( !this.place_percent ) return 0;
        return ( ( this.place_rent + this.place_bills + this.place_internet ) * this.place_percent ) * 12;
    },
    _calcPersonalCost(){        
        return ( this.pension + this.health_plan ) * 12;
    }
}, {});