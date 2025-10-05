import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

const StepsHeader = ({ currentStep }) => {
  const stepClasses = (step) =>
    currentStep === step ? "text-teal-500 font-semibold" : "text-gray-400";

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-0 pb-4 w-full mt-8 sm:mt-0">
      {/* Step 1: Bag */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <FaShoppingBag className={`text-xl ${stepClasses(1)}`} />
        <span className={`text-sm ${stepClasses(1)}`}>Bag</span>
      </div>

      {/* Connector 1 */}
      <div className="flex flex-col sm:flex-1 items-center sm:items-center w-full sm:w-auto">
        {/* Vertical line for mobile */}
        <div className="sm:hidden w-0.5 h-6 bg-gray-300 my-1"></div>
        {/* Horizontal line for desktop */}
        <div className="hidden sm:block h-0.5 bg-gray-300 w-full mx-2"></div>
      </div>

      {/* Step 2: Address */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <FaMapMarkerAlt className={`text-xl ${stepClasses(2)}`} />
        <span className={`text-sm ${stepClasses(2)}`}>Address</span>
      </div>

      {/* Connector 2 */}
      <div className="flex flex-col sm:flex-1 items-center sm:items-center w-full sm:w-auto">
        {/* Vertical line for mobile */}
        <div className="sm:hidden w-0.5 h-6 bg-gray-300 my-1"></div>
        {/* Horizontal line for desktop */}
        <div className="hidden sm:block h-0.5 bg-gray-300 w-full mx-2"></div>
      </div>

      {/* Step 3: Card */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <FaCreditCard className={`text-xl ${stepClasses(3)}`} />
        <span className={`text-sm ${stepClasses(3)}`}>Card</span>
      </div>
    </div>
  );
};

export default StepsHeader;
