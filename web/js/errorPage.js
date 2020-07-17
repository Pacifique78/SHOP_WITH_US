const status = sessionStorage.getItem('status');
const errorMsg = sessionStorage.getItem('errorMessage');
document.getElementById('errorCode').innerText = `Error: ${status}`;
document.getElementById('errExpr').innerText = `${errorMsg}`;