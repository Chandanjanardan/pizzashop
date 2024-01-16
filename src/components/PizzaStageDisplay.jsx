
import React from 'react';
import PizzaCard from './PizzaCard';

const PizzaStageDisplay = ({ pizzas, onMoveToNext, onCancel }) => {
  return (
    <div className="pizza-stage-display">
      <h2>In Progress</h2>
      <div className="stage-container">
        <div className="stage-column">
          <h3>Order Placed</h3>
          {pizzas
            .filter((pizza) => pizza.stage === 'Order Placed')
            .map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                onMoveToNext={onMoveToNext}
                onCancel={onCancel}
              />
            ))}
        </div>
        <div className="stage-column">
          {/* Similar code for other stages */}
        </div>
      </div>
      <div className="total-delivered">
        <h2>Total Pizzas Delivered Today: {pizzas.length}</h2>
      </div>
    </div>
  );
};

export default PizzaStageDisplay;
