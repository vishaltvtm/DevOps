"use client"
import { useState } from "react";

function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.SERVER_URL}/add-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add email");
      }

      setStatus("Email added successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("Error adding email");
    }
  };

  return (
    <div>
      <div className="flex h-full justify-center items-center py-20">
        <h1>
          kubernetes 2.0
        </h1>
        <h1>
          vinayak tavatam
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add Email</button>

        {status && <p>{status}</p>}
      </form>
      <div>
        <EmailList />
      </div>
    </div>

  );
}

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/emails`);

        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();
        setEmails(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {emails.map((item) => (
        <li key={item._id}>{item.email}</li>
      ))}
    </ul>
  );
}


export default Home;
