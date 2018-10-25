function CinnamonRoll(flavor, glaze, quantity) {
  // flavors = ["original", "blackberry", "walnut", "gluten", "pumpkin", "pecan"];
  // glazes = ["None", "Sugar-milk", "Vanilla-milk", "Double-chocolate"];
  this.flavor = flavor;
  this.glaze = glaze;
  this.quantity = quantity;
  this.price = '3.99'; 
  this.totalPrice = ('3.99'*quantity).toString();
  if (this.glaze == 'None') {
    this.image = flavor + ".png";
  } else if (this.glaze == 'Sugar-milk') {
    this.image = flavor + "-sugar.png"; 
  } else if (this.glaze == 'Vanilla-milk') {
    this.image = flavor + '-vanilla.png';
  } else {
    this.image = flavor + '-choco.png';
  };
}

// function Original(glaze, quantity) {
//     this.glaze = glaze;
//     this.quantity = quantity;
//     this.name = "Original";
//     this.type = 'original';
//     this.price = "3.99";
//     }

// function Blackberry(glaze, quantity) {
//     this.glaze = glaze;
//     this.quantity = quantity;
//     this.name = "Blackberry";
//     this.type = 'blackberry';
//     this.price = "3.99";
//     this.image = "blackberry.png";
// }

// function Walnut(glaze, quantity) {
//     this.glaze = glaze;
//     this.quantity = quantity;
//     this.name = "Walnut";
//     this.type = 'walnut';
//     this.price = "3.99";
//     this.image = "walnut.png";
// }

// function Gluten(glaze, quantity) {
//     this.glaze = glaze;
//     this.quantity = quantity;
//     this.name = "Original Gluten-free";
//     this.type = 'gluten';
//     this.price = "3.99";
//     this.image = "gluten-free.png";
// }

// function Pumpkin(glaze, quantity) {
//     this.glaze = glaze;
//     this.quantity = quantity;
//     this.name = "Pumpkin Spice";
//     this.type = 'pumpkin';
//     this.price = "3.99";
//     this.image = "pumpkin.png";
// }

// function Pecan(glaze, quantity) {
//     this.glaze = glaze;
//     this.quantity = quantity;
//     this.name = "Caramel Pecan";
//     this.type = 'pecan';
//     this.price = "3.99";
//     this.image = "pecan.png";
// }

function addToCart(roll) {
  if (localStorage && localStorage.getItem('myCart')) {
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    myCart.push(roll);
    localStorage.setItem('myCart', JSON.stringify(myCart));
  }
  console.log('yes');
  // console.log(myCart);
}

$(document).ready(function() {
  var myCart = [];
  localStorage.setItem('myCart', JSON.stringify(myCart));

  // var glaze = $('input[type=radio][name=glaze]:checked').val();
  // var quantity = $('select[name=quantity] option:checked').val();

  // if (JSON.parse(localStorage.getItem('myCart'),length > 0)) {
  //   $('#cart').attr('src', 'cart-added.png');
  // } 

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
    console.log('yay');
    var flavor = $('.roll').attr('id');
    var glaze = $('input[type=radio][name=glaze]:checked').val();
    var quantity = $('select[name=quantity] option:checked').val();

    var newRoll = new CinnamonRoll(flavor, glaze, quantity);
    console.log(newRoll);
    addToCart(newRoll);
    if (JSON.parse(localStorage.getItem('myCart'),length > 0)) {
      $('#cart').attr('src', 'cart-added.png');
    }
  });
});



