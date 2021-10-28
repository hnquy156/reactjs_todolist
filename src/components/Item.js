import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.handeDelete = this.handeDelete.bind(this);
        this.handeEdit = this.handeEdit.bind(this);
    }
    handeDelete(id) {
        this.props.onClickDelete(id);
    }
    handeEdit(item) {
        this.props.onClickEdit(item);
    }

    render() {
        const { index, item } = this.props;
        return (
            <tr>
                <td className="text-center">{index+1}</td>
                <td>{item.name}</td>
                <td className="text-center">{this.showElementLevel(item.level)}</td>
                <td>
                    <button onClick={() => this.handeEdit(item)} type="button" className="btn btn-warning">Edit</button>
                    <button onClick={() => this.handeDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }

    showElementLevel(level) {
        const ALL_LEVEL = [
            <span className="label label-default">Small</span>,
            <span className="label label-info">Medium</span>,
            <span className="label label-danger">High</span>,
        ]
        return ALL_LEVEL[level];
    }
}

export default Item;
