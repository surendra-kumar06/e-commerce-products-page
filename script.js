
// Header section--------------------

const btnForOpenSearchbox = document.querySelector('.open-searchbar');
const btnForCloseSearchbox = document.querySelector('.close-searchbar');
const searchBar = document.querySelector('.search-bar');
const sliderOpenBtn = document.querySelector('.menu-icon');
const navSlider = document.querySelector('.nav-slider-container');

btnForOpenSearchbox.addEventListener('click',()=>{
    searchBar.style.display = 'flex'
})
btnForCloseSearchbox.addEventListener('click',()=>{
    searchBar.style.display = 'none'  
})
sliderOpenBtn.addEventListener('click',()=>{
    navSlider.style.transform = "translateX(0)";
    navSlider.style.transition = 'all 0.3s ease';
})
navSlider.addEventListener('click',()=>{
    navSlider.style.transform = "translateX(-100%)";
})


// Product display section ----------------
const baseUrl = "https://fakestoreapi.in/api/products";

// get categories
const category = document.querySelector('#category');
( async ()=>{
    const res = await fetch(`${baseUrl}/category`);
    const data = await res.json();
    
    category.innerHTML = category.innerHTML + data.categories.map((item)=>{
        return `
         <option value="${item}">${item}</option>
        `
    }).join(' ');
})();

// set range of input box function
const priceRange = document.querySelector('.setPriceRange');
const priceRangeInput = document.querySelector('#price-rang-input');
priceRangeInput.addEventListener('input',(e)=>{
    priceRange.innerText = e.target.value;
});

// function for toast
const toast = document.getElementById("toast");
const toastMessage = document.querySelector('.toast-message');
const showToast = (message)=>{
    toastMessage.innerText = message;
    toast.classList.toggle('show');
    setTimeout(()=>{
        toast.classList.toggle('show');
    },2000)
}

// functions for add to cart
let cartItems = 0;
const cartCount = document.querySelector('.cart-count');
const addToCard = ()=>{
    showToast('Item added in cart successfully');
    cartItems += 1;
    cartCount.innerText = cartItems;
}


// set products function
let products = document.querySelector(".products");
const setProducts = (data)=>{
    data.map((item)=>{
        let htmlData =  `
             <div class="card" id='${item.id}'>
            <div class="card-img">
              <img src="${item.image}" loading="lazy" alt="product-image">
            </div>
            <div class="card-details">
              <h3 class="card-title">${item.title.split(' ').length > 5 ? item.title.split(' ').slice(0,5).join(' ')+'...' : item.title}</h3>
              <p class="card-desc">${item.description.split(' ').slice(0,15).join(' ')+'...'}</p>
              <div class="card-price">
                <span>Price - </span>
                <span>₹ <span class="product-price">${Math.round(item.price)}</span></span>
              </div>
            </div>
           <div class="card-btns">
            <button class="addToCard-btn" onclick="addToCard()">
              <i class="fa-solid fa-cart-shopping"></i> ADD TO CARD</button>
            <button class="buyNow-btn"><i class="fa-solid fa-bolt"></i> BUY NOW</button>
           </div>
          </div>
    `
    products.insertAdjacentHTML('beforeend',htmlData)
    });
    
}


let limit = 6;
let page = 1;
let param = '?';
let paginationQuery = `page=${page}&limit=${limit}`;
let query = ()=>{
    return param+paginationQuery;
}
const updateQuery = ()=>{
    paginationQuery = `page=${page}&limit=${limit}`;
}
const getProducts = async ()=>{
    updateQuery();
    const response = await fetch(baseUrl+query());
    const data = await response.json();
    setProducts(data.products);
}
getProducts();

window.addEventListener('scroll',()=>{
    let {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    if(scrollTop + clientHeight+1 >= scrollHeight){
        page += 1;
        getProducts(); 
    }
})


// function for apply Button
const applyBtn = document.querySelector('.apply-btn');
applyBtn.addEventListener('click',()=>{
    if(category.value){
        products.innerHTML = '';
        page=1;
        param = `/category?type=${category.value}&`;
        getProducts();
    }else{
        param='?';
        getProducts();
    }
})

// function for search button
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById('searchInput');
searchBtn.addEventListener('click',()=>{
    if(searchInput.value){
        products.innerHTML = "";
        page =1;
        param = `?search=${searchInput.value}`;
        getProducts();
    }
})


// Back to Top
const backToTopBtn = document.querySelector('.backTopBtn');
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = "flex"; 
    } else {
        backToTopBtn.style.display = "none"; 
    }
};