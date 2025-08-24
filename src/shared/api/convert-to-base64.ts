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

export const checkPasswordStrength = (password: string) => {
  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const conditionsMet = [hasNumber, hasUppercase, hasLowercase].filter(
    Boolean
  ).length;

  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (conditionsMet === 3) {
    strength = 'strong';
  } else if (conditionsMet >= 2) {
    strength = 'medium';
  }

  return strength;
};
