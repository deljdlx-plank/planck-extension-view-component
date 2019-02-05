class CodeEdition extends RichBlot
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


    constructor(domNode)
    {
        super(domNode);
        Prism.highlightElement($(this.domNode).find('code').get(0));
    }

    updateNode()
    {
        super.updateNode();

        this.$domNode.find('pre').html('');
        this.$domNode.find('pre').append(
            '<code class="language-'+this.userAttributes.language+' " data-attribute-name="code">'+
                CodeEdition.escape(this.userAttributes.code)+
            '</code>'
        );

        Prism.highlightElement($(this.domNode).find('code').get(0));
    }


}

CodeEdition.blotName = 'plk-blot-code-edition';
CodeEdition.tagName = 'div';
CodeEdition.className = 'plk-blot-code-edition';


CodeEdition.attributesDescriptors = {
    language: {
        type: 'select',
        label: "Langage",
        options: [
            {value: 'raw', label: 'Aucun'},
            {value: 'javascript', label: 'Javascript'},
            {value: 'php', label: 'PHP'}
        ]
    },
    code: {
        label: "Code",
        type: 'textarea'
    },
};

Quill.register(CodeEdition);