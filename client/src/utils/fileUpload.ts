export const dummyRequest = (options: any) => {
  setTimeout(() => {
    options.onSuccess("ok");
  }, 0);
};

export function convertBase(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader: FileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
