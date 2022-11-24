import * as vscode from 'vscode';
const TYPESCRIPT: vscode.DocumentFilter = { language: 'typescript' };

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "GetterAndSetter" is now active!');
	
	context.subscriptions.push(vscode.commands.registerCommand('GetterAndSetter.getterAndSetter', function () {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		} else {
			vscode.window.showInformationMessage('Editor está funcionando');
		}

		let language = TYPESCRIPT.language;

		const hasSelection = !editor.selection.isEmpty;

		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode: any;

			if (language === 'typescript') {
				vscode.window.showInformationMessage('É um arquivo TypeScript');
				//generatedCode = generateGetterAndSetter(text, "both", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!');
			}

			writerInEditor('oi', editor);

			vscode.window.showInformationMessage('Getter e Setters criados com sucesso!');
		} else {
			vscode.window.showErrorMessage('O Arquivo está vazio');
		}
	}));
}

function writerInEditor(text: string, editor: vscode.TextEditor) {
	editor.edit((edit: { insert: (arg0: any, arg1: any) => void; }) => 
		editor.selections.forEach((selection: { end: any; }) => {
			edit.insert(selection.end, text);				
		}));
}

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
			vscode.window.showErrorMessage('Faulty Selection. Please make sure you select a variable.');
			return; 
		}

		variableName.trim();
		variableType.trim();

		let lang: any;
		let code = '';
		let langObject = lang[language];
		let variableNameUp = variableName.charAt(0).toUpperCase() + variableName.slice(1);

		if (returnableType === "both") {
			let getterPlain = langObject.getter;
			let setterPlain = langObject.setter;			
		
			let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
			let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);

			code = getter + setter;		
		} else if (returnableType === "getter"){
			let getterPlain = langObject.getter;	
			let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
			
			code = getter;			
		} else if (returnableType === "setter"){
			let setterPlain = langObject.setter;
			let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);

			code = setter;			
		}
		generatedCode += code;
	}
	return generatedCode;
}

export function deactivate() {}
