import editorAppEntryContent from '../EditorAppEntryContent';

describe('EditorAppEntry template', () => {
  it('generates correct template for editor app entry', () => {
    const generatedEditorAppEntryContent = editorAppEntryContent({
      editorAppWrapperPath: 'some/editor-app-wrapper',
      componentName: 'MyWidget',
      translationsConfig: null,
      defaultTranslations: { a: 'b' },
      componentFileName: 'some/components/MyWidget.tsx',
      controllerFileName: 'some/components/controller.ts',
      biConfig: {
        visitor: 'visitor-bi-package',
        owner: 'owner-bi-package',
      },
      viewerEntryFileName: 'some/viwer.app.ts',
      sentryConfig: {
        DSN: 'https//dsn.com',
        id: '123',
        projectName: 'some-project',
        teamName: 'some-team',
      },
      experimentsConfig: null,
    });

    expect(generatedEditorAppEntryContent).toMatchSnapshot();
  });

  it('generates correct template for editor app entry without viewerEntryFileName', () => {
    const generatedEditorAppEntryContent = editorAppEntryContent({
      editorAppWrapperPath: 'some/editor-app-wrapper',
      componentName: 'MyWidget',
      defaultTranslations: { a: 'b' },
      componentFileName: 'some/components/MyWidget.tsx',
      controllerFileName: 'some/components/controller.ts',
      biConfig: {
        visitor: 'visitor-bi-package',
        owner: 'owner-bi-package',
      },
      viewerEntryFileName: null,
      translationsConfig: {
        default: 'en',
      },
      sentryConfig: null,
      experimentsConfig: null,
    });

    expect(generatedEditorAppEntryContent).toMatchSnapshot();
  });
});
