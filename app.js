let monacoEditor;

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.38.0/min/vs' }});
require(["vs/editor/editor.main"], function () {
    monaco.languages.register({
        id: 'pen'
    });
    monaco.languages.setMonarchTokensProvider('pen', {
        defaultToken: 'invalid',

        operators: [
            '=', '||', '|', ':', ',', '*', '?', '+', '!', '&',
        ],

        tokenizer: {
            root: [
                {include: '@comment'},
                {include: '@keyword'},

                {include: '@bindingPattern'},
				{include: '@bindingName'},

				{include: '@stringX'},
				{include: '@stringA'},
				{include: '@stringC'},
				{include: '@identifier'},

                [/[{}()\[\]]/, '@brackets'],
                [/./, {
                    cases: {
                        '@operators': 'operator',
                        '@default'  : '',
                    }
                }],
            ],

            comment: [
                [/\/\/.*$/, 'comment'],
            ],

            keyword: [
                // TODO
                ['true|false|nil|char|__bin|__float|__int|__hex', 'keyword']
            ],

            bindingPattern: [
                // TODO
            ],
            bindingName: [
                // TODO
            ],

            stringX: [
                [/"[^"\r\n]*"/, 'variable.other.pen'],
            ],
            stringA: [
                [/'[^'\r\n]*'/, 'support.function.pen'],
            ],
            stringC: [
                [/`[^`\r\n]*`/, 'string.quoted.pen'],
            ],
            identifier: [
                [/[_A-Z][_A-Z0-9]*(?!\w)/, 'string.quoted.pen'],
                [/\w+(?=\s*:)/, 'support.function.pen'],
                [/\w+/, 'variable.other.pen'],
            ],
        },
    });

    monacoEditor = monaco.editor.create(document.getElementById('pen'), {
        value: localStorage.getItem('pen') ?? `start = "abc"\n`,
        language: 'pen',
        theme: 'vs-dark',
        automaticLayout: true,
    });
});

setInterval(() => localStorage.setItem('pen', monacoEditor.getValue()), 2000);

function parse() {
    const console = document.getElementById('console');
    const doc = document.getElementById('doc');
    const ast = document.getElementById('ast');
    try {
        const penSource = monacoEditor.getValue();
        const parse = eval(penc.penc(penSource, {frontend: 'pen', build: 'parse', backend: 'js/iife'}));
        ast.value = JSON.stringify(parse(doc.value), null, 2);
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
        const print = eval(penc.penc(penSource, {frontend: 'pen', build: 'print', backend: 'js/iife'}));
        doc.value = print(JSON.parse(ast.value));
        console.innerText = 'Success!';
    }
    catch (err) {
        console.innerText = err.toString();
    }
}
