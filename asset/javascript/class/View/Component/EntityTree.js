Planck.Extension.ViewComponent.View.Component.EntityTree = function(options)
{

    this.options = {
        newNodeCaption: i18n('Nouveau'),
        sourceURL: '',
        createNodeURL: '',
        renameNodeURL: '',
        moveNodeURL: '',
        deleteURL: '',
        deleteBranchURL: '',

        editable: true,
    };

    $.extend(this.options, options);

    this.selector;
    this.tree;

    this.editionEnable = this.options.editable;
    this.deleteEnable = true;
    this.moveEnable = true;



    this.selectedNode;

    this.events = {
       select: function(data) {
           //console.log(data);
       }.bind(this),
        ready: function(data) {
            //console.log(data);
        }.bind(this),
        create: function(data) {
            //console.log(data);
        }.bind(this),
        load: function(data) {
            //console.log(data)
        }.bind(this)
    };

};

Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.on = function(eventName, callback)
{
   this.events[eventName] = callback;
   return this;
};


Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.selectNodeById = function(nodeId)
{
    return this.getTree().jstree('select_node', nodeId);
};


Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.render = function(selector)
{

    this.selector = selector;
    this.tree = $(selector).jstree(this.getOptions())
    .on('select_node.jstree', function(e, data) {
        this.selectedNode = data.node;
        return this.events.select(data);
    }.bind(this))
    .on('ready.jstree', function(data) {
        return this.events.ready(data);
    }.bind(this))
    .on('loaded.jstree', function(data) {
        this.events.load(data);
    }.bind(this))
    ;





    if(this.editionEnable) {
        this.bindRenameEvent();
    }

    if(this.moveEnable) {
        this.bindMoveEvent();
    }


    if(this.deleteEnable) {
        this.bindRemoveEvent();
        //this.deleteBranch();
    }

};

Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.getValue = function()
{
    return this.selectedNode;
}



Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.getOptions = function()
{

    var options = {
        'core': {
            'data': {
                "url": function (node) {
                    var url = this.options.sourceURL;
                    return url;
                }.bind(this),
                'data': function (node) {
                    return {
                        'id': node.id,
                        //'entityName': this.entityName
                    };
                }.bind(this),
            },
            "check_callback": true
        },
        "plugins": ["dnd", "search"/*, "checkbox"*/],
        'search': {
            'case_insensitive' : true,
            'ajax':  {
                url: '?/product/api/searchInTree',
                data : {
                    entityName: this.entityName
                },
                success: function(data) {
                    console.log(data);
                }.bind(this)
            }
        }
    };


    if(this.editionEnable) {

        options.plugins.push("contextmenu");


        options.contextmenu = {
            'items': function($node) {
                var tree = $(this.selector).jstree(true);
                return this.getContextMenu($node);

            }.bind(this)
        };
    }


    return options;
};


Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.reloadNode = function (nodeId) {
    this.tree = $(this.selector).jstree(true).refresh_node(nodeId);
    return this;
};




Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.deleteBranch = function(node)
{

    var url = this.options.deleteBranchURL;
    Planck.ajax({
        url: url,
        method: 'delete',
        data: node.data,
        success: function(data) {
            this.reloadNode(node.data.parent_id);
        }.bind(this)
    });
};





Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.createNode = function(parentNode)
{


    var url = this.options.createNodeURL;
    Planck.ajax({
        url : url,
        method: 'post',
        data : {
            parent_id : parentNode.id,
            name: this.options.newNodeCaption
            //entityName: this.entityName
        },
        success: function (data) {
            var tree = $(this.selector).jstree(true);

            var newNode = data;


            tree.create_node(parentNode, newNode);

            this.events.create(newNode);
            tree.edit(newNode);
        }.bind(this)
    })
};

Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.bindRenameEvent = function()
{


    this.getTree().on('rename_node.jstree', function(e, data) {

        var newName = data.text;

        var data = data.node.data;
        data['name'] = newName;

        var url = this.options.renameNodeURL;
        Planck.ajax({
            url: url,
            method: 'post',
            data: data,
            success: function(data) {
                console.log(data);
            }
        });

    }.bind(this))
};




Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.bindMoveEvent = function()
{
    this.getTree().on('move_node.jstree', function(e, data) {
        var movedNode = data.node;
        var newParentId = data.parent;

        var nodeData = movedNode.data;
        nodeData['parent_id'] = newParentId;


        var url = this.options.moveNodeURL;

        Planck.ajax({
            url: url,
            method: 'post',
            data: nodeData,
            success: function(data) {
                console.log(data);
            }
        });
    }.bind(this))
};




Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.bindRemoveEvent = function()
{
    this.getTree().on('delete_node.jstree', function(e, data) {


        console.log(data.node.data);


        var url = this.options.deleteURL;
        Planck.ajax({
            url: url,
            method: 'delete',
            data: data.node.data,
            success: function(data) {
                console.log(data);
            }
        });

    }.bind(this))
};





Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.getContextMenu = function($node)
{
    var tree = $(this.selector).jstree(true);
    var menu =  {
        "Create": {
            "separator_before": false,
            "separator_after": false,
            "label": "Nouveau",
            "action": function (obj) {
                this.createNode($node);
            }.bind(this)
        },
        "Rename": {
            "separator_before": false,
            "separator_after": false,
            "label": "Renommer",
            "action": function (obj) {
                tree.edit($node);
            }
        },
    };

    if(this.deleteEnable) {
        menu["Remove"] = {
            "separator_before": false,
            "separator_after": false,
            "label": "Supprimer",
            "action": function (obj) {
                tree.delete_node($node);
            }
        };

        menu["RemoveAll"] = {
            "separator_before": true,
            "separator_after": false,
            "label": "Supprimer la branche",
            "action": function (obj) {
                this.deleteBranch($node);
            }.bind(this)
        };


    }


    return menu;
};



Planck.Extension.ViewComponent.View.Component.EntityTree.prototype.getTree = function()
{
    return this.tree;
    //
};

