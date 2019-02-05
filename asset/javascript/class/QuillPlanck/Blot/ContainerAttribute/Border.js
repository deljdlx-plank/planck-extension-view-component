class ContainerAttributeBorder extends ContainerAttribute
{


    initialize()
    {
        super.initialize();

        var values = this.container.getBlot().getValues();



        return;


        this.container.getToolbar().addInput(
            this.getInput()
        );

        this.formatContainer(values.border);

    }

    formatContainer(borderName)
    {

        var border = 'none';

        if(borderName == 'none') {
            border= 'none';
        }
        else if(borderName == 'solid') {
            border = 'solid 3px #000';
        }

        else if(borderName == 'dashed') {
            border = 'solid 1px #000';
        }

        this.blot.getElement().css({
            'border': border
        });


    }

    changeBorder(event)
    {

        var borderName = event.target.value;

        this.formatContainer(borderName);

        var jsonAttributes = this.blot.getElement().attr('data-attributes');
        var attributes = JSON.parse(jsonAttributes);
        attributes.border = borderName;
        this.blot.getElement().attr('data-attributes', JSON.stringify(attributes));
    }


    getInput()
    {

        var values = this.blot.getValues();

        this.$input = $('<select class="block-format-border" style="vertical-align: middle"></select>');
        var options = {
            none: 'Pas de bordure',
            solid: 'Bordure pleine',
            dashed: 'Bordure pointillées'
        };


        var border = values.border;

        for(var value in options) {
            var selected ='';

            if(border == value) {
                selected = 'selected="selected"';
            }

            this.$input.append(
                '<option '+selected+' value="'+value+'">'+options[value]+'</option>'
            );
        }

        this.$input.change(this.changeBorder.bind(this));

        return this.$input;
    }


}

