<?php

namespace ED\FrontEndBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('EDFrontEndBundle:Default:index.html.twig', array('name' => $name));
    }
}
