import React from 'react';

export default function ListItem({item, onDelete}) {
  return (
    <div>
      <label>
        nazwa : {item.name} , ilość : {item.amount}
      </label>
      <button class="delete" onClick ={onDelete}>Usuń produkt</button>
    </div>
  );
}
