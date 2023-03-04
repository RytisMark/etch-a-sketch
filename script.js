const gridMap = document.querySelector('.grid-map');
const sizeSlider = document.querySelector('.size-slider');
const sliderText = document.querySelector('.slider-text');
const btnClear = document.querySelector('.btn-clear');
let numOfRows = 16;
let numOfCols = 16;
let isDragOn;


sizeSlider.oninput = function() {
    sliderText.textContent = `${this.value} x ${this.value}`;
    numOfRows = this.value;
    numOfCols = this.value;
    
    removeGridMap();
    createGridMap(numOfRows, numOfCols);
}

btnClear.addEventListener('click', () => {
    removeGridMap();
    createGridMap(numOfRows, numOfCols);
});

createGridMap(numOfRows, numOfCols);

function createGridMap(rows, cols) {
    gridMap.style.setProperty('--grid-rows', rows);
    gridMap.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
        let grid = document.createElement("div");
        grid.addEventListener('mousedown', () => isDragOn = true);
        grid.addEventListener('mousemove', (e) => {
        if (isDragOn) {
            e.target.classList.add('colored-grid-item');
        }
      });
      grid.addEventListener('mouseup', () => isDragOn = false);

      gridMap.appendChild(grid).className = "grid-item";
    };
    gridMap.addEventListener('mouseleave', () => isDragOn = false);
}

function removeGridMap() {
    while (gridMap.firstChild) {
        gridMap.removeChild(gridMap.firstChild);
    }
}
