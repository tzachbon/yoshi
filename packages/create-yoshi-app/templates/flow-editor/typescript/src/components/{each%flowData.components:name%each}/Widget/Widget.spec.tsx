import React from 'react';
import {
  I18nextProvider,
  ExperimentsProvider,
} from 'yoshi-flow-editor-runtime/test';
import { render } from '@testing-library/react';

import Widget from './Widget';

describe('Widget', () => {
  it('should render a title correctly', async () => {
    const greetingsName = 'to Test';

    const { getByTestId } = render(
      <ExperimentsProvider experiments={{}}>
        <I18nextProvider>
          <Widget greetingsText={greetingsName} />
        </I18nextProvider>
      </ExperimentsProvider>,
    );

    const key = 'app.widget.welcome';

    expect(getByTestId('app-title').textContent).toBe(
      `${key} ${greetingsName}!`,
    );
  });
});
