import React, { Component } from 'react';

import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        this.props.onClickAdd();
    }

    render() {
        let { orderBy, orderDirection, onClickSort } = this.props;
        let ElmButton = <button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add Task</button>;
        if (this.props.isShowForm)
            ElmButton = <button onClick={this.handleAdd} type="button" className="btn btn-danger btn-block">Close Task</button>;
        return (
            <div className="row">
                {/* SEARCH : START */}
                <Search onClickSearchGo={ this.props.onClickSearchGo } />
                {/* SEARCH : END */}

                {/* SORT : START */}
                <Sort 
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                    onClickSort={onClickSort}
                />
                {/* SORT : END */}

                {/* ADD : START */}
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    { ElmButton }
                </div>
                {/* ADD : END */}
            </div>
        );
    }
}

export default Control;
