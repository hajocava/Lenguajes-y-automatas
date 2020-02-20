import anime from "animejs";

export function animeIn() {
    anime({
        targets: '#navbar',
        translateY: [-90, 0],
        duration: 800,
        easing: 'easeInOutExpo'
    })

    anime({
        targets: '#navbar a',
        opacity: [0, 1],
        easing: 'easeInOutExpo',
        delay: 200
    })

    anime({
        targets: '#navbar a',
        translateX: [-10, 0],
        opacity: [0, 1],
        easing: 'easeInOutExpo',
        delay: function (el, i, l) {
            return i * 100;
        }
    })
}
