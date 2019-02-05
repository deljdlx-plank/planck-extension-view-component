class CodeDisplay extends BlockEmbed
{
    static create(values)
    {

        var node = super.create(values);


        var code = '';
        if(values.code) {
            code = CodeEdition.escape(values.code)
        }

        $(node).append(
            '<pre class="line-numbers" style="position:relative">'+
            '<code class="language-'+values.language+' " data-attribute-name="code">'+
            code+
            '</code>'+
            '</pre>'
        );

        return node;
    }

    static escape(unsafe)
    {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


}

CodeDisplay.blotName = 'plk-blot-code-display';
CodeDisplay.tagName = 'div';
CodeDisplay.className = 'plk-blot-code-display';


CodeDisplay.attributesDescriptors = {
    content: {
        type: 'text'
    },
    language: {
        type: 'select',
        options: [
            {value: 'raw', label: 'Aucun'},
            {value: 'javascript', label: 'Javascript'},
            {value: 'php', label: 'PHP'}
        ]
    }

};

Quill.register(CodeDisplay);
