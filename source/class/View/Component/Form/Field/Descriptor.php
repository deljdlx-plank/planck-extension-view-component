<?php

namespace Planck\Extension\ViewComponent\View\Component\Form\Field;


use Phi\HTML\Element;
use Phi\HTML\Element\Input;
use Phi\HTML\Element\Label;
use Phi\HTML\Element\Option;
use Phi\HTML\Element\Select;
use Phi\HTML\Element\Textarea;
use Planck\Exception;

use Planck\Extension\Redactor\View\Component\TagInput;
use Planck\Extension\Redactor\View\Component\TreeInput;
use Planck\View\Component;


class Descriptor
{

    private $type = 'input';
    private $name = '';
    private $label = null;
    private $placeholder = '';
    private $value = '';

    private $options = [];


    public function __construct($name)
    {
        $this->name = $name;
    }


    public function loadByArray($descriptor)
    {

        $identifiedProperties = array(
            'value',
            'name',
            'type',
            'label',
            'options',
            'placeholder',
        );

        foreach ($identifiedProperties as $property) {
            if(array_key_exists($property, $descriptor)) {
                $this->$property = $descriptor[$property];
            }
        }
    }

    public function getElement()
    {
        $element = null;
        switch($this->type)
        {
            case 'tag': {
                $element = $this->getTagElement();
                break;
            }
            case 'tree': {
                $element = $this->getTreeElement();
                break;
            }
            case 'select': {
                $element = $this->getSelectElement();
                break;
            }
            case 'radio': {
                $element = $this->getRadioElement();
                break;
            }
            case 'text': {
                $element = $this->getTexareaElement();
                break;
            }
            default : {
                $element = $this->getInputElement();
            }
        }

        if($element) {
            if($this->label) {


                $label = new Label();
                $label->html($this->label);

                $wrapper = new Element('');
                $wrapper->addChild($label);

                if($element instanceof Component) {
                    $wrapper->addChild($element->getElement());
                }
                elseif($element instanceof Element) {
                    $wrapper->addChild($element);
                }
                else {
                    throw new Exception('Retourned value is not a Phi\HTML\Element nor a Phi\HTML\Component');
                }

                return $wrapper;
            }
            else {
                return $element;
            }

        }
        else {
            return false;
        }
    }

    protected function getTagElement()
    {
        $tagInput = new TagInput();
        $tagInput->setSource($this->options['source']);
        $tagInput->setName($this->name);
        $tagInput->values($this->value);

        return $tagInput;
    }



    protected function getTreeElement()
    {
        $tree = new TreeInput();
        $tree->setSource($this->options['source']);
        $tree->getInput()->setAttribute('value', $this->value);
        $tree->getInput()->setAttribute('name', $this->name);

        return $tree;
        //return $tree->getElement();
    }


    protected function getRadioElement()
    {


        if(!empty($this->options['items'])) {
            $container = new Element('');

            foreach ($this->options['items'] as $value => $caption) {

                $radioContainer = new Element('');

                $radio = new Input();
                $radio->setAttribute('value', $value);
                $radio->setAttribute('name', $this->name);
                $radio->setAttribute('type', 'radio');

                $radioContainer->addChild(
                    $radio
                );
                $radioContainer->addText(
                    $caption
                );



                if($this->options['itemWrapper']) {
                    $radioContainer = call_user_func_array(
                        $this->options['itemWrapper'],
                        array($radioContainer)
                    );
                }

                $container->addChild($radioContainer);
            }
            return $container;

        }


        return false;
    }

    protected function getTexareaElement()
    {
        $element = new Textarea();
        $element->html(htmlspecialchars($this->value));
        $element->setAttribute('name', $this->name);
        $element->setAttribute('placeholder', $this->placeholder);
        return $element;
    }


    protected function getInputElement()
    {
        $element = new Input();
        $element->setAttribute('value', $this->value);
        $element->setAttribute('name', $this->name);
        $element->setAttribute('placeholder', $this->placeholder);
        return $element;
    }


    protected function getSelectElement()
    {
        $element = new Select();
        $element->setAttribute('name', $this->name);
        if(!empty($this->options['items'])) {

            foreach ($this->options['items'] as $value => $caption) {
                $option = new Option();
                $option->html($caption);
                $option->setAttribute('value', $value);
                $element->addOption($option);
            }
            return $element;
        }
    }


}


