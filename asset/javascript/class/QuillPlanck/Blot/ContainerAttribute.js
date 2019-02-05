class ContainerAttribute
{

    constructor(container)
    {
        this.container = container;
        this.$element = container.getElement();
        this.blot = container.getBlot();
        this.initialize();
    }

    initialize()
    {

    }

}