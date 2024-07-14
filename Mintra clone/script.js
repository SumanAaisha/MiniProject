let bagItems;
onLoad();

function onLoad(){
   
 let bagItemsStr=localStorage.getItem('bagItems');
 bagItems=bagItemsStr ?JSON.parse(bagItemsStr):[];

 displayBagIcon();
}


function addToBag(itemId){
bagItems.push(itemId);
localStorage.setItem('bagItems',JSON.stringify(bagItems));
displayBagIcon();
  
 }
function displayBagIcon(){
let bagItemCountElement=document.querySelector(
    '.bag-item-count');
    if(bagItems.length>0){
        bagItemCountElement.style.visibility='visible';
        bagItemCountElement.innerText=bagItems.length;
    }else {
bagItemCountElement.style.visibility='hidden';

    }
    

}



// function displayItemsOnHomePage(){  }
let displayItemsOnHomePage=()=>{
    let itemsContainerElememnt = document.querySelector(".items-container");
// let item = {
// item_image:'images/imagesjss/1.jpg',
// rating:{
//     stars:4.5,
//     noOfReviews:1400,
// },
// company_name:'Carlton London',
// item_name:'Rhodium-plated CZ Floral',
// price:{
// current_price:'Rs 666',
// orginal_price:'Rs 1045',
// discount:'(42% OFF )'
// },
// };
if(!itemsContainerElememnt){

    return
}
let innerHtml=' ';
items.forEach(item =>{

    innerHtml += `

    <div class="item-container">
     <img class="item-img" src="${item.image}" alt="image loding">
        <div class="rating">
        ${item.rating.stars}⭐⭐| ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
     <div class="item-name">${item.item_name} </div>
     <div class="price">
            <span class="current-price">${item.current_price} </span>
            <span class="orginal-price"> ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage} %OFF )</span>
     </div/>
        <button class="btn-add-bag" onclick='addToBag (${item.id})' >Add to Bag</button>
    </div>`


});
itemsContainerElememnt.innerHTML = innerHtml ;
}

displayItemsOnHomePage();



