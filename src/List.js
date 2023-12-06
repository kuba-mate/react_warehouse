import React, {useState, useRef, useEffect} from 'react';
import ListItem from './ListItem';

const LOCAL_STORAGE_KEY = 'myList';

export default function List() {

    const itemName = useRef();
    const itemAmount = useRef();
    const [list, setList] = useState(() => {
        const storedList = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedList ? JSON.parse(storedList) : [];
      });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }, [list]);

    function handleDeleteItem(index){
        const newList = list.filter(item=> item.id !== index);
        setList(newList);
    }

    function handleAddItem(e){
        const name = itemName.current.value;
        const amount = itemAmount.current.value;
        if(name.length <= 3){
            alert("Nazwa produktu musi być dłuższa");
            return
        }

        const newItem = {
            id: list.length + 1, name: name, amount: amount
        }

        setList([...list, newItem]);
        itemName.current.value='';
        itemAmount.current.value='';
    }

    return (
        <>
        {list.map(item => {
        return <ListItem key = {item.id}
            onDelete={() => handleDeleteItem(item.id)} 
            item = {item} />
        })}
        <div class = "dodaj">
            <label> Podaj nazwe produktu </label>
            <input ref={itemName} type="text"/>
            <label> Podaj ilość produktu </label>
            <input ref={itemAmount} type="text"/>
            <button onClick={handleAddItem}>Dodaj nowy produkt</button>
        </div>
        </>
    );
}
