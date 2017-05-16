import DetectDrag from './DetectDrag'
import * as c from './const-name'


export default class SlideAhead {
	constructor({element, direction}){
		Object.assign(this, {element, direction})

		let curTransform = new DOMMatrix(window.getComputedStyle(element).transform);
		let {m41: startX} = curTransform

		Object.assign(this, {startX})

		this.init()
	}

	init(){
		let {element} = this;
		DetectDrag.on({element});
		this.bindEvent()
	}

	bindEvent(){
		let self = this;
		let {element} = this;

		element.addEventListener('_hoiDrag',    (e) => self.hoiDrag(e))
		element.addEventListener('_hoiRelease', (e) => self.hoiRelease(e))
	}

	hoiDrag(e){
		console.log('drag')
		let {howFar} = e.detail

		let {direction} = this;

		let distance = howFar * direction

		this.slide({distance})

	}

	hoiRelease(e){
		console.log('release')
		let {element} = this
		// let {alreadyMove} = e.detail
		let curTransform = new DOMMatrix(window.getComputedStyle(element).transform);

		let {m41: curTranlateX, m42: curTranlateY} = curTransform

		let alreadyMove = (curTranlateX - this.startX) * this.direction

		this.goAheadOrBounceBack({alreadyMove})
	}

	goAheadOrBounceBack({alreadyMove}){
		console.log('alreadyMove', alreadyMove)

		let {element} = this
		let translateX;
		let translateY

		if(alreadyMove >= c.THRESHOLD){
			translateX = this.startX + (c.SCREEN_WIDTH - c.ARROW_SIZE) * this.direction;
			let curTransform = new DOMMatrix(window.getComputedStyle(element).transform);

			let {m41: curTranlateX, m42: curTranlateY} = curTransform
			translateY = curTranlateY


			console.log('go ahead')

		}else{
			console.log('bounce back')
			let {startX} = this
			translateX = startX
			let curTransform = new DOMMatrix(window.getComputedStyle(element).transform);

			let {m41: curTranlateX, m42: curTranlateY} = curTransform
			translateY = curTranlateY
		}

		console.log('startX', this.startX)
		console.log(translateX, translateY)

		element.style.transform = `translate(${translateX}px, ${translateY}px)`
	}

	slide({distance}){
		console.log(distance)
		// how far it current transform
		let {element} = this;
		let curTransform = new DOMMatrix(window.getComputedStyle(element).transform);

		let {m41: curTranlateX, m42: curTranlateY} = curTransform

		let translateX = curTranlateX + distance * this.direction
		let translateY = curTranlateY

		element.style.transform = `translate(${translateX}px, ${translateY}px)`
	}
}