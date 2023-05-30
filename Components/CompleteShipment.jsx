import { useState } from "react";
import { Str1 } from "@/Components/index";

export default ({ completeModal, setCompleteModal, completeShipment }) => {
  const [completeShip, setCompleteShip] = useState({
    receiver: "",
    index: "",
  });

  const changeStatus = () => {
    completeShipment(completeShip);
    setCompleteModal(false);
  };

  return completeModal ? (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCompleteModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg ">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCompleteModal(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Complete the Shipment
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setCompleteShip({
                      ...completeShip,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>

              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Id"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setCompleteShip({
                      ...completeShip,
                      index: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={() => changeStatus()}
                className="block w-full px-4 py-2 mt-3 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700"
              >
                Complete Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
