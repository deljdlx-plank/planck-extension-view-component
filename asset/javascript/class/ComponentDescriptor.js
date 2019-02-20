Planck.Extension.ViewComponent.ComponentDescriptor = function()
{

    this.html = '';
    this.javascripts = [];
    this.css = [];

};


Planck.Extension.ViewComponent.ComponentDescriptor.prototype.setJavascripts =  function(javascripts)
{
    this.javascripts = javascripts;
    return this;
};

Planck.Extension.ViewComponent.ComponentDescriptor.prototype.setCSS =  function(css)
{
    this.css = css;
    return this;
};


Planck.Extension.ViewComponent.ComponentDescriptor.prototype.setHTML =  function(html)
{
    this.html = html;
    return this;
};


Planck.Extension.ViewComponent.ComponentDescriptor.prototype.getHTML = function()
{
    return this.html;
};


Planck.Extension.ViewComponent.ComponentDescriptor.prototype.loadResources = function(callback)
{


    for(var i=0; i<this.css.length; i++) {

        var src = this.css[i];

        if(!$('head').find('link[href="'+src+'"]').length) {

            $('head').append('<link rel="stylesheet" href="'+src+'"/>');
        }
    }

    var index = 0;

    var load = function(data, textStatus, jqxhr)
    {

        var url = this.javascripts[index];

        index++;

        if($('script[src="'+url+'"]').length) {
            load();
            return;
        }

        if(url) {
            $.getScript(url, load).fail(function (jqxhr, settings, exception) {
                console.log(exception)
            });
        }
        else {
            callback(this);
        }
    }.bind(this);
    load();






};




