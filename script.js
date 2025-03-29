
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

// categories
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

// range input box function
const priceRange = document.querySelector('.setPriceRange');
const priceRangeInput = document.querySelector('#price-rang-input');
priceRangeInput.addEventListener('input',(e)=>{
    priceRange.innerText = e.target.value;
});



// set products function
const setProducts = (data)=>{
    let products = document.querySelector(".products");
    products.innerHTML = data.map((item)=>{
        return `
             <div class="card" id='${item.id}'>
            <div class="card-img">
              <img src="${item.image}" alt="product-image">
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
            <button class="addToCard-btn">
              <i class="fa-solid fa-cart-shopping"></i> ADD TO CARD</button>
            <button class="buyNow-btn"><i class="fa-solid fa-bolt"></i> BUY NOW</button>
           </div>
          </div>
    `
    }).join(" ")
    
}



const getProducts = async ()=>{
    const response = await fetch(`${baseUrl}?offset=0&limit=6`);
    const data = await response.json();
    console.log();
    setProducts(data.products);
    
}

getProducts()

// Apply button function
// const applyBtn = document.querySelector('.apply-btn');
// applyBtn.addEventListener('click',()=>{
//     if(category.value){
//         getProducts(`/category/${category.value}`)
//     }else{
//         getProducts()
//     }
// })