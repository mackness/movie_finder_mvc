
/**
 * @param  {HTMLElement} el html element to bind the event to
 * @param  {string} type event type string
 * @param  {function} handler event handler callback
 * @description Thin wrapper around addEventListener
 */
export function on(el, type, handler) {
    el.addEventListener(type, handler);
}

/**
 * @param  {HTMLElement} selector selector string
 * @param  {HTMLElement} scope scope for element lookup
 * @description Thin wrapper around scope.querySelector
 */
export function qs(selector, scope) {
    return (scope || document).querySelector(selector) || {};
}

/**
 * @param  {HTMLElement} selector selector string
 * @param  {HTMLElement} scope scope for element lookup
* @description Thin wrapper around scope.querySelectorAll
 */
export function qsa(selector, scope) {
    return (scope || document).querySelectorAll(selector) || [];
}

/**
 * @param  {string} text string that need to be truncated
 * @param  {HTMLElement} scope scope for element lookup
* @description Limints a string to n characters long
 */
export function truncateText(text, n) {
    if (text.length > n) {
        return `${text.substring(0, n)}...`;
    } else {
        return text;
    }
}

/**
 * @param  {string} name name of search param
 * @return  {string} value of search param
* @description get value of search param by name
 */
export function getSearchParam(name) {
    if (window.location.search.indexOf(name) !== -1) {
        return decodeURIComponent(window.location.search.split('=')[1]);
    } else {
        return null
    }
}