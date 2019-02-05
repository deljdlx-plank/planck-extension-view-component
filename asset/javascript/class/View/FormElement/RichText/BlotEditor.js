Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor = function(blot)
{
    this.blot = blot
};







Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.getForm = function(callback)
{

    var blot = this.blot;

    var blotDescriptor = blot.getDescriptor();


    this.$element = $('<div></div>');
    this.$element .css({
        border: 'solid 1px #F00'
    });


    this.$element .html('');
    for(var name in blotDescriptor) {


        var value ='';
        if(isset(blot.userAttributes[name])) {
            value = blot.userAttributes[name];
        }

        var fieldDescriptor = blotDescriptor[name];
        if(fieldDescriptor.type == 'text') {
            var input = this.renderBlotInput(fieldDescriptor, name, value);
        }
        else if(fieldDescriptor.type == 'textarea') {
            var input = this.renderBlotTextarea(fieldDescriptor, name, value);
        }
        else if(fieldDescriptor.type == 'select') {

            var input = this.renderBlotSelect(fieldDescriptor, name, value);
        }

        var wrapper = this.wrapBlotInput(input);
        this.$element .append(wrapper);
    }

    var $button = $('<button>enregistrer</button>');
    $button.on('click', function(event) {
        this.updateBlot(callback);
    }.bind(this));
    this.$element .append($button);


    return this.$element ;

};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.getBlot = function()
{
   return this.blot;
};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.updateBlot = function(callback)
{
    this.$element.find('.blot-attribute-value').each(function(index, element) {
        var attributeName = $(element).attr('name');
        var value = $(element).val();
        this.blot.userAttributes[attributeName] = value;
    }.bind(this));
    this.blot.updateNode();
    if(callback) {
        callback(this);
    }
};





Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.renderBlotLabel = function(descriptor)
{
    if(Planck.isFunction(descriptor.label)) {
        var label = descriptor.label(descriptor);
        var $label = $('<label>'+label+'</label>');
    }
    else {
        var $label = $('<label>'+descriptor.label+'</label>');
    }
    return $label;
};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.renderBlotInput = function(descriptor, name, value)
{

    var $label = this.renderBlotLabel(descriptor);


    var $input = $('<input class="blot-attribute-value" value="'+value+'" name="'+name+'"/>');

    $label.append($input);

    return $label;
};



Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.renderBlotTextarea = function(descriptor, name, value)
{
    var $label = this.renderBlotLabel(descriptor);

    var $input = $('<textarea class="blot-attribute-value"name="'+name+'">'+value+'</textarea>');

    $label.append($input);

    return $label;
};





Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.renderBlotSelect = function(descriptor, name, value)
{
    var $label = this.renderBlotLabel(descriptor);
    var $input = $('<select class="blot-attribute-value" name="'+name+'"></select>');
    for(var i=0; i<descriptor.options.length; i++) {
        var option = descriptor.options[i];
        var selected = '';
        if(value == option.value) {
            selected = 'selected '
        }

        $input.append(
            '<option value="'+option.value+'" '+selected+'>'+option.label+'</option>'
        );
    }

    $label.append($input);

    return $label;
};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor.prototype.wrapBlotInput = function(element)
{

    var wrapper = $('<div class="plk-blot-attribute"></div>');
    wrapper.append(element);
    return wrapper;
};





























