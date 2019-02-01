Planck.Extension.ViewComponent.View.Component.Overlay = function()
{

    this.rendered = false;

    this.$element = $(
        '<div  class="plk-overlay" style="top:0; left:0; display: none; position: absolute; width:100%; height:100%; background-color: rgba(255,255,255,0.9); z-index:2000">'+
            '<i class="fas fa-window-close fa-2x plk-overlay-close" style="position: absolute; right: 8px; top: 8px"></i>'+
            '<div class="plk-overlay-content" style="border: solid 1px #F00; margin: 32px; background-color:#FFF"></div>'+
        '</div>'
    );

    this.$contentElement = this.$element.find('.plk-overlay-content');
    this.$closeButton =  this.$element.find('.plk-overlay-close');
    this.$closeButton.click(function() {
        this.hide();
    }.bind(this));
};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.getContentElement = function()
{
    return this.$contentElement;
};



Planck.Extension.ViewComponent.View.Component.Overlay.prototype.render = function(container)
{
    if(!this.rendered) {
        this.$container =$(container);
        this.$container.append(this.$element);
        this.rendered = true;
    }
};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.show = function(content)
{
    this.$contentElement.html(content);
    this.$element.show();
};

Planck.Extension.ViewComponent.View.Component.Overlay.prototype.hide = function()
{
    this.$element.hide();
};

