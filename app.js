
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

let monacoEditor;

require(["vs/editor/editor.main"], function () {
	monacoEditor = monaco.editor.create(document.getElementById('pen'), {
		value: [
			`start = "abc"`,
            ``
		].join('\n'),
		language: 'text',
		theme: 'vs-dark',
        automaticLayout: true,
	});
	
	// monacoEditor.addListener('didType', () => {
	// 	console.log(monacoEditor.getValue());
	// });
});

function parse() {
    const console = document.getElementById('console');
    const doc = document.getElementById('doc');
    const ast = document.getElementById('ast');
    try {
        const penSource = monacoEditor.getValue();
        const {parse} = eval(penc.penc(penSource, {loader: 'data:pen', target: 'js/iife'}));
        this.ast.value = JSON.stringify(parse(doc.value), null, 2);
        console.innerText = 'Success!';
    }
    catch (err) {
        console.innerText = err.toString();
    }
}

function print() {
    const console = document.getElementById('console');
    const doc = document.getElementById('doc');
    const ast = document.getElementById('ast');
    try {
        const penSource = monacoEditor.getValue();
        const {print} = eval(penc.penc(penSource, {loader: 'data:pen', target: 'js/iife'}));
        this.doc.value = print(JSON.parse(ast.value));
        console.innerText = 'Success!';
    }
    catch (err) {
        console.innerText = err.toString();
    }
}
