import React from 'react';
import * as constants from '../../firebase_utils/constants';
import FakeDashboard from '../charts/FakeDashboard'
import NewsItem from './NewsItem'
import TechNews from './TechNews'


var NewsList = React.createClass({
    getInitialState() {
        return {
            news: [],
            sortBy: 'timestamp',
            limit: 10
        };
    },
    sortByKey : function(array, key){
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    },
    componentDidMount: function() {

        let news = constants.ref.child('news');
        //once - initial news list
        news.orderByChild("timestamp").limitToLast(this.state.limit).once('value', snapshot=>  {
            let obj = snapshot.val()
            let newslist = this.sortByKey(Object.keys(obj).map(key => obj[key]),this.state.sortBy)
            this.setState({ news : newslist })
        })
        //on - subscribe to news events
        news.orderByChild("timestamp").limitToLast(this.state.limit).on("value",snapshot=>  {
            let obj = snapshot.val()
            let newslist = this.sortByKey(Object.keys(obj).map(key => obj[key]),this.state.sortBy)
            this.setState({ news : newslist })
        })

    },
    render: function(){

        let items = this.state.news.map(function(item,index) {
            return <NewsItem key={index} item={item} /> ;
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>News</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <FakeDashboard/>
                        <br/>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-7">
                        <p><strong>Realtime Neo News</strong></p>
                        <ul className="news-list">{items}</ul>


                    </div>
                    <div className="col-md-5">
                        <p><strong>TechRadar News</strong></p>
                            <TechNews />
                    </div>

                </div>





            </div>
        );
    }
});

export default NewsList;