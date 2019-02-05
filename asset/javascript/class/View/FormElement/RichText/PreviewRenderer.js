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

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer.prototype.getHTML = function()
{
    return this.editor.root.innerHTML;
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

                var conversions = [
                   ['plk-blot-image-edition', 'plk-blot-image-display'],
                    ['plk-blot-code-edition', 'plk-blot-code-display'],
                ];

                var newBlot = false;

                for(var conversionIndex=0; conversionIndex<conversions.length; conversionIndex++) {
                    var blotFrom = conversions[conversionIndex][0];
                    var blotTo = conversions[conversionIndex][1];
                    newBlot = this.convertBlot(blot, blotFrom, blotTo);
                    if(newBlot) {
                        break;
                    }
                }


                if(newBlot) {
                    previewDelta.ops[i] = newBlot;
                }
                else {
                    previewDelta.ops[i] = blot;
                }            }
            else {
                previewDelta.ops[i] = blot;
            }
        }
    }

    return previewDelta;
};



Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer.prototype.convertBlot = function(blot, blotFromName, blotToName)
{
    if (isset(blot.insert[blotFromName])) {

        var attributes = blot.insert[blotFromName];

        var insertDescriptor = {};
        insertDescriptor[blotToName] = attributes;



        var newBlot = {
            insert: insertDescriptor,
        };
        return newBlot
    }
    return false;
};











Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer.prototype.setContents = function(delta)
{
    return this.editor.setContents(delta);
};




