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
                generatedCode = createGetterAndSetter(text);
            }
            else {
                vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!');
            }
            writerInEditor(generatedCode, editor);
            vscode.window.showInformationMessage('Getter e Setters criados com sucesso!');
        }
        else {
            vscode.window.showErrorMessage('O Arquivo está vazio');
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
function createGetterAndSetter(textPorperties) {
    var properties = textPorperties.split(/\r?\n/).filter(x => x.length > 2).map(x => x.replace(';', ''));
    var generatedCode = ``;
    for (let p of properties) {
        while (p.startsWith(" "))
            p = p.substr(1);
        while (p.startsWith("\t"))
            p = p.substr(1);
        let words = p.split(" ").map(x => x.replace(/\r?\n/, ''));
        let type = "";
        let attribute, Attribute;
        let create = false;
        if (words.length > 2) {
            type = words[1];
            attribute = words[2];
            Attribute = toPascalCase(words[2]);
            create = true;
        }
        else if (words.length === 2) {
            type = words[0];
            attribute = words[1];
            Attribute = toPascalCase(words[1]);
            create = true;
        }
        else if (words.length) {
            type = "Object";
            attribute = words[0];
            Attribute = toPascalCase(words[0]);
            create = true;
        }
        if (create) {
            let code = `
\tpublic ${type} ${type.startsWith('bool') ? 'is' : 'get'}${Attribute}() {
\t\treturn this.${attribute};
\t}
\tpublic void set${Attribute}(${type} ${attribute}) {
\t\tthis.${attribute} = ${attribute};
\t}
`;
            generatedCode += code;
        }
    }
    return generatedCode;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map