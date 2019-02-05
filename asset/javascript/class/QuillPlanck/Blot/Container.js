class BlotContainer
{
    constructor(blot)
    {

        this.blot = blot;

        this.$element = this.blot.getElement();

        this.toolbar = new BlotToolbar(this);
        this.$element.prepend(this.toolbar.getElement());


        this.makeResizable();

        this.floatAttribute = new ContainerAttributeFloat(this);
        this.borderAttribute  = new ContainerAttributeBorder(this);

    }

    getElement()
    {
        return this.$element;
    }

    getToolbar()
    {
        return this.toolbar;
    }

    getBlot()
    {
        return this.blot;
    }


    makeResizable()
    {


        this.$element.resizable({
            //aspectRatio: true,
            stop: function() {

                var jsonAttributes = this.$element.attr('data-attributes');
                var attributes = JSON.parse(jsonAttributes);
                attributes.height = this.$element.get(0).offsetHeight+'px';
                attributes.width =  this.$element.get(0).offsetWidth+'px';
                this.$element.attr('data-attributes', JSON.stringify(attributes));


            }.bind(this)
        });
    }



}