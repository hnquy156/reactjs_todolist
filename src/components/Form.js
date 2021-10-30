import React, { useState, useEffect } from 'react';

function Form(props) {

    const [tasksItem, setTasksItem] = useState({
        taskId: '',
        taskName: '',
        taskLevel: 0,
    });

    function handleSubmit(event) {
        event.preventDefault();
        const item = {
            id: tasksItem.taskId,
            name: tasksItem.taskName,
            level: tasksItem.taskLevel,
        }
        props.onClickSubmit(item);
    }

    function handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        
        setTasksItem({
            ...tasksItem,
            [name]: value,
        });
    }

    function handleCancel() {
        props.handleToggleForm()
    }

    useEffect(()=>{
        const item = props.itemSelected;
        if (item) {
            setTasksItem({
                taskId: item.id,
                taskName: item.name,
                taskLevel: +item.level,
            });
        };
    }, [props.itemSelected]);

    return (
        <div className="row">
            <div className="col-md-offset-7 col-md-5">
                <form className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" >label</label>
                        <input value={tasksItem.taskName} onChange={handleChange} name="taskName" type="text" className="form-control" placeholder="Task Name" />
                    </div>
                    <div className="form-group">
                        <label className="sr-only" >label</label>
                        <select value={tasksItem.taskLevel} onChange={handleChange} name="taskLevel" id="inputDs" className="form-control" required="required">
                            <option value={0}>Small</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={handleCancel} type="button" className="btn btn-default">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
