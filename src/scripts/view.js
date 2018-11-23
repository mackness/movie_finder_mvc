import { on, qs } from './utilities';
import throttle from 'lodash.throttle';

export default class View {
    constructor(template) {
        this.template = template;

        this.elements = {
            input: qs('#search-input'),
            grid: qs('#grid')
        };
    }

    /**
     * @param {function}
     * @description bind a throttled onchange handler for the main search input
     */
    bindOnInput(handler) {
        on(this.elements.input, 'input', throttle((event) => handler(event), 300));
    }
}
