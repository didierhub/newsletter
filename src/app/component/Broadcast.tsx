"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const Broadcast: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!message.trim()) {
      setStatusMessage("Message cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://vtgqacefn5.execute-api.us-east-1.amazonaws.com/publish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatusMessage("Broadcast message sent successfully.");
        setMessage("");
      } else {
        setStatusMessage(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message || "Something went wrong"}`);
    }

    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  const handleInitial = () => {
    setMessage("");
    setStatusMessage("");
    setPopUp((prev) => !prev);
  };

  return (
    <div className='  w-[350px] grid  py-4 gap-y-2 border-2  shadow-lg  rounded-lg absolute   translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]   '>
      <h1 className="my-2 text-center text-lg font-bold">
       publish
      </h1>
      <form
        onSubmit={handleSubmit}
        className={`px-4 grid gap-5 ${statusMessage && "hidden"}`}
      >
        <label htmlFor="message" className="grid gap-2">
          <span>Message</span>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Type your message here..."
            required
            className="p-2 border-2 outline-none text-lg h-32"
            maxLength={1600}
            aria-describedby="messageHelp"
          ></textarea>
        </label>
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="bg-blue-700 rounded-lg py-2 text-white"
        >
          {loading ? "Broadcasting..." : "Broadcast"}
        </button>
      </form>

      {statusMessage && (
        <div
          className={`grid px-4 gap-10 ${!popUp ? "block" : "hidden"}`}
          role="alert"
        >
          <span>{statusMessage}</span>
          <button
            onClick={handleInitial}
            className="bg-orange-500 py-2 rounded-lg text-lg text-center text-white items-center"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default Broadcast;
