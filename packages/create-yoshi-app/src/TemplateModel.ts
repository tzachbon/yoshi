import path from 'path';
import fs from 'fs-extra';
import execa from 'execa';

export type Language = 'javascript' | 'typescript';

export type SentryData = {
  teamName: string;
  projectName: string;
  DSN: string;
};

export interface TemplateDefinition {
  name: string;
  title?: string;
  path: string;
  warning?: string;
  availableLanguages: Array<Language>;
}

export default class TemplateModel<F = Record<string, any>> {
  readonly projectName: string;
  readonly authorName: string;
  readonly authorEmail: string;
  readonly templateDefinition: TemplateDefinition;
  readonly language: Language;
  flowData: F | null;
  sentryData: SentryData | null;
  repositoryName: string | null;

  constructor({
    projectName,
    templateDefinition,
    authorName,
    authorEmail,
    language,
  }: {
    projectName: string;
    templateDefinition: TemplateDefinition;
    authorName: string;
    authorEmail: string;
    language: Language;
  }) {
    this.templateDefinition = templateDefinition;
    this.projectName = projectName;
    this.authorName = authorName;
    this.authorEmail = authorEmail;
    this.language = language;
    this.flowData = null;
    this.sentryData = null;
    this.repositoryName = null;
  }

  getPath() {
    return path.join(this.templateDefinition.path, this.language);
  }

  getTitle() {
    return `${this.templateDefinition.name}-${this.language}`;
  }

  getFlowData(): F | null {
    return this.flowData;
  }

  async setRepositoryName(dir: string) {
    try {
      const { stdout } = await execa(
        'basename -s .git `git config --get remote.origin.url`',
        {
          shell: true,
          cwd: dir,
          stdio: 'pipe',
        },
      );

      this.repositoryName = stdout;
      return !!this.repositoryName;
    } catch (error) {
      return false;
    }
  }

  getSentryData() {
    return this.sentryData;
  }

  setFlowData(flowData: F) {
    this.flowData = flowData;
  }

  setSentryData(sentryData: SentryData) {
    this.sentryData = sentryData;
  }

  static fromFilePath(answersFilePath: string) {
    return new TemplateModel(fs.readJSONSync(answersFilePath));
  }
}
