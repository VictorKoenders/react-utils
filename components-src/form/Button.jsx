
var react = require('react');

class Button extends react.Component {
    render(){
        return <div className="form-group">
            <div className="col-md-8 col-md-offset-4">
                <input type="button" value="Submit" className="btn btn-primary" />
            </div>
        </div>;
    }
}

module.exports = Button;