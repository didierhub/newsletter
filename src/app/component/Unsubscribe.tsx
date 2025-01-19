"use client";
import { useState, FormEvent, ChangeEvent } from "react";

const Unsubscribe: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const[popUp,setPopUp]=useState<boolean>(false)

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
        "https://nesom1hmof.execute-api.us-east-1.amazonaws.com/unsubscribe",
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
          `Unsubscription successful for ${phoneNumber}. You have been removed from the notifications.`
        );
      } else {
        // Handle cases where the phone number isn't subscribed
        if (data.error.includes("not subscribed")) {
          setStatusMessage(
            `The phone number ${phoneNumber} is not subscribed to notifications.`
          );
        } else {
          setStatusMessage(`Error: ${data.error}`);
        }
      }
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  }
  ;const handleInitial=()=>{
    setPhoneNumber("")
    setStatusMessage("")
    setPopUp(prev=>!prev)
  }



  return (
    <div className={`grid `}>
      <h1 className="my-2 text-center text-lg font-bold">Unsubscribe from SMS Notifications</h1>
      <form onSubmit={handleSubmit} className={`px-4 grid gap-8 ${statusMessage && " hidden"}`}>
        <label htmlFor="phonenumber" className=" grid gap-2">
        <span> Phone Number</span>
        <input
          type="text"
          id="phonenumber"
          name="phonenumber"
          value={phoneNumber}
          onChange={handleChange}
          placeholder="  +123456789"
          required
          className="p-2  border-2  outline-none  text-lg"
        />
        </label>

        <button type="submit" disabled={loading} className="bg-red-700 rounded-lg py-2 text-white">
          {loading ? "Unsubscribing..." : "Unsubscribe"}
        </button>
      </form>

      {statusMessage && <div className={` grid  px-4  gap-8 ${!popUp?" block":" hidden"}`}>  <span>{statusMessage} </span> <button onClick={handleInitial} className='bg-orange-500 py-2 rounded-lg text-lg text-center text-white items-center'> ok </button> </div>}
    </div>
  );
};

export default Unsubscribe;
