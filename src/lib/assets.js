const contentstack = require("@contentstack/management");

const compare = () => {
  const contentstackClient = contentstack.client();
  const p1 = contentstackClient
    .stack({
      api_key: "bltf59e104b7a95e45e",
      management_token: "cs83e3de5b81233de10e87661d",
    }).asset()
    // .folder()
    .query()
    .find();

  const p2 = contentstackClient
    .stack({
      api_key: "blt29cd0e42badc2f84",
      management_token: "csdd41bfd757cdcd2a08aefb49",
    })
    .asset()
    .query()
    .find();
  // p2.then(c=>console.log(c))
  let a = [];
  Promise.all([p1, p2]).then((values) => {
    const result = values[0].items.map((r) => r.title);
    const result1 = values[1].items.map((r) => r.title);
    // console.log(result);
    // console.log(result1);
    for (let i = 0; i < result.length; i++) {
      if (!result1.includes(result[i])) {
        a.push(result[i]);
      }
    }
    // console.log(a)
    // updateExsistingContentTypes(values);
    if (a.length > 0) {
      createNewAsset(contentstackClient,values[0].items.filter((r) => r.title === a[0]));
    }
  });
  return a;
};

const createNewAsset = (client,newAsset)=>{
    for(let singleAsset of newAsset){
        const asset = {
            // upload: singleAsset.url,
            title: singleAsset.title,
            description: singleAsset.description?singleAsset.description:""
           }
           console.log(asset);
           client.stack({
            api_key: "blt29cd0e42badc2f84",
            management_token: "csdd41bfd757cdcd2a08aefb49",
          }).asset().create(asset)
           .then((asset) => console.log(asset))
    }

}



module.exports = {compare}