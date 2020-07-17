const url = 'https://akoonlineshop.herokuapp.com';
const getAllOrders = async () =>
  await fetch(`${url}/orders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getSpecificOrder = async (orderId) =>
  await fetch(`${url}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const makeABid = async (method = 'GET', orderId = null, price = null) => {
  if (method === 'GET') {
    return await fetch(`${url}/price_descriptions`, {
      method: `${method}`,
      headers: {
        Authorization: sessionStorage.getItem('Authorization'),
        Accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
      },
    });
  }
  return await fetch(`${url}/price_descriptions`, {
    method: `${method}`,
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
      price,
    }),
  });
};

const deliverBtns = document.getElementsByClassName('take');
const displayName = document.getElementById('user');
const bidsMade = async () => {
  const response = await makeABid();
  const json = await response.json();
  return json.data.map((order) => ({
    orderId: order.orderid,
    delivererId: order.delivererid,
  }));
};

const deliverBtnClicked = () => {
  for (const deliverBtn of deliverBtns) {
    deliverBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = deliverBtn.getAttribute('data-orderId');
      const response = await getSpecificOrder(orderId);
      const json = await response.json();
      if (json.error) {
        sessionStorage.setItem('errorMessage', json.error);
        sessionStorage.setItem('status', json.status);
        window.location.href = '../html/error.html';
      }
      const {
        id,
        buyername,
        buyerphone,
        productname,
        location,
        locationdesc,
        street,
        quantity,
        description,
        updatedon,
      } = json.data;
      document.getElementById('id').innerHTML = id;
      document.getElementById(
        'productSummary'
      ).innerHTML = `${productname}, ${quantity}, ${description}`;
      document.getElementById(
        'locationSummary'
      ).innerHTML = `${location}, ${locationdesc}, ${street}`;
      document.getElementById('productDate').innerHTML = updatedon;
      document.getElementById(
        'userSummary'
      ).innerHTML = `${buyername}, ${buyerphone}`;
    });
  }
};
window.addEventListener('load', async (e) => {
  e.preventDefault();
  const response = await getAllOrders();
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
    const AllBidsMade = await bidsMade();
    json.data.forEach((result) => {
      document.getElementById('list').innerHTML += `
      <div id="products" class="grid-ho list-group" style="background: white; border-bottom: 2px solid #007bff;">
                        <div class="item  ">
                            <div class="thumbnail">
                                <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
                                <div class="caption" style="display: table;">
                                    <div class="col-12 hot-dog"><p>Items: <i>${
                                      result.productname
                                    } </i></p></div>
                                    <div class="col-12 hot-dog"><p>time: <i>${
                                      result.updatedon
                                    }</i></p></div>
                                    <div class="col-12 hot-dog"><p>State: <i>${
                                      result.state
                                    } </i></p></div>
                                </div>
                                ${
                                  result.state === 'pending'
                                    ? `
                                <div class="col-xs-12 col-md-6" style="display: flex;align-items: center; justify-content: center;">
                                ${
                                  AllBidsMade.some(
                                    (bid) =>
                                      bid['orderId'] === result.id &&
                                      bid['delivererId'] === json.delivererId
                                  )
                                    ? `<a data-orderId="${result.id}" class="btn btn-outline-primary take" href=""data-toggle="modal" data-target="#exampleModal">Change a Bid</a>`
                                    : `<a data-orderId="${result.id}" class="btn btn-outline-primary take" href=""data-toggle="modal" data-target="#exampleModal">Make a Bid</a>`
                                }
                                    
                                </div>`
                                    : ``
                                }
                            </div>
                        </div>
                </div>`;
    });
  }
  deliverBtnClicked();
});

document.getElementById('deliver').addEventListener('click', async (e) => {
  e.preventDefault();
  const orderId = document.getElementById('id').innerHTML;
  const price = Number(document.getElementById('price').value);
  const response = await makeABid('POST', orderId, price);
  const json = await response.json();
  if (json.error) {
    if (json.status === 400) {
      document.getElementById('price-div').innerHTML = json.error;
      document.getElementById('price-div').style.color = 'red';
    } else {
      sessionStorage.setItem('errorMessage', json.error);
      sessionStorage.setItem('status', json.status);
      window.location.href = '../html/error.html';
    }
  } else {
    window.location.reload();
  }
});

document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('Authorization');
  window.location.href = '../html/login.html';
});
