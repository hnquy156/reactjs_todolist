import React, { Component } from 'react';

import { filter, includes, orderBy as orderByFunc, remove, reject } from 'lodash';
import { uuid } from 'uuidv4';

import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
// import tasks from './mock/tasks';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isShowForm: false,
            strSearch: '',
            orderBy: 'name',
            orderDirection: 'asc',
            itemSelected: null,
        };

        this.handleToggleForm = this.handleToggleForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleToggleForm() {
        this.setState({
            isShowForm: !this.state.isShowForm,
            strSearch: '',
            itemSelected: null,
        });
    }

    handleDelete(id) {
        const items = this.state.items
        remove(items, item => item.id === id);
        this.setState({ items });

        localStorage.setItem('tasks', JSON.stringify(this.state.items));
    }

    handleSearch(value) {
        this.setState({ strSearch: value});
    }

    handleSort(orderBy, orderDirection) {
        this.setState({ orderBy, orderDirection });
    }

    handleSubmit(item) {
        let { items } = this.state;
        let id;
        if (item.id !== '') {
            items = reject(items, {id: item.id});
            id = item.id;
        } else {
            id = uuid()
        }
        items.push({
            id: id,
            name: item.name,
            level: +item.level,
        });
        this.setState({ items, isShowForm: false });

        localStorage.setItem('tasks', JSON.stringify(this.state.items));
    }

    handleEdit(item) {
        this.setState({
            itemSelected: item,
            isShowForm: true,
        });
    }

    componentWillMount() {
        let items = JSON.parse(localStorage.getItem('tasks'));
        items = items === null ? [] : items;
        this.setState({items});
    }

    render() {
        let items = [...this.state.items];
        let { isShowForm, strSearch, orderBy, orderDirection, itemSelected } = this.state;

        // Search
        if (strSearch !== '') {
            // items = items.filter(item => item.name.search(new RegExp(strSearch, 'ig')) > -1 );
            items = filter(items, item => {
                return includes(item.name.toLowerCase(), strSearch);
            });
        }
        // Sort
        items = orderByFunc(items, [orderBy], [orderDirection]);

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
                    onClickAdd={this.handleToggleForm} 
                    onClickSearchGo={this.handleSearch}
                    onClickSort={this.handleSort}
                />
                {/* CONTROL (SEARCH + SORT + ADD) : END */}

                {/* FORM : START */}
                { isShowForm && <Form itemSelected={itemSelected} onClickSubmit={this.handleSubmit} handleToggleForm={this.handleToggleForm} /> }
                
                {/* FORM : END */}

                {/* LIST : START */}
                <List 
                    items={items} 
                    onClickDelete={this.handleDelete}
                    onClickEdit={this.handleEdit}
                />
            </div>
        );
    }
}

export default App;
