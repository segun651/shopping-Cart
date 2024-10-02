


function displayTooltip(){
  tippy('[data-tippy-content]', {
    content: 'Global content',
    
  });
}


 


let ProductArray = ''

let cartArray = []
let wishlistArray = []
let productui = document.querySelector(".productui")
 let navfilter = document.querySelectorAll(".navfilter li")
 let cartcontainer = document.querySelector(".cartcontainer")
let noproductstext = document.querySelector(".noproductstext")
let carttext = document.querySelector(".carttext")
let cartui = document.querySelector(".cartui")
let cartclose = document.querySelector(".cartclose")
let cartopen = document.querySelector(".cartopen")
let overlay = document.querySelector(".overlay")
let totalprice = document.querySelector(".totalprice")
let wishlistcontainer = document.querySelector(".wishlistcontainer")
let wishlistui = document.querySelector(".wishlistui")
 let wishlistclose = document.querySelector(".wishlistclose")
 let wishlisttext = document.querySelector(".wishlisttext")
let itemnumber = document.querySelector(".itemnumber")
let itemnumber2 = document.querySelector(".itemnumber2")
 let checkbtn = document.getElementById("checkbtn")
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
          ProductArray = data
           filter(ProductArray)
            })
           .catch(err => {
           alert(err)
           renderNoProduct()
           } )

           let cartFromLocalStorage = JSON.parse(localStorage.getItem("mycart"))
           let wishlistFromLocalStorage = JSON.parse(localStorage.getItem("mywishlist"))

           if(cartFromLocalStorage){
            cartArray = cartFromLocalStorage
            renderCart()
           }
               if(wishlistFromLocalStorage){
                wishlistArray = wishlistFromLocalStorage
                renderWishlist()
               }

                checkbtn.onclick = () => {
                  let body = document.querySelector("body")
                
                
                }
           cartclose.onclick = ()=> {
     cartui.style.transform = "translateX(100%)"
      overlay.style.visibility = "hidden"
           }
       cartopen.addEventListener("click",openCart)

       function openCart(){
         cartui.style.transform = "translateX(0%)"
           overlay.style.visibility = "visible"
       }
        function openWishlist(){
     wishlistui.style.transform = "translateX(-0%)"
      overlay.style.visibility = "visible"
        }
         wishlistclose.onclick = ()=>{
          wishlistui.style.transform = "translateX(-100%)"
      overlay.style.visibility = "hidden"
         }
          
      function renderNoProduct(){
        noproductstext.innerText =  "No Products Found"

      }
function  displayProducts(filterdata) {
  
    itemnumber.innerText = cartArray.length
    itemnumber2.innerText = wishlistArray.length
  if(filterdata.length == 0){
    renderNoProduct()
   
  }
  else{
    noproductstext.innerHTML = ''
  }
  
  
   carttext.innerText =  (cartArray.length == 0) ? "Your Cart Is Empty" : "Your Cart"
   checkbtn.disabled = (cartArray.length == 0) ? true : false
wishlisttext.innerText = (wishlistArray.length == 0) ? "Your Wishlist Is Empty" : "Your Wishlist"
  let products = ""
 filterdata.map((result,index) => {
    return(
 products+= 
  `
      <div class="product">
                            <div class="productimg">
                              <img src="${result.image}" alt="img">
                            </div>
                            <div class="producttitle">
                              <h4>${result.title}</h4>
                            </div>
                            <div class="productprice">
                              <p> $${result.price}</p>
                            </div>
                            <div class="productdesc">
                            <p>${result.description}</p>
                            </div>
                            <div class="productratings">
                            <p>Ratings: ${result.rating.rate}/5
                            </div>
                            <div class="productbutton">
                              <button class="btn btn-success my-2" onclick="addtoCart(${index},${result.id})"> Add to Cart
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                </svg>
                              </button>
                              <button class="btn btn-secondary" onclick="addtoWishlist(${index},${result.id})"> Add to Wishlist
                               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                      </svg>
                              </button>
                            </div>
                          </div>   
  `
    )
 })
 productui.innerHTML = products 
}



