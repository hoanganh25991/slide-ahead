export default class SlideAhead {
	constructor({elementSelector, direction}){
		this.element   = document.querySelector(elementSelector)
		this.direction = direction
		this.move      = 0;
		
		this.init()
	}
	
	init(){
		this.bindEventByClassMethod()
	}

	bindEventByClassMethod(){
		let self = this;
		let {element} = this;

		element.addEventListener('drag',  () => self.drag())
		element.addEventListener('click', () => self.click())
	}

	drag(){
		console.log('drag')
	}
	
	click(){
		console.log('click')
		this.slideAhead()
	}

	slideAhead(){
		// how far it current transform
		let self = this;
		let {element} = this;
		let curTransform = new DOMMatrix(window.getComputedStyle(element).transform);

		let {m41: curTranlateX, m42: curTranlateY} = curTransform

		let translateX = curTranlateX + 10
		let translateY = curTranlateY

		element.style.transform = `translate(${translateX}px, ${translateY}px)`
	}
}