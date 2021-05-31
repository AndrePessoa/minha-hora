import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Panel from "./Panel.js";
import Help from "./Help.js";
import Checkbox from "./ui/Checkbox.js";

class PanelHours extends Panel {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hours: 0,
      days: 0,
      weekdays: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.next = this.next.bind(this);
  }

  setFocus() {
    setTimeout(() => {
      this.refs.days.focus();
    }, 100);
  }

  setWeekdays(day, value) {
    const result = [...this.props.inputs.weekdays];
    result[day] = value;
    const days = result.filter((v) => v).length;

    this.props.changeWeekdays(result);
    this.props.changeDays(days);
  }

  render() {
    const { hours, days, weekdays } = this.props.inputs;
    const status = this.props.panels.hours;

    return (
      <form
        onSubmit={this.next}
        className={[
          "panel",
          this.state.status ? "panel-complete" : "",
          this.props.className,
        ].join(" ")}
      >
        <h2>Quer trabalhar quais dias da semana?</h2>
        <div className="checkbox-group">
          <Checkbox
            value={weekdays[0]}
            onChange={(value) => this.setWeekdays(0, value)}
          >
            D
          </Checkbox>
          <Checkbox
            value={weekdays[1]}
            onChange={(value) => this.setWeekdays(1, value)}
          >
            S
          </Checkbox>
          <Checkbox
            value={weekdays[2]}
            onChange={(value) => this.setWeekdays(2, value)}
          >
            T
          </Checkbox>
          <Checkbox
            value={weekdays[3]}
            onChange={(value) => this.setWeekdays(3, value)}
          >
            Q
          </Checkbox>
          <Checkbox
            value={weekdays[4]}
            onChange={(value) => this.setWeekdays(4, value)}
          >
            Q
          </Checkbox>
          <Checkbox
            value={weekdays[5]}
            onChange={(value) => this.setWeekdays(5, value)}
          >
            S
          </Checkbox>
          <Checkbox
            value={weekdays[6]}
            onChange={(value) => this.setWeekdays(6, value)}
          >
            S
          </Checkbox>
        </div>
        <Help header="">
          <p>
            Quais dias você pretende se dedicar ao trabalho diretamente e
            indiretamente.
          </p>
        </Help>
        <h2>E quantas horas por dia?</h2>
        <input
          type="number"
          min="1"
          max="24"
          name="hours"
          defaultValue={hours}
          required
          onChange={this.props.changeHours}
        />
        <Help header="">
          <p>
            Quantas horas por dia você pretende disponibilizar, tanto na tarefa
            em si, como em tarefas relacionadas.
          </p>
        </Help>
        <div className="action-line">
          <Link
            className={["btn", status ? "" : "btn-disabled"].join(" ")}
            disabled={!status}
            to={status ? "/resources" : ""}
          >
            pronto!
          </Link>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputs: state.inputs,
    panels: state.panels,
  };
}

export function changeWeekdays(value) {
  return {
    type: "UPDATE_WEEKDAYS",
    value,
  };
}

export function changeDays(value) {
  return {
    type: "UPDATE_DAYS",
    value,
  };
}

export function changeHours(value) {
  return {
    type: "UPDATE_HOURS",
    value,
  };
}

const mapDispatchToProps = (dispatch) => ({
  changeDays(event) {
    return dispatch(changeDays(event?.target?.value || event));
  },
  changeWeekdays(value) {
    return dispatch(changeWeekdays(value));
  },
  changeHours(event) {
    return dispatch(changeHours(event.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelHours);
