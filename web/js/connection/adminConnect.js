const url = 'https://akoonlineshop.herokuapp.com';
const deleteBtns = document.getElementsByClassName('delete');
const deleteOrder = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const orderId = deleteBtn.getAttribute('id');
      const response = await fetch(`${url}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: sessionStorage.getItem('Authorization'),
          Accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
        },
      });
      if (response.status === 204) {
        document.getElementById('orders').click();
      } else {
        window.location.href = '../html/error.html';
      }
    });
  }
};
const letters = document.getElementsByClassName('Tabs-tab');
const displayUserByName = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const letter of letters) {
    letter.addEventListener('click', async (e) => {
      e.preventDefault();
      const start = letter.innerText;
      if (start === 'All') {
        document.getElementById('users').click();
      } else {
        const response = await fetch(`${url}/user/${start}`, {
          method: 'GET',
          headers: {
            Authorization: sessionStorage.getItem('Authorization'),
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
          },
        });
        const json = await response.json();
        if (json.error) {
          if (json.status === 404) {
            document.getElementById('list').innerHTML = json.error;
          }
        } else {
          document.getElementById('list').innerHTML = '';
          json.data.map((result) => {
            const users = document.getElementById('list');
            users.innerHTML += `
          <div class="col-lg-3  col-sm-12 item-entry mb-3">
                      <div class="container">
                        <div class="card">
                          <img src="../img/bg-img/spii.png" alt="">
                          <h1>${result.name}</h1>
                          <h2>${result.isbuyer ? 'Buyer' : 'Deliverer'}</h2>
                          <div class="row">
                            <div class="container">
                                ${result.isbuyer ? '<span class="fa fa-chart-line"></span>' : '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fas fa-star-half-alt"> 4.6</span>'}
                            </div>
                          </div>
                          <div class="row">
                            <div class="container " style="padding-top:6%;">
                              <a class="button btm-btn bg-blue" href="" target="_blank"><span class="fa fa-envelope"></span></a>
                              <a class="button btm-btn2 bg-blue" href="" target="_blank"><span class="fa fa-gear"></span></a>
                            </div>
                          </div>
    
                        </div>
                      </div>
                    </div>`;
            return users;
          });
        }
      }
      deleteOrder();
    });
  }
};
const displayName = document.getElementById('user');
const getAllUsers = async () => {
  const response = await fetch(`${url}/users`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
  const json = await response.json();

  displayName.innerHTML = json.name || 'Admin Name';
  if (json.error) {
    window.location.href = '../html/error.html';
  } else {
    document.getElementById('list').innerHTML = '';
    json.data.results.map((result) => {
      const users = document.getElementById('list');
      users.innerHTML += `
        <div class="col-lg-3  col-sm-12 item-entry mb-3">
                    <div class="container">
                      <div class="card">
                        <img src="../img/bg-img/spii.png" alt="">
                        <h1>${result.name}</h1>
                        <h2>${result.isbuyer ? 'Buyer' : 'Deliverer'}</h2>
                        <div class="row">
                          <div class="container">
                              ${result.isbuyer ? '<span class="fa fa-chart-line"></span>' : '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fas fa-star-half-alt"> 4.6</span>'}
                          </div>
                        </div>
                        <div class="row">
                          <div class="container " style="padding-top:6%;">
                            <a class="button btm-btn bg-blue" href="" target="_blank"><span class="fa fa-envelope"></span></a>
                            <a class="button btm-btn2 bg-blue" href="" target="_blank"><span class="fa fa-gear"></span></a>
                          </div>
                        </div>
  
                      </div>
                    </div>
                  </div>`;
      return users;
    });
    deleteOrder();
    displayUserByName();
  }
};
const getAllOrders = async () => {
  const response = await fetch(`${url}/orders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
  const json = await response.json();
  displayName.innerHTML = json.name || 'Admin Name';
  if (json.error) {
    if (json.status === 404) {
      const containerDiv = document.getElementById('list');
      containerDiv.innerHTML = json.error;
    } else {
      window.location.href = '../html/error.html';
    }
  } else {
    document.getElementById('list').innerHTML = '';
    json.data.results.forEach((result) => {
      document.getElementById('list').innerHTML += `
          <div id="products" class="grid-ho list-group" style="background: white; border-bottom: 2px solid #007bff;">
                            <div class="item  ">
                                <div class="thumbnail">
                                    <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
                                    <div class="caption" style="display: table;">
                                        <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                                        <div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
                                        <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
                                    </div>
                                    <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
                                      <a class="btn btn-outline-primary take" href=""data-toggle="modal" data-target="#exampleModal">edit</a>
                                      <button type="button" id="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal" style="margin-left: 26%; min-width: 100px;">Delete</button>
                                    </div>
                                </div>
                            </div>
                    </div>`;
    });
    deleteOrder();
    displayUserByName();
  }
};
window.addEventListener('load', async (e) => {
  e.preventDefault();
  getAllUsers();
  deleteOrder();
  displayUserByName();
});
document.getElementById('all').addEventListener('click', () => {
  document.getElementById('users').click();
});
document.getElementById('users').addEventListener('click', (e) => {
  e.preventDefault();
  getAllUsers();
});
document.getElementById('orders').addEventListener('click', (e) => {
  e.preventDefault();
  getAllOrders();
});
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('Authorization');
  window.location.href = '../html/login.html';
});
