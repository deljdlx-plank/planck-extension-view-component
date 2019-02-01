<?php

namespace Planck\Extension\ViewComponent\View\Component\Form;



use Planck\Extension\ViewComponent\View\Component\Form\Field\Descriptor;
use Planck\View\Component;


class Field extends Component
{

    /**
     * @var Descriptor
     */
    private $descriptor;
    private $name;


    public function __construct($name)
    {
        parent::__construct();

        $this->name = $name;
    }


    public function loadDescriptor(array $options)
    {

        $descriptor = new Descriptor($this->name());
        $descriptor->loadByArray($options);
        $this->descriptor = $descriptor;
    }


    public function name($name = null)
    {
        if($name === null) {
            return $this->name;
        }
        else {
            $this->name = $name;
            return $this;
        }
    }


    public function getElement()
    {

        return $this->descriptor->getElement();
    }

    public function render()
    {
        return $this->descriptor->getElement()->render();
    }


}
