document.querySelector('.mobile-toggle').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('active');
  document.querySelector('.mobile-overlay').classList.toggle('active');
  document.querySelector('header').classList.toggle('active');
});

document.querySelector('.mobile-overlay').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('active');
  document.querySelector('.mobile-overlay').classList.toggle('active');
  document.querySelector('header').classList.toggle('active');
});

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  speed: 500,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 3,
    },
  },
  a11y: {
    enabled: true,
    firstSlideMessage: 'This is the first slide',
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
    paginationBulletMessage: 'Go to slide {{index}}',
  },
});

const heroSection = document.querySelector('.hero');

heroSection.addEventListener('mousemove', e => {
  heroSection.querySelectorAll('.btn').forEach(btn => {
    const speed = btn.getAttribute('data-speed');
    const percent = 300;
    const x = (window.innerWidth - e.pageX * speed) / percent;
    const y = (window.innerHeight - e.pageY * speed) / percent;
    btn.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// shrink header when scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Scroll to section parts

const activeTabOrScrollTo = function (
  tabSection = navHome,
  sectionSelector = 'hero'
) {
  tabSection.addEventListener('click', e => {
    let currentActive = document.querySelector('.nav .active');

    //TODO If currentTarget is Bag tab, open shopping cart
    if (e.currentTarget === navBag)
      tabSection.parentElement.classList.toggle('active');
    // (e.currentTarget !== navBag)
    else {
      currentActive.classList.remove('active');
      e.currentTarget.parentElement.classList.add('active');
    }

    // Scroll to tabSection if it's not navBag tab
    if (tabSection !== navBag) {
      let section = document.getElementById(sectionSelector).offsetTop;
      window.scrollTo({ top: section, behavior: 'smooth' });
    }
  });
};

const navHome = document.getElementById('nav__home');
activeTabOrScrollTo(navHome, 'hero');

const navAbout = document.getElementById('nav__about');
activeTabOrScrollTo(navAbout, 'about');

const navMenu = document.getElementById('nav__menu');
activeTabOrScrollTo(navMenu, 'menu');

const navBag = document.getElementById('nav__bag');
activeTabOrScrollTo(navBag, null);

//Product list

const productList = [
  {
    id: 0,
    image: './assets/cupcake (0).png',
    price: '$5.65',
    name: 'Cranberries cake',
  },
  {
    id: 1,
    image: './assets/cupcake (1).png',
    price: '$5.65',
    name: 'Blueberry cake',
  },
  {
    id: 2,
    image: './assets/cupcake (2).png',
    price: '$5.65',
    name: 'Strawberry cake',
  },
  {
    id: 3,
    image: './assets/cupcake (3).png',
    price: '$5.65',
    name: 'Mulberry cake',
  },
  {
    id: 4,
    image: './assets/cupcake (4).png',
    price: '$5.65',
    name: 'Milk cake',
  },
  {
    id: 5,
    image: './assets/cupcake (5).png',
    price: '$5.65',
    name: 'Caramel cake',
  },
  {
    id: 6,
    image: './assets/cupcake (6).png',
    price: '$5.65',
    name: 'Vanilla cake',
  },
  {
    id: 7,
    image: './assets/cupcake (7).png',
    price: '$5.65',
    name: 'Lavender cake',
  },
  {
    id: 8,
    image: './assets/cupcake (8).png',
    price: '$5.65',
    name: 'Rasberry cake',
  },
  {
    id: 9,
    image: './assets/cupcake (9).png',
    price: '$5.65',
    name: 'Valentine cake',
  },
  {
    id: 10,
    image: './assets/cupcake (10).png',
    price: '$5.65',
    name: 'Snowflake cake',
  },
  {
    id: 11,
    image: './assets/cupcake (11).png',
    price: '$5.65',
    name: 'Christmas cake',
  },
];

// Pagination for Menu Grid

const createProductCard = function (id) {
  const product = productList.find(productItem => {
    return productItem.id === id;
  });
  let productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const productCardImg = document.createElement('div');
  productCardImg.classList.add('product-card__img');

  const img = document.createElement('img');
  img.setAttribute('src', product.image);
  img.setAttribute('alt', product.name);

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-small');
  btn.innerText = 'Add to Bag';
  productCardImg.append(img, btn);

  btn.addEventListener('click', e => {
    console.log(id);

    product.counter ??= 0;
    product.counter++;
    localStorage.setItem(`Item ${id}`, JSON.stringify(productList[id]));
  });

  productCard.append(productCardImg);

  const productCardPrice = document.createElement('div');
  productCardPrice.classList.add('product-card__price');
  productCardPrice.innerText = product.price;
  productCard.append(productCardPrice);

  const productCardName = document.createElement('div');
  productCardName.classList.add('product-card__name');
  productCardName.innerText = product.name;
  productCard.append(productCardName);

  return productCard;
};

const displayList = function (items, wrapper, rowsPerPage, page) {
  wrapper.innerHTML = '';
  page--;

  const pageCount = Math.ceil(items.length / rowsPerPage);
  let start = rowsPerPage * page;
  let end =
    page !== pageCount - 1 ||
    (page === pageCount - 1 && items.length % rowsPerPage === 0)
      ? start + rowsPerPage
      : start + (items.length % rowsPerPage);
  let paginatedItems = items.slice(start, end);

  for (let i = start; i < end; i++) {
    const productCard = createProductCard(i);
    wrapper.append(productCard);
  }
};

const setUpPagination = function (items, wrapper, rowsPerPage) {
  wrapper.innerHTML = '';

  let pageCount = Math.ceil(items.length / rowsPerPage);
  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, items);
    btn.classList.add('btn-page', 'btn');
    wrapper.append(btn);
  }
};

// Pagination Button

const paginationButton = function (page, items) {
  let button = document.createElement('button');
  button.innerText = page;

  if (currentPage === page) button.classList.add('active');

  button.addEventListener('click', () => {
    currentPage = page;
    displayList(items, productGrid, rows, currentPage);

    let currentBtn = document.querySelector('#pagination button.active');
    currentBtn.classList.remove('active');
    button.classList.add('active');
  });
  return button;
};

const productGrid = document.querySelector('.product-grid');
const paginationEl = document.getElementById('pagination');

let currentPage = 1;
// responsive row grid
let rows = window.matchMedia('(min-width: 769px) and (max-width: 1365px)')
  .matches
  ? 3
  : 4;

displayList(productList, productGrid, rows, currentPage);
setUpPagination(productList, paginationEl, rows);

// localStorage for adding items into card

// const addToBag = function () {
//   localStorage.setItem('Product');
// };
