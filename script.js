const gridMap = document.querySelector('.grid-map');
numOfRows = 16;
numOfCols = 16;

function createGridMap(rows, cols) {
    gridMap.style.setProperty('--grid-rows', rows);
    gridMap.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
      let grid = document.createElement("div");

    //   grid.innerText = (i + 1);
      grid.addEventListener('mousemove', (e) => {
        e.target.classList.add('colored-grid');
    });

      gridMap.appendChild(grid).className = "grid-item";
    };
  };
  
  createGridMap(numOfRows, numOfCols);
  