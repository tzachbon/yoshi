import React, { Component } from 'react';
import { i18n } from 'i18next';
import { I18nextProvider as OriginalI18nextProvider } from 'react-i18next';

export class I18nextProvider extends Component<{ i18n: i18n }> {
  componentDidMount() {
    console.warn(`
😳 Seems like you're using \`I18nextProvider\` in your Widget or Settings panel.
Editor Flow already wraps your component in \`I18nextProvider\`, so you just have to use \`translate\` HOC.
`);
  }
  render() {
    return (
      <OriginalI18nextProvider {...this.props}>
        {this.props.children}
      </OriginalI18nextProvider>
    );
  }
}
