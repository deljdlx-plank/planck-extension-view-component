Planck.Extension.ViewComponent.View.Component.Overlay = function()
{

    this.rendered = false;

    this.$element = $(
        '<div  class="plk-overlay" style="">'+
            '<i class="fas fa-window-close fa-2x plk-overlay-close"></i>'+
            '<div class="plk-overlay-content" style=""></div>'+
        '</div>'
    );

    this.$contentElement = this.$element.find('.plk-overlay-content');
    this.$closeButton =  this.$element.find('.plk-overlay-close');
    this.$closeButton.click(function() {
        this.hide();
    }.bind(this));
};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.getElement = function()
{
    return this.$element;
};


Planck.Extension.ViewComponent.View.Component.Overlay.prototype.getContentElement = function()
{
    return this.$contentElement;
};



Planck.Extension.ViewComponent.View.Component.Overlay.prototype.render = function(container)
{
    if(!this.rendered) {
        this.$container = $(container);
        this.$container.append(this.$element);
        this.rendered = true;
    }

};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.show = function(content)
{
    if(!this.rendered) {
        this.render(document.body);
    }
    this.$contentElement.html(content);
    this.$element.show();

    var echapHandler = $(document.body).keydown(function(event) {
        if(event.key === "Escape") {
            this.destroy();
            delete echapHandler;
        }
    }.bind(this));

};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.hide = function()
{
    this.$element.hide();
};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.destroy = function()
{
    this.$element.remove();
    delete this;
};

