Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer = function(container, richTexInput)
{
    this.richTexInput = richTexInput;

    this.$container = $(container);


    this.editor = new Quill(this.$container.get(0), {
        theme: 'snow',
        modules: {
            toolbar: false
        }
    });

    this.editor.disable(true);

};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer.prototype.initialize = function()
{
};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer.prototype.convertEditorBlot = function(editorDelta)
{
    var previewDelta = {
        ops: []
    };

    for (var i = 0; i < editorDelta.ops.length; i++) {

        var blot = editorDelta.ops[i];


        for (var key in blot) {
            if (key == 'insert') {
                if (isset(blot.insert['plk-blot-image-edition'])) {


                    var attributes = blot.insert['plk-blot-image-edition']
                    //var content = blot.insert['plk-blot-image-edition'].content;
                    //var language = blot.insert['plk-blot-image-edition'].language;

                    var newBlot = {
                        insert: {
                            'plk-blot-image-display': attributes
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

    return previewDelta;
};



Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer.prototype.setContents = function(delta)
{
    return this.editor.setContents(delta);
};




