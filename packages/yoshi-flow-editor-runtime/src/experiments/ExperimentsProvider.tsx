import React, { Component } from 'react';
import {
  ExperimentsProvider as OriginalExperimentsProvider,
  ExperimentsProviderProps,
} from '@wix/wix-experiments-react';

export class ExperimentsProvider extends Component<ExperimentsProviderProps> {
  componentDidMount() {
    console.warn(`
😳 Seems like you're using \`ExperimentsProvider\` in your Widget or Settings panel.
Editor Flow already wraps your component in \`ExperimentsProvider\`, so you just have to use \`withExperiments\` HOC.
`);
  }
  render() {
    return (
      <OriginalExperimentsProvider {...this.props}>
        {this.props.children}
      </OriginalExperimentsProvider>
    );
  }
}
