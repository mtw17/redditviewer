'use strict';
var React = require('react');

var Thread = module.exports = React.createClass({
	
	render: function() {
		var modal = this.props.modal || false;
		return <div className="row thread" id={this.props.idNum} onClick={this.props.clickHandler}>
				<div className={modal ? "col-md-12" : "col-md-2"}><img className="threadimg"  src={this.props.thumbnail.indexOf("http") > -1 ?  this.props.thumbnail : "/img/unknown.png"} alt="Thumbnail" /></div>
				<div className={modal ? "col-md-12" : "col-md-10"}>
			 	<div className="row"><div className="col-md-12"><strong>{this.props.author}</strong></div></div>

				<div className="row"><div className="col-md-12"><p>{this.props.title}</p></div></div>
				 <div className="row stats">
					<div className="col-md-4">
						<div className="spriteContainer"><img src="/img/icon-sprite.png" id="commentSprite"/></div> {this.props.comments} comments</div>
				<div className="col-md-4">
					<div className="spriteContainer"><img src="/img/icon-sprite.png" id="upSprite"/></div>
					{this.props.ups} ups
				</div>
				<div className="col-md-4">
					<div className="spriteContainer"><img src="/img/icon-sprite.png" id="downSprite" /></div> 
					{this.props.downs} downs</div>
				</div>
				</div>
			</div>;
				

		}

});
