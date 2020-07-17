const url = 'https://akoonlineshop.herokuapp.com';
const getAllOrdersAPI = async () =>
  await fetch(`${url}/orders`, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const getAllOrders = async () => {
  const response = await getAllOrdersAPI();
  const json = await response.json();
  if (json.error) {
    if (json.status === 404) {
      const containerDiv = document.getElementById('list');
      containerDiv.innerHTML = json.error;
    } else {
      sessionStorage.setItem('errorMessage', json.error);
      sessionStorage.setItem('status', json.status);
      window.location.href = '../html/error.html';
    }
  } else {
    document.getElementById('list').innerHTML = '';
    json.data.results.forEach((result) => {
      document.getElementById('list').innerHTML += `
            <div id="products" class="col-lg-4  col-sm-12 item-entry mb-4 list-group" style="background: white; border-bottom: 2px solid #007bff;">
                              <div class="item  ">
                                  <div class="thumbnail">
                                      <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
                                      <div class="caption" style="display: table;">
                                          <div class="col-12 hot-dog"><p>Items: <i>${result.productname} </i></p></div>
                                          <div class="col-12 hot-dog"><p>State: <i>${result.state} </i></p></div>
                                          <div class="col-12 hot-dog"><p>time: <i>${result.updatedon}</i></p></div>
                                      </div>
                                      <div class="col-xs-12 " style="display: flex;align-items: center; justify-content: center;">
                                        <a class="btn btn-outline-primary orderz" href=""data-toggle="modal" data-target="#exampleModal">edit</a>
                                        <button type="button" id="${result.id}" class="delete btn btn-outline-primary bg-red" data-dismiss="modal">Delete</button>
                                      </div>
                                  </div>
                              </div>
                      </div>`;
    });
  }
};
