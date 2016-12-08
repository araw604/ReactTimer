var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function(){
    return{
      count: 0,
      timerStatus: 'stopped'
    };
  },
  componentDidUpdate: function(prevProps, prevState){
    if (this.state.timerStatus !== prevState.timerStatus){
      switch(this.state.timerStatus){
         case 'started':
         this.handelStart();
         break;
         case 'stopped':
         this.setState({count:0});
         case 'paused':
         clearInterval(this.timer);
         this.timer = undefined;
         break;
      }
    }
  },
  componentWillUnmount: function(){
    clearInterval(this.timer);
  },
  handelStart: function(){
    this.timer = setInterval(() =>{
      this.setState({
        count: this.state.count + 1
      });
    },1000);
  },
  handelStatusChange: function(newTimerStatus){

    this.setState({timerStatus: newTimerStatus})
  },
  render:function(){
    var {count, timerStatus}=this.state;

    return(
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handelStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;
