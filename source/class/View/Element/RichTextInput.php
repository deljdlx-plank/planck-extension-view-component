<?php

namespace Planck\Extension\ViewComponent\View\Element;

use Phi\HTML\Element\Div;
use Phi\HTML\Element\Input;
use Planck\View\Component;

class RichTextInput extends Component
{

    /**
     * @var Div
     */
    protected $placeholder;

    protected $value;

    protected $name;


    public function __construct($tagName = 'div')
    {
        parent::__construct($tagName);


        $this->addJavascriptFile('vendor/quill/dist/quill.js');
        $this->addCSSFile('vendor/quill/dist/snow.css');


        $this->addJavascriptFile('vendor/QuillPlanck/initialize.js');

        $this->addJavascriptFile('vendor/QuillPlanck/Blot/Edition/Rich.js');
        $this->addJavascriptFile('vendor/QuillPlanck/Blot/Edition/Code.js');
        $this->addJavascriptFile('vendor/QuillPlanck/Blot/Edition/Image.js');

        $this->addJavascriptFile('vendor/QuillPlanck/Blot/Display/Code.js');


        $this->addCSSFile('vendor/QuillPlanck/blot.css');






        $this->dom->setAttribute('class', 'plk-component plk-rich-text-input');

        $this->placeholder = new Div();
        $this->placeholder->setAttribute('class', 'plk-rich-text-placeholder');

        $this->dom->addChild(
            $this->placeholder
        );
    }


    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    public function getName()
    {
        return $this->name;
    }


    public function setValue($value)
    {
        $this->value = $value;
        return $this;
    }

    public function getValue()
    {
        return $this->value;
    }


    public function render()
    {
        $this->placeholder->html(
            $this->getValue()
        );

        $this->dom->setAttribute('data-name', $this->getName());



        return parent::render();

    }







}
