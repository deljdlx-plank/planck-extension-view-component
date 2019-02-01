Planck.Extension.ViewComponent.View.Component.Toolbar = function(container)
{
    if(container) {
        this.setContainer(container);
        this.initialize();
    }
};


Planck.Extension.ViewComponent.View.Component.Toolbar.prototype.deleteButton;


Planck.Extension.ViewComponent.View.Component.Toolbar.prototype.initialize = function()
{
    this.deleteButton = this.$element.find('.plk-delete-trigger');
};


Planck.Extension.ViewComponent.View.Component.Toolbar.prototype.getDeleteButton = function()
{
    return this.deleteButton;
};



Planck.inherit(
    Planck.Extension.ViewComponent.View.Component.Toolbar,
    Planck.Extension.ViewComponent.Component
);




