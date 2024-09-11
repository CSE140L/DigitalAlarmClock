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

let digit_to_bit_vector = [0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x67, 0x77, 0x7c, 0x39, 0x5e, 0x79, 0x71]

function setDisplays() {
    if (base10) {
        let currentDisplay = 0;
        for (let i = 0; i < 3; i++) {
            let binary = Module._get_counter_val(i);
            setDisplay(currentDisplay++, digit_to_bit_vector[binary % 10]);
            setDisplay(currentDisplay++, digit_to_bit_vector[Math.floor(binary / 10)], )
        }
    } else {
        for (let i = 5; i >= 0; i--) {
            setDisplay(i, Module._get_seven_segment_output(i));
        }
    }
}

let base10 = false;
function toggleBases() {
    base10 = !base10;
    for (const segment of document.getElementsByClassName("segment")) {
        if (base10) {
            segment.classList.add("segment-green");
        } else {
            segment.classList.remove("segment-green");
        }
    }
    document.getElementById("base-switch").innerText = base10 ? "Base-10" : "Base-16"
    setDisplays();
}

let setup = false;
function toggleSetup() {
    setup = !setup;
    if (setup) {
        Module._enable_setup();
    } else {
        Module._disable_setup();
    }
    document.getElementById("increment-button").disabled = !setup;
    document.getElementById("setup-switch").innerText = setup ? "Exit Setup" : "Enter Setup"
    setDisplays();
}

function increment() {
    for (let i = 0; i < parseInt(document.getElementById("num-increment").value); i++) {
        Module._increment()
    }
    setDisplays();
}

let currentInterval = setInterval(() => {Module._advance_clk();setDisplays();}, 1000);
function updateInterval() {
    const val = document.getElementById("update-interval").value
    if (val > 0) {
        document.getElementById("update-interval").setAttribute("aria-invalid", false);
        clearInterval(currentInterval);
        currentInterval = setInterval(() => {Module._advance_clk();setDisplays();}, parseInt(val));
    } else {
        document.getElementById("update-interval").setAttribute("aria-invalid", true);
    }
}

for (let i = 5; i >= 0; i--) {
    clock_container.appendChild(createDisplay(i));
}

