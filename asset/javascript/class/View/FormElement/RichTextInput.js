Planck.Extension.ViewComponent.View.FormElement.RichTextInput = function (container) {
    this.editor = null;
    this.imageDropZone = null;

    this.$container = $(container);
    this.$placeholder = this.$container.find('.plk-rich-text-placeholder');

    this.$previewPlaceholder = $('.editor-preview');


    this.$valueElement = this.$container.find('.plk-rich-text-value-container');
    this.$valueElement.addClass('form-data');
    this.$valueElement.attr('name', this.$container.attr('data-name'));

    this.toolbar = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Toolbar(this);

};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature = {};






Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.initialize = function () {
    this.$container.append(this.$valueElement);
    this.initializeEditor();
}
;

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.initializeEditor = function()
{


    this.$container.prepend(this.toolbar.getElement());



    this.previewRenderer = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput.PreviewRenderer(
        this.$previewPlaceholder.get(0),
        this
    );


    this.editor = new Quill(this.$placeholder.get(0), {
        theme: 'snow',
        modules: {
            toolbar: this.toolbar.getOptions()
        }
    });

    $(this.editor.root).css('height', '800px');

    this.editor.on('text-change', function (delta, oldDelta, source) {
        this.renderPreview(delta, oldDelta, source);


        this.$valueElement.val(
            JSON.stringify(
                this.editor.getContents()
            )
        );
    }.bind(this));



    this.initializeDropZone();


    this.imageFeature = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Image(this);
    this.codeFeature = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Code(this);


    var contents = JSON.parse(this.$valueElement.val());
    this.editor.setContents(contents);
    this.renderPreview();

};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.initializeDropZone = function()
{

    this.dropZone = new Planck.Extension.Content.Module.Image .View.Component.DropZone(this.editor.root);

    this.dropZone.on('drop', function(event) {
        var evt = event.originalEvent;

        if (document.caretRangeFromPoint) {
            var selection = document.getSelection();
            var range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
            if (selection && range) {
                selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }.bind(this));

};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.getDropZone = function()
{
   return this.dropZone;
};

Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.getToolBar = function()
{
    return this.toolbar;
};





Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.renderPreview = function(delta, oldDelta, source)
{

    var editorDelta = this.editor.getContents();
    var previewDelta = this.previewRenderer.convertEditorBlot(editorDelta);
    this.previewRenderer.setContents(previewDelta);
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




Planck.Extension.ViewComponent.View.FormElement.RichTextInput.prototype.getHTML = function () {
    return this.$container.find('.ql-editor').html();
};










