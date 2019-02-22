<?php

namespace Planck\Extension;


use Planck\Application\Application;
use Planck\Application\Extension;
use Planck\Extension\FrontVendor\Package\FontAwesome;
use Planck\Extension\FrontVendor\Package\Planck;

class ViewComponent extends Extension
{


    public function __construct(Application $application)
    {
        parent::__construct($application, 'Planck\Extension\ViewComponent', __DIR__.'/../..');


        $this->addFrontPackage(
            new \Planck\Extension\FrontVendor\Package\Bootstrap()
        );

        $this->addFrontPackage(
            new Planck()
        );


        $this->addFrontPackage(
            new FontAwesome()
        );

    }


}
