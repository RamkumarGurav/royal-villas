import React from "react";

const Features = () => {
  return (
    <div id="features">
      <div className="features-item features-item-1">
        <div className="feature-container">
          <h2 className="features-title ">Free Cocktail Package</h2>
          <p className="features-para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse
            mollitia beatae expedita molestiae blanditiis laboriosam, sint
            provident iure in!
          </p>
        </div>
      </div>
      <div className="features-item features-item-2">
        <div className="feature-container">
          <h2 className="features-title ">Free Surfing Package</h2>
          <p className="features-para ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse
            mollitia beatae expedita molestiae blanditiis laboriosam, sint
            provident iure in!
          </p>
        </div>
      </div>
      <div className="features-item features-item-3">
        {" "}
        <div className="features-text-container">
          <h2 className="v-title">Features</h2>
        </div>
      </div>
    </div>
  );
};

export default Features;
