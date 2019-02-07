<?php


$content = $this->getContent();

echo '<div class="plk-component plk-container '.implode(' ', $this->CSSClasses).'" data-component-name="'.$this->getComponentJavascriptName().'" style="'.$this->getStyle().'">';
    if($this->dataLayerEnabled) {
        echo $this->renderDataLayer();
    }

    if($this->toolbarEnabled) {
        echo $this->toolbar->render();
    }

    echo '<div class="plk-component-content">';
        echo $content;
    echo '</div>';
echo '</div>';


?>