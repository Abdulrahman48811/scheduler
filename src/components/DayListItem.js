import classNames from "classnames";
import React from "react";
// import DayListItem from "./DayListItem";
import "./DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;
  const dayClass = classNames(
    "day-list__item",
    {"day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
    });

  const formatSpots = (spots) => {
    if (spots > 1) {
      return <h3 className="text--light">{spots} spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">{spots} spot remaining</h3>
    } else {
      return <h3 className="text--light">no spots remaining</h3>
    }
  }

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2> 
      {formatSpots(spots)}
    </li>
  );
}