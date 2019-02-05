Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Image = function(editor)
{
    this.editor = editor;

    this.$toolbarButton = $('<button class="ql-image far fa-image"></button>');

    this.$toolbarButton.click(function() {
        this.openList();
    }.bind(this));



    this.editor.getToolBar().addButton(this.$toolbarButton);

    this.editor.getDropZone().on('upload', function(datalayer) {

        $(datalayer).each(function(index, dataLayerRecord) {
            var descriptor = {
                image: dataLayerRecord
            };

            var dataLayer = new Planck.DataLayer();
            dataLayer.load(descriptor);
            var imageInstance = dataLayer.get('image');

            this.insert(imageInstance, descriptor);

        }.bind(this));
    }.bind(this));

};


Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Image.prototype.insert = function(imageEntity, dataLayer)
{
    var blot = this.editor.insertEmbedBlot('plk-blot-image-edition', {
        src: imageEntity.getValue('url'),
        description: imageEntity.getValue('title'),
        dataLayer: dataLayer
    });
    return blot;
};





Planck.Extension.ViewComponent.View.FormElement.RichTextInput.Feature.Image.prototype.openList = function () {


    var overlay = new Planck.Extension.ViewComponent.View.Component.Overlay();
    overlay.render(document.body);


    var imageList = new Planck.Extension.Content.Module.Image.View.Component.Gallery();


    imageList.on('thumbnailClick', function (thumbnail) {
        var imageInstance = thumbnail.getDataLayer().get('image');
        this.insert(imageInstance, thumbnail.getDataLayer());
        overlay.hide();

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
