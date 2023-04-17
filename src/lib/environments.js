const contentstack = require("@contentstack/management");

const compare = () => {
  const contentstackClient = contentstack.client();
  const p1 = contentstackClient
    .stack({
      api_key: "bltf59e104b7a95e45e",
      management_token: "cs83e3de5b81233de10e87661d",
    }).environment()
    .query()
    .find();

  const p2 = contentstackClient
    .stack({
      api_key: "blt29cd0e42badc2f84",
      management_token: "csdd41bfd757cdcd2a08aefb49",
    })
    .environment()
    .query()
    .find();
  // p2.then(c=>console.log(c))
  let missingEnvs = [];
  Promise.all([p1, p2]).then((values) => {
    const result = values[0].items.map((r) => r.name);
    const result1 = values[1].items.map((r) => r.name);
    for (let i = 0; i < result.length; i++) {
      if (!result1.includes(result[i])) {
        missingEnvs.push(result[i]);
      }
    }
 
    if (missingEnvs.length > 0) {
      for(let env of missingEnvs){
        console.log(values[0].items.filter((r) => r.name === env));
      createNewEnv(contentstackClient,[...values[0].items.filter((r) => r.name === env)]);
    }}
  });
  return missingEnvs;
};

const createNewEnv = (client,missingEnvs) =>{
  // console.log(missingEnvs[0].name);
  for(let envs of missingEnvs){
  const environment = {
    name : envs.name
  }
  client.stack({
    api_key: "blt29cd0e42badc2f84",
    management_token: "csdd41bfd757cdcd2a08aefb49",
  }).environment().create({ environment }).then((environment) => console.log(environment))
}
}
module.exports = {compare}