import React from 'react';
import isEqual from 'lodash/isEqual';
import { BILoggerContext, IBILoggerContext } from './BILoggerContext';
import { BILogger } from './BILoggerRenderProp';

interface IBILoggerProvider {
  logger: IBILoggerContext;
  children: any;
}

export class BILoggerProvider extends React.Component<IBILoggerProvider> {
  render() {
    return (
      <BILoggerContext.Provider value={this.props.logger}>
        {this.props.children}
      </BILoggerContext.Provider>
    );
  }
}

interface IBILoggerDefaults {
  defaults: Record<string, any>;
  children: React.ReactChild;
}

export class BILoggerDefaults extends React.Component<IBILoggerDefaults> {
  _latestDefaults: Record<string, any> | null = null;
  constructor(props: IBILoggerDefaults) {
    super(props);
    if (!props.defaults) {
      console.warn(
        `😕 Seems like you're using \`BILoggerDefaults\`, but didn't specify \`defaults\` property.
Please pass an object with BI defaults, so all nested BILogger HOCs will include it to events.`,
      );
    }
  }
  shouldUpdateDefaults() {
    const result =
      !!this.props.defaults &&
      !isEqual(this.props.defaults, this._latestDefaults);
    this._latestDefaults = this.props.defaults;
    return result;
  }
  render() {
    return (
      <BILogger>
        {(bi) => {
          if (this.shouldUpdateDefaults()) {
            bi.util.updateDefaults(this.props.defaults);
          }

          return (
            <BILoggerContext.Provider value={bi}>
              {this.props.children}
            </BILoggerContext.Provider>
          );
        }}
      </BILogger>
    );
  }
}
