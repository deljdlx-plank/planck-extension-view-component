
class RichBlot extends BlockEmbed
{

    static create(values)
    {
        var values = $.extend({
            align: 'left',
            style: '',
            height: 'auto',
            width: 'auto',
            float : 'none',
            display: 'block'
        }, values);


        var node = super.create();
        node.setAttribute('contenteditable', false);
        node.setAttribute('data-attributes', JSON.stringify(values));

        $(node).css({
            height: values.height,
            width: values.width,
            overflow: 'hidden',
            position: 'relative',
        });


        return node;
    }



    static getAttributesFromNode(node)
    {
        return JSON.parse(node.getAttribute('data-attributes'));
    }

    static value(node)
    {
        return RichBlot.getAttributesFromNode(node);
    }

    static formats(node)
    {
        return RichBlot.getAttributesFromNode(node);
    }


    constructor(domNode) {

        super(domNode);
        this.userAttributes = RichBlot.getAttributesFromNode(domNode);
        this.$domNode = $(this.domNode);
        this.$domNode.addClass('plk-blot-rich');

        this.container = new BlotContainer(this);
    }

    getElement()
    {
        return this.$domNode;
    }

    getValues()
    {
        return this.userAttributes;
    }

    setValue(name, value)
    {
        this.userAttributes[name] = value;
        this.updateNode();
        return this;
    }

    getValue(name)
    {
        return this.userAttributes[name];
    }


    getDescriptor()
    {
        return this.__proto__.statics.attributesDescriptors;
    }



    updateNode()
    {
        this.domNode.setAttribute(
            'data-attributes',
            JSON.stringify(this.userAttributes)
        );
    }

}

RichBlot.toolbarClassName = 'plk-blot-toolbar';
RichBlot.componentTagWrapper = 'div';
RichBlot.componentClassName = 'plk-blot-rich';
