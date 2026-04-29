import { useEffect, useState } from "react";
import api from "../api/axios";
import { commentJournalService, getJournalsService, likeJournalService } from "../services/journal.service";
import Navbar from "../components/Navbar";

export default function Home() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJournalsService();
      setJournals(res.data);
    };
    fetchData();
  }, []);

  const handleLike = async (id) => {
    await likeJournalService(id);
  };

  const handleComment = async () => {
    await commentJournalService(journalId, text);
  };

  return (
    <div>
      <Navbar/>
      {journals.map((j) => (
        <div key={j._id} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-bold">{j.title}</h2>
          <p>{j.description}</p>
          <p className="text-sm text-gray-500">{j.user?.name}</p>
        </div>
      ))}
    </div>
  );
}
