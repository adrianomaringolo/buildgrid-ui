---
inclusion: always
---

# Language Guidelines for BuildGrid UI

## English-Only Policy

All code comments, console messages, error messages, documentation, and user-facing text in the BuildGrid UI project must be written in English.

### Why English Only?

1. **International Collaboration**: English is the universal language for software development, making it easier for developers worldwide to contribute
2. **Consistency**: Maintains a consistent codebase that all contributors can understand
3. **Professional Standards**: Follows industry best practices for open-source projects
4. **Accessibility**: Ensures the project is accessible to the global developer community

### What Must Be in English

- **Code Comments**: All inline comments, JSDoc comments, and documentation comments
- **Console Messages**: All `console.log`, `console.error`, `console.warn` messages
- **Error Messages**: User-facing error messages and validation messages
- **UI Text**: All placeholder text, labels, and user interface strings
- **Documentation**: README files, API documentation, and guides
- **Commit Messages**: Git commit messages should be in English
- **Issue Templates**: GitHub issue and PR templates
- **Test Descriptions**: Test names and descriptions in test files

### Examples

#### ✅ Good (English)
```javascript
// Check if source file exists
if (!fs.existsSync(sourceFile)) {
  console.error('❌ CHANGELOG.md not found in the root directory:', sourceFile)
  process.exit(1)
}

// Copy the file
fs.copyFileSync(sourceFile, targetFile)

// Verify if copy was successful
console.log('✅ CHANGELOG.md successfully copied')
```

```tsx
placeholder="Drag files here or click to select"
error: 'Upload error'
```

#### ❌ Bad (Portuguese or other languages)
```javascript
// Verificar se o arquivo fonte existe
if (!fs.existsSync(sourceFile)) {
  console.error('❌ Arquivo não encontrado:', sourceFile)
  process.exit(1)
}

// Copiar o arquivo
fs.copyFileSync(sourceFile, targetFile)

// Verificar se a cópia foi bem-sucedida
console.log('✅ Arquivo copiado com sucesso')
```

```tsx
placeholder="Arraste arquivos aqui ou clique para selecionar"
error: 'Erro no upload'
```

### Implementation Guidelines

1. **New Code**: All new code must follow the English-only policy from the start
2. **Existing Code**: When modifying existing code with non-English text, translate it to English as part of the change
3. **Code Reviews**: Reviewers should check for and request translation of any non-English text
4. **Automated Checks**: Consider adding linting rules to catch common non-English patterns

### Exceptions

The only acceptable non-English text is:
- **Test Data**: Sample data used in tests that specifically needs to test internationalization
- **External Dependencies**: Third-party library messages that we don't control
- **User-Generated Content**: Content provided by users in examples or documentation

### Translation Resources

When translating existing Portuguese text to English:
- Use clear, concise English
- Maintain the same meaning and context
- Use standard technical terminology
- Be consistent with existing English text in the codebase

### Enforcement

This guideline is enforced through:
- Code review process
- Automated linting where possible
- Community feedback and contributions
- Regular codebase audits

Remember: This policy helps make BuildGrid UI a truly international project that welcomes contributors from around the world.