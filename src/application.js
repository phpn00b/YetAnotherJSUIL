'use strict';
class App {
	#componentRegistry = []
	#needyComponents = [];
	#namedComponents = [];
	constructor() {
	}
	/**
	 * Used to add your component to the registry
	 * @param {Component} component
	 */
	registerComponent(component) {
		this.#componentRegistry[component.id] = component;
		if (this.#namedComponents[component.name] == undefined)
			this.#namedComponents[component.name] = [];
		this.#namedComponents[component.name].push(component);
	}
	/**
	 *
	 * @param {string} id the internal id of a component
	 * @param {string} method name of the method to invoke. this should be a method defined on the component
	 * @param {HTMLElement} element the visual element that was interacted with
	 * @param  {...any} args
	 */
	invoke(id, method, element, ...args) {
		if (this.#componentRegistry[id] && this.#componentRegistry[id][method]) {
			this.#componentRegistry[id][method](element, ...args);
		} else {
			console.log('Component or method not found');
		}
	}
	hostRender(component, tag) {
		if (tag == undefined)
			tag = 'div';
		return `<${tag} id="${component.id}">${component.render()}</${tag}>`;
	}
	/**
	 * This is used to redraw a given component on the page
	 * @param {Component} component
	 */
	updateNode(component, propertyTrigger, eventName) {
		//	console.log(this.hostRender(component));
		if (this.#componentRegistry[component.id] && document.getElementById(component.id)) {
			document.getElementById(component.id).outerHTML = component.render();
		}
	}
}
var application = new App();