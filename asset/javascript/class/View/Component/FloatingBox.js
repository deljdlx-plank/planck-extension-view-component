Planck.Extension.ViewComponent.View.Component.FloatingBox = function(target, element)
{
    this.$target = $(target);
    this.$element = $(element);

    this.$wrapper = $('<div class="plk-floating-box"></div>');

    this.$toolbar = $('<div class="plk-header-toolbar"></div>');
        this.$closeButton = $('<i class="plk-button fas fa-window-close"></i>');
    this.$toolbar.append(this.$closeButton);
    this.$wrapper.append(this.$toolbar);

    this.$contentContainer = $('<div class="plk-content"></div>');
        this.$contentContainer.append(this.$element);
    this.$wrapper.append(this.$contentContainer);


    this.$closeButton.click(function() {
        this.destroy();
    }.bind(this));
};




Planck.Extension.ViewComponent.View.Component.FloatingBox.prototype.getElement = function()
{
    return this.$element;
};


Planck.Extension.ViewComponent.View.Component.FloatingBox.prototype.show = function()
{
    $(document.body).append(this.$wrapper);

    var tether = new Tether({
        target: this.$target.get(0),
        element: this.$wrapper.get(0),
        attachment: 'top left',
        targetAttachment: 'top right',
        //offset: '0px 12px',
        targetOffset: '0px 12px',
    });
    tether.enable();

    this.$wrapper.show();
};


Planck.Extension.ViewComponent.View.Component.FloatingBox.prototype.destroy = function()
{
   this.$wrapper.remove();
};

