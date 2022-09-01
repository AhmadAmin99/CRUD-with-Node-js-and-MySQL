
var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productDescInput = document.getElementById('productDescInput');
var productsContainer = [];



function getData(){

  fetch(`http://localhost:3000/getAllProducts`)
    .then(response => response.json())
    .then(json =>  {
      // console.log(json)
      productsContainer = json.result
      displayProducts();
    }
    )
}
getData();

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
      name: productNameInput.value,
      price: productPriceInput.value,
      description: productDescInput.value
  }
  productsContainer.push(product);//1;
  reqServer("POST",'addProduct',product);
  clearForm();
  }
  
        
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

function clearForm() {
    
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
  }




 function deleteProduct(id){
  // alert(id);
  let product = {
    id
  }
  reqServer("DELETE",'delete',product);
 }

let idP;
function retrive(idx){
  idP = productsContainer[idx].id;
  productNameInput.value = productsContainer[idx].name;
  productPriceInput.value = productsContainer[idx].price;
  productDescInput.value = productsContainer[idx].description;

document.getElementById('update').style.display = 'block';
document.getElementById('add').style.display = 'none';


}


function updateProduct(){
  var product = {
    "id":idP,
    "name": productNameInput.value,
    "price": productPriceInput.value,
    "description": productDescInput.value
}
  reqServer("PUT",'update',product);
  document.getElementById('update').style.display = 'none';
  document.getElementById('add').style.display = 'block';
  clearForm();


}


function reqServer(method, endPoint, data){
  // main.js

// POST request using fetch()
fetch(`http://localhost:3000/${endPoint}`, {
	
	// Adding method type
	method: method,
	
	// Adding body or contents to send
	body: JSON.stringify(data),
	
	// Adding headers to the request
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
})

// Converting to JSON
.then(response => response.json())

// Displaying results to console
.then(json => {
  if(json.message == 'success'){
    getData();
  }
});


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


var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 5,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
