import Model from './model';
import View from './view';
import Controller from './controller';
import Template from './template';
import '../styles/index.scss';

/**
 * @description Prevent variables from leaking into the global scope
 * by encapsulating them in an IIFE
 */
(function() {
    const template = new Template();
    const model = new Model();
    const view = new View(template);
    const controller = new Controller(model, view);
    
    window.onload = controller.setupView;
})()
