import React from 'react';
import { connect } from 'react-redux';

import getAllConfiguration from '../../actions/configuration';

class Main extends React.Component {
  componentDidMount() {
    const { getConfigurations } = this.props;
    getConfigurations();
  }

  render() {
    const { configuration } = this.props;
    if (!configuration.resolved) {
      return <div>Loading...</div>;
    }

    if (configuration.error) {
      return <div>Failed</div>;
    }

    const { children } = this.props;
    return <div>{children}</div>;
  }
}

const mapStateToProps = state => ({
  configuration: state.configuration,
});

const mapDispatchToProps = dispatch => ({
  getConfigurations: () => dispatch(getAllConfiguration()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
