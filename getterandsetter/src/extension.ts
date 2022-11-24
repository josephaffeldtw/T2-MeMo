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
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!');
			}

			writerInEditor(generatedCode, editor);

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

function toPascalCase(str: string) {
    return str.replace(/\w+/g,(w: string | any[]) => w[0].toUpperCase() + w.slice(1));
}

function createGetterAndSetter(textPorperties: string){
    var properties = textPorperties.split(/\r?\n/).filter(x => x.length > 2).map(x => x.replace(';', ''));

    var generatedCode = ``;

    for (let p of properties) {
        while (p.startsWith(" ")) p = p.substr(1);
        while (p.startsWith("\t")) p = p.substr(1);

        let words = p.split(" ").map(x => x.replace(/\r?\n/, ''));
        let type = "";
		let attribute, Attribute: string | undefined;
        let create = false;
        
        if (words.length > 2){
            type = words[1];
            attribute = words[2];
            Attribute = toPascalCase(words[2]);

            create = true;
		} else if (words.length === 2)
		{
            type = words[0];
            attribute = words[1];
            Attribute = toPascalCase(words[1]);
            
            create = true;            
        }else if (words.length)
        {
            type = "Object";
            attribute = words[0];
            Attribute = toPascalCase(words[0]);
            
            create = true;            
        }

        if (create){

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

export function deactivate() {}
