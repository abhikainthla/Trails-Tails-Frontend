import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <p>Followers: {user.followers.length}</p>
    </div>
  );
}
