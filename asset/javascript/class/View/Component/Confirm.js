Planck.Extension.ViewComponent.View.Component.Confirm = function(container)
{
    this.events = {
        confirm : function() {

        },
        cancel: function() {

        }
    };

    this.confirmCaption = i18n('Confirmer');
    this.cancelCaption = i18n('Annuler');
    this.message = i18n('Confirmer ?')


    this.$container = $(container);

    this.$element = $(
        '<div class="plk-component plk-confirm">'+

            '<div class="plk-content">'+
                '<div class="plk-message">'+
                    this.message+
                '</div>'+
                '<div class="plk-footer">'+
                    '<button class="confirm-trigger">'+this.confirmCaption+'</button>'+
                    ' <button class="cancel-trigger">'+this.cancelCaption+'</button>'+
                '</div>'+
            '</div>'+

        '</div>' +
        ''
    );

    this.$element.find('.confirm-trigger').click(function(event) {
        this.events.confirm();
        this.hide();
    }.bind(this));

    this.$element.find('.cancel-trigger').click(function(event) {
        this.hide();
    }.bind(this));

    this.$container.append(this.$element);
};


Planck.Extension.ViewComponent.View.Component.Confirm.prototype.onConfirm = function(callback)
{
   this.events.confirm = callback;
};


Planck.Extension.ViewComponent.View.Component.Confirm.prototype.show = function()
{
    this.$element.show();
};

Planck.Extension.ViewComponent.View.Component.Confirm.prototype.hide = function()
{
    this.$element.hide();
};

