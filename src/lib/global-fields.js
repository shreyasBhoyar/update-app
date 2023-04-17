const contentstack = require("@contentstack/management");

const compare = () => {
  const contentstackClient = contentstack.client();
  const p1 = contentstackClient
    .stack({
      api_key: "bltf59e104b7a95e45e",
      management_token: "cs83e3de5b81233de10e87661d",
    })
    .globalField()
    .query()
    .find();

  const p2 = contentstackClient
    .stack({
      api_key: "blt29cd0e42badc2f84",
      management_token: "csdd41bfd757cdcd2a08aefb49",
    })
    .globalField()
    .query()
    .find();
  let missingGlobalFields = [];
  Promise.all([p1, p2]).then((values) => {
    const result = values[0].items.map((r) => r.uid);
    const result1 = values[1].items.map((r) => r.uid);

    for (let i = 0; i < result.length; i++) {
      if (!result1.includes(result[i])) {
        missingGlobalFields.push(result[i]);
      }
    }
    // updateExsistingContentTypes(values);
    if (missingGlobalFields.length > 0) {
        console.log(missingGlobalFields);
      for (let globalField of missingGlobalFields) {
        // console.log(values[0].items.filter((r) => r.uid === globalField));
        createNewGlobalFields(
          values[0].items.filter((r) => r.uid === globalField)
        );
      }
    }
  });
  return missingGlobalFields;
};

const createNewGlobalFields = async (newGlobalFields) => {
  const client = contentstack.client();
  for (let globalField of newGlobalFields) {
    let global_field = { ...globalField };

    global_field = await updateExtensionElementOfSchema(global_field);
    client
      .stack({
        api_key: "blt29cd0e42badc2f84",
        management_token: "csdd41bfd757cdcd2a08aefb49",
      })
      .globalField()
      .create({ global_field })
      .then((globalFields) => console.log(globalFields));
  }
};

const updateExsistingGlobalFields = async (globalField) => {
  const destinationGlobalField = globalField[1].items;
  let sourceGlobalField = globalField[0].items;

  const client = contentstack.client();
  for (let i = 0; i < destinationGlobalField.length; i++) {
    let currrentSource = sourceContentTypes.find(
      (r) => r.uid === destinationGlobalField[i].uid
    );
    currrentSource = await updateExtensionElementOfSchema(currrentSource);
    client
      .stack({
        api_key: "blt29cd0e42badc2f84",
        management_token: "csdd41bfd757cdcd2a08aefb49",
      })
      .globalField(destinationGlobalField[i].uid)
      .fetch()
      .then((globalField) => {
        globalField.schema = [...currrentSource.schema];
        return globalField.update();
      })
      .then((contentType) => console.log(contentType));
  }
};

const updateExtensionElementOfSchema = async (content_type) => {
  let extensionElement = content_type.schema.filter(
    (item) => item.extension_uid != null
  )[0];
  let extensionElementIndex = content_type.schema.indexOf(extensionElement);
  if (
    content_type.schema.map((r) => r.extension_uid).filter((item) => item)[0]
  ) {
    const destinationExtensionUid = await destinationExtension(
      content_type.schema.map((r) => r.extension_uid).filter((item) => item)[0]
    );
    // console.log(extensionElement)
    delete extensionElement["extension_uid"];
    extensionElement.extension_uid = destinationExtensionUid;
    content_type[extensionElementIndex] = extensionElement;
  }
  return content_type;
};

const destinationExtension = (sourceExtensionUid) => {
  const client = contentstack.client();

  const p1 = client
    .stack({
      api_key: "bltf59e104b7a95e45e",
      management_token: "cs83e3de5b81233de10e87661d",
    })
    .extension(sourceExtensionUid)
    .fetch();

  const p2 = client
    .stack({
      api_key: "blt29cd0e42badc2f84",
      management_token: "csdd41bfd757cdcd2a08aefb49",
    })
    .extension()
    .query()
    .find();
  return Promise.all([p1, p2]).then((vals) => {
    let result = vals[1].items.find((r) => r.title === vals[0].title);
    return result.uid;
  });
};

module.exports = { compare };
