const url = 'http://localhost:4500';
const placeAnOrder = async (
  productName,
  description,
  quantity,
  location,
  street,
  locationDesc
) =>
  await fetch(`${url}/orders`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      productName,
      description,
      quantity,
      location,
      street,
      locationDesc,
    }),
  });
[...document.getElementsByTagName('input')].forEach((input) => {
  input.addEventListener('click', () => {
    [...document.getElementsByClassName('fields')].forEach((field) => {
      // eslint-disable-next-line no-param-reassign
      field.style.display = 'none';
    });
  });
});
document.getElementById('place-order').addEventListener('click', async (e) => {
  e.preventDefault();
  [...document.getElementsByClassName('fields')].forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.style.display = 'none';
  });
  document.getElementById('error').style.display = 'none';
  const productName = document.getElementById('inputSuccess').value;
  const description = document.getElementById('description').value;
  const quantity = document.getElementById('quantity').value;
  const locationDesc = document.getElementById('locationDesc').value;
  const location = document.getElementById('location').value;
  const street = document.getElementById('street').value;
  const response = await placeAnOrder(
    productName,
    description,
    quantity,
    location,
    street,
    locationDesc
  );
  const json = await response.json();
  if (json.error) {
    if (json.status === 400) {
      const errorDiv = document.getElementById(`${json.path}-div`);
      errorDiv.innerHTML = json.error;
      errorDiv.style.display = 'inline';
      errorDiv.style.color = '#d84930';
    } else {
      sessionStorage.setItem('errorMessage', json.error);
      sessionStorage.setItem('status', json.status);
      window.location.href = '../html/error.html';
    }
  } else {
    window.location.href = '../html/dashboard2.html';
  }
});
