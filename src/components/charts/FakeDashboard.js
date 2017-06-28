import React, { Component } from 'react';
import {line as LineChart} from 'zingchart-react';
import {bar as BarChart} from 'zingchart-react';
import {area as AreaChart} from 'zingchart-react';
import loading from'../../../public/loading.gif'

class FakeDashboard extends Component {
    constructor(){
        super()
        this.state = {
            simulationMode: false,
            intervalId: 0,
            lineChartData : [{ text : "Development", values : [30,40,30,40,50,70,20,30,40,20] },
                { text : "QA", values : [60,70,90,95,90,90,90,80,90,85] },
                { text : "Production", values : [100,98,98,100,25,25,100,93,99,95] }],
            barChartData : [{ values: [50,20,33,45,70,70,75,80,90,55,44,21,10,30,41,54,70,71,75,83,88,92,62,90]}],
            areaChartData : [ { text : "Application 1", values : [25,75,50,25,100] },
                { text : "Application 2", values : [33,55,77,44,60] },
                { text : "Application 3", values : [70,12,47,80,59] },
                { text : "Application 4", values : [82,80,43,49,33] },]
        }
    }

    changeData = () => {
        this.setState({
            lineChartData : this.simulateLineData(),
            barChartData : this.simulateBarData(),
            areaChartData : this.simulateAreaData()
        });
    }

    simulateAreaData(){
        var data = [
            { text : "Application 1", values : [] },
            { text : "Application 2", values : [] },
            { text : "Application 3", values : [] },
            { text : "Application 4", values : [] }
        ];

        for(var i = 0; i < data.length; i++){
            for(var j = 0; j < 7; j++){
                data[i].values.push( Math.floor(Math.random() * 20));
            }

        }

        return data;
    }

    simulateBarData(){

        var data = [];
        for(var i = 0; i < 24; i++){
            data.push( Math.floor(Math.random() * 25));
        }
        return  [{ values : data }] ;
    }

     simulateLineData(){
         var data = [
             { text : "Development", values : [] },
             { text : "QA", values : [] },
             { text : "Production", values : [] }
         ];

        for(var j=0; j < 3; j++){
            var series = data[j].values;
            for(var i = 0; i < 10; i++){
                series.push( Math.floor(Math.random() * 100));
            }

        }
        return data;
    }

    toggleSimulationMode = () => {
        var refreshIntervalId = 0;


        clearInterval(this.state.intervalId);
        if(!this.state.simulationMode){
            refreshIntervalId = setInterval(this.changeData, 3000);
        }
        this.setState({
            simulationMode: !this.state.simulationMode,
            intervalId: refreshIntervalId
        })
    }

    render() {
        return (
            <div>
            <div className="row">
                <div className="col-md-4">
                    {this.state.lineChartData.length > 0 ?
                        <LineChart id="chart1" series={this.state.lineChartData} title="Environment performance" height="300" width="400" />
                    :
                        <span> <img src={loading} className="loading" alt="Loading" /></span>
                    }
                </div>
                <div className="col-md-4">
                    {this.state.barChartData.length > 0 ?
                        <BarChart id="chart2" series={this.state.barChartData} title="24hr projections" height="300" width="400" />
                        :
                        <span> <img src={loading} className="loading" alt="Loading" /></span>
                    }
                </div>
                <div className="col-md-4">
                    {this.state.areaChartData.length > 0 ?
                        <AreaChart id="chart3" series={this.state.areaChartData} title="Workload per team" height="300" width="400" />
                        :
                        <span> <img src={loading} className="loading" alt="Loading" /></span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button onClick={this.toggleSimulationMode}>{this.state.simulationMode ? "Disable Simulation" : "Enable Simulation"}</button>
                </div>
            </div>
            </div>
        );
    }
}

export default FakeDashboard;
