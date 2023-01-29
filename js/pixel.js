const balanceQty = document.querySelector("#balance-qty");
const canvas = document.querySelector("#pixelWindow");
const ctx = canvas.getContext("2d");
const colors = {
    "color-1": "rgb(255, 255, 255)",
    "color-2": "rgb(228, 228, 228)",
    "color-3": "rgb(136, 136, 136)",
    "color-4": "rgb(34, 34, 34)",
    "color-5": "rgb(255, 167, 209)",
    "color-6": "rgb(229, 0, 0)",
    "color-7": "rgb(229, 149, 0)",
    "color-8": "rgb(160, 106, 66)",
    "color-9": "rgb(229, 217, 0)",
    "color-10": "rgb(148, 224, 68)",
    "color-11": "rgb(2, 190, 1)",
    "color-12": "rgb(0, 211, 221)",
    "color-13": "rgb(0, 131, 199)",
    "color-14": "rgb(0, 0, 234)",
    "color-15": "rgb(207, 110, 228)",
    "color-16": "rgb(130, 0, 128)",
};
let selected = colors["color-4"];
let pixelStorage = [];
let balance = 100;

const ws = new WebSocket('ws://server.pixelhour.art');
// const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function () {
    console.log('Connected!');
};

ws.onmessage = function (msg) {
    let content = JSON.parse(msg.data);
};

window.onload = () => {
    for (pixel of pixelStorage) {
        drawData(pixel);
    }

    balanceQty.innerText = balance;
};

function subBalance() {
    if (balance) {
        balance -= 1;
    }

    balanceQty.innerText = balance;
}

function draw(event) {
    if (balance) {
        const pos = localization(event);
        let data = {
            ...pos,
            color: selected || colors["color-4"]
        };

        drawData(data);
        pixelStorage.push(data);
    } else {
        console.log("Without balance!");
    }
}

function drawData(data) {
    if (balance) {
        ctx.fillStyle = data.color;
        ctx.fillRect(data.x, data.y, 1, 1);

        subBalance();
    }
}

function selectColor(elm) {
    let classElm = elm.className;
    let match = classElm.match(/color\-[0-9]+/);

    selected = colors[match[0]] ?? null;

    const btnSelected = document.querySelector("#color-selected button");
    btnSelected.className = `btn-color ${match[0]}`;
}

function localization(event) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    
    return {
        x,
        y
    }
}

// canvas.addEventListener("mousemove", (event) => console.log(localization(event)));
canvas.addEventListener("click", (event) => draw(event));