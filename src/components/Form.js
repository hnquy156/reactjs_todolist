import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskId: '',
            taskName: '',
            taskLevel: 0,
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const item = {
            id: this.state.taskId,
            name: this.state.taskName,
            level: this.state.taskLevel,
        }
        this.props.onClickSubmit(item);
        
        event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        this.setState({
            [name]: value,
        });
    }

    handleCancel() {
        this.props.handleToggleForm()
    }

    componentWillMount() {
        this.updateItems(this.props.itemSelected);
    }

    componentWillReceiveProps(nextProps) {
        this.updateItems(nextProps.itemSelected);
    }

    updateItems(item) {
        if (item !== null) {
            this.setState({
                taskId: item.id,
                taskName: item.name,
                taskLevel: +item.level,
            });
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-offset-7 col-md-5">
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="sr-only" htmlFor>label</label>
                            <input value={this.state.taskName} onChange={this.handleChange} name="taskName" type="text" className="form-control" placeholder="Task Name" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor>label</label>
                            <select value={this.state.taskLevel} onChange={this.handleChange} name="taskLevel" id="inputDs" className="form-control" required="required">
                                <option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                        </div>
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                        <button onClick={this.handleCancel} type="button" className="btn btn-default">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
