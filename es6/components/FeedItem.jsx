import React from 'react';

export default class FeedItem extends React.Component {
    constructor(props) {
      super(props);
    }

    vote(newCount) {
      const newItem = {
        key: this.props.index,
        title: this.props.title,
        description: this.props.desc,
        voteCount: newCount
      };
      this.props.onVote(newItem);
    }

    voteUp() {
      const voteCount = parseInt(this.props.voteCount, 10);
      const newCount = voteCount + 1;
      this.vote(newCount);
    }

    voteDown() {
      const voteCount = parseInt(this.props.voteCount, 10);
      const newCount = voteCount - 1;
      this.vote(newCount);
    }

    render() {
      const badge = this.props.voteCount >= 0 ?
                      'badge badge-success' : 'badge badge-danger';

      return (
        <li className="list-group-item">
          <span className={badge}>{this.props.voteCount}</span>
          <h4>{this.props.title}</h4>
          <span>{this.props.desc}</span>
        <span className="pull-right">
            <button id="up" className="btn btn-sm btn-primary"
                    onClick={this.voteUp.bind(this)}>&uarr;</button>
            <button id="down" className="btn btn-sm btn-primary"
                    onClick={this.voteDown.bind(this)}>&darr;</button>
          </span>
        </li>
      );
    }
}
FeedItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  index: React.PropTypes.string.isRequired,
  desc: React.PropTypes.string.isRequired,
  voteCount: React.PropTypes.number.isRequired,
  onVote: React.PropTypes.func.isRequired
};
