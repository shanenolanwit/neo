import React from 'react';
import Button from '../common/Button'

var SprintForm = React.createClass({
    getInitialState: function() {
        return {
            name: '', description: '',
            startDate: '', endDate: '',
            hasErrors: false,
            hasNameError: false, nameErrorMessage: '',
            hasDescriptionError: false, descriptionErrorMessage: '',
            hasStartDateError: false, startDateErrorMessage: '',
            hasEndDateError: false, endDateErrorMessage: ''
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var description = this.state.description.trim();
        var name = this.state.name.trim();
        var startDate = this.state.startDate.trim();
        var endDate = this.state.endDate.trim();
        if (!description || !name || !startDate || !endDate) {
            this.setState({
                hasErrors: true,
                hasNameError: !name, nameErrorMessage: 'name can not be null',
                hasDescriptionError: !description, descriptionErrorMessage: 'description can not be null',
                hasStartDateError: !startDate, startDateErrorMessage: 'start date can not be null',
                hasEndDateError: !endDate, endDateErrorMessage: 'end date can not be null'
            });
            return;
        } else if(endDate < startDate){
            this.setState({
                hasErrors: true,
                hasNameError: false, nameErrorMessage: '',
                hasDescriptionError: false, descriptionErrorMessage: '',
                hasStartDateError: false, startDateErrorMessage: '',
                hasEndDateError: true, endDateErrorMessage: "End date must be greater than start date"
            });
            return;
        }
        this.props.addHandler(name,description,startDate,endDate);
        this.setState({
            name: '', description: '',
            startDate: '', endDate: '',
            hasErrors: false,
            hasNameError: false, nameErrorMessage: '',
            hasDescriptionError: false, descriptionErrorMessage: '',
            hasStartDateError: false, startDateErrorMessage: '',
            hasEndDateError: false, endDateErrorMessage: ''
        });

    },
    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
    handleStartDateChange: function(e) {
        this.setState({startDate: e.target.value});
    },
    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
    handleEndDateChange: function(e) {
        this.setState({endDate: e.target.value});
    },
    render: function () {
        var rowStyle = this.state.hasErrors ? "row-error" : "";
        var nameStyle = this.state.hasNameError ? "cell-error" : "";
        var descriptionStyle = this.state.hasDescriptionError ? "cell-error" : "";
        var startDateStyle = this.state.hasStartDateError ? "cell-error" : "";
        var endDateStyle = this.state.hasEndDateError ? "cell-error" : "";
        return (
            <tr className={rowStyle}>

                <td className={nameStyle}>
                    <input type="text"
                           className="form-control" placeholder="Sprint Name"
                           value={this.state.name}
                           onChange={this.handleNameChange}>
                    </input>
                    {this.state.hasNameError ? <span className="error-message">{this.state.nameErrorMessage}</span> : ""}
                </td>

                <td className={descriptionStyle}>
                    <input type="text"
                           className="form-control" placeholder="Sprint Description"
                           value={this.state.description}
                           onChange={this.handleDescriptionChange}>
                    </input>
                    {this.state.hasDescriptionError ? <span className="error-message">{this.state.descriptionErrorMessage}</span> : ""}
                </td>
                <td className={startDateStyle}>
                    <input type="date"
                           className="form-control" placeholder="Start Date"
                           value={this.state.startDate}
                           onChange={this.handleStartDateChange}>
                    </input>
                    {this.state.hasStartDateError ? <span className="error-message">{this.state.startDateErrorMessage}</span> : ""}
                </td>
                <td className={endDateStyle}>
                    <input type="date"
                           className="form-control" placeholder="Expected End Date"
                           value={this.state.endDate}
                           onChange={this.handleEndDateChange}>
                    </input>
                    {this.state.hasEndDateError ? <span className="error-message">{this.state.endDateErrorMessage}</span> : ""}
                </td>
                <td>
                    <Button title="Post" handleSubmit={this.handleSubmit} stylingRules="btn post"/>
                </td>

            </tr>

        )

    }
});

export default SprintForm;