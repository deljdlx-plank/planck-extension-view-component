class BlotToolbar
{
    constructor(container) {

        this.container = container;

        this.blot = this.container.getBlot();


        this.$element = $('<div class="plk-blot-toolbar" style="display: flex" ></div>');
        this.$element.attr('contenteditable', false);

        this.$leftDivision = $('<div style="flex:1"></divstyle>');
        //this.$centerDivision = $('<div style="flex:1"></divstyle>');
        this.$rightDivision = $('<div style="flex:1"></divstyle>');

        this.divisions = {
            left:this.$leftDivision,
            //center: this.$centerDivision,
            right: this.$rightDivision
        };


        this.$element.append(this.$leftDivision);
        //this.$element.append(this.$centerDivision);
        this.$element.append(this.$rightDivision);




        /*
        this.$element.append('<i class="button button-edit far fa-square" style="vertical-align: middle"></i>');
        this.$element.append('<i class="button button-edit fas fa-grip-lines" style="vertical-align: middle"></i>');
        */


        var blockClass ='selected';
        if(this.blot.getValue('display') != 'block') {
            blockClass = '';
        }



        this.$insertPButton = $('<i class="fas fa-angle-double-down button"></i>');
        this.$insertPButton.on('click', function() {
            console.log(
               this.container.getEditor()
            );
        }.bind(this));
        this.$leftDivision.append(this.$insertPButton);



        this.$displayButton = $('<i class="button button-block fas fa-cube '+blockClass+'"></i>');
        this.$leftDivision.append(this.$displayButton);
        this.$displayButton.on('click', this.setDisplay.bind(this));


        this.$resizeButton = $('<i class="button fas fa-ruler-combined"></i>');
        this.$leftDivision.append(this.$resizeButton);
        //this.$resizeButton.on('click', this.setDisplay.bind(this));





        this.$rightDivision.append('<i class="button button-edit fas fa-pen-square"></i>');
        this.$rightDivision.append('<i class="button button-delete fas fa-cog"></i>');
        this.$rightDivision.append('<i class="button button-delete fas fa-trash"></i>');
        this.$rightDivision.css('text-align', 'right');



        this.$element.find('.button-delete').on('click', this.deleteHandler.bind(this));
        this.$element.find('.button-edit').on('click', this.editHandler.bind(this));




    }

    setDisplay()
    {

        console.log(this.blot.getValue('display'));

        if(this.blot.getValue('display') == 'block') {
            this.blot.setValue('display', 'inline-block');
            this.container.getElement().css('display', 'inline-block');
            this.$displayButton.removeClass('selected');
        }
        else {
            this.blot.setValue('display', 'block');
            this.container.getElement().css('display', 'block');
            this.$displayButton.addClass('selected');
        }


    }



    getElement()
    {
        return this.$element;
    }





    deleteHandler(event)
    {
        this.blot.remove();
    }


    editHandler(event) {

        var event = new CustomEvent('plk-blot-edit', {
            bubbles: true,
            detail: {
                blot: this.blot
            }
        });

        var trigger = this.$element.get(0);
        trigger.dispatchEvent(event);


        var overlay = new Planck.Extension.ViewComponent.View.Component.Overlay();


        var blotEditor = new Planck.Extension.ViewComponent.View.FormElement.RichTextInput.BlotEditor(this.blot);
        var form = blotEditor.getForm(function() {
            overlay.destroy();
        });

        overlay.render(document.body);
        overlay.show(form);
    }


    addInput(input, division)
    {
        if(!division) {
            division = 'left';
        }
        this.divisions[division].append(input)
        //this.$element.prepend(input);
    }


    initializeBorderInput()
    {

        this.$element.append(this.$borderSelect);
    }




}