const contentstack = require("@contentstack/management");

const compareExtensions = () => {
  const contentstackClient = contentstack.client();
  const sourceStack = contentstackClient
    .stack({
      api_key: "bltf59e104b7a95e45e",
      management_token: "cs83e3de5b81233de10e87661d",
    })
    .extension()
    .query()
    .find();

  const destinationStack = contentstackClient
    .stack({
      api_key: "blt29cd0e42badc2f84",
      management_token: "csdd41bfd757cdcd2a08aefb49",
    })
    .extension()
    .query()
    .find();

  let a = [];
  Promise.all([sourceStack, destinationStack]).then((values) => {
    const result = values[0].items.map((r) => r.title);
    const result1 = values[1].items.map((r) => r.title);

    for (let i = 0; i < result.length; i++) {
      if (!result1.includes(result[i])) {
        a.push(result[i]);
      }
    }
    if (a.length > 0) {
      createMissingExtensions(
        values[0].items.filter((r) => r.title === a[0])
      ).then((extensions) => {
        updateExtensions(contentstackClient, values);
      });
    } else {
      updateExtensions(contentstackClient, values);
    }
  });
};

const createMissingExtensions = (extensions) => {
  console.log(extensions.length);
  const client = contentstack.client();
  for (let i = 0; i < extensions.length; i++) {
    const extension = { ...extensions[i] };
    delete extension["stackHeaders"];
    console.log(extension);
    client
      .stack({
        api_key: "blt29cd0e42badc2f84",
        management_token: "csdd41bfd757cdcd2a08aefb49",
      })
      .extension()
      .create({ extension });
  }
};

const updateExtensions = (client, values) => {
  const extensionUids = values[1].items.map((r) => r.uid);
  for (let uid of extensionUids) {
    console.log(uid);
    let a = values[1].items.find((r) => r.uid === uid);
    let oldData = values[0].items.find((r) => r.title === a.title);
    const client = contentstack.client();
    client
      .stack({
        api_key: "blt29cd0e42badc2f84",
        management_token: "csdd41bfd757cdcd2a08aefb49",
      })
      .extension(uid)
      .fetch()
      .then((extension) => {
        (extension.title = oldData.title),
          (extension.config = oldData.config),
          (extension.data_type = oldData.data_type),
          (extension.multiple = oldData.multiple),
          (extension.srcdoc = oldData.srcdoc);
        return extension.update();
      })
      .then((extension) => console.log(extension));
  }
};

module.exports = {updateExtensions,compareExtensions,createMissingExtensions}