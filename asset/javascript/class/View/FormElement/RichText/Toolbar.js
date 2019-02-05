Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Toolbar = function(richTexInput)
{

    this.richTexInput = richTexInput;

    this.$element = $(
        '<div style="position: relative; height:  60px">'+
            '<div style="position: absolute; z-index:100" class="button-container">' +
                '<select class="ql-header">' +
                    '<option selected=""></option>' +
                    '<option value="1">Titre 1</option>' +
                    '<option value="2">Titre 2</option>' +
                    '<option value="3">Titre 3</option>' +
                    '<option value="4">Titre 4</option>' +
                '</select>' +


                '<button class="fas fa-angle-double-left ql-clear" value="both"></button>'+

                //'<button class="plk-blot-code-trigger">code</button>' +

                '<button class="ql-align" value=""></button>' +
                '<button class="ql-align" value="right"></button>' +
                '<button class="ql-align" value="justify"></button>' +


                '<button class="ql-bold"></button>' +
                '<button class="ql-italic"></button>' +

                '<button class="ql-link"></button>' +


            '</div>'+
        '</div>'
    );
    this.$buttonContainer = this.$element.find('.button-container');


    this.initialize();

};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Toolbar.prototype.addButton = function(button)
{
   this.$buttonContainer.append(button);
   return this;
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Toolbar.prototype.initialize = function()
{


    $('.plk-component-blot-editor .blot-insert-trigger').click(function () {

        var blotName = $('input[name=blot-name]').val();
        var json = $('textarea[name="blot-attributes"]').val();

        var data = JSON.parse(
            json
        );


        this.insertEmbedBlot(blotName, data);

    }.bind(this));



    var clear = new Parchment.Attributor.Class ('clear', 'plk-blot-style-clear');
    Parchment.register(clear);





    this.$element.find('.plk-blot-code-trigger').click(function () {

        var data = {
            content: 'hello world' +"\n"+ Math.random(),
            language: 'php'
        };

        this.richTexInput.insertEmbedBlot('plk-blot-code-edition', data);

        return false;

    }.bind(this));

};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Toolbar.prototype.getOptions = function()
{


    var toolbarOptions = {
        container: this.$element.get(0),
        handlers: {
            // handlers object will be merged with default handlers object
            /*
            'image': function (value) {
                this.richTexInput.openImageList();
                return;
            }.bind(this)
            */
        },
    };

    return toolbarOptions;
};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Toolbar.prototype.getElement = function()
{
    return this.$element;
};



















