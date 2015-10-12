import React from 'react';

export default class ShowAddButton extends React.Component {
    render() {
      let classString;
      let buttonText;

      if (this.props.displayed) {
        classString = 'btn btn-default btn-block';
        buttonText = 'Cancel';
      }else {
        classString = 'btn btn-success btn-block';
        buttonText = 'Create new item';
      }

      return (
        <button className={classString} onClick={this.props.onToggleForm}>{buttonText}</button>
      );
    }
}
ShowAddButton.propTypes = {
  displayed: React.PropTypes.bool.isRequired,
  onToggleForm: React.PropTypes.func.isRequired
};
