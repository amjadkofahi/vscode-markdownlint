const assert = require("node:assert");
const path = require("node:path");
const vscode = require("vscode");

const tests = [
  function consecutiveBlankLinesProduceDiagnostic() {
    return new Promise((resolve, reject) => {
      setTimeout(reject, 30000);
      try {
        vscode.window.onDidChangeActiveTextEditor((textEditor) => {
          try {
            textEditor.edit((editBuilder) => {
              editBuilder.insert(new vscode.Position(0, 0), "\n\n");
            });
          } catch (error) {
            reject(error);
          }
        })
        vscode.languages.onDidChangeDiagnostics((diagnosticChangeEvent) => {
          try {
            const { uris } = diagnosticChangeEvent;
            assert.equal(uris.length, 1);
            const uri = uris[0];
            const diagnostics = vscode.languages.getDiagnostics(uri);
            if (diagnostics.length > 0) {
              assert.equal(diagnostics.length, 1);
              const diagnostic = diagnostics[0];
              // @ts-ignore
              assert.equal(diagnostic.code.value, "MD012");
              // @ts-ignore
              assert.equal(diagnostic.code.target.toString(), "https://github.com/DavidAnson/markdownlint/blob/v0.31.1/doc/md012.md");
              assert.equal(diagnostic.message, "MD012/no-multiple-blanks: Multiple consecutive blank lines [Expected: 1; Actual: 2]");
              assert.ok(diagnostic.range.isEqual(new vscode.Range(1, 0, 1, 0)));
              assert.equal(diagnostic.severity, vscode.DiagnosticSeverity.Warning);
              assert.equal(diagnostic.source, "markdownlint");
              resolve();
            }
          } catch (error) {
            reject(error);
          }
        });
        vscode.window.showTextDocument(vscode.Uri.file(path.join(__dirname, "..", "README.md")));
      } catch (error) {
        reject(error);
      }
    });
  }
];

module.exports = { tests };
