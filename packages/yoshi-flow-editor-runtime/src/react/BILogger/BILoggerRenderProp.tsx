import React from 'react';
import {
  BILoggerContext,
  IBILoggerContext,
  IOwnerBILoggerContext,
  IVisitorBILoggerContext,
} from './BILoggerContext';

interface IBILoggerProviderProps<O extends boolean, V extends boolean> {
  owner?: O;
  visitor?: V;
  children: (bi: BIChild<V, O>) => any;
}

type BIChild<V, O> = O extends true
  ? IOwnerBILoggerContext
  : V extends true
  ? IVisitorBILoggerContext
  : IBILoggerContext;

export class BILogger<
  O extends boolean = false,
  V extends boolean = false
> extends React.Component<IBILoggerProviderProps<O, V>> {
  static defaultProps = {
    visitor: false,
    owner: false,
  };
  render() {
    const { children } = this.props;

    return (
      <BILoggerContext.Consumer>
        {(bi: IBILoggerContext) => children(bi as BIChild<V, O>)}
      </BILoggerContext.Consumer>
    );
  }
}
