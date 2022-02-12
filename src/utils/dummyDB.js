let users = [
  {
    id: "petermagdy",
    name: "Peter Magdy",
    password: "123456789",
    owner: false,
    itemIds: [],
    cart: [],
  },
  {
    id: "petergeorge",
    name: "Peter George",
    password: "12345678", 
    owner: true,
    itemIds: ["8xf0y6ziyjabvozdd253nf", "8xf0y6ziyjabvozdd253ng"],
    cart: [],
  },
];

let items = {
  "8xf0y6ziyjabvozdd253nf": {
    owner: "petergeorge",
    id: "8xf0y6ziyjabvozdd253nf",
    name: "Iphone 13",
    category: "Electronics",
    price: "18000",
    itemsCount: 6,
    img: "/images/iphone13.png",
  },
  "8xf0y6ziyjabvozdd253ng": {
    owner: "petergeorge",
    id: "8xf0y6ziyjabvozdd253ng",
    name: "Razor Blade 15",
    category: "Electronics",
    price: "35000",
    itemsCount: 6,
    img: "/images/razorblade15.png",
  },
  "8xfd0y6ziyjabvsozdd253nf": {
    owner: "petergeorge",
    id: "8xfd0y6ziyjabvsozdd253nf",
    name: "Iphone 13",
    category: "Electronics",
    price: "18000",
    itemsCount: 6,
    img: "/images/iphone13.png",
  },
  "8xf0yf6zisyjabvozdd253ng": {
    owner: "petergeorge",
    id: "8xf0yf6ziyjabvozdsd253ng",
    name: "Razor Blade 15",
    category: "Electronics",
    price: "35000",
    itemsCount: 6,
    img: "/images/razorblade15.png",
  },
  "8xf0y6zsiyjabvozdd253nf": {
    owner: "petergeorge",
    id: "8xf0y6ziyjabvozsdd253nf",
    name: "Iphone 13",
    category: "Electronics",
    price: "18000",
    itemsCount: 6,
    img: "/images/iphone13.png",
  },
  "8xf0y6zsiyjabvozdd253ng": {
    owner: "petergeorge",
    id: "8xf0y6ziyjabvozdsd253ng",
    name: "Razor Blade 15",
    category: "Electronics",
    price: "35000",
    itemsCount: 6,
    img: "/images/razorblade15.png",
  },
};

function binarySearch(ArrayOfUsers, username) {
  let data = ArrayOfUsers;
  data.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1));
  let l = 0;
  let r = data.length - 1;
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);

    let res = username.localeCompare(data[m].id);

    if (res === 0) return m;

    if (res > 0) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

let FoundChildData={
  img:'imgPath', //could be bitmap whatever
  map:'googleMapsApi',
  address:'address [OPTIONAL]',
  childName:'name of child [OPTIONAL]',
  reporterPhone:'reporter phone [OPTIONAL]',
}

let ReportChildData={
  imgs:[],//the 10 images of child 
  nameOfChild:'name',
  ageOfChild:0,
  lastSeenLocationMap:'googleMapsApi',
  lastSeenLocationAddress:'address',
  clothesDescription:'description of what the child was wearing',
  parentName:'get from cognito',
  parentPhoneNumber:'get from cognito',
}

let FoundItemData={
  uniqueID:'', //cars = nemra, wallets = ID, Electronics = serial number
  itemType:'',//could be [CAR,WALLET,ELECTRONICS]
  map:'googleMapsApi',
  address:'address [OPTIONAL]',
  reporterPhone:'reporter phone [OPTIONAL]',
}

let ReportItemData={
  uniqueID:'', //cars = nemra, wallets = ID, Electronics = serial number
  itemType:'',//could be [CAR,WALLET,ELECTRONICS]
  lastSeenLocationMap:'googleMapsApi',
  lastSeenLocationAddress:'address',
  ItemDescription:'description of what the child was wearing',
  username:'get from cognito',
  userPhoneNumber:'get from cognito',
}

export function _getItems() {
  return new Promise((res, rej) => {
    setTimeout(() => res(items), 50);
  });
}
export function _getCart(username) {
  if (username != null) {
    let index = binarySearch(users, username);
    let totalCostOfCart = 0;
    users[index].cart.forEach((item) => {
      totalCostOfCart += +item.boughtCount * +item.item.price;
    });
    let cart = {
      cart: users[index].cart,
      total: totalCostOfCart,
    };
    return new Promise((res, rej) => {
      setTimeout(() => res(cart), 50);
    });
  } else {
    return new Promise((res, rej) => {
      setTimeout(() => rej("invalid params"), 50);
    });
  }
}
export function _handleCheckOut(username,cart) {

  if (username != null) {
    let index = binarySearch(users, username);
    
    users[index].cart=[];
    let itemsIds = Object.keys(items);
    itemsIds.forEach((id)=>{
      for(let i=0;i<cart.length;i++){
        if(id===cart[i].item.id){
          items[id].itemsCount-=cart[i].boughtCount;
        }
      }
    })
    return new Promise((res, rej) => {
      setTimeout(() => res([]), 50);
    });


  } else {
    return new Promise((res, rej) => {
      setTimeout(() => rej("invalid params"), 50);
    });
  }
}
export function _getItem(id) {
  return new Promise((res, rej) => {
    setTimeout(() => res(items[id]), 50);
  });
}

export function _addItemToCart(username, itemId, count) {
  let index = binarySearch(users, username);
  let cartItem = {
    index: users[index].cart.length,
    item: items[itemId],
    boughtCount: count,
  };
  users[index].cart.push(cartItem);
  return new Promise((res, rej) => {
    setTimeout(() => res(true), 50);
  });
}

export function _signIn(username, password) {
  let userAccount = null;
  let invalidPassword = false;
  let index = binarySearch(users, username);
  if (index !== -1 && users[index].password === password) {
    userAccount = users[index];
  } else if (
    (index !== -1 && users[index].password !== password) ||
    index === -1
  ) {
    invalidPassword = true;
  }
  return new Promise((res, rej) => {
    if (invalidPassword) {
      setTimeout(() => rej("invalid username or password"), 50);
    } else {
      setTimeout(() => res(userAccount), 50);
    }
  });
}

export function _addItem(item) {
  items[item.id] = item;
  let index = binarySearch(users, item.owner);
  users[index].itemIds.push(item.id);
  return new Promise((res, rej) => {
    setTimeout(() => res(true), 50);
  });
}

export function _signUp(username, name, password, owner) {
  let user = null;
  let found = false;
  let index = 0;
  users.forEach((user) => {
    if (user.id === username) {
      found = true;
    }
  });

  if (!found) {
    console.log(username, name, password, owner);
    user = {
      id: username,
      name: name,
      password: password,
      owner: owner,
      itemIds: [],
      cart: [],
    };

    users.push(user);
    index = binarySearch(users, username);
  }

  return new Promise((res, rej) => {
    if (found) setTimeout(() => rej("User already exists", 50));
    else setTimeout(() => res(users[index]), 50);
  });
}
