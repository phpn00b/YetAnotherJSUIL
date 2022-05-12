
class WatchedProperty {
	#viewmodel
	constructor(viewmodel, name, value) {
		this.name = name;
		this.value = value;
	}
}
class BaseViewModel {
	#proxy;
	changeHandlers = [];
	constructor() {
		this.#proxy = new Proxy(this, this);
	}
	set(obj, prop, value) {
		console.log(obj, prop, value);
		this.onPropertyChanged(this, prop, this[prop], value)
	}

	observe(callback) {
		this.changeHandlers.push(callback);
	}

	stopObserving(callback) {
		this.changeHandlers = this.changeHandlers.filter(callback);
	}

	onPropertyChanged(viewModel, propertyName, newValue, oldValue) {
		this.changeHandlers.forEach(x => x(viewModel, propertyName, oldValue, newValue));
	}
	getBindingTarget() {
		return this.#proxy;
	}
}

class MyViewModel extends BaseViewModel {
	value1 = '';
	value2 = '';
	constructor() {
		super();
	}
}


var vm = new MyViewModel();
var bindingVm = vm.getBindingTarget();
vm.observe(function (vm, prop, newValue, oldValue) {
	console.log(`${prop} changed from '${oldValue}' to '${newValue}'`);
});

vm.value1 = 'test';