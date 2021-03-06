import React, { Component } from 'react';
import autoBind from 'react-autobind';
import strings from '../../services/strings';
import language from '../../services/language';
import _ from 'lodash';

import ActiveLabel from '../ActiveLabel';

class CategoryFormGroups extends Component {

    state = {
        selectedLoaded: false,
        selected: [],
    }

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        this.tryLoadSelected();
    }

    componentDidUpdate() {
        this.tryLoadSelected();
    }

    tryLoadSelected() {
        if (_.size(this.props.selected) && !this.state.selectedLoaded) {
            this.setState({
                selectedLoaded: true,
                selected: this.props.selected,
            });
        }
    }

    handleAdd(e) {
        let id = e.target.value;
        let added = (_.findIndex(this.state.selected, (item) => {
            return item.id == id;
        }) > -1);

        if (!added) {
            let selected = _.extend([], this.state.selected);
            selected.push(this.props.groups[`_${id}`]);

            this.props.onChange(selected);
            this.setState({ selected });
        }
    }

    handleRemove(value) {
        let selected = _.filter(this.state.selected, (item) => {
            return item.id != value;
        });

        this.props.onChange(selected);
        this.setState({ selected });
    }

    render() {

        let groups = _.map(this.props.groups, (item) => {
            return (<option value={ item.id } key={ item.id }>{ item.name }</option>);
        })

        let selectedGroups = _.map(this.props.selected, (group) => {
            return (
                <ActiveLabel
                    name={ group.name }
                    value={ group.id }
                    onRemove={ this.handleRemove }
                    key={ group.id }
                />
            );
        });

        return (
            <div className="CategoryFormGroups">
                <div className="form-group">
                    <label className="control-label">{strings.get('App.categoryFormGroups.title')}</label>
                    <div>
                        { selectedGroups }
                    </div>
                    <select className="form-control" name="groups" value="" onChange={ this.handleAdd }>
                        <option value="" disabled>{strings.get('App.categoryFormGroups.choose')}</option>
                        { groups }
                    </select>
                </div>
            </div>
        );
    }

}

CategoryFormGroups.propTypes = {
    groups: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
}

export default CategoryFormGroups;