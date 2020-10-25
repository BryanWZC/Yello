import React, { useState } from 'react';

const Card = () => {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    function removeItem(i){
        const newList = list.filter((item, index) => index !== i);
        setList(newList);
    };

    return(
        <div className='card'>
            <Input text={text} setText={text => setText(text)} list={list} setList={list => setList(list)}/>
            <List list={list} removeItem={removeItem} />
        </div>
    )
};

const Input = ({ text, setText, list, setList }) => {
    function handleKeyDown(e){
        if(e.key === 'Enter') setList([...list, {text: e.target.value}]), setText('');
    }
    function handleChange(e){
        setText(e.target.value);
    }
    function handleClick(){
        setList([...list, {text}]), setText('');
    }
    return(
        <div className='card-input'>
            <input type='text' name='card-text' id='card-text' value={text} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown} />
            <input type='submit' id='submit' name='submit' 
                onClick={handleClick} />
        </div>
    )
}

function List({ list, removeItem }){
    return list.map((d, i) => <Item item={d} index={i} removeItem={removeItem}/>)
}

function Item({ item, index, removeItem }){
    return(
        <div className='card-item' onDrag={(e) => (console.log(e), console.log(e.pageX, e.pageY, e.clientX, e.clientY))}>
            <p>{item.text}</p>
            <input type='submit' id='remove-item' name='remove-item' value='remove'
                onClick={() => removeItem(index)} />
        </div>
    )
}

export default Card;