<?php

namespace Planck\Extension\ViewComponent\View\Element;

use Phi\HTML\Element\Div;
use Phi\HTML\Element\Input;
use Phi\HTML\Element\Textarea;
use Planck\View\Component;

class RichTextInput extends Component
{

    /**
     * @var Div
     */
    protected $placeholder;


    /**
     * @var Textarea
     */
    protected $valueContainer;

    protected $value;

    protected $name;


    public function __construct($tagName = 'div')
    {
        parent::__construct($tagName);


        $this->addJavascriptFile('vendor/quill/dist/quill.js', self::RESOURCE_PRIORITY_REQUIRE);
        $this->addCSSFile('vendor/quill/dist/snow.css');


        $this->addJavascriptFile('vendor/jquery-cropper/dist/jquery-cropper.js', self::RESOURCE_PRIORITY_REQUIRE);
        $this->addCSSFile('vendor/jquery-cropper/dist/cropper.css');


        $this->addJavascriptFile('vendor/prism/prism.js', self::RESOURCE_PRIORITY_REQUIRE);
        $this->addCSSFile('vendor/prism/prism.css');






        $this->dom->setAttribute('class', 'plk-component plk-rich-text-input');

        $this->placeholder = new Div();
        $this->placeholder->setAttribute('class', 'plk-rich-text-placeholder');


        $this->valueContainer = new Textarea();
        $this->valueContainer->setAttribute('class', 'plk-rich-text-value-container');

        $this->htmlValueContainer = new Textarea();
        $this->htmlValueContainer->setAttribute('class', 'plk-rich-text-html-value-container');
        $this->dom->addChild($this->htmlValueContainer);


        $this->dom->addChild(
            $this->placeholder
        );

        $this->dom->addChild(
            $this->valueContainer
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

        /*
        $this->placeholder->html(
            $this->getValue()
        );
        */


        $this->valueContainer->html(
            htmlspecialchars($this->getValue())
        );

        $this->dom->setAttribute('data-name', $this->getName());



        return parent::render();

    }







}
