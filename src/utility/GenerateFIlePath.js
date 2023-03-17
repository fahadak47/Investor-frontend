export function generateFilePath(file, fileType) {
  const splittedFileName = file.name.split(".");
  console.log("splitteedt fileeee naaaameee", splittedFileName);
  const fileExtension = splittedFileName[splittedFileName.length - 1];
  console.log("extention type file loggggg", fileExtension);
  return `${fileType}/` + Date.now() + "-" + Math.ceil(Math.random() * 1000);
}
