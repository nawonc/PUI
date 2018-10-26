function CinnamonRoll(flavor, glaze, quantity) {
  // flavors = ["original", "blackberry", "walnut", "gluten", "pumpkin", "pecan"];
  // glazes = ["None", "Sugar-milk", "Vanilla-milk", "Double-chocolate"];
  this.flavor = flavor;
  this.glaze = glaze;
  this.quantity = quantity;
  this.price = '1.99'; 
  this.totalPrice = (this.price * quantity).toString();
  if (this.glaze == 'None') {
    this.image = flavor + ".png";
  } else if (this.glaze == 'Sugar-milk') {
    this.image = flavor + "-sugar.png"; 
  } else if (this.glaze == 'Vanilla-milk') {
    this.image = flavor + '-vanilla.png';
  } else {
    this.image = flavor + '-choco.png';
  };
  if (this.flavor == 'original') {
    this.rollName = "Original";
  } else if (this.flavor == 'blackberry') {
    this.rollName = "Blackberry";
  } else if (this.flavor == 'walnut') {
    this.rollName = "Walnut";
  } else if (this.flavor == 'gluten') {
    this.rollName = "Original (Gluten-free)";
  } else if (this.flavor == 'pumpkin') {
    this.rollName = "Pumpkin Spice";
  } else {
    this.rollName = "Caramel Pecan";
  }
}

function addToCart(roll) {
  if (localStorage && localStorage.getItem('myCart')) {
    // cart exists
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    myCart.push(roll);
    localStorage.setItem('myCart', JSON.stringify(myCart));
  } else {
    // new item is added to cart
    var myCart = [roll];
    localStorage.setItem('myCart', JSON.stringify(myCart));
    console.log('new item added');
  }
  // console.log('yes');
  // console.log(myCart);
}

function displayCartItems() {
  if (localStorage && localStorage.getItem('myCart')) {
    // show cart items
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    $.each(myCart, function (key, value) {
      var roll = value;
      var flavor = roll.flavor;
      var glaze = roll.glaze;
      var quantity = roll.quantity;
      $('#my-cart').append("<tr class='new-item'> \
        <td class='cart-image'> \
          <img src=" + roll.image + "> \
        </td> \
        <td class='cart-item'> \
          <p>" + roll.rollName + "</p> \
        </td> \
        <td class='cart-price'> \
          <p>" + roll.price + "</p> \
        </td> \
        <td class='cart-glaze'> \
          <p>" + roll.glaze + "</p> \
        </td> \
        <td class='cart-quantity'> \
          <p>" + roll.quantity + "</p> \
        </td> \
        <td class='cart-item-total'> \
          <p>" + roll.totalPrice + "</p> \
        </td> \
        <td class='remove'><button type='button'>x</button></td> \
        </tr>")
    });
  }
}

function checkCart() {
  if (localStorage && localStorage.getItem('myCart')) {
    if (localStorage.getItem('myCart') == "[]") {
      $('#my-cart').hide();
      $('#order-summary').hide();
      $('.count-bubble').hide();
    } else {
        // items exist in cart
        var myCart = JSON.parse(localStorage.getItem('myCart'));
        $('.count-bubble').show();
        $('.count-bubble').text(countItems());
        $('#no-items').hide();
        displayCartItems();
      }
  } else {
    // cart has no items (doesnt exist yet)
    $('#my-cart').hide();
    $('.count-bubble').hide();
    $('#order-summary').hide();
  }
}
  
function countItems() {
  if (localStorage && localStorage.getItem('myCart')) {
    if (localStorage.getItem('myCart') == "[]") {
      // no items in cart
      return "0";
    } else {
      // items exist in cart
      var myCart = JSON.parse(localStorage.getItem('myCart'));
      var count = "0";
      $.each(myCart, function (key, value){
        var roll = value;
        var qty = roll.quantity;
        count = +count + +qty;
      });
      console.log(count);
      return count;
    }
  }
}


$(document).ready(function() {

  checkCart();

  $('.remove').click(function() {

    // remove item from myCart in localStorage
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    var currRow = $(this).parent();
    console.log("this row" + currRow);
    var itemRemoved = $("tr").index(currRow);
    console.log("tr index " + itemRemoved);

    myCart.splice(itemRemoved-1, 1);

    localStorage.setItem('myCart', JSON.stringify(myCart));
    console.log(localStorage.getItem('myCart'));

    // remove product listed on cart page
    $(this).parent().remove();
    $('.count-bubble').text(countItems());

    if (localStorage.getItem('myCart') == "[]") {
      $('#my-cart').hide();
      $('#no-items').show();
      $('#order-summary').hide();
      $('.count-bubble').hide();
    }
  });

  $('input[type=radio][name=glaze]').click(function() {
    var glaze = $('input[type=radio][name=glaze]:checked').val();
    $('#glaze-type').text(glaze);
    var flavor = $('img.roll').attr("id");
    if (glaze == 'None') {
      $('.detail-image').attr('src', flavor + ".png");
    } else if (glaze == 'Sugar-milk') {
      $('.detail-image').attr('src', flavor + "-sugar.png"); 
    } else if (glaze == 'Vanilla-milk') {
      $('.detail-image').attr('src', flavor + '-vanilla.png');
    } else {
      $('.detail-image').attr('src', flavor + '-choco.png');
    }
  });

  $('select[name=quantity]').change(function() {
    var quantity = $('select[name=quantity] option:checked').val();
    $('#quantity-number').text(quantity);
  });

  $('#add-to-cart').click(function() {
    var flavor = $('.roll').attr('id');
    var glaze = $('input[type=radio][name=glaze]:checked').val();
    var quantity = $('select[name=quantity] option:checked').val();

    var newRoll = new CinnamonRoll(flavor, glaze, quantity);
    addToCart(newRoll);
    checkCart();
  });
});
