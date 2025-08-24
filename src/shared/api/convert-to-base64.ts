export const convertFileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.result) {
        resolve(fileReader.result as string);
      }
    };

    fileReader.onerror = () => {
      reject(new Error('File reading error'));
    };

    fileReader.readAsDataURL(file);
  });
};
