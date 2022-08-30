
var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productDescInput = document.getElementById('productDescInput');
var productsContainer = [];




function fetchData(){
  fetch(`http://localhost:3000/getAllProducts`)
    .then(response => response.json())
    .then(json =>  {
      // console.log(json)
      productsContainer = json.result
      displayProducts();
    }
    );
}

fetchData();

function addProduct() {
  if(productNameInput.value === ''){
    document.getElementById('alertName').style.display = 'block';
  }else if(productPriceInput.value === ''){
    document.getElementById('alertPrice').style.display = 'block';
  }else if(productDescInput.value === ''){
    document.getElementById('alertDes').style.display = 'block';

  }else{
    document.getElementById('alertName').style.display = 'none';
    document.getElementById('alertPrice').style.display = 'none';
    document.getElementById('alertDes').style.display = 'none';

    var product = {
      "name": productNameInput.value,
      "price": productPriceInput.value,
      "description": productDescInput.value
  }
  productsContainer.push(product);//1;
  reqServer("POST",'addProduct',product);
  clearForm();
  fetchData();
  }
  
        
}

function clearForm() {
    
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
  }

function displayProducts() { 
    let cartoona = ``;
      for(let i =0;i<productsContainer.length ;i++)
      {
          cartoona +=`<tr>
          <td>${productsContainer[i].name}</td>
          <td>${productsContainer[i].price}</td>
          <td>${productsContainer[i].description}</td>
          <td> <button onclick="retrive(${i})" class="btn btn-outline-warning">update</button> </td>
          <td> <button onclick="deleteProduct(${productsContainer[i].id})" class="btn btn-outline-danger">delete</button> </td>
      </tr>`
      }
      document.getElementById('tableBody').innerHTML =cartoona;
 }



 function deleteProduct(id){
  let product = {
    id
  }
  reqServer("DELETE",'delete',product);
  fetchData();
 }

let id;
function retrive(idx){
  id = idx;
  productNameInput.value = productsContainer[idx].name;
  productPriceInput.value = productsContainer[idx].price;
  productDescInput.value = productsContainer[idx].description;

document.getElementById('update').style.display = 'block';
document.getElementById('add').style.display = 'none';


}


function updateProduct(){
  var product = {
    "id":productsContainer[id].id,
    "name": productNameInput.value,
    "price": productPriceInput.value,
    "description": productDescInput.value
}

  reqServer("PUT",'update',product);
  fetchData();
  document.getElementById('update').style.display = 'none';
  document.getElementById('add').style.display = 'block';
  clearForm();


}


function reqServer(method, endPoint, data){
  const URL = `http://localhost:3000/${endPoint}`
  // Send a post request
  fetch(URL, {
     method: method,
     body: JSON.stringify(data),
     headers: {
        "Content-type": "application/json; charset=UTF-8"
     }
  }).then(fetchData());

}


function searchProduct(word){
  // console.log(word);
  let cartoona = ``;
  for(let i = 0; i < productsContainer.length; i++){
    if(productsContainer[i].name.toLowerCase().includes(word.toLowerCase())){
      cartoona +=`<tr>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}</td>
      <td>${productsContainer[i].description}</td>
      <td> <button onclick="retrive(${i})" class="btn btn-outline-warning">update</button> </td>
      <td> <button onclick="deleteProduct(${productsContainer[i].id})" class="btn btn-outline-danger">delete</button> </td>
  </tr>`
    }
  }
  document.getElementById('tableBody').innerHTML =cartoona;

}