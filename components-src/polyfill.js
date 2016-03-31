module.exports = function(){
    var react = require('react');

    react.Component.prototype.valueLink = function(path){
        // TODO: Implement valuelink
        return {
            value: null,
            requestChange: e => {
            }
        };
    }
}