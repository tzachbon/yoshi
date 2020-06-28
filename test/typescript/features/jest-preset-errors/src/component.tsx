import React from 'react';
import axios from 'axios';

export default function () {
  (() => {
    axios.get('fake-url');
  })();
  return (
    <div id="e2e">E2E tests are working! jest-preset-connection-error</div>
  );
}
