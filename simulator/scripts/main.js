// Thanks to the UI provided by https://codepen.io/MinzCode/pen/rNxYYaZ

let clock_container = document.getElementById('clock');

function createDisplay(id) {
    let div = document.createElement('div');
    div.innerHTML = `<svg id="display-${id}" width="130" height="240" viewBox="0 0 260 480">
                    <use id="segment-${id}a" xlink:href="#unit-h" class="segment" x="30" y="0"></use>
                    <use id="segment-${id}b" xlink:href="#unit-v" class="segment" x="220" y="30"></use>
                    <use id="segment-${id}c" xlink:href="#unit-v" class="segment" x="220" y="250"></use>
                    <use id="segment-${id}d" xlink:href="#unit-h" class="segment" x="30" y="440"></use>
                    <use id="segment-${id}e" xlink:href="#unit-v" class="segment" x="0" y="250"></use>
                    <use id="segment-${id}f" xlink:href="#unit-v" class="segment" x="0" y="30"></use>
                    <use id="segment-${id}g" xlink:href="#unit-h" class="segment" x="30" y="220"></use>
                </svg>`

    return div;
}

function setDisplay(id, bit_vector) {
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach((seg, idx) => {
        let segment = document.getElementById(`segment-${id}${seg}`);
        if ((bit_vector & (1 << idx)) !== 0) {
            segment.classList.add("on");
        } else {
            segment.classList.remove("on");
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

setInterval(setDisplays, 1000);