
const loadCategories = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  }
  catch (err) {
    console.log(err)
  }
};

const displayCategories = categories => {
  const categoryContainer = document.getElementById('categoryContainer');

  categories.forEach(category => {
    const categoryList = document.createElement('li');
    categoryList.classList.add('nav-item');
    categoryList.innerHTML = `
    <a onclick="loadClickedCategoryNews('${category.category_id}')"
     class="nav-link ${category.category_id}" href="#">${category.category_name}</a>
    `;

    categoryContainer.appendChild(categoryList);
  });
};

const toggler = isLoading => {
  const spinnerContainer = document.getElementById('spinner-container');
  if (isLoading) {
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

const addActiveNewsCategoryStyle = categoryId => {
  const clickCategory = document.getElementsByClassName(`${categoryId}`)[0];
  clickCategory.classList.add('text-primary');
  clickCategory.classList.add('active');
}

const loadClickedCategoryNews = async categoryId => {
  toggler(true);
  removePreviouslyActiveNewsCategoryStyle();
  addActiveNewsCategoryStyle(categoryId);

  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayClickedCategoryNews(data.data);
  }
  catch (err) {
    console.log(err);
  }
};

const displayClickedCategoryNews = categoryItems => {
  console.log(categoryItems.length !== 0 ? categoryItems.length : 'not found')

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

  categoryItems.forEach(categoryItem => {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('col');
    newsDiv.innerHTML = `
    <div class="card mb-3 shadow">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="..." class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a
            natural lead-in to additional content. This content is a
            little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>`;

    newsContainer.appendChild(newsDiv);
  });

  toggler(false);
}

loadCategories();