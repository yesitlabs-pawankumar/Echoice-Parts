"use client";
import React, { useEffect, useState } from "react";
interface QuantityProps {
  updateQuantity: (count: number) => void;
}
const Quantity: React.FC<QuantityProps> = ({ updateQuantity }) => {
  const [count, setCount] = useState<number>(1);
  const handleSubtract = () => {
    setCount((pre) => (pre > 2 ? pre - 1 : 1));
  };
  const handleAdd = () => {
    setCount((pre) => (pre >= 1 ? pre + 1 : 1));
  };
  useEffect(() => {
    updateQuantity(count);
  }, [count]);
  return (
    <div id="plus_minus">
      <div className="qty">
        <span className="minus bg-dark" onClick={handleSubtract}>
          -
        </span>
        <input
          type="text"
          className="count"
          name="qty"
          defaultValue="1"
          value={count}
        />
        <span className="plus bg-dark" onClick={handleAdd}>
          +
        </span>
      </div>
    </div>
  );
};
export default Quantity;
