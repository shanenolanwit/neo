import React from 'react';


var Home = React.createClass({

    render: function(){
        var defaultMessage = "Neo Sprint Manager"
        return (
            <div className="container home">
                <h2>{defaultMessage}</h2>
            </div>
        );
    }
});

export default Home;