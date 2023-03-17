import { CleaningServices } from "@mui/icons-material";

export const dataWithFiles = (data) => {
  const formDataWithFiles =
    data?.Image !== "" || data?.AttachmentType === "image"
      ? new FormData()
      : data;

  if (formDataWithFiles) {
    // axios will automatically set the content-type to multipart/form-data if the
    // data param is a FormData object
    // otherwise, it will use application/json
    // (study the Dev Tools > Network tab > XHR tab headers)
    console.log("sdashgdasgd fasdhsd FROM DATA CREATED");
    Object.keys(data).forEach((field) =>
      formDataWithFiles.append(field, data[field])
    );
    return formDataWithFiles;
  } else {
    let formData = new FormData();
    Object.keys(data).forEach((field) => formData.append(field, data[field]));
    return formData;
  }
};

export const dataCleaning = (data) => {
  let cleanedData;
  var cleanDataKeyTemp;
  Object.keys(data).forEach((field) => {
    console.log("cleaned->field : ", field);
    console.log("cleaned->data : ", data[field]);
    cleanDataKeyTemp = field;
    if (
      data[field] !== undefined &&
      data[field] !== null &&
      data[field] !== ""
    ) {
      console.log("cleaned->field : ", cleanDataKeyTemp, field);

      cleanedData = { ...cleanedData, [cleanDataKeyTemp]: data[field] };
      console.log("cleaned->items : ", cleanedData);
    }
  });
  console.log("cleaned : ", cleanedData);
  return cleanedData;
};
