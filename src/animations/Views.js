import anime from "animejs";

export function animeIn() {
    anime({
        targets: '.component-view',
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeInOutExpo',
        delay: function (el, i, l) {
            return i * 200;
        }
    })
}
