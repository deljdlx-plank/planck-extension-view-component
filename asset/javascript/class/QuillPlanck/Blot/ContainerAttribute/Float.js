class ContainerAttributeFloat extends ContainerAttribute
{


    initialize()
    {
        super.initialize();


        var values = this.container.getBlot().getValues();

        this.formatContainer(values.float);



        this.container.getToolbar().addInput(
            this.getInputSelect()
        );
    }

    formatContainer(float)
    {
        this.$element.css({
            float: float
        });
    }




    getInputSelect()
    {

            var values = this.blot.getValues();

            this.$input = $('<select class="button block-format-align fas" style="vertical-align: middle"></select>');
            var options = {
                none: '&#xf039',
                left: '&#xf036',
                right: '&#xf038'
            };


            var float = values.float;

            for(var value in options) {
                var selected ='';

                if(float == value) {
                    selected = 'selected="selected"';
                }

                this.$input.append(
                    '<option '+selected+' value="'+value+'" class="fas fa-align-right">'+options[value]+'</option>'
                );
            }

            this.$input.change(this.changeFloat.bind(this));

            return this.$input;
    }


    changeFloat(event)
    {

        var float = event.target.value;

        this.formatContainer(float);

        var jsonAttributes = this.blot.getElement().attr('data-attributes');
        var attributes = JSON.parse(jsonAttributes);
        attributes.float = float;
        this.blot.getElement().attr('data-attributes', JSON.stringify(attributes));
    }





}

