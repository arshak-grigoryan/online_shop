import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {} from "../../store/actions";
import "./restaurantItem.scss";

const RestaurantItem = ({ id, name, photoUrl, cuisines }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onRestaurantClick = () => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <div className="restaurantItemWrapper">
      <div className="restaurantItem" onClick={onRestaurantClick}>
        <div
          className="photo"
          style={{ backgroundImage: `url(${photoUrl})` }}
        ></div>
        <h2>{name}</h2>
        <div className="cuisines">
          {cuisines.map((kitchen, i) => {
            return (
              <div className="cuisineWrapper" key={i}>
                <div className="cuisine">{kitchen}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;