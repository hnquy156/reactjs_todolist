import React from 'react';

import Search from './Search';
import Sort from './Sort';

function Control(props) {

    let { orderBy, orderDirection, onClickSort } = props;
    let classBtn = ['btn', 'btn-block'];

    function handleAdd() {
        props.onClickAdd();
    }

    if (props.isShowForm)
        classBtn.push('btn-danger')
    else
        classBtn.push('btn-info');

    return (
        <div className="row">
            {/* SEARCH : START */}
            <Search onClickSearchGo={ props.onClickSearchGo } />
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
                <button onClick={handleAdd} type="button" className={classBtn.join(' ')}>
                    {props.isShowForm ? 'Close Task' : 'Add Task'}    
                </button>
            </div>
            {/* ADD : END */}
        </div>
    );
}

export default Control;
