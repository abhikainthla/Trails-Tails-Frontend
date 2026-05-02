import { useEffect, useState } from "react";
import { getTrips, addJournalToTripService } from "../services/trip.service";
import toast from "react-hot-toast";

export default function AddToTripModal({ journalId, onClose }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await getTrips();
    setTrips(res.data);
  };

  const handleAdd = async (tripId) => {
    try {
      setLoading(true);

      await addJournalToTripService(tripId, journalId);

      toast.success("Added to trip 🚀");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          Add to Trip
        </h2>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="flex items-center justify-between p-3 border rounded-xl"
            >
              <div>
                <p className="font-medium">{trip.title}</p>
                <p className="text-xs text-gray-500">
                  {trip.journals.length} entries
                </p>
              </div>

              <button
                onClick={() => handleAdd(trip._id)}
                disabled={loading}
                className="bg-primary text-white px-3 py-1 rounded-full text-xs"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
