import React, { useState, useEffect, useMemo } from 'react';

import { filter, includes, orderBy as orderByFunc, remove, reject } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
// import tasks from './mock/tasks';

function App() {

    let [items, setITEMS] = useState([]);
    const [isShowForm, setIsShowForm] = useState(false);
    const [strSearch, setStrSearch] = useState('');
    const [orderBy, setOrderBy] = useState('name');
    const [orderDirection, setOrderDirection] = useState('asc');
    const [itemSelected, setItemSelected] = useState(null);
    
    useEffect(()=>{
        items = JSON.parse(localStorage.getItem('tasks'));
        items = items || [];
        setITEMS(items);
    }, []);

    const itemsAfterFiltered = useMemo(() => {
        if (strSearch !== '') {
            // items = items.filter(item => item.name.search(new RegExp(strSearch, 'ig')) > -1 );
            return filter(items, item => {
                return includes(item.name.toLowerCase(), strSearch);
            });
        } else return items;
    }, [items, strSearch]);

    const itemsAfterSorted = useMemo(() => {
        return orderByFunc(itemsAfterFiltered, [orderBy], [orderDirection]);
    }, [itemsAfterFiltered, orderBy, orderDirection]);

    function handleToggleForm() {
        setIsShowForm(!isShowForm);
        setStrSearch('');
        setItemSelected(null)
    }

    function handleDelete(id) {
        const newItems = [...items];
        remove(newItems, item => item.id === id);
        setITEMS(newItems);

        localStorage.setItem('tasks', JSON.stringify(newItems));
    }

    function handleSearch(value) {
        setStrSearch(value);
    }

    function handleSort(orderBy, orderDirection) {
        setOrderBy(orderBy);
        setOrderDirection(orderDirection);
    }

    function handleSubmit(item) {
        let id = null;
        if (item.id) {
            items = reject(items, {id: item.id});
            id = item.id;
        } else {
            id = uuidv4();
        }
        const newItems = [
            ...items,
            {
                id: id,
                name: item.name,
                level: +item.level,
            }  
        ];
        setITEMS(newItems);
        setIsShowForm(false);
        
        localStorage.setItem('tasks', JSON.stringify(newItems));
    }

    function handleEdit(item) {
        setItemSelected(item);
        setIsShowForm(true);
    }


    return (
        <div>

            {/* TITLE : START */}
            <Title />
            {/* TITLE : END */}

            {/* CONTROL (SEARCH + SORT + ADD) : START */}
            <Control 
                orderBy={orderBy}
                orderDirection={orderDirection}
                isShowForm={isShowForm} 
                onClickAdd={handleToggleForm} 
                onClickSearchGo={handleSearch}
                onClickSort={handleSort}
            />
            {/* CONTROL (SEARCH + SORT + ADD) : END */}

            {/* FORM : START */}
            { isShowForm && <Form itemSelected={itemSelected} onClickSubmit={handleSubmit} handleToggleForm={handleToggleForm} /> }
            
            {/* FORM : END */}

            {/* LIST : START */}
            <List 
                items={itemsAfterSorted} 
                onClickDelete={handleDelete}
                onClickEdit={handleEdit}
            />
        </div>
    );
}

export default App;
