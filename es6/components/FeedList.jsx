import React from 'react';
import FeedItem from './FeedItem.jsx';

export default class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feedItems = [];
    if (this.props.hasOwnProperty('items')) {
      feedItems = this.props.items.map((item) => {
        return (
        <FeedItem title={item.title} desc={item.description}
                  voteCount={item.voteCount} key={item.key}
                  index={item.key} onVote={this.props.onVote} />
        );
      });
    }

    return (
      <ul className="list-group container">
        {feedItems}
      </ul>
    );
  }
}
FeedList.propTypes = {
  items: React.PropTypes.array.isRequired,
  onVote: React.PropTypes.func.isRequired
};
