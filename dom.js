var dom = {
    /**
     *
     * @param node
     * @param property
     * @param value
     */
    css: function(node, property, value) {
        var css = '';
        var props = property;

        if (typeof property === 'string') {
            (props = {})[property] = value;
        }

        Object.keys(props).forEach(function (key) {
            var value = props[key];

            css += (key) + ': ' + value + ';';

        });

        node.style.cssText += ';' + css;
    },

    /**
     *
     * @param element
     * @returns {number}
     */
    index: function (element) {
        var result = -1;

        if (!element) {
            return result;
        }

        var nodes = element.parentNode.childNodes;
        var nodeChild = [];
        for (var i = 0, len = nodes.length; i < len; i++) {
            var temp = nodes[i];
            if (temp.nodeType === 1) {
                nodeChild.push(temp);
            }
        }
        for (var j = 0, len = nodeChild.length; j < len; j++) {
            var temp = nodeChild[j];
            if (temp === element) {
                result = j;
                break;
            }
        }

        return result;
    },

    _isArray: function (array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    },

    _toArray: function (elements) {
        if (elements.length === 1) {
            return [elements[0]];
        }
        if (!dom._isArray(elements) && !elements.length) {
            return [elements];
        }

        var result = [];

        for (var i = 0, len = elements.length; i < len; i++) {
            result.push(elements[i]);
        }
        return result;
    },

    /**
     *
     * @param elements
     * @param idx
     * @returns {T | * | bigint | number | T | string | T}
     */
    eq: function (elements, idx) {
        var elArray = dom._toArray(elements);

        var result = idx === -1 ? elArray.slice(idx) : elArray.slice(idx, +idx + 1);

        return result[0];
    },
    /**
     *
     * @param elements
     * @returns {number}
     */
    width: function (elements) {
        return dom.offset(elements).width;
    },
    /**
     *
     * @param elements
     * @returns {number}
     */
    height: function (elements) {
        return dom.offset(elements).height;
    },
    /**
     *
     * @param element
     * @returns {Array}
     */
    siblings: function (element) {
        var allChildren = element.parentNode.childNodes;
        var result = [];
        for (var i = 0, len = allChildren.length; i < len; i++) {
            var item = allChildren[i];
            if (item !== element && item.nodeType === 1) {
                result.push(item);
            }
        }
        return result;
    },
    /**
     *
     * @param element
     * @returns {{top: number, left: number, width: number, height: number}}
     */
    offset: function (element) {
        if (!element) {
            return {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
        }
        var obj = element.getBoundingClientRect();
        return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: Math.round(obj.width),
            height: Math.round(obj.height)
        }
    },
    /**
     *
     * @param element
     * @param value
     * @returns {*}
     */
    scrollTop: function (element, value) {
        var hasScrollTop = 'scrollTop' in element;

        if (!value) {
            return hasScrollTop ? element.scrollTop : element.pageYOffset;
        }
        else {
            if (hasScrollTop) {
                element.scrollTop = value;
            }
            else {
                element.scrollTo(element.scrollX, value);
            }
        }

    },
    /**
     *
     * @param element
     * @param className
     */
    toggleClass: function (element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
        else {
            element.classList.add(className);
        }
    },

    /**
     *
     * @param element
     * @param className
     * @returns {*}
     */
    removeClass: function (element, className) {
        var elArray = dom._toArray(element);

        elArray.forEach(function (el) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                //IE doesn't support classList in SVG - also no need for dublication check i.t.m.
                el.setAttribute("class", el.getAttribute("class").replace(new RegExp("(\\s|^)" + className + "(\\s|$)", "g"), "$2").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, ''));
            }
            return el;
        });

        return element;
    },
    /**
     *
     * @param element
     * @param className
     * @returns {*}
     */
    addClass: function (element, className) {
        var elArray = dom._toArray(element);

        elArray.forEach(function (el) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                // IE doesn't support classList in SVG - also no need for dublication check i.t.m.
                el.setAttribute("class", el.getAttribute("class") + " " + className);
            }
            return el;
        });

        return element;
    },

    /**
     *
     * @param element
     */
    toggle: function (element) {
        if (element) {
            var computedStyle = getComputedStyle(element);
            var display = element.style.display || computedStyle.getPropertyValue('display');

            if (display === 'none') {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        }
    },

    /**
     *
     * @param element
     * @returns {CSSStyleDeclaration}
     */
    getStyle: function(element){
        return getComputedStyle(element)
    }
};

export default dom;
