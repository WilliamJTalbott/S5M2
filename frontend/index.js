// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }
  
  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector('.targeted').classList.remove('targeted')
        square.classList.add('targeted')

      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈


    const targetedSquare = document.querySelector('.targeted');
    if (!targetedSquare) return;

    console.log(allSquares)


    const allSquaresArray = Array.from(getAllSquares())
    const currentIndex = allSquaresArray.indexOf(targetedSquare);

    const rowIndex = Math.floor(currentIndex / 5);
    const colIndex = currentIndex % 5;

    let newRowIndex = rowIndex;
    let newColIndex = colIndex;

    switch (evt.key) {
      case keys.up:
        newRowIndex = Math.max(0, rowIndex - 1);
        break;
      case keys.down:
        newRowIndex = Math.min(4, rowIndex + 1);
        break;
      case keys.left:
        newColIndex = Math.max(0, colIndex - 1);
        break;
      case keys.right:
        newColIndex = Math.min(4, colIndex + 1);
        break;
    }

    const newIndex = newRowIndex * 5 + newColIndex;
    const newSquare = allSquaresArray[newIndex];
    
    if (newSquare) {
      targetedSquare.classList.remove('targeted');
      newSquare.classList.add('targeted');
    }

    function endGame(message){

      const pWidget = document.querySelector('.info')
      const pNew = document.createElement('p')
      //Set up text
      pNew.textContent = message

      pWidget.appendChild(pNew)

        // Create the Restart button
  let restartButton = document.createElement('button');
  restartButton.textContent = 'Restart';
  restartButton.style.marginLeft = '10px';


  restartButton.addEventListener('click', function() {
    location.reload();
  });


  let headerH2 = document.querySelector('header h2');
  if (headerH2) {
    headerH2.appendChild(restartButton);
  }
    
    }
  

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈

    if (evt.key === keys.space){

      const mosquitoes = targetedSquare.querySelectorAll('img[data-status="alive"]')
      mosquitoes.forEach(mosquito => mosquito.remove());

    

    // 👉 TASK 5 - End the game 👈


    let mosquitoesExists = document.querySelector('[data-status="alive"]') !== null
    if (!mosquitoesExists) {

      let message = `Extermination completed in ${getTimeElapsed()/1000} seconds!`
      endGame(message)

    }



    }
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
