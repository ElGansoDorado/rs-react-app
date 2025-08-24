import type { ChangeEvent } from 'react';
import type { FormData } from '@/shared/model/user.types';
import type { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FormData>;
  name: keyof FormData;
};

function FormInputImg({ register, name }: Props) {
  const handleImageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const cFiles = evt.target.files as FileList;
    if (cFiles.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(cFiles[0]);
    }
  };

  return (
    <div className="field">
      <div className="file">
        <label className="file-label">
          <input
            {...register(name)}
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
}

export default FormInputImg;
