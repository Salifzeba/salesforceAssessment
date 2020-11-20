
const createProduct = (id,name,color,size,price,image,category)=>{
    const html = document.createElement('div');
     html.className = `featured-product-item All ${category}`;
 
 html.innerHTML=`
        <div class="item-image">
            <img src="${image}" alt="" srcset="">
        </div>
        <p class="title">${name}</p>
        <p class="description">${category} </p>
        <p class="color">${color} </p>
        <p class="price">${price}</p>
        <button class="addToCart"onclick="setProductId(${id})">Add to cart</button>
        </div>
 `;

 document.querySelector('.products').appendChild(html);
}

const setProductId = id =>{
    sessionStorage.setItem('itemId', id);
    window.location ='/item-details.html'
    return false;
}

function getItem(){
    let pId = +sessionStorage.getItem('itemId');
    $.ajax('asset.json',{
        dataType:'json',
        contentType:'application/json',
        cache:false
    })
    .done(response=>{
        let items = response.products;
        let output ='';
        $.each(items, (key, value)=>{
            if(value.id === pId){
                output +=`
                <div class="item-image item" >
                <img src="${value.image}" alt="">
            </div>
            <div class="details-box item">
                <h3 id="name">${value.name}</h3>
                <p id="description">${value.description}<p>
                <p id="color">${value.color}</p>
                <p id="price"> ${value.price}</p>
                <input type="hidden" value="${value.id}">
                <button onclick="addToCart()">Add to cart</button>
                <a href="/index.html" id="continue">Continue Shopping</button>
            </div>
                `;
            };
        });
        $('.item-details').html(output);
    })
}

function addToCart(){
    let items = [];
    let image = document.querySelector('.item-image img').src;
    let name = document.querySelector('.details-box #name').textContent;
    let color = document.querySelector('.details-box #color').textContent;
    let price = document.querySelector('.details-box #price').textContent;
    let id = $('input[type="hidden"]').val();

    let item ={
        id:id,
        name:name,
        color:color,
        price:price
    }

    if(typeof(Storage) !== undefined){
        if(JSON.parse(localStorage.getItem('items'))=== null){
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            window.location.reload();
        } else{
            localProd = JSON.parse(localStorage.getItem('items'))||[];
            let count = localProd.length;
            let cart = $('.links #cart').text(`cart(${count})`);
            console.log(cart);
            localProd.map(data=>{
              if(item.id == data.id){
                $('.details-box button').hide();
                $('.details-box #continue').show();
              }else{
                items.push(data);
                return false;
              }
           });
        items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

}

function fetchProducts(){
    fetch('http://127.0.0.1:5500/asset.json')
    .then(response=>response.json())
    .then(data=>{
        let products = data.products;
        for(const product of products){
            createProduct(product.id,product.name,product.color,product.size,product.price,product.image,product.category);
        }
    })
};

fetchProducts();

$(document).ready(function(){

    $('.links>li').click(function(){
        let cat = $(this).text();
        console.log(cat);
        $('.featured-product-item').hide();
        $('.featured-product-item').each(function(){
            if($(this).hasClass(cat)){
                $(this).show();
            }
        })
    
    })
})