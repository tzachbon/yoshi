import React from 'react';
import { I18nextProvider } from 'yoshi-flow-editor-runtime/test';
import { render } from '@testing-library/react';
import { ExperimentsProvider } from '@wix/wix-experiments-react';
import { Widget } from './Widget';

describe('Widget', () => {
  it('should render a title correctly', async () => {
    const appName = 'My App';

    const { getByTestId } = render(
      <ExperimentsProvider options={{ experiments: {} }}>
        <I18nextProvider>
          <Widget appName={appName} />
        </I18nextProvider>
      </ExperimentsProvider>,
    );

    const key = 'app.widget.welcome';

    expect(getByTestId('app-title').textContent).toBe(`${key} ${appName}!`);
  });
});
