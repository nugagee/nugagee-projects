import React, { useState } from "react";

const Accordion = ({ id, title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item" key={id}>
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className="accordionicon mr-5">{isActive ? "-" : "+"}</div>
        <div>
          <h6>{title}</h6>
        </div>
      </div>
      {isActive && (
        <div className="accordion-content">
          {content.split("\n").map((c) => {
            return <p className="mb-3"> {c} </p>;
          })}
        </div>
      )}
    </div>
  );
};

export default Accordion;
