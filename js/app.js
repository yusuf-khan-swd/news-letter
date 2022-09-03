
const loadClickedCategoryNews = async (categoryId, categoryName) => {
  toggler(true);
  removePreviouslyActiveNewsCategoryStyle();
  addActiveNewsCategoryStyle(categoryId);

  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayClickedCategoryNews(data.data, categoryName);
  }
  catch (err) {
    console.log(err);
  }
};

const displayClickedCategoryNews = (categoryItems, categoryName) => {
  const totalFoundMessage = `${categoryItems.length !== 0 ? categoryItems.length + ' news found' : ' no news found'}`;
  const totalNewsFound = document.getElementById('total-news-found');
  totalNewsFound.innerText = `${totalFoundMessage} in ${categoryName} category`;

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

  categoryItems
    .sort((a, b) => a.total_view - b.total_view)
    .reverse()
    .forEach(categoryItem => {
      const { total_view, title, thumbnail_url, details, author, rating } = categoryItem;
      const { name, img, published_date } = author;
      const { number } = rating;
      const shortDetails = details.split(' ').slice(0, 40).join(' ') + '...';

      const newsDiv = document.createElement('div');
      newsDiv.classList.add('col');
      newsDiv.innerHTML = `
    <div class="card mb-3 shadow p-3">
    <div class="row g-0">
      <div class="col-md-3">
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">${title ? title : 'not found'}</h5>
          <p class="card-text text-muted">${shortDetails}</p>
          <div class="d-flex justify-content-between">
            <div class="card-text d-flex">
              <img class="rounded-circle" src="${img ? img : 'not available'}" style="width:40px; height:40px" alt="">
              <div class="ms-3">
                <p class="mb-0">${name ? name : 'not found'}</p>
                <p class="text-muted">${published_date ? published_date : 'not found'}</p>
              </div>
            </div>
            <div><i class="fa-solid fa-eye me-3"></i> ${total_view ? total_view : 'not found'}</div>
            <div>${number}</div>
            <div onclick="loadNewsDetails('${categoryItem._id}')"><i class="fa-solid fa-arrow-right btn"
             data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

      newsContainer.appendChild(newsDiv);
    });

  toggler(false);
};

const loadNewsDetails = async itemId => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${itemId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  }
  catch (err) {
    console.log(err);
  }
}

const displayNewsDetails = newsItem => {
  const { total_view, title, thumbnail_url, details, author, rating } = newsItem;
  const { name, img, published_date } = author;

  const newsDetailsBody = document.getElementById('news-details-body');
  newsDetailsBody.innerHTML = `
  <div class="card mb-3 p-3">
    <div class="row g-0">
      <div class="col-12 text-center">
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-12">
        <div class="card-body">
          <h5 class="card-title">${title ? title : 'not found'}</h5>
          <p class="card-text text-muted">${details}</p>
          <div class="d-flex justify-content-between">
            <div class="card-text d-flex">
              <img class="rounded-circle" src="${img ? img : 'not available'}" style="width:40px; height:40px" alt="">
              <div class="ms-3">
                <p class="mb-0">${name ? name : 'not found'}</p>
                <p class="text-muted">${published_date ? published_date : 'not found'}</p>
              </div>
            </div>
            <div><i class="fa-solid fa-eye me-3"></i> ${total_view ? total_view : 'not found'}</div>
        </div>
      </div>
    </div>
  </div>`;
}

loadCategories();