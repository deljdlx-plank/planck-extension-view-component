Planck.Extension.ViewComponent.RemoteComponentLoader = function(componentName)
{
    this.remoteComponentName = componentName;

    this.serviceURL = '?/view-component/remote-rendering/render';


    this.calls = {};
    this.data = {}

};

Planck.Extension.ViewComponent.RemoteComponentLoader.packageDescriptorLoaded = false;
Planck.Extension.ViewComponent.RemoteComponentLoader.loadedAssets = {};


Planck.Extension.ViewComponent.RemoteComponentLoader.prototype.addData = function(key, value)
{
   this.data[key] = value;
   return this;

};

Planck.Extension.ViewComponent.RemoteComponentLoader.prototype.addMethodCall = function(callName, parameters)
{
    this.calls[callName] = parameters;
    return this;
};


Planck.Extension.ViewComponent.RemoteComponentLoader.prototype.load = function(callback)
{

    if(!Planck.Extension.ViewComponent.RemoteComponentLoader.packageDescriptorLoaded) {
        this.loadPackageDescriptor(function(callback) {
            this.loadComponent(callback);
        }.bind(this));
    }
    else {
        this.loadComponent(callback);
    }
};

Planck.Extension.ViewComponent.RemoteComponentLoader.prototype.loadPackageDescriptor = function(callback)
{

    var url = '?/@extension/planck-extension-view_component/RemoteRendering/api[get-package]';
    var data = {
    };
    Planck.ajax({
        url: url,
        method: 'get',
        data: data,
        success: function(response) {
            Planck.Extension.ViewComponent.RemoteComponentLoader.loadedAssets = response;
            Planck.Extension.ViewComponent.RemoteComponentLoader.packageDescriptorLoaded = true;


            this.loadComponent(callback());
        }.bind(this)
    });


};



Planck.Extension.ViewComponent.RemoteComponentLoader.prototype.loadComponent = function(callback)
{

    var url = this.serviceURL;
    var data = {
        component: this.remoteComponentName,
        calls: this.calls
    };

    for(var key in this.data) {
        data[key] = this.data[key];
    }


    Planck.ajax({
        url: url,
        method: 'post',
        data: data,
        success: function(response) {

            var descriptor = new Planck.Extension.ViewComponent.ComponentDescriptor();

            descriptor.setHTML(response.html);
            descriptor.setCSS(response.css);
            descriptor.setJavascripts(response.javascripts);

            descriptor.loadResources(function() {
                if(callback) {
                    callback(descriptor);
                }
            }.bind(this));

        }.bind(this)
    });
};



















