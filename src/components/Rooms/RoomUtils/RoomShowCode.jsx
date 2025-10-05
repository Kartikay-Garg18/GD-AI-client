import toast from "react-hot-toast";

const RoomShowCode = ({ isOpen, onClose, roomCode, setShowForm }) => {
    const handleClose = ()=>{
        setShowForm(true);
        onClose();
    }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Room code copied to clipboard!");
    } catch (err) {
      toast.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-in zoom-in-95 duration-200">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Room Created Successfully!
            </h2>
            <p className="text-gray-600">
              Share this room code with participants
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Room Code</p>
            <div className="flex items-center justify-between bg-white rounded-lg border p-3">
              <span className="text-2xl font-bold text-gray-900 tracking-wider">
                {roomCode}
              </span>
              <button
                onClick={() => copyToClipboard(roomCode)}
                className="ml-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => copyToClipboard(roomCode)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Copy Room Code
            </button>
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomShowCode;
