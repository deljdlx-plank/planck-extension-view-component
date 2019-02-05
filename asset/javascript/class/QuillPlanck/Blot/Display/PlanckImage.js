class PlanckImageDisplay extends BlockEmbed
{
    static create(value)
    {

        var value = $.extend({
            description: '',
            align: 'left',
            style: '',
        }, value);


        var node = super.create(value);

        $(node).css({
            height: value.height,
            width: value.width,
            overflow: 'hidden',
            position: 'relative',
            float: value.float
        });


        $(node).append(
            '<div style="width: 100%; height: 100%; position: relative">'+
            '<img  src="'+value.src+'" style="width: 100%; height: 100%;'+value.style+'"/>'+
            '<div class="description" style="width:100%; background-color:rgba(255,255,255,0.8">'+value.description+'</div>'+
            '</div>'
        );


        return node;
    }

    updateNode()
    {
        super.updateNode();
        console.log(
            $(this.domNode).find('code')
        );
        console.log(this.userAttributes);
        $(this.domNode).find('code').html(this.userAttributes.content);
    }


}

PlanckImageDisplay.blotName = 'plk-blot-image-display';
PlanckImageDisplay.tagName = 'div';
PlanckImageDisplay.className = 'plk-blot-image-display';


PlanckImageDisplay.attributesDescriptors = {
    content: {
        type: 'text'
    },
    language: {
        type: 'select',
        options: [
            {value: 'raw', label: 'Aucun'},
            {value: 'javascript', label: 'Javascript'},
            {value: 'php', label: 'PHP'}
        ]
    }

};

Quill.register(PlanckImageDisplay);