import React from 'react';
import FeedForm from './FeedForm.jsx';
import FeedList from './FeedList.jsx';
import ShowAddButton from './ShowAddButton.jsx';
import _ from 'lodash';
import Firebase from 'firebase';

export default class Feed extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      formDisplay: false,
      title: '',
      desc: ''
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const ref = new Firebase('https://reactest.firebaseIO.com/feed');
    ref.on('value', (snap) => {
      let items = [];
      snap.forEach((itemSnap)=>{
        const item = itemSnap.val();
        item.key = itemSnap.key();
        items.push(item);
      });
      items = _.sortBy(items, (item) => {
        return -item.voteCount;
      });

      this.setState({
        items: items
      });
    });
  }

  onToggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  add(newItem) {
    const ref = new Firebase('https://reactest.firebaseIO.com/feed');
    newItem.key = this.state.items.length + 1;
    ref.push(newItem);
  }

  onVote(item) {
    const ref = new Firebase('https://reactest.firebaseIO.com/feed').child(item.key);
    ref.update(item);
  }

  render() {
    return (
      <div>

        <div className="container">
          <ShowAddButton onToggleForm={() => this.onToggleForm()}
                         displayed={this.state.formDisplay}/>
        </div>

        <FeedForm displayed={this.state.formDisplay} add={this.add.bind(this)}/>

        <br />
        <br />

        <FeedList items={this.state.items} onVote={this.onVote.bind(this)}/>

      </div>
    );
  }

}
