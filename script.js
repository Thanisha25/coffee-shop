document.addEventListener("DOMContentLoaded", () => {
  const orderNowBtn = document.getElementById('order-now-btn');
  const modal = document.getElementById('order-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const checkoutBtn = document.getElementById('checkout-btn');
  const totalPriceElement = document.getElementById('total-price');
  const orderItemsElement = document.getElementById('order-items');

  let cart = [];

  // Function to add item to cart with quantity and update total
  const addToCart = (itemName, itemPrice, quantity) => {
    for (let i = 0; i < quantity; i++) {
      cart.push({ name: itemName, price: itemPrice });
    }
    updateOrderSummary();
  };

  // Function to update the order summary
  const updateOrderSummary = () => {
    orderItemsElement.innerHTML = ''; // Clear previous order items
    let total = 0;

    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `${item.name} - $${item.price}`;
      orderItemsElement.appendChild(itemElement);
      total += item.price;
    });

    totalPriceElement.textContent = total.toFixed(2);
  };

  // Event listener to open the modal when the "Order Now" button is clicked
  orderNowBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    modal.style.display = 'flex'; // Show the modal
  });

  // Event listener to close the modal when the close button is clicked
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';  // Hide the modal
  });

  // Event listener for checkout button
  checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      alert(`Your order has been placed! Total: $${totalPriceElement.textContent}`);
      cart = []; // Clear cart after checkout
      updateOrderSummary(); // Reset order summary
      modal.style.display = 'none'; // Close the modal after checkout
    } else {
      alert("Your cart is empty. Please add items to your order.");
    }
  });

  // Add items to the cart when the "Add to Cart" button is clicked
  document.querySelectorAll('.menu-item').forEach(item => {
    const addToCartBtn = item.querySelector('.add-to-cart-btn');
    const quantityInput = item.querySelector('.quantity');
    const itemName = item.querySelector('h2').textContent;
    const itemPrice = parseFloat(item.querySelector('p').textContent.replace('$', ''));

    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value);
      addToCart(itemName, itemPrice, quantity); // Add the item to the cart with the selected quantity
    });
  });
});
