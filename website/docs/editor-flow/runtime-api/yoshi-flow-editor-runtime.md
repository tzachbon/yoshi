---
id: yoshi-flow-editor-runtime
title: yoshi-flow-editor-runtime
sidebar_label: yoshi-flow-editor-runtime
---

Package that exports various Higher Order Components (HOCs) and methods to reduce boilerplate on client's side and organize the app structure in a better way.

## `WixSDK`

WixSDK is a HOC that loads [IStaticWix](https://github.com/wix-private/fed-infra/blob/master/js-sdk-wrapper/src/types.ts) object.

It renders a `children` function with `sdk` argument:

`sdk`: `{ Wix: IWixStatic | null }`

```tsx
import { WixSDK } from "yoshi-flow-editor-runtime";

export default () => (
  <WixSDK>{sdk =>
    <SomeComp Wix={sdk.Wix} /> // IStaticWix | null
  }</WixSDK>
);
```

`sdk.Wix` will be `null` if `WixSDK` is being used in Widget part and rendered in Viewer mode, so make sure you are checking if it's not `null` to use it.

#### Props

**isEditor** - should be passed for Settings part. It triggers a `WixSDK`, so it will use strict types for `sdk.Wix` and it won't be _optional_.

_Settings.ts_

```tsx
import { WixSDK } from "yoshi-flow-editor-runtime";

export default () => (
  <WixSDK isEditor>{sdk =>
    <SomeComp Wix={sdk.Wix} /> // IStaticWix
  }</WixSDK>
);
```

## `BILogger`

Currently it consists of `BILoggerProvider` and `BILogger` components.

`BILoggerProvider` should be rendered in the root of you component and receive a `biLogger` prop.

`BILogger` is a consumer. It will render a `children` function with `biLogger` passed to provider.

You still need to create and configure `biLogger` instance, so it's just an attempt to remove some boilerplate from your side.

To configure biLogger instance, you have to follow [fed-handbook BI section steps](https://github.com/wix-private/fed-handbook/blob/master/BI.md#overview).

By loading schema logger you've initialized and registered, you should use different loggers according to runtime environment:

- Settings panel: `iframeAppBiLoggerFactory` imported from `@wix/iframe-app-bi-logger` package
- Widget: `@wix/web-bi-logger` package

_Settings.ts_

```tsx
import { WixSDK, BILogger, BILoggerProvider } from "yoshi-flow-editor-runtime";
import { iframeAppBiLoggerFactory } from "@wix/iframe-app-bi-logger";
import initSchemaLogger from "your-schema-logger-package";

const biLogger = initSchemaLogger(iframeAppBiLoggerFactory);

// Root component
export default () => (
  <BILoggerProvider logger={biLogger}>
    // Settings content...
    <ColorPicker />
  </BILoggerProvider>
);

// Somewhere deeper in the component
const ColorPicker = () => (
  <BiLogger>
    {biLogger => (
      <ColorPickerColorSpace
        onChange={() => {
          logger.logColorChange();
        }}
      />
    )}
  </BiLogger>
);
```

```
```

## `translate`
It's a HOC from `react-i18next` that allows using translations for `Widget` and `Settings` components.

All translations should be located under `assets/locales/messages_:LANGUAGE.json`.

Just wrapping any component will give an access to app's translations via `t` property:

_Widget.tsx_
```tsx
import { translate, InjectedTranslateProps } from 'yoshi-flow-editor-runtime';

export default translate()(({ t }: InjectedTranslateProps) => {
  return <h1 data-hook="app-title">{t('app.widget.welcome')}</h1>;
});
```

### Testing
For unit testing components that use `translation` HOC, you can use `I18NextProvider` from `yoshi-flow-editor-runtime/test`.

It will configue 18n mock and won't send any additional network requests:

_Widget.spec.tsx_
```tsx
import { I18nextProvider } from 'yoshi-flow-editor-runtime/test';

it('should render a title correctly', async () => {
  const { getByTestId } = render(
    <I18nextProvider>
      <Widget />
    </I18nextProvider>
  );

  expect(getByTestId('app-title').textContent).toBe('app.widget.welcome');
})
```