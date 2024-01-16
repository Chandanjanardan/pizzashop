
import React, { useState, useEffect } from 'react';

const PizzaCard = ({ pizza, onMoveToNext, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pizza.stage]);

  function calculateTimeLeft() {
    const stageTimes = {
      'Order Placed': 1 * 60, // 1 minute
      'Order in Making': 6 * 60, // 6 minutes
      'Order Ready': 1 * 60, // 1 minute
      'Order Picked': 1 * 60, // 1 minute
    };

    const elapsedTime = (new Date() - new Date(pizza.time)) / 1000; // in seconds
    return Math.max(stageTimes[pizza.stage] - Math.floor(elapsedTime), 0);
  }

  return (
    <div className={`pizza-card ${pizza.stage}`}>
      <p>Order ID: {pizza.id}</p>
      <p>Type: {pizza.type}</p>
      <p>Size: {pizza.size}</p>
      <p>Base: {pizza.base}</p>
      <p>Stage: {pizza.stage}</p>
      <p>
        Time Left for Next Step: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} mins
      </p>
      {pizza.stage === 'Order Picked' && (
        <button onClick={() => onMoveToNext(pizza)}>Next</button>
      )}
      {pizza.stage !== 'Order Ready' && (
        <button onClick={() => onCancel(pizza)}>Cancel</button>
      )}
    </div>
  );
};

export default PizzaCard;
