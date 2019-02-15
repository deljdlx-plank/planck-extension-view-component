Planck.Extension.ViewComponent.RemoteComponentLoader = function(componentName)
{
    this.remoteComponentName = componentName;

    this.serviceURL = '?/view-component/remote-rendering/render';


    this.calls = {};
    this.data = {}

};


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
        method: 'get',
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

            console.log(descriptor);


        }.bind(this)
    });

};


/*
Planck.Extension.ViewComponent.RemoteComponentLoader.prototype.execute = function(callback)
{

    Planck.ajax({
        beforeSend: function(request) {
            //request.setRequestHeader("trololo", 'test');
        },
        url: this.url,
        method: this.method,
        data: this.getData(),
        success: function(response) {

        }.bind(this)

    })
};
*/





















