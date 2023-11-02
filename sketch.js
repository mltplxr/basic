let oldB, newB;
let levels, old_levels;
let scaleRange, old_scaleRange;
let xb, yb;

let myFont;

function setup() {
  createCanvas(800, 800);
  levels = 10;
  scaleRange = 0.10;
  old_levels = levels;
  old_scaleRange = scaleRange;
  
}

function draw() {
  

  xb = mouseX;
  yb = mouseY;
  levels = round((xb / 800) * 8);
  scaleRange = (mouseY * 10) / (8 * 5);
  scaleRange /= 1000;

  if (old_levels !== levels || old_scaleRange !== scaleRange) {
    background(255);
    let level = 0;
    let n = 2;

    oldB = Array.from(Array(n), () => Array(n));

    oldB[0][0] = new Cell(100, 100);
    oldB[0][1] = new Cell(100, 700);
    oldB[1][0] = new Cell(700, 100);
    oldB[1][1] = new Cell(700, 700);

    while (level < levels) {
      n = 2 * n - 1;
      newB = Array.from(Array(n), () => Array(n));

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i % 2 === 0 && j % 2 === 0) {
            let ii = i / 2;
            let jj = j / 2;
            newB[i][j] = new Cell(oldB[ii][jj].x, oldB[ii][jj].y);
          } else if (i % 2 === 0 && j % 2 === 1) {
            let ii = i / 2;
            let jj = (j - 1) / 2;
            let x =
              (oldB[ii][jj].x + oldB[ii][jj + 1].x) / 2;
            let y =
              (oldB[ii][jj].y + oldB[ii][jj + 1].y) / 2;
            let d = sqrt(
              sq(oldB[ii][jj].x - oldB[ii][jj + 1].x) +
                sq(oldB[ii][jj].y - oldB[ii][jj + 1].y)
            );
            let rng = d * scaleRange;
            let xu = random(-rng, rng);
            let yu = random(-rng, rng);

            newB[i][j] = new Cell(x + xu, y + yu);
          } else if (i % 2 === 1 && j % 2 === 0) {
            let ii = (i - 1) / 2;
            let jj = j / 2;
            let x =
              (oldB[ii][jj].x + oldB[ii + 1][jj].x) / 2;
            let y =
              (oldB[ii][jj].y + oldB[ii + 1][jj].y) / 2;
            let d = sqrt(
              sq(oldB[ii][jj].x - oldB[ii + 1][jj].x) +
                sq(oldB[ii][jj].y - oldB[ii + 1][jj].y)
            );
            let rng = d * scaleRange;
            let xu = random(-rng, rng);
            let yu = random(-rng, rng);
            newB[i][j] = new Cell(x + xu, y + yu);
          } else if (i % 2 === 1 && j % 2 === 1) {
            let ii = (i - 1) / 2;
            let jj = (j - 1) / 2;
            let x =
              (oldB[ii][jj].x + oldB[ii + 1][jj + 1].x) / 2;
            let y =
              (oldB[ii][jj].y + oldB[ii + 1][jj + 1].y) / 2;
            let d = sqrt(
              sq(oldB[ii][jj].x - oldB[ii + 1][jj + 1].x) +
                sq(oldB[ii][jj].y - oldB[ii + 1][jj + 1].y)
            );
            let rng = d * scaleRange * 0.7;
            let xu = random(-rng, rng);
            let yu = random(-rng, rng);
            newB[i][j] = new Cell(x + xu, y + yu);
          }
        }
      }

      level++;
      oldB = newB;
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i < n - 1 && j < n - 1) {
          line(
            oldB[i][j].x,
            oldB[i][j].y,
            oldB[i][j + 1].x,
            oldB[i][j + 1].y
          );
          line(
            oldB[i][j].x,
            oldB[i][j].y,
            oldB[i + 1][j].x,
            oldB[i + 1][j].y
          );
        } else if (i === n - 1 && j < n - 1) {
          line(
            oldB[i][j].x,
            oldB[i][j].y,
            oldB[i][j + 1].x,
            oldB[i][j + 1].y
          );
        } else if (i < n - 1 && j === n - 1) {
          line(
            oldB[i][j].x,
            oldB[i][j].y,
            oldB[i + 1][j].x,
            oldB[i + 1][j].y
          );
        }
      }
    }

    old_levels = levels;
    old_scaleRange = scaleRange;
  }
}

class Cell {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
  }
}



