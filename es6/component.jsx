import React from 'react';

export default class Hello extends React.Component {

  componentWillMount () {
    // pred renderom
  }

  componentDidMount () {
    // po renderi
  }

  componentWillReceiveProps (nextProps) {
      // pred tym nez sa nasetuje nova props
  }

  getInitialState () {
    // init state
  }

  shouldComponentUpdate (nextProps, nextState) {
    // check ci sa ma prerenderovat alebo ne
  }

  componentWillUpdate () {

  }

  componentDidUpdate () {

  }

  getDefaultProps() {
    // default props
  }

  componentWillUnmount () {
    // destroy component React.unmountComponentAtNode(document.getElementById('app'));
  }

  render() {
    return <h1>Hello world</h1>;
  }
}
