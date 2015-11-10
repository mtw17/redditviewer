'use strict';
require('babel/polyfill');
var React = require('react');
var ReactDOM = require('react-dom');
var Thread = require('./components/thread.js');
var Modal = require('react-modal');
var appElement = document.getElementById('app');
var Actions = require('./store/actions.js');
var threadStore = require('./store/threadstore.js');
var Reflux = require('reflux');

const customStyles = {
  
   overlay: { 
   backgroundColor   : 'rgba(0, 0, 0, 0.75)'
	    },
   content: {   
    background: 'transparent',
    border: '0px',
   }, 
};


var RedditViewer = React.createClass({
	
	mixins: [Reflux.connect(threadStore,"threadStore")],
  	getInitialState: function() {
                return({current:0, modalIsOpen:false});
        },
    	componentDidMount: function() {
		Actions.updateThreads("funny");	
        },

	clickHandler: function(e) {
		this.setState({current:parseInt(e.currentTarget.id)});
		this.openModal();
		      },

	allowDrop: function(e) {
		    e.preventDefault();
	},

    redditDrop: function(e) {
		    e.preventDefault();
		         var currentArticle = this.state.threadStore.threads[this.state.current];

			window.location = ("https://reddit.com"+currentArticle.data.permalink); 
	},

	mailDrop: function(e) {
                    e.preventDefault();
			var currentArticle = this.state.threadStore.threads[this.state.current];
			window.location = ("mailto:?subject="+encodeURIComponent(currentArticle.data.title.substring(0, 140))+"&body="+encodeURIComponent("I would like to share the following Reddit story with you: ") + encodeURIComponent("https://reddit.com"+currentArticle.data.permalink));
                        this.closeModal();
        },
     openModal: function() {
			
			this.setState({modalIsOpen:true});
		
		},
     closeModal: function() {
			if(this.state.modalIsOpen) { 
                        	this.setState({modalIsOpen:false});
			}
                }, 
    	onChange: function(e) {
			
			  Actions.updateThreads(this.refs.search.value);
		  },
	render:function() {
		       var self = this;
		       var currentArticle = this.state.threadStore.threads ? this.state.threadStore.threads[this.state.current] : null;
			    var articles = this.state.threadStore.threads.map(function(i,idNum) {  return (<Thread idNum={idNum} key={i.data.title} title={i.data.title} author={i.data.author} ups={i.data.ups} downs={i.data.downs} thumbnail={i.data.thumbnail} comments={i.data.num_comments} clickHandler={self.clickHandler}/>); }       );		      
		       return (<div>
					<div className="row headerBar">
					<div className="container-fluid appCont">	
					<div className="col-md-4"><strong id="mainTitle">Reddit</strong></div>
						<div className="col-md-8"><input ref="search" type="text" placeholder="Funny" onChange={this.onChange}/></div>
					</div></div>

			       		<div className="container-fluid appCont">
					{ this.state.threadStore.loading ? <div className="loader"><img src="/img/loader.gif" /></div> : null }
					{articles}
	

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
	    { currentArticle && currentArticle.data ? (
		    <div className="col-md-4 card"  draggable="true">
			 <Thread idNum={this.state.current} modal={true} key={currentArticle.data.title} title={currentArticle.data.title} author={currentArticle.data.author} ups={currentArticle.data.ups} downs={currentArticle.data.downs} thumbnail={currentArticle.data.thumbnail} comments={currentArticle.data.num_comments} clickHandler={function() { return; }} /> 
			  </div>): <div></div> }
	  <div className="col-md-4 instructions">
	  	<p>Drag the card on the left to the desired action</p>
	   </div>
		  <div className="col-md-4">
	  <div className="row">
	    		<div className="col-md-12 card" onDrop={this.redditDrop} onDragOver={this.allowDrop}>
				<img src="/img/reddit-logo.png"/><br/>
				<strong>Open on Reddit</strong>
			</div>
		</div>
			
		 <div className="row">
			<div className="col-md-12 card" onDrop={this.mailDrop} onDragOver={this.allowDrop}>
                                <img src="/img/mail-logo.png"/><br/>
                                <strong>Email to a Friend</strong>
                	</div>  	
	 	 </div>
	  </div>
        </Modal>

      </div>
						
				</div>)
	}		

});
		

 
  ReactDOM.render(<RedditViewer/>, document.getElementById("app"));
