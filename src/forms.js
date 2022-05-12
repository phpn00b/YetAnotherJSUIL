class BaseFormComponent extends Component {
	#settings = {

	}
	constructor(attributes) {
	}
}
class SelectComponent extends BaseHTMLComponent {
	#settings = {
		multiple: false,
		size: 1,
		options: [],
		value: '',
		valuesAreIntegers: true,
		onChange: () => { },
		displayMember: '',
		valueMember: '',
		placeholder: 'Pick a value',
	}
	constructor(options, attributes) {
		super('select', attributes);
		this.#settings = { ...this.#settings, ...options };
	}
	get value() {
		return this.#settings.value;
	}
	set value(value) {
		this.#settings.value = value;
		this.invalidate();
	}
	onChange(element) {
		var newValue = this.#settings.valuesAreIntegers ? parseInt(element.value) : element.value;
		this.#settings.value = newValue;
		this.#settings.onChange(newValue);
	}
	renderOptions() {
		return this.#settings.options.map(x => `<option value="${x[this.#settings.valueMember]}">${x[this.#settings.displayMember]}</option>`).join('');
	}
	render() {
		return `<${this.tag} id="${this.id}" placeholder="${this.#settings.placeholder}" ${(this.#settings.multiple ? 'multiple' : '')} onChange="${this.getInvoker('onChange')}">${this.renderOptions()}</${this.tag}>`;
	}
}