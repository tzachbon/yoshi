// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="global.d.ts" />

declare module '*.st.css' {
  type StateValue = boolean | number | string;

  interface StateMap {
    [stateName: string]: StateValue;
  }

  interface AttributeMap {
    className?: string;
    [attributeName: string]: StateValue | undefined;
  }

  interface InheritedAttributes {
    className?: string;
    [props: string]: any;
  }

  type RuntimeStylesheet = {
    (
      className: string,
      states?: StateMap,
      inheritedAttributes?: InheritedAttributes,
    ): AttributeMap;
    $root: string;
    $namespace: string;
    $depth: number;
    $id: string | number;
    $css?: string;

    $get(localName: string): string | undefined;
    $cssStates(stateMapping?: StateMap | null): StateMap;
  } & { [localName: string]: string };

  const stylesheet: RuntimeStylesheet;
  export default stylesheet;
}

/// <reference types="yoshi-common/types" />

declare module 'wix-base-ui/*';
