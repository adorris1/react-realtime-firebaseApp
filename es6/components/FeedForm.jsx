import React from 'react';
import ReactDOM from 'react-dom';

export default class FeedForm extends React.Component {
    handleClick(e) {
      e.preventDefault();
      const newItem = {
        title: ReactDOM.findDOMNode(this.refs.title).value,
        description: ReactDOM.findDOMNode(this.refs.desc).value,
        voteCount: 0
      };

      ReactDOM.findDOMNode(this.refs.feedForm).reset();

      this.props.add(newItem);
    }
    render() {
      let styles = this.props.displayed ? 'block' : 'none';
      styles = {
        display: styles
      };
      return (
        <form ref="feedForm" id="feedForm" className="container"
              style={styles} onSubmit={this.handleClick.bind(this)}>
          <div className="form-group">
            <input type="text" className="form-control title"
                   placeholder="Title" ref="title"/>
            <input type="text" className="form-control desc"
                   placeholder="Description" ref="desc" />
            <button className="btn btn-primary btn-block">Add</button>
          </div>
        </form>
      );
    }
}
FeedForm.propTypes = {
  displayed: React.PropTypes.bool.isRequired,
  add: React.PropTypes.func.isRequired
};
