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
                //generatedCode = generateGetterAndSetter(text, "both", language);			
            }
            else {
                vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!');
            }
            writerInEditor('oi', editor);
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
function generateGetterAndSetter(text, returnableType, language) {
    let selectedTextArray = text.split('\r\n').filter((e) => e);
    let generatedCode = '';
    for (const text of selectedTextArray) {
        let selectedText;
        let indentSize;
        let variableType = '';
        let variableName = '';
        selectedText = text.replace(';', '').trim();
        indentSize = text.split(selectedText.charAt(0))[0];
        if (language === 'typescript') {
            let isConstructorVariable = selectedText.includes('.');
            if (isConstructorVariable) {
                variableName = selectedText.split('.')[1].split(' ')[0];
            }
            else {
                variableName = selectedText.split(':')[0];
            }
        }
        if (variableName === null || variableName === undefined) {
            vscode.window.showErrorMessage('Faulty Selection. Please make sure you select a variable.');
            return;
        }
        variableName.trim();
        variableType.trim();
        let lang;
        let code = '';
        let langObject = lang[language];
        let variableNameUp = variableName.charAt(0).toUpperCase() + variableName.slice(1);
        if (returnableType === "both") {
            let getterPlain = langObject.getter;
            let setterPlain = langObject.setter;
            let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
            let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
            code = getter + setter;
        }
        else if (returnableType === "getter") {
            let getterPlain = langObject.getter;
            let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
            code = getter;
        }
        else if (returnableType === "setter") {
            let setterPlain = langObject.setter;
            let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
            code = setter;
        }
        generatedCode += code;
    }
    return generatedCode;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map