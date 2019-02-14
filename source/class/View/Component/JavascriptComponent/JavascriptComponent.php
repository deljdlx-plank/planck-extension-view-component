<?php

namespace Planck\Extension\ViewComponent\View\Component;


use Planck\Extension\ViewComponent\DataLayer;
use Planck\View\Component;



class JavascriptComponent extends Component
{


    /**
     * @var Toolbar
     */
    protected $toolbar;
    protected $toolbarEnabled= true;
    protected $dataLayerEnabled = true;


    protected $CSSClasses = [];

    /**
     * @var \Planck\Extension\EntityEditor\View\Component\DataLayer
     */
    protected $dataLayer;


    public function initialize()
    {
        parent::initialize();


        $this->template = __DIR__.'/template.php';

        $this->dataLayer = new DataLayer();
        $this->toolbar = new Toolbar();
        return $this;
    }

    public function setVariable($name, $value)
    {
        parent::setVariable($name, $value);
        $this->dataLayer->setVariable($name, $value);
        return $this;
    }


    public function disableDataLayer()
    {
        $this->dataLayerEnabled = false;
        return $this;
    }




    /**
     * @return DataLayer
     */
    public function getDataLayer()
    {
        return $this->dataLayer;
    }



    public function getComponentJavascriptName()
    {
        return str_replace(
            '\\',
            '.',
            get_class($this)
        );
    }


    /**
     * @return Toolbar
     */
    public function getToolbar()
    {
        return $this->toolbar;
    }



    public function addCSSClass($className)
    {
        $this->CSSClasses[] = $className;
        return $this;
    }

    public function setContent($content)
    {
        $this->setVariable('content', $content);
        return $this;

    }


    public function enableToolbar()
    {
        $this->toolbarEnabled = true;
        return $this;
    }

    public function disableToolbar()
    {
        $this->toolbarEnabled = false;
        return $this;
    }


    public function getStyle()
    {
        return '';
    }


    public function render()
    {

        $this->dom->html(
            $this->obInclude($this->template, array_merge(
                    $this->getVariables(),
                    array(
                        //'saveArticleURL' => $saveArticleURL,
                    )
                )
            )
        );

        return $this->dom->render();
    }


}
