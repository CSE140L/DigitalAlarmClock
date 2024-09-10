// Thanks to the skeleton provided by https://codepen.io/0x04/pen/AEjQwB

let clock_container = document.getElementById('clock-container');

function createDisplay(id) {
    let div = document.createElement('div');
    div.innerHTML = `<div id="display-${id}" class="display-container display-size-12">
        <div id="segment-${id}a" class="segment-x segment-a segment-off"><span class="segment-border"></span></div>
        <div id="segment-${id}b" class="segment-y segment-b segment-off"><span class="segment-border"></span></div>
        <div id="segment-${id}c" class="segment-y segment-c segment-off"><span class="segment-border"></span></div>
        <div id="segment-${id}d" class="segment-x segment-d segment-off"><span class="segment-border"></span></div>
        <div id="segment-${id}e" class="segment-y segment-e segment-off"><span class="segment-border"></span></div>
        <div id="segment-${id}f" class="segment-y segment-f segment-off"><span class="segment-border"></span></div>
        <div id="segment-${id}g" class="segment-x segment-g segment-off"><span class="segment-border"></span></div>
    </div>`

    return div;
}

function setDisplay(id, bit_vector) {
    ['g', 'f', 'e', 'd', 'c', 'b', 'a'].forEach((seg, idx) => {
        let segment = document.getElementById(`segment-${id}${seg}`);
        if ((bit_vector & (1 << idx)) !== 0) {
            segment.classList.replace("segment-off", "segment-on")
        } else {
            segment.classList.replace("segment-on", "segment-off")
        }
    })
}

function setDisplays() {
    Module._advance_clk()
    for (let i = 5; i >= 0; i--) {
        setDisplay(i, Module._get_seven_segment_output(i));
    }
}

for (let i = 5; i >= 0; i--) {
    clock_container.appendChild(createDisplay(i));
}

setInterval(setDisplays, 100);
// setDisplay(0, parseInt('0000001', 2))