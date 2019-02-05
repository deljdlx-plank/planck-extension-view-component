class CodeDisplay extends BlockEmbed
{
    static create(value)
    {

        console.log(value);


        var node = super.create(value);

        node.innerHTML=
            '<code data-language="'+value.language+'">'+value.content+'</code>';


        return node;
    }

    updateNode()
    {
        super.updateNode();
        console.log(
            $(this.domNode).find('code')
        );
        console.log(this.userAttributes);
        $(this.domNode).find('code').html(this.userAttributes.content);
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