
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
