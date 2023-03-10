const gridMap = document.querySelector('.grid-map');
const grids = document.querySelector('.grid-map').childNodes;
const sizeSlider = document.querySelector('.size-slider');
const sliderText = document.querySelector('.slider-text');
const btnClear = document.querySelector('.btn-clear');
const btnPencil = document.querySelector('.btn-pencil');
const btnEraser = document.querySelector('.btn-eraser');
const btnToggleGrid = document.querySelector('.btn-toggle-grid');

let numOfRows = 16;
let numOfCols = 16;
let isDragOn = false;
let isGridOn = false;
let whichTool;

sizeSlider.oninput = changeGridMapSize;
btnClear.onclick = clearGridMap;
btnPencil.onclick = () => useTool("pencil");
btnEraser.onclick = () => useTool("eraser");
btnToggleGrid.onclick = toggleGridLines;

createGridMap(numOfRows, numOfCols);
sizeSlider.dispatchEvent(new Event('input'));
useTool("pencil");


function createGridMap(rows, cols) {
    gridMap.style.setProperty('--grid-rows', rows);
    gridMap.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < (rows * cols); i++) {
        let grid = document.createElement("div");

        grid.addEventListener('mousedown', () => isDragOn = true);
        grid.addEventListener('mousemove', (e) => {
            if (isDragOn && whichTool === "pencil") e.target.classList.add('colored-grid-item');
            else if (isDragOn && whichTool === "eraser") e.target.classList.remove('colored-grid-item');
        });
        grid.addEventListener('mouseup', () => isDragOn = false);
        gridMap.appendChild(grid).className = "grid-item";
    };
    gridMap.addEventListener('mouseleave', () => isDragOn = false);
}

function removeGridMap() {
    gridMap.innerHTML = "";
    isGridOn = !isGridOn;
}

function clearGridMap() {
    removeGridMap();
    createGridMap(numOfRows, numOfCols);
    toggleGridLines();
}

function changeGridMapSize() {
    sliderText.textContent = `${this.value} x ${this.value}`;
    numOfRows = this.value;
    numOfCols = this.value;
    clearGridMap();

    let value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.background = 'linear-gradient(to right, #333333 0%, #333333 ' + value + '%, #fff ' + value + '%, white 100%)';
}

function useTool(tool) {
    whichTool = tool;
    if (whichTool === "pencil") {
        btnEraser.classList.remove('activated');
        btnPencil.classList.add('activated');
    } else if (whichTool === "eraser") {
        btnPencil.classList.remove('activated');
        btnEraser.classList.add('activated');
    }
}

function toggleGridLines() {
    for (let i = 0; i < grids.length; i++) {
        if (!isGridOn) grids[i].setAttribute('style', 'border: 0.5px solid black;');
        else grids[i].removeAttribute('style');
    }
    isGridOn = !isGridOn;
}
