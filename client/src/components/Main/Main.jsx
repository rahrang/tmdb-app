import React from 'react';
import { connect } from 'react-redux';

import getAllConfiguration from '../../actions/configuration';
import { PageLoader } from '../common/Loader';

class Main extends React.Component {
  componentDidMount() {
    const { getConfigurations } = this.props;
    getConfigurations();
  }

  render() {
    const { configuration } = this.props;
    if (!configuration.resolved) {
      return <PageLoader />;
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
