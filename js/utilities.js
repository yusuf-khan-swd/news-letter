
const toggler = isLoading => {
  const spinnerContainer = document.getElementById('spinner-container');
  if (isLoading) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    spinnerContainer.classList.remove('d-none');
  }
  else {
    spinnerContainer.classList.add('d-none');
  }
};

const removePreviouslyActiveNewsCategoryStyle = () => {
  const classList = document.getElementsByClassName('active')
  for (let i = 0; i < classList.length + 1; i++) {
    if (classList[i]) {
      classList[i].classList.remove('text-primary');
      classList[i].classList.remove('active');
    }
  }
};