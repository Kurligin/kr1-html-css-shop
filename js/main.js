const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');
const selectedProductInput = document.getElementById('selected-product');
const closeDialogButton = document.getElementById('close-order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');

if (orderDialog && orderForm) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product;
      successMessage.hidden = true;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  orderDialog.addEventListener('close', () => {
    orderForm.reset();

    Array.from(orderForm.elements).forEach((element) => {
      element.removeAttribute('aria-invalid');
    });
  });
}

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      orderForm.reportValidity();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();

    if (orderDialog) {
      orderDialog.close();
    }

    successMessage.scrollIntoView({ block: 'center' });
  });
}
