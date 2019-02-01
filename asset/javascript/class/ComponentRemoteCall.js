Planck.Extension.ViewComponent.ComponentRemoteCall = function(componentName)
{
    this.componentName = componentName;
    this.url = '?/view-component/remote-rendering/render';
    this.method = 'post';

    this.data = {
        component: this.componentName
    };

    this.remoteMethodCall = {};

};


Planck.Extension.ViewComponent.ComponentRemoteCall.prototype.addData = function(key, value)
{
    this.data[key] = value;
    return this;
};

Planck.Extension.ViewComponent.ComponentRemoteCall.prototype.getData = function()
{

    var data = this.data;
    data.calls = {};

    for(var name in this.remoteMethodCall) {
        var descriptor = this.remoteMethodCall[name];
        data.calls[name] = descriptor;
    }


    return data;
};

Planck.Extension.ViewComponent.ComponentRemoteCall.prototype.addMethodCall = function(methodName, options)
{
    this.remoteMethodCall[methodName] = options;
    return this;
};


Planck.Extension.ViewComponent.ComponentRemoteCall.prototype.execute = function(callback)
{

    Planck.ajax({
        beforeSend: function(request) {
            //request.setRequestHeader("trololo", 'test');
        },
        url: this.url,
        method: this.method,
        data: this.getData(),
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

    })
};










