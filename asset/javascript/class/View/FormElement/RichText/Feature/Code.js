Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Code = function(editor)
{
    this.editor = editor;

    this.$toolbarButton = $('<button class="far fa-file-code"></button>');

    this.$toolbarButton.click(function() {
        this.openDialog();
    }.bind(this));



    this.editor.getToolBar().addButton(this.$toolbarButton);
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Code.prototype.openDialog = function()
{
    var node = CodeEdition.create({});
    var codeBlot = new CodeEdition(node);
    var editor = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor(codeBlot);

    var overlay = new Planck.Extension.ViewComponent.View.Component.Overlay();
    overlay.show(
        editor.getForm(function(editor) {

            var values = editor.getBlot().getValues();

            var blot = this.editor.insertEmbedBlot('plk-blot-code-edition', {
                code: values.code,
                language: values.language
            });

            overlay.destroy();
            return blot;



        }.bind(this))
    );

};
