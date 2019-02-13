<?php

namespace Planck\Extension\ViewComponent\Module\RemoteRendering\Router;


use Planck\Exception;
use Planck\Extension\Content\Model\Entity\Article;
use Planck\Routing\Router;

class Api extends Router
{
    public function registerRoutes()
    {


        $this->all('render', '`view-component/remote-rendering/render`', function() {






            $data  = $this->data();

            $componentName = $data['component'];
            $className = str_replace('.', '\\', $componentName);
            if(!class_exists($className)) {
                throw new Exception('Class '.$className.' does not exist');
            }

            $component = new $className;

            if(!empty($data['dataLayer'])) {
                $dataLayer = $data['dataLayer'];
                $component->loadDataFromJSON($dataLayer);
            }


            if(!empty($data['calls'])) {
                foreach ($data['calls'] as $callName => $descriptor) {

                    if($descriptor) {
                        $parameters = $descriptor;
                    }

                    call_user_func_array(array(
                        $component, $callName
                    ), $parameters);
                }
            }




            $output = $component->render();


            $componentManager = $this->application->get('view-component-manager');
            $cssToLoad = [];
            $css = $componentManager->getCSS();
            foreach ($css as $cssItem) {
                $cssToLoad[] = $cssItem->getSource();
            }

            $javascriptToLoad = [];
            $javascripts = $componentManager->getJavascripts();
            foreach ($javascripts as $javascript) {
                $javascriptToLoad[] = $javascript->getSource();
            }


            $data = array(
               'javascripts' => $javascriptToLoad,
                'css' => $cssToLoad,
                'html' => $output
            );

            echo json_encode($data);


        })->json();


    }
}