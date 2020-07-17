const url = 'http://localhost:4500';
const getSpecificOrder = async (orderId) =>
  await fetch(`${url}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const patchOrder = async (
  updatedOrderId,
  productName,
  description,
  quantity,
  location,
  street,
  locationDesc
) =>
  await fetch(`${url}/myorders/${updatedOrderId}`, {
    method: 'PATCH',
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
const deleteOrderApi = async (orderId) =>
  await fetch(`${url}/myorders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getMyOrders = async () =>
  await fetch(`${url}/myorders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const lction = document.getElementById('location');
const street = document.getElementById('street');
const locationDesc = document.getElementById('locationDesc');
const productName = document.getElementById('productName');
const quantity = document.getElementById('quantity');
const description = document.getElementById('productDesc');
let updatedOrderId;
const editBtns = document.getElementsByClassName('edit');
const editOrder = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const editBtn of editBtns) {
    editBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = editBtn.getAttribute('data-orderId');
      updatedOrderId = orderId;
      const response = await getSpecificOrder(orderId);
      const json = await response.json();
      lction.value = json.data.location;
      street.value = json.data.street;
      locationDesc.value = json.data.locationdesc;
      productName.value = json.data.productname;
      quantity.value = json.data.quantity;
      description.value = json.data.description;
    });
  }
};
const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', async () => {
  const updatedLocation = lction.value;
  const updatedStreet = street.value;
  const updatedLocationDesc = locationDesc.value;
  const updatedProductName = productName.value;
  const updatedQuantity = quantity.value;
  const updatedDescription = description.value;
  await patchOrder(
    updatedOrderId,
    updatedProductName,
    updatedDescription,
    updatedQuantity,
    updatedLocation,
    updatedStreet,
    updatedLocationDesc
  );
  window.location.reload();
});
const deleteBtns = document.getElementsByClassName('delete');
const deleteOrder = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = deleteBtn.getAttribute('data-orderId');
      const response = await deleteOrderApi(orderId);
      if (response.status === 204) {
        window.location.reload();
      } else {
        sessionStorage.setItem('errorMessage', response.error);
        sessionStorage.setItem('status', response.status);
        window.location.href = '../html/error.html';
      }
    });
  }
};
const displayName = document.getElementById('user');
window.addEventListener('load', async (e) => {
  e.preventDefault();
  const response = await getMyOrders();
  const json = await response.json();
  displayName.innerHTML = json.name || 'User Name';
  if (json.error) {
    if (json.status === 404) {
      const containerDiv = document.getElementById('container');
      containerDiv.innerHTML = json.error;
    } else {
      sessionStorage.setItem('errorMessage', json.error);
      sessionStorage.setItem('status', json.status);
      window.location.href = '../html/error.html';
    }
  } else {
    json.data.map((result) => {
      const list = document.getElementById('list');
      list.innerHTML += `
      <div class="grid-ho list-group" style="background: white; border-bottom: 2px solid #007bff;">
        <div class="item  ">
          <div class="thumbnail">
            <img class="group list-group-image" src="../img/bg-img/spii.png" alt="${
              result.id
            }" />
              <div class="caption" style="display: table;">
                <div class="col-12 hot-dog"><p>Items: <i>${
                  result.productname
                } </i></p></div>
                <div class="col-12 hot-dog"><p>time: <i>${
                  result.updatedon
                }</i></p></div>
                ${
                  result.state === 'pending'
                    ? `<div class="col-12 hot-dog"><p>State: <i>${
                        result.numberofbids
                      } bids have been made. </i></p></div>
              </div>
              ${
                +result.numberofbids === 0
                  ? `<div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
              <a class="edit btn btn-outline-primary orderz" style"min-width:82px;" data-orderId="${result.id}" href=""data-toggle="modal" data-target="#exampleModal">edit</a>
              <button type="button" data-orderId="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal">Delete</button>
            </div>`
                  : `<button type="button" data-orderId="${result.id}" class="bids btn btn-outline-primary bg-success" data-dismiss="modal">View Bids</button>`
              }`
                    : `<div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
            </div>`
                }
            
          </div>
        </div>
      </div>`;
      return list;
    });
    deleteOrder();
    editOrder();
  }
});
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('Authorization');
  window.location.href = '../html/login.html';
});
