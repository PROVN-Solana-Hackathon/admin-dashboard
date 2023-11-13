import Image from "next/image";

const ViewQRCode = ({ qrcode }) => {
  return (
    <div>
      <Image src={qrcode} alt="qrcode" height={180} width={180}  className="w-[395px] h-[350px] shadow-md rounded-md mx-auto my-14"/>
    </div>
  );
};

export default ViewQRCode;
