'use strict';
function generateGuid() {
	var result, i, j;
	result = '';
	for (j = 0; j < 32; j++) {
		if (j == 8 || j == 12 || j == 16 || j == 20)
			result = result + '-';
		i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
		result = result + i;
	}
	return result;
}

/**
 * This is the root of how we handle elements
 */
class Component {
	id = generateGuid();
	name = '';
	/**
	 * @type {BaseHTMLComponent[]} decendents
	 */

	constructor(name) {
		this.name = name;
		application.registerComponent(this);
	}
	/**
	 * Draw the element on the screen
	 * @returns {string} the html to put on the page
	 */
	render() {

		try {
			return `<div id="${this.id}" onclick="${this.getInvoker('onClick')}">${this.renderDecendents()}</div>`;
		} finally {
			onPostRender();
		}
	}

	/**
	 * Used to quickly get the invoker for a method that can be called on a component
	 * @param {string} name the name of the method to invoke
	 * @returns {string} the invoker string
	 */
	getInvoker(name) {
		return `application.invoke('${this.id}', '${name}',this)`;
	}
	/**
	 * This is a quick method to tell the component that it needs to be redrawn
	 */
	invalidate() {
		application.updateNode(this);
	}
}
class ContextAwareComponent extends Component {
	#dataContext;
	#dataContextPath;
	#parentComponent;
	constructor() {
		super('');
	}
	set dataContext(value) {
		this.dataContext = value;
	}
	get dataContext() {
		return this.dataContext;
	}
	set dataContextPath(value) {
	}
	get dataContextPath() {
		return this.dataContextPath;
	}
	set parentComponent(value) {
		this.#parentComponent = value;
	}
	get parentComponent() {
		return this.#parentComponent;
	}
	onDataContextChanged(newContext) {

	}
}

class HTMLComponent extends ContextAwareComponent {
	#tag = 'div';
	#attributes = {
		style: '',
		css: '',
		title: '',
		tabIndex: ''
	};
	constructor(tag, attributes) {
		super();
		this.#tag = tag;
	}

}

class BaseHTMLComponent extends Component {
	#tag;
	#attributes = {};
	#body = '';
	constructor(tag, attributes, body) {
		super('');
		this.#tag = tag;
		this.#attributes = attributes;
	}

	get body() {
		return this.#body;
	}
	set body(value) {
		this.#body = value;
		this.invalidate();
	}
	get tag() {
		return this.#tag;
	}
	set tag(value) {
		this.#tag = value;
		this.invalidate();
	}

	render() {
		return `<${this.tag} id="${this.id}">${this.body}</${this.tag}>`;
	}
}
