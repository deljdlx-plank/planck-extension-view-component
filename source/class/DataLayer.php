<?php

namespace Planck\Extension\ViewComponent;




use Phi\Traits\Collection;
use Planck\Model\Entity;

class DataLayer implements \JsonSerializable
{

    use Collection {
        Collection::setVariable as collectionSet;
        Collection::setVariables as collectionSetMany;
    }


    /**
     * @var DataLayerEntry[]
     */
    protected $entries = [];


    public function render()
    {
        $buffer = '<script type="application/json+planck-data">';
            $buffer .= json_encode($this->jsonSerialize(), JSON_PRETTY_PRINT);
        $buffer.='</script>';
        return $buffer;
    }

    public function jsonSerialize()
    {

        $data = [];
        foreach ($this->entries as $entry) {
            $data[$entry->getName()] = $entry->jsonSerialize();
        }
        return $data;
    }


    public function setVariables(array &$values, $byReference = false)
    {
        $this->collectionSetMany($values, $byReference);
        foreach ($values as $value) {

        }


    }

    public function setVariable($name, $value)
    {
        $this->collectionSet($name, $value);

        $entry = new DataLayerEntry($name);
        $entry->setData($value);
        $this->addEntry($entry);
        return $this;
    }


    public function addEntry(DataLayerEntry $entry)
    {
        $this->entries[$entry->getId()] = $entry;
        return $this;
    }


    public function serializeValue($value)
    {


        //=======================================================

        if(is_object($value)) {
            $data = array();
            if($value instanceof Entity) {
                $data['data'] = $value->toExtendedArray();
                $serializeMethod = 'toExtendedArray';
            }
            elseif(method_exists($value, 'jsonSerialize')) {
                $data['data'] = $value->jsonSerialize();
                $serializeMethod = 'jsonSerialize';
            }
            elseif(method_exists($value, 'serialize')) {
                $data['data'] = $value->serialize();
                $serializeMethod = 'serialize';
            }
            elseif(method_exists($value, 'toArray')) {
                $data['data'] = $value->toArray();
                $serializeMethod = 'toArray';

            }
            else {
                $properties = array();
                foreach ($value as $parameter => $value) {
                    $properties[$parameter] = $value;
                }
                $data['data'] = $properties;
                $serializeMethod = 'default';
            }
            $data['metadata'] = array(
                'type' => 'object',
               'className' => get_class($value),
                'serializeMethod' => $serializeMethod,
            );
        }
        else {

            if(is_string($value)) {
                $type = 'string';
            }
            elseif(is_array($value)) {
                $type = 'array';
            }
            elseif(is_int($value)) {
                $type = 'int';
            }
            elseif(is_float($value)) {
                $type = 'float';
            }
            elseif(is_bool($value)) {
                $type = 'bool';
            }


            $data = array(
                'data' => $value,
                'metadata' => array(
                    'type' => $type
                )
            );
        }

        return $data;
    }


}