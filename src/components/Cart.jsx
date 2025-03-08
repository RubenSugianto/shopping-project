import { useContext } from 'react';

import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Cart() {

  // bisa pake use aja, kelebihannya kalo ditaro di if else bisa, use context gabisa
  // use kekuranganya ga support di React Version 19 atau lebih tinggi

  // Selain bisa pake useContext, bisa juga pake CartContext.Consumer
  // Dia jadi gaperlu useContext dan import lagi, tp tinggal di wrapped di returnnya

  // Use Context ini dia render ulang, mirip Use State
  const { items, updateItemQuantity} = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
