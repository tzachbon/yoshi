import t from './template';

type Opts = {
  visitor?: string | null;
  owner?: string | null;
};

export default t<Opts>`
  ${({ owner }) =>
    owner
      ? `
    import { Logger as ImportedOwnerLogger } from '${owner}';

    export type OwnerLogger = ImportedOwnerLogger;
    export type OwnerBILoggerFactory = (
      factory: any,
    ) => (opts?: any) => OwnerLogger;
  `
      : ''}

  ${({ visitor }) =>
    visitor
      ? `
    import { Logger as ImportedVisitorLogger } from '${visitor}';

    export type VisitorLogger = ImportedVisitorLogger;
    export type VisitorBILoggerFactory = (
      factory: any,
    ) => (opts?: any) => VisitorLogger;
  `
      : ''}
`;
