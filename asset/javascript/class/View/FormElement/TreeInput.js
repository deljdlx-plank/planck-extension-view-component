Planck.Extension.ViewComponent.View.FormElement.TreeInput = function(container)
{
    this.$container = $(container);
    this.dataSource = this.$container.attr('data-source');

    this.$input = this.$container.find('input');

    this.$treeContainer = this.$container.find('.plk-tree-placeholder');

    this.tree;
};

Planck.Extension.ViewComponent.View.FormElement.TreeInput.prototype.initialize = function()
{
    var options = {
        sourceURL: this.dataSource,
        editable: false
    };

    this.tree = new Planck.Extension.ViewComponent.View.Component.EntityTree(options)
    this.tree.on('select', function(data) {
        var node = data.node;


        this.$input.val(node.id);

    }.bind(this));


    this.tree.render(this.$treeContainer);
};









