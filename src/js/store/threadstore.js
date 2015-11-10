'use strict';
var Reflux = require('reflux');
var actions = require('./actions.js');

var ThreadStore = module.exports = Reflux.createStore({
	listenables: [actions],
  getInitialState: function(){
    var state =  {threads: [], loading:false};
    return this.state = state;
  },
  onUpdateThreads: function(subreddit){
    var self = this;
    self.state.loading = true;
    self.trigger(self.state);
    $.get("https://www.reddit.com/r/"+subreddit+"/.json", function(data) {
		self.state.threads = data.data.children;
		self.state.loading = false;
		self.trigger(self.state);

    });
			  
    }
  



});
