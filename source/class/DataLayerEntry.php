<?php

namespace Planck\Extension\ViewComponent;


use Planck\Model\Entity;

class DataLayerEntry implements \JsonSerializable
{

    protected $name;
    protected $id;

    protected $data = [];
    protected $metadata = [];

    public function __construct($name)
    {
        $this->name = $name;
        $this->id = uniqid('entry-', true);
    }

    public function getName()
    {
        return $this->name;
    }


    public function getId()
    {
        return $this->id;
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }


    public function setMetadata($metadata)
    {
        $this->metadata = $metadata;
    }




    public function getMetadata()
    {

        $metadata = $this->getType();
        $metadata['id'] = $this->getId();
        return $metadata;
    }




    public function jsonSerialize()
    {
        return array(
            'data' => $this->getSerializedData(),
            'metadata' => $this->getMetadata()
        );
    }

    public function getData()
    {
        return $this->data;
    }


    public function getSerializedData()
    {

        //=======================================================


        if(is_object($this->data)) {
            if($this->data instanceof Entity) {
                $value = $this->data->toExtendedArray();
            }
            elseif(method_exists($this->data, 'jsonSerialize')) {
                $value = $this->data->jsonSerialize();
            }
            elseif(method_exists($this->data, 'serialize')) {
                $value = $this->data->serialize();
            }
            elseif(method_exists($this->data, 'toArray')) {
                $value = $this->data->toArray();
            }
            else {
                $properties = array();
                foreach ($this->data as $parameter => $value) {
                    $properties[$parameter] = $value;
                }
                $value = $properties;
            }
            return $value;
        }
        else {
            return $this->data;
        }
    }

    protected function getType()
    {
        if(is_object($this->data)) {

            if($this->data instanceof Entity) {
                $serializeMethod = 'toExtendedArray';
            }
            elseif(method_exists($this->data, 'jsonSerialize')) {
                $serializeMethod = 'jsonSerialize';
            }
            elseif(method_exists($this->data, 'serialize')) {
                $serializeMethod = 'serialize';
            }
            elseif(method_exists($this->data, 'toArray')) {
                $serializeMethod = 'toArray';

            }
            else {
                $serializeMethod = 'default';
            }
            $data = array(
                'type' => 'object',
                'className' => get_class($this->data),
                'serializeMethod' => $serializeMethod,
            );
            return $data;
        }
        else {

            if(is_string($this->data)) {
                $type = 'string';
            }
            elseif(is_array($this->data)) {
                $type = 'array';
            }
            elseif(is_int($this->data)) {
                $type = 'int';
            }
            elseif(is_float($this->data)) {
                $type = 'float';
            }
            elseif(is_bool($this->data)) {
                $type = 'bool';
            }
            return $type;
        }
    }


}

