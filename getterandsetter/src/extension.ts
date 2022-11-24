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
				generatedCode = createGetterAndSetter(text);			
			} else {
				vscode.window.showInformationMessage('Linguagem atual não suportada');
			}

			writerInEditor(generatedCode, editor);

			vscode.window.showInformationMessage('Getter e Setters criados com sucesso!');
		} else {
			vscode.window.showErrorMessage('O texto está vazio');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('GetterAndSetter.getter', function () {
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
				generatedCode = createGetter(text);			
			} else {
				vscode.window.showInformationMessage('Linguagem atual não suportada');
			}

			writerInEditor(generatedCode, editor);

			vscode.window.showInformationMessage('Getter criado com sucesso!');
		} else {
			vscode.window.showErrorMessage('O texto está vazio');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('GetterAndSetter.setter', function () {
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
				generatedCode = createSetter(text);			
			} else {
				vscode.window.showInformationMessage('Linguagem atual não suportada');
			}

			writerInEditor(generatedCode, editor);

			vscode.window.showInformationMessage('Setter criado com sucesso!');
		} else {
			vscode.window.showErrorMessage('O texto está vazio');
		}
	}));
}

function createGetterAndSetter(text: string){
	let sections = text.split(";");
	sections.pop();

	let generated = '';

	if(sections.length > 0){
		for(let s in sections){
			sections[s] = sections[s].replace("   ", "");
			generated += generatedGetterAndSetter(sections[s]);
		}
	} else {
		generated = generatedGetterAndSetter(sections[0]);
	}

	return generated;
}

function createGetter(text: string){
	let sections = text.split(";");
	sections.pop();

	let generated = '';

	if(sections.length > 0){
		for(let s in sections){
			sections[s] = sections[s].replace("   ", "");
			generated += generatedGetter(sections[s]);
		}
	} else {
		generated = generatedGetter(sections[0]);
	}

	return generated;
}

function createSetter(text: string){
	let sections = text.split(";");
	sections.pop();

	let generated = '';

	if(sections.length > 0){
		for(let s in sections){
			sections[s] = sections[s].replace("   ", "");
			generated += generatedSetter(sections[s]);
		}
	} else {
		generated = generatedSetter(sections[0]);
	}

	return generated;
}

function generatedGetterAndSetter(text: string){
    return generatedGetter(text) + generatedSetter(text);
}

function generatedGetter(text: string){
	let properties = text.split(":");

	let attribute = myReplace(properties[0]);
	let type = myReplace(properties[1]);

	return `
\t
\tpublic get${toPascalCase(attribute)} () : ${type} {
\t\treturn this.${attribute};
\t}`;
}

function generatedSetter(text: string){
	let properties = text.split(":");

	let attribute = myReplace(properties[0]);
	let type = myReplace(properties[1]);

	return `
\t
\tpublic set${toPascalCase(attribute)}(${attribute}: ${type}): void {
\t\tthis.${attribute} = ${attribute};
\t}`;
}

function writerInEditor(text: string, editor: vscode.TextEditor) {
	editor.edit((edit: { insert: (arg0: any, arg1: any) => void; }) => 
		editor.selections.forEach((selection: { end: any; }) => {
			edit.insert(selection.end, text);				
		}));
}

function myReplace(text: string){
	let replace = text.replace(/(\r\n|\n|\r)/gm, "");
	replace = replace.replace(" ", "");

	return replace;
}

function toPascalCase(str: string) {
    return str.replace(/\w+/g,(w: string | any[]) => w[0].toUpperCase() + w.slice(1));
}

export function deactivate() {}