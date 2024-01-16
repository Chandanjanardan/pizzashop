
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OrderForm from './components/OrderForm';
import PizzaStageDisplay from './components/PizzaStageDisplay';
import './components/app.css';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const placeOrder = (order) => {
    if (orders.length < 10) {
      setOrders([...orders, { ...order, stage: 'Order Placed', time: new Date() }]);
    } else {
      alert('Not taking any more orders for now. Maximum limit reached.');
    }
  };

  const cancelOrder = (orderToCancel) => {
    const updatedOrders = orders.filter((order) => order.id !== orderToCancel.id);
    setOrders(updatedOrders);
  };

  const cancelAllOrders = () => {
    setOrders([]);
  };

  const moveToNextStage = (orderToMove) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderToMove.id) {
        const nextStage = getNextStage(order.stage);
        return { ...order, stage: nextStage, time: new Date() };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const getNextStage = (currentStage) => {
    switch (currentStage) {
      case 'Order Placed':
        return 'Order in Making';
      case 'Order in Making':
        return 'Order Ready';
      case 'Order Ready':
        return 'Order Picked';
      default:
        return currentStage;
    }
  };

  return (
    <div>
      <Navbar />
      <OrderForm placeOrder={placeOrder} />
      <PizzaStageDisplay
        pizzas={orders}
        onMoveToNext={moveToNextStage}
        onCancel={cancelOrder}
        onCancelAll={cancelAllOrders}
      />
    </div>
  );
};

export default App;
