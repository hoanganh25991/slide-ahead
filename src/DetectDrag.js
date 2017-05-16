export default class DetectDrag {
	
	constructor({element}){
		this.element = element;
		this.alreadyMove = 0;
	}
	
	static on({element}){
		let d = new DetectDrag({element});
		
		d.bindEvent()
	}

	bindEvent(){
		let self = this;
		let {element} = this;

		element.addEventListener('mousedown',  (e) => this.mousedown(e))
		element.addEventListener('mousemove',  (e) => this.mousemove(e))
		element.addEventListener('mouseup',    (e) => this.mouseup(e))
		element.addEventListener('mouseleave',    (e) => this.mouseleave(e))
	}

	mousedown(e){
		console.log('start check');
		let time = new Date().getTime()
		let screenX = e.screenX

		let startTrack = new Track({time, screenX})

		Object.assign(this, {startTrack})
	}

	mousemove(e){
		if(this.startTrack){
			console.log('should alreadyMove?');
			let time = new Date().getTime()
			let screenX = e.screenX

			let curTrack = new Track({time, screenX})
			Object.assign(this, {curTrack})

			let {isDrag, howFar} = this.detectDrag()

			if(isDrag){
				console.log(howFar)
				this.updateMove(howFar)
				let {element} = this
				element.dispatchEvent(new CustomEvent('_hoiDrag', {detail: {howFar}, bubbles: false}))
			}
		}
	}

	mouseup(e){
		console.log('end check');
		let time = new Date().getTime()
		let screenX = e.screenX

		let endTrack = new Track({time, screenX})

		Object.assign(this, {endTrack})

		console.log(this)

		this.clearCheck()

		let {element, alreadyMove} = this

		element.dispatchEvent(new CustomEvent('_hoiRelease', {detail: {alreadyMove}, bubbles: false}))

		// alreadyMove = 0;
		//
		// Object.assign(this, {alreadyMove})
	}

	mouseleave(){
		this.clearCheck()

		let {element, alreadyMove} = this

		element.dispatchEvent(new CustomEvent('_hoiRelease', {detail: {alreadyMove}, bubbles: false}))

		// alreadyMove = 0;
		//
		// Object.assign(this, {alreadyMove})
	}

	detectDrag(){
		let {startTrack, curTrack} = this;

		let diffInTime = curTrack.diffInTime(startTrack)
		let howFar     = curTrack.howFar(startTrack)

		// Only consider as consistent drag
		// Afer 200 miliseconds
		if(diffInTime > 50){
			this.updateStartTrack()
			return {isDrag: true, howFar}
		}

		return {isDrag: false, howFar};
	}

	updateStartTrack(){
		let {curTrack} = this;
		// Reset startTrack as curTrack
		let startTrack = Object.assign({}, curTrack)
		Object.assign(this, {startTrack})
	}

	updateMove(howFar){
		let {alreadyMove: curMove} = this;
		let alreadyMove = curMove + howFar;

		Object.assign(this, {alreadyMove})
	}

	clearCheck(){
		let startTrack = null;
		let curTrack   = null;
		let endTrack   = null;
		//let alreadyMove= 0;
		Object.assign(this, {startTrack, curTrack, endTrack})
	}
}

class Track {
	constructor({time, screenX}){
		Object.assign(this, {time, screenX})
	}

	diffInTime(otherTrack){
		return Math.abs(this.time - otherTrack.time)
	}

	howFar(otherTrack){
		return this.screenX - otherTrack.screenX
	}
}