if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var numInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < numInput.length; i++) {
        var input = numInput[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCart = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCart.length; i++) {
        var button = addToCart[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    total()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    total()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    total()
}

function addToCartClicked(event) {
    var b = event.target
    var shopItem = b.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var amount = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var img = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, amount, img)
    total()
}

function addItemToCart(title, price, imageSrc) {
    var row = document.createElement('div')
    row.classList.add('cart-row')
    var items = document.getElementsByClassName('cart-items')[0]
    var itemName = items.getElementsByClassName('cart-item-title')
    for (var i = 0; i < itemName.length; i++) {
        if (itemName[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var rowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    row.innerHTML = rowContent
    items.append(row)
    row.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function total() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}