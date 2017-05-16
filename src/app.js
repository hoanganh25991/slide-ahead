import SlideAhead from './SlideAhead'

let yesDiv = document.querySelector('#yesDiv')
let noDiv  = document.querySelector('#noDiv')

new SlideAhead({element: yesDiv, direction: 1});
new SlideAhead({element: noDiv,  direction: -1});