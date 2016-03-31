
var react = require('react');

class Input extends react.Component {
    render(){
        return <div className="form-group">
            <label htmlFor={this.props.label} className="control-label col-md-4">{this.props.label}</label>
            <div className="col-md-8">
                <input type="text" valueLink={this.props.valueLink} className="form-control" />
            </div>
        </div>;
    }
}

Input.propTypes = {
    valueLink: react.PropTypes.object.isRequired,
    label: react.PropTypes.string.isRequired
};

module.exports = Input;