<?php

namespace Planck\Extension\ViewComponent;


use Planck\Model\Entity;

class TreeFormater
{

    /**
     * @param Entity[] $nodes
     * @return array
     */
    public function getTreeFromNodeList($nodes)
    {
        $collection = array();

        foreach ($nodes as $node) {
            $structure = array(
                'id'=> $node->getId(),
                'text' => $node->getValue('name'),
                'icon' => 'folder',
                'state' => array(
                    'opened' => true,
                    'disabled' => false,
                    'selected' => false,
                ),
                //'children' => array(),
                'children' => true,
                'li_attr' => array(),
                'a_attr' => array(),
                'data' => $node->getValues(),
            );
            $children = $this->getTreeFromNodeList($node->getChildren());

            $structure['children'] = $children;
            $collection[] = $structure;
        }

        return $collection;
    }

    public function getNodeFromEntity(Entity $entity)
    {

        return array(
            'id' => $entity->getId(),
            'text' => $entity->getName(),
            'icon' => 'folder',
            'data' => $entity->getValues()

        );
    }



}


