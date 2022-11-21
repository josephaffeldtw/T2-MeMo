import * as vscode from 'vscode';
const TYPESCRIPT: vscode.DocumentFilter = { language: 'typescript' }

function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "getter-setter-generator" is now active!');

	let getterAndSetter = vscode.commands.registerCommand('extension.getterAndSetter', function () {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		let language = TYPESCRIPT.language;

		const hasSelection = !editor.selection.isEmpty;

		// check if the user selected something, otherwise display error message
		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode: string | undefined;

			if (language === 'typescript') {
				generatedCode = generateGetterAndSetter(text, "both", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!')
			}

			editor.edit(
				(				edit: { insert: (arg0: any, arg1: any) => void; }) => editor.selections.forEach(
					(					selection: { end: any; }) => {
						edit.insert(selection.end, generatedCode);
					}
				)
			);

			vscode.window.showInformationMessage('Getter/Setter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});

	let getter = vscode.commands.registerCommand('extension.getter', function () {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		let language = TYPESCRIPT.language;

		const hasSelection = !editor.selection.isEmpty;

		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode: string | undefined;

			if (language === 'typescript' ) {
				generatedCode = generateGetterAndSetter(text, "getter", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!')
			}

			editor.edit(
				(				edit: { insert: (arg0: any, arg1: any) => void; }) => editor.selections.forEach(
					(					selection: { end: any; }) => {
						edit.insert(selection.end, generatedCode); // C# -> replace selection
					}
				)
			);

			vscode.window.showInformationMessage('Getter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});

	let setter = vscode.commands.registerCommand('extension.setter', function () {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		let language = TYPESCRIPT.language;

		const hasSelection = !editor.selection.isEmpty;

		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode: string | undefined;

			if ( language === 'typescript' ) {
				generatedCode = generateGetterAndSetter(text, "setter", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!')
			}

			editor.edit(
				(				edit: { insert: (arg0: any, arg1: any) => void; }) => editor.selections.forEach(
					(					selection: { end: any; }) => {
						edit.insert(selection.end, generatedCode); // C# -> replace selection
					}
				)
			);

			vscode.window.showInformationMessage('Setter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});


	context.subscriptions.push(getterAndSetter);
	context.subscriptions.push(getter);
	context.subscriptions.push(setter);
}
exports.activate = activate;

function generateGetterAndSetter(text: string, returnableType: string, language: string){
	let selectedTextArray = text.split('\r\n').filter((e: any) => e);
	let generatedCode = '';

	for (const text of selectedTextArray) {

		let selectedText: string;
		let indentSize: string;
		let variableType: string = '';
		let variableName: string = '';

		selectedText = text.replace(';', '').trim();
		indentSize = text.split(selectedText.charAt(0))[0];
		
		if (language === 'typescript'){
			let isConstructorVariable = selectedText.includes('.');
	
			if (isConstructorVariable) {
				variableName = selectedText.split('.')[1].split(' ')[0];
			} else {
				variableName = selectedText.split(':')[0];
			}		
		}
		
		if (variableName === null || variableName === undefined) {
			vscode.window.showErrorMessage('Faulty Selection. Please make sure you select a variable.')
			return; 
		}

		variableName.trim();
		variableType.trim();

		let lang: string [] = [language];
		let code = '';
		let langObject = lang;
		let variableNameUp = variableName.charAt(0).toUpperCase() + variableName.slice(1);

		if (returnableType === "both") {
			let getterPlain = langObject.getter
			let setterPlain = langObject.setter				
		
			let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
			let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);

			code = getter + setter;		
		} else if (returnableType === "getter"){
			let getterPlain = langObject.getter		
			let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
			
			code = getter;			
		} else if (returnableType === "setter"){
			let setterPlain = langObject.setter
			let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);

			code = setter;			
		}
		generatedCode += code;
	}
	return generatedCode;
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}