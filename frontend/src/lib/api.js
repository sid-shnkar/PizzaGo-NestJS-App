const SERVER_ADDRESS='http://localhost:3001';

export async function getAllPizzas() {
  const response = await fetch(`${SERVER_ADDRESS}/pizza/menu-items`);
  const data = await response.json();
  
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch pizzas.');
  }

  return data;
}


export async function getCartItems(Email) {
  const response = await fetch(`${SERVER_ADDRESS}/pizza/show-cart`,{
    method: 'POST',
    body: JSON.stringify({
      email: Email
    }),
    headers: {
      'Content-Type': 'application/json' 
    }
});
  const data = await response.json();
  
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch cart Items.');
  }


  return data;
}


export async function removeItemCart(cartId) {
  const response = await fetch(`${SERVER_ADDRESS}/pizza/delete-cart-items`,{
    method: 'DELETE',
    body: JSON.stringify({
      id: cartId
    }),
    headers: {
      'Content-Type': 'application/json' 
    }
});
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Could not remove item from cart.');
  }


  return null;
}

export async function updateItemCart(updatedItemData) {
  //console.log("Updated quantity in API.js: ",updatedQuantity);
  const response = await fetch(`${SERVER_ADDRESS}/pizza/update-cart`,{
    method: 'PATCH',
    body: JSON.stringify(updatedItemData),
    headers: {
      'Content-Type': 'application/json' 
    }
});
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Could not update cart.');
  }


  return null;
}


export async function getUserProfile(UserId) {
  const response = await fetch(`${SERVER_ADDRESS}/user/findSingleUser`,{
      method: 'POST',
      body: JSON.stringify({
        id: UserId
      }),
      headers: {
        'Content-Type': 'application/json' 
      }
  });


  const data = await response.json();

  if (!response.ok) {
        throw new Error(data.message || 'Could not fetch user details.');
      }

    const userDetails={
       ...data
    };

    return userDetails;

}




export async function getPizzaById(pizzaId) {
  const response = await fetch(`${SERVER_ADDRESS}/pizza/findSinglePizza`,{
    method: 'POST',
    body: JSON.stringify({
      id: pizzaId
    }),
    headers: {
      'Content-Type': 'application/json' 
    }
});

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch pizza.');
  }

  const loadedPizza = {
    ...data
  };

  return loadedPizza;
}





export async function addPizza(pizzaData) {
  const response = await fetch(`${SERVER_ADDRESS}/pizza/addPizza`, {
    method: 'POST',
    body: JSON.stringify(pizzaData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create pizza.');
  }

  return null;
}



export async function addToCart(cartData){
  const response = await fetch(`${SERVER_ADDRESS}/pizza/addTocart`, {
    method: 'POST',
    body: JSON.stringify(cartData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add items to cart.');
  }

  return null;
}


export async function placeOrder(Email){
  const response = await fetch(`${SERVER_ADDRESS}/pizza/place-order`, {
    method: 'POST',
    body: JSON.stringify({
      email: Email
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || 'Could not place order');
  }


  return data;

}

