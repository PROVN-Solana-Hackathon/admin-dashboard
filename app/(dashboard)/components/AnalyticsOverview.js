import Image from "next/image";

const AnalyticsOverview = ({ heading, subtitle, textColor }) => {
  return (
    <div className="shadow-lg p-3.5 w-[175px] h-[120px] rounded-md">
      <div className="flex flex-row justify-between items-center">
        <p>{heading}</p>
        <Image src="/assets/icons/help.svg" alt="icon" height={20} width={20} />
      </div>
      <p className={`text-3xl font-semibold mt-2 ${textColor}`}>{subtitle}</p>
    </div>
  );
};

export default AnalyticsOverview;
