Planck.Extension.ViewComponent.View.FormElement.RichTextInput = function (container) {
    this.editor = null;

    this.$container = $(container);
    this.$placeholder = this.$container.find('.plk-rich-text-placeholder');

    this.$previewPlaceholder = $('.editor-preview');


    this.$valueElement = $('<textarea class="form-data"></textarea>');
    this.$valueElement.add('form-data')
    this.$valueElement.attr('name', this.$container.attr('data-name'));


    this.$toolbar = $(
        '<div>' +
        '<select class="ql-size">' +
        '<option value="small"></option>' +
        '<option selected></option>' +
        '<option value="large"></option>' +
        '<option value="huge"></option>' +
        '</select>' +

        '<button class="plk-blot-code-trigger">code</button>' +

        '<button class="ql-align" value=""></button>' +
        '<button class="ql-align" value="right"></button>' +
        '<button class="ql-align" value="justify"></button>' +


        '<button class="ql-bold"></button>' +
        '<button class="ql-italic"></button>' +

        '<button class="ql-link"></button>' +
        '<button class="ql-image"></button>' +


        //'<button class="ql-script" value="sub"></button>'+
        //'<button class="ql-script" value="super"></button>'+

        '</div>'
    );


};



Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderBlotLabel = function(descriptor)
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

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderBlotInput = function(descriptor, name, value)
{

    var $label = this.renderBlotLabel(descriptor);


    var $input = $('<input class="blot-attribute-value" value="'+value+'" name="'+name+'"/>');

    $label.append($input);

    return $label;
};



Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderBlotTextarea = function(descriptor, name, value)
{
    var $label = this.renderBlotLabel(descriptor);

    var $input = $('<textarea class="blot-attribute-value"name="'+name+'">'+value+'</textarea>');

    $label.append($input);

    return $label;
};





Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderBlotSelect = function(descriptor, name, value)
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

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.wrapBlotInput = function(element)
{

    var wrapper = $('<div class="plk-blot-attribute"></div>');
    wrapper.append(element);
    return wrapper;
};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.updateBlotFromForm = function(blot, $formContainer)
{


    $formContainer.find('.blot-attribute-value').each(function(index, element) {
        var attributeName = $(element).attr('name');
        var value = $(element).val();
        blot.userAttributes[attributeName] = value;
    });
    blot.updateNode();
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderBlotForm = function(blot)
{

    var blotDescriptor = blot.getDescriptor();

    var $placeholder = $('.plk-blot-edit-container');
    var $container = $('<div></div>');
    $container.css({
        border: 'solid 1px #F00'
    });


    $container.html('');
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
        $container.append(wrapper);
    }


    var $button = $('<button>enregistrer</button>');
    $button.on('click', function(event) {
        this.updateBlotFromForm(blot, $container);
    }.bind(this));
    $container.append($button);



    $placeholder.append($container);

};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.initialize = function () {


    this.$container.append(this.$valueElement);

    this.initializeEditor();


    this.$placeholder.on('plk-blot-edit', '.plk-blot-rich', function (event) {
        var blot = event.originalEvent.detail.blot;
        this.renderBlotForm(blot);
    }.bind(this));




}
;

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.initializeEditor = function()
{



    var toolbarOptions = this.getToolbarOptions();
    this.editor = new Quill(this.$placeholder.get(0), {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    this.previewRenderer = new Quill(this.$previewPlaceholder.get(0), {
        theme: 'snow',
        modules: {
            toolbar: false
        }
    });



    this.editor.on('text-change', function (delta, oldDelta, source) {
        this.renderPreview(delta, oldDelta, source);
    }.bind(this));


    this.$valueElement.val(
        this.getHTML()
    );
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.getToolbarOptions = function()
{
    this.$container.prepend(this.$toolbar);

    var toolbarOptions = {
        container: this.$toolbar.get(0),
        handlers: {
            // handlers object will be merged with default handlers object
            'image': function (value) {
                this.openImageList();
                return;
            }.bind(this)
        },
    };

    $('.plk-component-blot-editor .blot-insert-trigger').click(function () {

        var blotName = $('input[name=blot-name]').val();
        var json = $('textarea[name="blot-attributes"]').val();

        var data = JSON.parse(
            json
        );


        this.insertEmbedBlot(blotName, data);

    }.bind(this));



    this.$toolbar.find('.plk-blot-code-trigger').click(function () {

        var data = {
            content: 'hello world' +"\n"+ Math.random(),
            language: 'php'
        };


        this.insertEmbedBlot('plk-blot-code-edition', data);



        /*
         var displayRange = this.previewRenderer.getSelection(true);
         this.previewRenderer.insertEmbed(displayRange.index, 'plk-blot-code-display', data);
         */


        //this.editor.format('plk-blot-code-edition', data);
        //this.previewRenderer.format('plk-blot-code-display', data);

        /*
         var dialog = new RichBlotDialog();
         dialog.onValidate(function(data) {
         console.log(data);
         dialog.close();
         quill.format('plk-code', data);
         console.log(quill.getContents());
         });
         dialog.show(CodeBlot.attributesDescriptors);
         */

        return false;

    }.bind(this));



    return toolbarOptions;
};






Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderPreview = function(delta, oldDelta, source)
{

    var editorDelta = this.editor.getContents();

    var previewDelta = {
        ops: []
    };

    for (var i = 0; i < editorDelta.ops.length; i++) {

        var blot = editorDelta.ops[i];


        for (var key in blot) {
            if (key == 'insert') {
                if (isset(blot.insert['plk-blot-code-edition'])) {


                    var content = blot.insert['plk-blot-code-edition'].content;
                    var language = blot.insert['plk-blot-code-edition'].language;

                    var newBlot = {
                        insert: {
                            'plk-blot-code-display': {
                                content: content,
                                language: language
                            }
                        },
                    };
                    previewDelta.ops[i] = newBlot;
                }
                else {
                    previewDelta.ops[i] = blot;
                }
            }
            else {
                previewDelta.ops[i] = blot;
            }
        }

    }


    this.previewRenderer.setContents(previewDelta);

    this.$valueElement.val(
        this.getHTML()
    );

    /*
     if (source == 'api') {
     console.log("An API call triggered this change.");
     } else if (source == 'user') {
     console.log("A user action triggered this change.");
     }
     */
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.insertContent = function (blotName, value) {
    var range = this.editor.getSelection(true);
    this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
    return this;

};



Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.insertEmbedBlot = function(blotName, data)
{
    var editorRange = this.editor.getSelection(true);
    this.editor.insertText(editorRange.index, "\n");
    var delta = this.editor.insertEmbed(editorRange.index+1, blotName, data);
    this.editor.insertText(editorRange.index+2, "\n");
    this.editor.setSelection(editorRange.index + 3, Quill.sources.SILENT);

    return delta;
};





Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.openImageList = function () {


    var overlay = new Planck.Extension.ViewComponent.View.Component.Overlay();
    overlay.render(document.body);


    var imageList = new Planck.Extension.Content.Module.Image.View.Component.ImageList();
    imageList.on('thumbnailClick', function (thumbnail) {

        var imageInstance = thumbnail.getDataLayer().get('image');

        var range = this.editor.getSelection(true);
        this.insertEmbedBlot('image', imageInstance.getValue('url'));
        overlay.hide();



        return;
        var imageInstance = thumbnail.getDataLayer().get('image');
        var delta = this.insertContent('image', imageInstance.getValue('url'));
        overlay.hide();

        console.log(blot);

        //console.log(imageInstance.getValues());

        /*
         var range = this.editor.getSelection(true);
         this.editor.insertEmbed(range.index, 'image', imageInstance.getValue('url'));
         */


    }.bind(this));


    var remoteCall = imageList.getRemoteCallInstance();


    remoteCall.addMethodCall('loadAllImages', {
        parameters: null
    });


    remoteCall.execute(function (descriptor) {

        var dom = $(descriptor.getHTML());
        imageList.setElement(dom);

        overlay.show(
            imageList.getElement()
        );
    }.bind(this));
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.getHTML = function () {
    return this.$container.find('.ql-editor').html();
};










