
/**
 * @class
 */
class BasePanelComponent extends BaseHTMLComponent {
	/**
	 * @type {BaseHTMLComponent[]} children
	 */
	#children = [];
	constructor(attributes) {
		super('div', attributes, '');
	}

	get decendents() {
		return this.#children;
	}
	/**
	 *
	 * @param {BaseHTMLComponent} component
	 */
	addChild(component) {
		this.#children.push(component);
		this.invalidate();
	}
	/**
	 *
	 * @param  {...BaseHTMLComponent} components
	 */
	addChildren(...components) {
		this.#children.push(...components);
		this.invalidate();
	}

	removeAllChildren() {
		this.#children = [];
		this.invalidate();
	}

	/**
	 *
	 * @param {BaseHTMLComponent} component
	 */
	removeChild(component) {
		this.#children = this.#children.filter(x => x.id != component.id);
		this.invalidate();
	}

	get body() {
		return this.renderChildren();
	}
	renderChildren() {
		return this.#children.map(x => x.render()).join('');
	}
}