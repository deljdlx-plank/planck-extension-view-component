<?php

namespace Planck\Extension\ViewComponent\View\Element;

use Phi\HTML\Element\Div;
use Phi\HTML\Element\Input;
use Planck\View\Component;

class TreeInput extends Component
{

    /**
     * @var Input
     */
    protected $input;


    /**
     * @var Div
     */
    protected $treeContainer;


    protected $sourceURL;


    public function __construct($tagName = 'div')
    {
        parent::__construct($tagName);

        $this->input = new Input();
        $this->input->setAttribute('type', 'hidden');


        $this->treeContainer = new Div();
        $this->treeContainer->setAttribute('class', 'plk-tree-placeholder');
        //$this->treeContainer->css('font-size', '5em');

        $this->dom->addChild($this->input);
        $this->dom->addChild($this->treeContainer);


        $this->dom->setAttribute('class', 'plk-component plk-tree-input');


        $this->addJavascriptFile('vendor/jstree/dist/jstree.js');
        $this->addCSSFile('vendor/jstree/dist/themes/default/style.css');

        //$assets[] = new JavascriptFile('vendor/jstree/dist/jstree.js');
        //$assets[] = new CSSFile('vendor/jstree/dist/themes/default/style.css');
        //$this->addJavascriptFile('./alert.js');
    }


    public function getInput()
    {
        return $this->input;
    }


    public function setSource($source)
    {
        $this->sourceURL = $source;
        $this->dom->setAttribute('data-source', $this->sourceURL);
        return $this;
    }


}

