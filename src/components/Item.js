import React from 'react';

function Item(props) {
    const { index, item } = props;

    function handeDelete(id) {
        props.onClickDelete(id);
    }

    function handeEdit(item) {
        props.onClickEdit(item);
    }

    function showElementLevel(level) {
        const ALL_LEVEL = [
            <span className="label label-default">Small</span>,
            <span className="label label-info">Medium</span>,
            <span className="label label-danger">High</span>,
        ]
        return ALL_LEVEL[level];
    }

    return (
        <tr>
            <td className="text-center">{index+1}</td>
            <td>{item.name}</td>
            <td className="text-center">{showElementLevel(item.level)}</td>
            <td>
                <button onClick={() => handeEdit(item)} type="button" className="btn btn-warning">Edit</button>
                <button onClick={() => handeDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
}

export default Item;