function addtoCart(product,productid){
  
 let findProduct = cartArray.find(p=> p.id == productid)
  if(findProduct){
    alert("Product already in cart.")
  }
  else{
     if(openWishlist){
      wishlistui.style.transform = "translateX(-100%)"
     }
    cartArray.push({...filtereddata[product]})
  renderCart()
  openCart()
  }
   }
    
    function renderCart(){
      itemnumber.innerText = cartArray.length
    carttext.innerText =  (cartArray.length == 0) ? "Your Cart Is Empty" : "Your Cart"
    checkbtn.disabled = (cartArray.length == 0) ? true : false
      let cartitems = ''
      cartArray.map(cartitem => {
      return(
        cartitems += 
        `
                  <div class="cart">
                    <div class="cartimg">
                      <img src=${cartitem.image} alt="img">
                    </div>
                    <div class="cartdetails">
                      <p>${cartitem.title}</p>
                      <p class="cartitemprice">${cartitem.price}</p>
                      <label>Quantity</label>
                      <div class="text-center">
                      <input type="number" class="quantity" value="1" min="1" onchange="updateTotal()">
                      </div>
                      </div>
                      <div class="carttrash"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-x m-2" viewBox="0 0 16 16" data-tippy-content="Remove From Cart" onclick="deleteCartItem(${cartitem.id})">
  <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>            

                    </div>
                  </div>
        
        `
      )
      })
      cartcontainer.innerHTML = cartitems
      console.log(cartcontainer)
      localStorage.setItem("mycart", JSON.stringify(cartArray))
      
      calculateTotal()
      displayTooltip()
    }
        
    
    function deleteCartItem(cartid){
      cartArray = cartArray.filter(cart => cart.id != cartid)
      console.log(cartArray)
      
      renderCart()

    }

     function clearCart(){
      cartArray = []
      renderCart()
     }
       
     function addtoWishlist(wishlist,wishlistid){
      let findwislistProuct = wishlistArray.find((w)=> w.id == wishlistid)
       if(findwislistProuct){
        alert("Product already added to wishlist.")
       }
       else{
        wishlistArray.push({...filtereddata[wishlist]})
        renderWishlist()
        openWishlist()
       }
      }

     function renderWishlist(){
      itemnumber2.innerText = wishlistArray.length
      wishlisttext.innerText = (wishlistArray.length == 0) ? "Your Wishlist Is Empty" : "Your Wishlist"
  let wishlistproduct = ''
      wishlistArray.map((product, index) => {
      return (
    wishlistproduct+= 
    `
      <div class="wishlist my">
                      <div class="wishlistimg">
                        <img src=${product.image} alt="img">
                      </div>
                      <div class="wishlistdetails">
                        <p>${product.title}</p>
                        <p>$${product.price}</p>
                      </div>
                      <div class="wishlisticons">
                      
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" fill="currentColor" class="bi bi-cart-plus mx-2" viewBox="0 0 16 16" data-tippy-content="Add to Cart" onclick="addtoCart(${product.id - 1},${product.id})">
                          <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="currentColor" class="bi bi-heartbreak-fill mx-2" viewBox="0 0 16 16" data-tippy-content="Remove from Wishlist" onclick="deleteFromWishlist(${product.id})">
                          <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77"/>
                        </svg>
                      </div>
                    </div>
    
    `
      )
      })
      wishlistcontainer.innerHTML = wishlistproduct
      localStorage.setItem("mywishlist", JSON.stringify(wishlistArray))
     
     displayTooltip()

     }

  function deleteFromWishlist(wishlistid){
    wishlistArray = wishlistArray.filter((w)=> w.id != wishlistid)
    renderWishlist()
  }
   
  function clearWishlist(){
     wishlistArray = []
     renderWishlist()
  }

function filter(){
      
  let filterinput = document.getElementById("filterinput").value
  
  filtereddata = ProductArray.filter(product => {
                 
      if(filterinput != '') {
       console.log(true)
         if(!product.title.toLowerCase().includes(filterinput.toLowerCase())){
          
             return false
         }
       
      }
       return true

  })

  console.log(filtereddata)
  displayProducts(filtereddata)
 }


  for(i=0; i<navfilter.length; i++){
    console.log(navfilter[i])
    navfilter[i].addEventListener("click", navFilter)
  }
  
 function  navFilter(e) {
  console.log(e.target.innerHTML)
  let navquery = e.target.innerHTML
  filtereddata = ProductArray.filter(product=>{
    if(navquery != "All"){
      if(navquery.toLowerCase() != product.category){
        return false
      }
    }
     return true
  })
   displayProducts(filtereddata)
 }

   function calculateTotal(){
 let totalprice = document.querySelector(".totalprice")
 let quantity = document.querySelectorAll(".quantity")
 let individualprice = document.querySelectorAll(".cartitemprice")
 
 let total = 0
 let roundedtotal = 0
      for(i=0; i<quantity.length; i++){
    if(quantity[i].value != 0){
     total = total + parseInt(quantity[i].value) * parseFloat(individualprice[i].innerHTML.replace("$",""))
     roundedtotal = total.toFixed(2)
    }
      }

      totalprice.innerHTML = `Total:$${roundedtotal}`
      
   }

  function updateTotal(){
    calculateTotal()
  }

function GoBack(){
  location.reload()
  localStorage.removeItem("mycart")
  localStorage.removeItem("mywishlist")
}
 
function closePage(){
  window.close()
  localStorage.removeItem("mycart")
  localStorage.removeItem("mywishlist")
}
