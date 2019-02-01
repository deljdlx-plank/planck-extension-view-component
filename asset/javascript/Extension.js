Planck.Extension.ViewComponent = {};
Planck.Extension.ViewComponent.View = {};

Planck.Extension.ViewComponent.View.Component = {};
Planck.Extension.ViewComponent.View.FormElement = {};

Planck.Extension.ViewComponent.Module = {};
Planck.Extension.ViewComponent.Model = {};
Planck.Extension.ViewComponent.Model.Entity = {};
Planck.Extension.ViewComponent.Model.Repository = {};



Planck.Extension.ViewComponent.initialize = function(container)
{
    $(container).find('.plk-component.plk-tree-input').each(function(index, element) {
        var tree = new Planck.Extension.ViewComponent.View.FormElement.TreeInput(element);
        tree.initialize();
    });



    $(container).find('.plk-component.plk-tag-input').each(function(index, element) {
        var tagInput = new Planck.Extension.ViewComponent.View.FormElement.TagInput(element);
        tagInput.initialize();
    });

    $(container).find('.plk-component.plk-rich-text-input').each(function(index, element) {
        var richEdit = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput(element);
        richEdit.initialize();
    });

};
