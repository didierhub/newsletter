"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { FaRegThumbsUp } from "react-icons/fa";

const Subscribe: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);

  const isValidPhoneNumber = (phone: string): boolean =>
    /^\+\d{1,15}$/.test(phone);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!isValidPhoneNumber(phoneNumber)) {
      setStatusMessage(
        "Invalid phone number. Please use the international format (e.g., +123456789)."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://nesom1hmof.execute-api.us-east-1.amazonaws.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phonenumber: phoneNumber }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatusMessage(
          `Subscription initiated for ${phoneNumber}. Awaiting confirmation.`
        );
        setPhoneNumber("");
      } else {
        setStatusMessage(`${data.error}`);
      }
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message || "Something went wrong"}`);
    }

    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  const handleInitial = () => {
    setPhoneNumber("");
    setStatusMessage("");
    setPopUp((prev) => !prev);
  };

  return (
    <div className="grid">
      <h1 className="my-2 text-center text-lg font-bold">
        Subscribe to SMS Notifications
      </h1>
      <form
        onSubmit={handleSubmit}
        className={`px-4 grid gap-8 ${statusMessage && "hidden"}`}
      >
        <label htmlFor="phonenumber" className="grid gap-2">
          <span>Phone Number</span>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="(+123456789)"
            required
            className="p-2 border-2 outline-none text-lg"
            aria-describedby="phoneHelp"
            aria-invalid={!isValidPhoneNumber(phoneNumber)}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !isValidPhoneNumber(phoneNumber)}
          className="bg-green-700 rounded-lg py-2 text-white"
        >
          {loading ? "Subscribing..." : "Subscribe"}
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

export default Subscribe;
