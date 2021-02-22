const txtPackageName = document.getElementById('package-name');
const formStats = document.getElementById('form-stats');
const btnSubmit = document.getElementById('submit');
const results = document.querySelector('.results');
const monthlyResults = document.getElementById('monthly-results');

function init() {
  txtPackageName.value = '';
  btnSubmit.disabled = txtPackageName.value.trim() === '' ? true : false;
  results.style.display = 'none';
  txtPackageName.focus();
}

init();

txtPackageName.addEventListener('keyup', e => {
    if (e.target.value.trim() === '') {
        btnSubmit.disabled = true;
    } else {
        btnSubmit.disabled = false;
    }
})

formStats.addEventListener('submit', async (e) => {
  e.preventDefault();
  const packageToStudy = txtPackageName.value;
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${packageToStudy}`
    );
    const data = await res.json();
    console.log('data', data);
    if (data.error) {
      monthlyResults.innerHTML = `aucun résultat pour ${packageToStudy}</span>`;
      results.style.display = 'block';
    } else {
      monthlyResults.innerHTML = `le mois dernier <span class="highlight">${packageToStudy}</span> a été installé <span class="highlight">${numberWithSpaces(
        data.downloads
      )}</span> fois`;
      results.style.display = 'block';
    }
  } catch (error) {
    monthlyResults.innerHTML = `Un problème est survenu ${error.message}`;
  }
  setTimeout(() => {
    init();
  }, 4000);
});

// https://stackoverflow.com/questions/16637051/adding-space-between-numbers
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
