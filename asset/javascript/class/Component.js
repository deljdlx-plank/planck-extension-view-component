Planck.Extension.ViewComponent.Component = function()
{

};



Planck.Extension.ViewComponent.Component.prototype.dataLayerSelector = '*[type="'+'application/json+planck-data'+'"]';
Planck.Extension.ViewComponent.Component.prototype.dataLayer = null;
Planck.Extension.ViewComponent.Component.prototype.subComponents = [];
Planck.Extension.ViewComponent.Component.prototype.$element = null;
Planck.Extension.ViewComponent.Component.prototype.$contentElement = null;




Planck.Extension.ViewComponent.Component.prototype.destroy = function()
{
    this.$element.remove();
};


Planck.Extension.ViewComponent.Component.prototype.onClick = function(callback)
{
   this.getElement().click(function() {
      callback(this);
   }.bind(this));
};


Planck.Extension.ViewComponent.Component.prototype.on = function(eventName, callback)
{
   this.events[eventName] = callback;
   return this;
};



Planck.Extension.ViewComponent.Component.prototype.setElement = function(selector)
{
    this.$element = $(selector);
    this.$contentElement = this.$element.find('> .plk-component-content');
    this.initialize();
};

Planck.Extension.ViewComponent.Component.prototype.getElement = function()
{
    if(this.$element) {
        return this.$element;
    }
    console.log('no element');

};





Planck.Extension.ViewComponent.Component.prototype.initialize = function()
{

    this.loadDataLayerFromDom();
    this.$element.data('component', this);
    this.$element.data('initialized', true);
    this.loadSubComponents();


};

Planck.Extension.ViewComponent.Component.prototype.loadSubComponents = function()
{
    this.$element.find('.plk-component').each(function(index, item) {

        if($(item).data('initialized')) {
            return;
        }

        var componentName = item.getAttribute('data-component-name');

        if(componentName) {
            var instance = Planck.getConstructor(componentName);
            if(instance) {
                var component = new instance();
                component.setElement(item);

                if(!isset(this.subComponents[componentName])) {
                    this.subComponents[componentName] = [];
                }

                this.subComponents[componentName].push(component);
            }
        }
    }.bind(this));

};





Planck.Extension.ViewComponent.Component.prototype.getToolbar = function()
{

    if(this.toolbar) {
        return this.toolbar;
    }

    var toolbar = this.$element.find('.plk-component.plk-toolbar');

    if(toolbar.length) {

        var toolbarComponent = toolbar.data('component');
        if(!toolbarComponent) {
            toolbarComponent = new Planck.Extension.ViewComponent.View.Component.Toolbar();
            toolbarComponent.setElement(toolbar);
            toolbarComponent.initialize();
        }
        this.toolbar = toolbarComponent;

        return this.toolbar;
    }
    this.toolbar = new Planck.Extension.ViewComponent.View.Component.Toolbar();
    return this.toolbar;

};






Planck.Extension.ViewComponent.Component.prototype.addRemoteCallData = function(key, value)
{
    if(!this.remoteCallData) {
        this.remoteCallData = {};
    }
    this.remoteCallData[key] = value;
    return this;
};



Planck.Extension.ViewComponent.Component.prototype.getRemoteCallInstance = function(componentName)
{
    var remoteCall = new Planck.Extension.ViewComponent.ComponentRemoteCall(componentName);
    remoteCall.addData('dataLayer', this.getDataLayer().serialize());


    return remoteCall;
};


Planck.Extension.ViewComponent.Component.prototype.getViewFromRemote = function(componentName, data, callback)
{

    var remoteCall = this.getRemoteCallInstance(componentName);
    if(data) {
        for(var key in data) {
            var value = data[key];
            remoteCall.addData(key, value);
        }
    }

    remoteCall.execute(function(descriptor) {

        var dom = $(descriptor.getHTML());
        this.setElement(dom);

        if(callback) {
            callback(descriptor);
        }

    }.bind(this));

};





Planck.Extension.ViewComponent.Component.prototype.setDataLayer = function(dataLayer)
{
   this.dataLayer = dataLayer;
   var entries = this.dataLayer.getEntries();
   for(var name in entries) {

       if(isset(this[name])) {
           this[name] =  this.dataLayer.get(name);
       }
   }
    return this;
};

Planck.Extension.ViewComponent.Component.prototype.getDataLayer = function()
{
    if(!this.dataLayer) {
        this.dataLayer = new Planck.DataLayer();
    }
    return this.dataLayer;
};

Planck.Extension.ViewComponent.Component.prototype.loadDataLayerFromDom = function()
{

    var dalaLayers = this.$element.find(this.dataLayerSelector);

    dalaLayers.each(function(index, dataLayer) {
        var json = $(dataLayer).text();

        try {
            var data = JSON.parse(json);
        }
        catch(exception) {
            console.log(exception);
        }

        this.loadDataLayer(data);

    }.bind(this));

    return this;
};

Planck.Extension.ViewComponent.Component.prototype.loadDataLayer = function(data)
{

    for(var name in data) {

        this.getDataLayer().set(name, data[name]);



        if(isset(this[name])) {
            this[name] = this.getDataLayer().get(name);
        }
    }
};












