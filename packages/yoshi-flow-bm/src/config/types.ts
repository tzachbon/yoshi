export type InitialModuleConfig = Partial<ModuleConfig>;

export interface ModuleConfig {
  moduleId: string;
  moduleConfigurationId?: string;
  appDefId?: string;
  experimentsScopes: Array<string>;
  sentryDsn?: string;
  routeNamespace: string;
  topology: Record<string, { artifactId: string }>;
  moduleBundleName: string;
}

export type InitialExportedComponentConfig = Partial<ExportedComponentConfig>;

export interface ExportedComponentConfig {
  componentId: string;
  legacyBundle?: {
    bundleName: string;
    lazyComponentId: string;
  };
}

export type InitialPageConfig = Partial<PageConfig>;

export interface PageConfig extends ExportedComponentConfig {
  componentName: string;
}

export type InitialMethodConfig = Partial<MethodConfig>;

export interface MethodConfig {
  methodId: string;
}
