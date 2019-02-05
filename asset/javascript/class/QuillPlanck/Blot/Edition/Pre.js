class PreBlot extends RichBlot
{
    static create(value)
    {

        let node = super.create();

        node.innerHTML= this.wrap(
            '<pre>test</pre>'
        );

        return node;
    }
}

PreBlot.blotName = 'pre';
PreBlot.tagName = 'div';
PreBlot.className = 'plk-component-pre';

Quill.register(PreBlot);