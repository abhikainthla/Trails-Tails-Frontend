import api from "../api/axios";

export const getTrips = () => api.get("/trips");

export const addJournalToTripService = (tripId, journalId) =>
  api.post(`/trips/${tripId}/journal`, { journalId });
