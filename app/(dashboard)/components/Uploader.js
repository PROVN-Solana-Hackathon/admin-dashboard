import Upload from "rc-upload";
import PropTypes from "prop-types";
import Image from "next/image";

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const Uploader = ({ maxSize, types, multiple, callBack, message }) => {
  // handle logic for uploading an image
  const beforeUpload = (file) => {
    let isType = types.includes(file.type);
    if (types?.length < 1) {
      isType = true;
    }

    if (!isType) {
      Alert.error(
        `You can only upload${types.map((item) => ` ${item},`)} file format.`
      );
    }
    const isSize = file.size / 1024 / 1024 < maxSize;
    if (!isSize) {
      Alert.error(`Image must be smaller than ${maxSize}MB!`);
    }
    if (isType && isSize) {
      handleFileUploader(file);
      return isType && isSize;
    }
  };

  const handleFileUploader = (file) => {
    getBase64(file).then((data) => {
      const base64Data = data.split(",")[1];

      callBack({
        file: file,
        base64: base64Data,
        type: file.type,
        name: file.name,
        size: file.size,
      });
    });
  };

  return (
    <Upload
      type="drap"
      multiple={multiple}
      beforeUpload={(file) => beforeUpload(file)}
      onChange={() => {}}
    >
      <div>
        <div className="w-[150px] h-[150px] shadow-md flex flex-col items-center rounded-md">
          {/* <p>{message} </p> */}
          <Image
            src="/assets/icons/add-image.svg"
            alt="add-image"
            height={55}
            width={55}
            className="my-auto"
          />
        </div>
      </div>
    </Upload>
  );
};

Uploader.defaultProps = {
  maxSize: 10,
  multiple: false,
  callBack: () => {},
  // message: 'Click or drag file here to upload',
  types: [],
};

Uploader.propTypes = {
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  callBack: PropTypes.func,
  // message: PropTypes.string,
  types: PropTypes.array,
};
