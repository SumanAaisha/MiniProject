let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displplayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  // let finalPayment=0;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  let finalPayment = totalMRP - totalDiscount + 99;

  //   bagSummaryElement.innerHTML = `          <div class="bag-details-container">
  // <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  // <div class="price-item">
  //   <span class="price-item-tag">Total MRP</span>
  //   <span class="price-item-value">₹ ${totalMRP}</span>
  // </div>
  // <div class="price-item">
  //   <span class="price-item-tag">Discount on MRP</span>
  //   <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
  // </div>
  // <div class="price-item">
  //   <span class="price-item-tag">Convenience Fee</span>
  //   <span class="price-item-value">₹ 99</span>
  // </div>
  // <hr>
  // <div class="price-footer">
  //   <span class="price-item-tag">Total Amount</span>
  //   <span class="price-item-value">₹ ${finalPayment}</span>
  // </div>
  // </div>
  // <button  class="btn-place-order" href="Payment.html">
  // <div class="css-xjhrni">PLACE ORDER</div>
  // </button>
  // `;

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹ ${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹ 99</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹ ${finalPayment}</span>
        </div>
    </div>
    <a class="btn-place-order" href="Payment.html?amount=${finalPayment}">
        <div class="css-xjhrni">PLACE ORDER</div>
    </a>
`;

  // Add this CSS to style the button properly
  const style = document.createElement("style");
  style.innerHTML = `
    .btn-place-order {
        display: block;
        text-align: center;
        padding: 15px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        font-size: 16px;
    }
    .btn-place-order:hover {
        background-color: #0056b3;
    }
    .btn-place-order .css-xjhrni {
        font-weight: bold;
    }
`;
  document.head.appendChild(style);
}

function loadBagItemObjects() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) return items[i];
    }
  });
  console.log(bagItemObjects);
}

function displplayBagItems() {
  let ContainerElememnt = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });
  ContainerElememnt.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displplayBagItems();
  displayBagIcon();
  displayBagSummary();
}

// function removeFromBag(itemId) {
//     bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
//     localStorage.setItem('bagItems', JSON.stringify(bagItems));
//     loadBagItemObjects();
//     displayBagIcon();
//     displayBagItems();
//     displayBagSummary();
//   }
function generateItemHTML(item) {
  return `<div class="bag-item-container">
        <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}">
        </div>
        <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
            <span class="current-price">Rs${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount-percentage">(${item.discount_percentage})</span>
        </div>
        <div class="return-period">
            <span class="return-period-days">${item.return_period}days</span> return available
        </div>
        <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
        </div>
        
        <div class="remove-from-cart" onclick='removeFromBag(${item.id})'>X</div>
        </div>`;
}
