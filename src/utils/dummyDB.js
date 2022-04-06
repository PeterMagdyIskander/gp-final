let parentData = {
  name: "abadeer",
  username: "abadeer@hotmail.com",
  password: "abadir_2000",
  reportedChildrenID: ["asd123", "qwe456"],
};

// //USER data
// let FoundChildData={
//   img:'imgPath', //could be bitmap whatever
//   map:'googleMapsApi',
//   address:'address [OPTIONAL]',
//   childName:'name of child [OPTIONAL]',
//   reporterPhone:'reporter phone [OPTIONAL]',
// }

//PARENT data
let ReportChildData = [
  {
    id: "asd123",
    imgs: [
      "/assets/lost1.png",
      "/assets/lost2.jpg",
      "/assets/lost1.png",
      "/assets/lost2.jpg",
      "/assets/lost1.png",
      "/assets/lost2.jpg",
      "/assets/lost1.png",
      "/assets/lost2.jpg",
      "/assets/lost1.png",
      "/assets/lost2.jpg",
    ], //the 10 images of child
    nameOfChild: "petermagdy",
    ageOfChild: 22,
    lastSeenLocationMap: "googleMapsApi",
    lastSeenLocationAddress: "12GenintElHagar",
    clothesDescription: "shortwfanilawcap",
    parentName: "abadeer",
    parentPhoneNumber: "01271277073",
    status: true,
  },
  {
    id: "qwe456",
    imgs: ["/assets/lost1.png", "/assets/lost2.jpg"], //the 10 images of child
    nameOfChild: "petermagdy",
    ageOfChild: 22,
    lastSeenLocationMap: "googleMapsApi",
    lastSeenLocationAddress: "12GenintElHagar",
    clothesDescription: "shortwfanilawcap",
    parentName: "abadeer",
    parentPhoneNumber: "01271277073",
    status: false,
  },
];
// //USER data
// let FoundItemData={
//   uniqueID:'', //cars = nemra, wallets = ID, Electronics = serial number
//   itemType:'',//could be [CAR,WALLET,ELECTRONICS]
//   map:'googleMapsApi',
//   address:'address [OPTIONAL]',
//   reporterPhone:'reporter phone [OPTIONAL]',
// }
// //PARENT data
// let ReportItemData={
//   uniqueID:'', //cars = nemra, wallets = ID, Electronics = serial number
//   itemType:'',//could be [CAR,WALLET,ELECTRONICS]
//   lastSeenLocationMap:'googleMapsApi',
//   lastSeenLocationAddress:'address',
//   ItemDescription:'description of what the child was wearing',
//   username:'get from cognito',
//   userPhoneNumber:'get from cognito',
// }

export function _getParent() {
  return new Promise((res, rej) => {
    setTimeout(() => res(parentData), 50);
  });
}

export function _getReportedChildById(id) {
  let children = [];
  for (let i = 0; i < id.length; i++) {
    for (let j = 0; j < ReportChildData.length; j++) {
      if (ReportChildData[j].id === id[i]) {
        children.push(ReportChildData[j]);
      }
    }
  }

  return new Promise((res, rej) => {
    setTimeout(() => res(children), 50);
  });
}
