class PlanckImageEdition extends RichBlot
{
    static create(value)
    {

        var defaultValues = {
            description: '',
            align: 'left',
            style: '',
        };

        var values = defaultValues;
        for(var key in value) {
            var attributeValue = value[key];
            if(attributeValue) {
                values[key] = attributeValue;
            }
        }

        var node = super.create(values);


        $(node).append(
            '<div style="width: 100%; height: 100%; position: relative;">'+
                '<img  src="'+value.src+'" style="width: 100%; height: 100%;'+values.style+'"/>'+
                '<div class="description" style="position: absolute; bottom:0; width: 100%;background-color:rgba(255,255,255,0.8">'+values.description+'</div>'+
            '</div>'

        );
        return node;
    }

    updateNode()
    {
        super.updateNode();

        var $description = $(this.domNode).find('.description');
        $description.html(this.userAttributes.description);

    }


}

PlanckImageEdition.blotName = 'plk-blot-image-edition';
PlanckImageEdition.tagName = 'div';
PlanckImageEdition.className = 'plk-blot-image-edition';


PlanckImageEdition.attributesDescriptors = {
    src: {
        type: 'text',
        label: function() {
            return 'URL : '
        },
        description: ''
    },
    description: {
        type: 'textarea',
        label: 'Description : '
    },
    align: {
        type: 'select',
        label: 'Alignement',
        options: [
            {value: 'left', label: 'Gauche'},
            {value: 'right', label: 'Droite'},
            {value: 'middle', label: 'Milieu'},
            {value: 'top', label: 'Haut'},
            {value: 'bottom', label: 'Bas'}
        ]
    },


};

Quill.register(PlanckImageEdition);