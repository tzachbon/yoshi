export { default as createApp, CreateAppOptions } from './createApp';
export { default as runPrompt } from './runPrompt';
export {
  default as getDevCenterQuestions,
  addOOIComponentStep,
} from './dev-center-registration/getQuestions';
export {
  default as generateProject,
  processFilesWithScopes,
  processFileWithScope,
} from './generateProject';
export { default as TemplateModel } from './TemplateModel';
export { replaceTemplates, getTemplateScopes } from './template-utils';
export { default as getValuesMap } from './getValuesMap';
export { default as verifyWorkingDirectory } from './verifyWorkingDirectory';
export { default as verifyRegistry } from './verifyRegistry';
export { default as templates } from './templates';
export {
  default as extendedPropmts,
  Answers as ExtendedPropmtsAnswers,
} from './extended-prompts';
export { getAuthInstance } from './dev-center-registration/auth';
export { initAPIService } from './api';
