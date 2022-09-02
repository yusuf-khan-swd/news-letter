
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

const removePreviouslyActiveNewsCategory = () => {
  const classList = document.getElementsByClassName('active')
  for (let i = 0; i < classList.length + 1; i++) {
    if (classList[i]) {
      classList[i].classList.remove('text-primary');
      classList[i].classList.remove('active');
    }
  }
};



const loadClickedCategoryNews = async categoryId => {
  toggler(true);

  removePreviouslyActiveNewsCategory();
  const clickCategory = document.getElementsByClassName(`${categoryId}`)[0];
  clickCategory.classList.add('text-primary');
  clickCategory.classList.add('active');
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

  categoryItems.forEach(categoryItem => {
    console.log(categoryItem);
  });
}

loadCategories();