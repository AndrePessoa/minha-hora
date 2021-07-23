export default Object.assign(
  {
    // public methods
    setData(values) {
      for (var i in values) this[i] = values[i];
    },
    getTotalHours() {
      let total_days = 365 - this.vacation;
      let workdays =
        (total_days / 7) * this.days -
        (this.holidays ? this._holidaysPerYear : 0);
      this.total_hours = workdays * this.hours;

      return this.total_hours;
    },
    getPayedHours() {
      const total_hours = this.getTotalHours();
      this.reserve_time =
        this.admin_time +
        this.selfprojects_time +
        this.prospect_time +
        this.securitymargin_time;
      this.payed_hours = total_hours * (1 - this.reserve_time);

      return this.payed_hours;
    },
    getPerHour() {
      this.total_salary = (this.annual_bonus ? 13 : 12) * this.salary;

      const total_hours = this.getTotalHours();
      const payed_hours = this.getPayedHours();

      this.reserved_hours = total_hours - payed_hours;

      this.total_income =
        this.total_salary +
        this._calcPersonalCost() +
        this._calcHardwareCost() +
        this._calcSoftwareCost() +
        this._calcPlaceCost();

      this.tax = this._calcAutoTax(this.total_income / 12) * 12;
      this.total_income = this.total_income + this.tax;
      this.perHour = this.total_income / this.payed_hours;

      return this.perHour;
    },
    getPercents() {
      var prop_payed_hours =
        this.payed_hours / (this.reserved_hours + this.payed_hours);
      var prop_reserved_hours =
        this.reserved_hours / (this.reserved_hours + this.payed_hours);

      var totals = {
        personal:
          (this.total_salary + this._calcPersonalCost()) * prop_payed_hours,
        admin: this.reserved_hours * this.perHour,
        assets:
          (this._calcHardwareCost() + this._calcSoftwareCost()) *
          prop_payed_hours,
        place: this._calcPlaceCost() * prop_payed_hours,
        tax: this.tax * prop_payed_hours,
      };

      return {
        payed_hours: this.payed_hours,
        reserved_hours: this.reserved_hours,
        perYear: this.total_income,
        taxPerYear: this.tax,
        personal:
          Math.floor((totals.personal / this.total_income) * 10000) / 100,
        admin: Math.floor(prop_reserved_hours * 10000) / 100,
        assets: Math.floor((totals.assets / this.total_income) * 10000) / 100,
        place: Math.floor((totals.place / this.total_income) * 10000) / 100,
        tax: Math.floor((totals.tax / this.total_income) * 10000) / 100,
      };
    },
    getTaxType(value) {
      let result = "MEI";
      switch (true) {
        // Simples
        case value > 5000:
          result = "SIMPLES";
          break;
        default:
      }
      return result;
    },
    toJSON() {
      let result = {};
      for (var key in this) {
        if (key !== "toJSON" && this.hasOwnProperty(key)) {
          result[key] = this[key];
        }
      }
      return JSON.stringify(result);
    },
    // private methods
    _toCurrency(float) {
      (Number.isNaN(float) || float === Infinity) && (float = 0);
      var cents = (float % 1).toFixed(2).toString().split(".").pop();
      var integer = Math.floor(float);

      var r = integer > 0 ? integer.toString() : "0";

      for (let p = r.length - 3; p >= 1; p -= 3) {
        r = r.substr(0, p) + "." + r.substr(p);
      }

      r = r + "," + cents;
      r = "R$ " + r;

      return r;
    },
    _calcAutoTax(value) {
      let result = 0;
      switch (this.getTaxType(value)) {
        // MEI
        case "MEI":
          result = 50;
          break;
        // Simples
        case "SIMPLES":
          result = value * 0.16;
          break;
        default:
      }
      return result;
    },
    _calcHardwareCost() {
      if (!this.hardware_buy_cost) return 0;
      return (
        (this.hardware_buy_cost - this.hardware_sell_cost) /
        (this.hardware_life_circle / 12)
      );
    },
    _calcSoftwareCost() {
      if (!this.software_buy_cost && !this.software_rent_cost) return 0;
      return this.software_buy_cost + this.software_rent_cost * 12;
    },
    _calcPlaceCost() {
      if (!this.place_percent) return 0;

      const place_monthly_cost =
        this.place_percent *
        (this.place_rent + this.place_bills + this.place_internet);

      let total_days = 365 - this.vacation;
      const place_commute_yearly_cost = this.place_commute * total_days;

      return place_monthly_cost * 12 + place_commute_yearly_cost;
    },
    _calcPersonalCost() {
      return (this.pension + this.health_plan) * 12;
    },
  },
  {}
);
