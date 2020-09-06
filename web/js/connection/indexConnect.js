const url = 'http://localhost:4500';
const getAllOrdersAPI = async () =>
  await fetch(`${url}/index/1`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
  });
const deliverBtns = document.getElementsByClassName('take');
const deliverOrder = () => {
  for (const deliverbtn of deliverBtns) {
    deliverbtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './login.html';
    });
  }
};
deliverOrder();
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
      <div class="col-lg-4  col-sm-12 item-entry mb-4">
      <div id="" class="grid-ho " style="background: white; border-bottom: 2px solid #007bff;">
        <div class="item  ">
          <div class="thumbnail">
            <img class="group list-group-image" src="../img/bg-img/spii.png" alt="" />
            <div class="caption" style="display: table;">
              <div class="col-12 hot-dog">
                <p>Items: <i>${result.productname} </i></p>
              </div>
              <div class="col-12 hot-dog">
                <p>time: <i>${result.updatedon}</i></p>
              </div>

            </div>
            <div class="col-md-12" style="display: flex;align-items: center; justify-content: center;">
              <button class="btn btn-outline-primary take">Deliver</button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
      deliverOrder();
    });
  }
};

window.addEventListener('load', (e) => {
  e.preventDefault();
  getAllOrders();
  deliverOrder();
});
