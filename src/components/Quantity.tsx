"use client";
import React, { useEffect, useState } from "react";
interface QuantityProps {
  updateQuantity: (count: number) => void;
  limit: number;
}
const Quantity: React.FC<QuantityProps> = ({
  updateQuantity,
  limit = 1000,
}) => {
  const [count, setCount] = useState<number>(1);

  const handleSubtract = () => {
    setCount((pre) => (pre > 2 ? pre - 1 : 1));
  };
  const handleAdd = () => {
    setCount((pre) => (pre >= 1 && pre < limit ? pre + 1 : pre));
  };
  useEffect(() => {
    updateQuantity(count);
    // eslint-disable-next-line
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
          value={count}
          readOnly
        />
        <span className="plus bg-dark" onClick={handleAdd}>
          +
        </span>
      </div>
    </div>
  );
};
export default Quantity;
