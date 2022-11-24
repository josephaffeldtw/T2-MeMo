"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const TYPESCRIPT = { language: 'typescript' };
function activate(context) {
    console.log('Congratulations, your extension "GetterAndSetter" is now active!');
    context.subscriptions.push(vscode.commands.registerCommand('GetterAndSetter.getterAndSetter', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        else {
            vscode.window.showInformationMessage('Editor está funcionando');
        }
        let language = TYPESCRIPT.language;
        const hasSelection = !editor.selection.isEmpty;
        if (hasSelection) {
            let text = editor.document.getText(editor.selection);
            let generatedCode;
            if (language === 'typescript') {
                vscode.window.showInformationMessage('É um arquivo TypeScript');
                generatedCode = generatedGetterAndSetter(text);
            }
            else {
                vscode.window.showInformationMessage('Linguagem atual não suportada');
            }
            writerInEditor(generatedCode, editor);
            vscode.window.showInformationMessage('Getter e Setters criados com sucesso!');
        }
        else {
            vscode.window.showErrorMessage('O texto está vazio');
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('GetterAndSetter.getter', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        else {
            vscode.window.showInformationMessage('Editor está funcionando');
        }
        let language = TYPESCRIPT.language;
        const hasSelection = !editor.selection.isEmpty;
        if (hasSelection) {
            let text = editor.document.getText(editor.selection);
            let generatedCode;
            if (language === 'typescript') {
                vscode.window.showInformationMessage('É um arquivo TypeScript');
                generatedCode = generatedGetter(text);
            }
            else {
                vscode.window.showInformationMessage('Linguagem atual não suportada');
            }
            writerInEditor(generatedCode, editor);
            vscode.window.showInformationMessage('Getter criado com sucesso!');
        }
        else {
            vscode.window.showErrorMessage('O texto está vazio');
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('GetterAndSetter.setter', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        else {
            vscode.window.showInformationMessage('Editor está funcionando');
        }
        let language = TYPESCRIPT.language;
        const hasSelection = !editor.selection.isEmpty;
        if (hasSelection) {
            let text = editor.document.getText(editor.selection);
            let generatedCode;
            if (language === 'typescript') {
                vscode.window.showInformationMessage('É um arquivo TypeScript');
                generatedCode = generatedSetter(text);
            }
            else {
                vscode.window.showInformationMessage('Linguagem atual não suportada');
            }
            writerInEditor(generatedCode, editor);
            vscode.window.showInformationMessage('Setter criado com sucesso!');
        }
        else {
            vscode.window.showErrorMessage('O texto está vazio');
        }
    }));
}
exports.activate = activate;
function writerInEditor(text, editor) {
    editor.edit((edit) => editor.selections.forEach((selection) => {
        edit.insert(selection.end, text);
    }));
}
function toPascalCase(str) {
    return str.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1));
}
function splitLine(text) {
    return text.split(";");
}
function generatedGetterAndSetter(text) {
    return generatedGetter(text) + generatedSetter(text);
}
function generatedGetter(text) {
    let properties = text.split(":");
    let type = properties[1].replace(";", "");
    type = properties[1].replace(" ", "");
    let attribute = properties[0].replace(" ", "");
    return `
\tpublic get${toPascalCase(attribute)} () : ${type} {
\t\treturn this.${attribute};
\t}`;
}
function generatedSetter(text) {
    let properties = text.split(":");
    let type = properties[1].replace(";", "");
    let attribute = properties[0].replace(" ", "");
    return `
\tpublic set${toPascalCase(attribute)}(${attribute}: ${type}): void {
\t\tthis.${attribute} = ${attribute};
\t}`;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map