import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

const StepsHeader = ({ currentStep }) => {
  const stepClasses = (step) =>
    currentStep === step ? "text-teal-500 font-semibold" : "text-gray-600";

  return (
    <div className="flex items-center justify-between pb-2">
      <div className="flex gap-2 items-center">
        <FaShoppingBag className={`text-xl ${stepClasses(1)}`} />
        <span className={`text-sm ${stepClasses(1)}`}>Bag</span>
      </div>

      <div className="flex-1 flex items-center justify-center text-gray-300">
        <span className="mx-1">- - - - -</span>
        <span className="mx-1">- - - - -</span>
        <span className="mx-1">- - - - -</span>
      </div>

      <div className="flex gap-2 items-center">
        <FaMapMarkerAlt className={`text-xl ${stepClasses(2)}`} />
        <span className={`text-sm ${stepClasses(2)}`}>Address</span>
      </div>

      <div className="flex-1 flex items-center justify-center text-gray-300">
        <span className="mx-1">- - - - - -</span>
        <span className="mx-1">- - - - - -</span>
        <span className="mx-1">- - - - - -</span>
      </div>

      <div className="flex gap-2 items-center">
        <FaCreditCard className={`text-xl ${stepClasses(3)}`} />
        <span className={`text-sm ${stepClasses(3)}`}>Card</span>
      </div>
    </div>
  );
};

export default StepsHeader;
