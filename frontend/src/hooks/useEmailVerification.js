import { useState, useEffect } from "react";

export const useEmailVerification = () => {
  const [isVerified, setIsVerified] = useState(null);
  useEffect(() => {
    const checkEmailVerified = async () => {
      try {
        const response = await fetch("/api/auth/users/verify-email", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: new URLSearchParams(window.location.search).get("token"),
          }),
        });
        const data = await response.json();
        setIsVerified(data.isVerified);
      } catch (error) {
        console.error("Error checking email verification status:", error);
        setIsVerified(false);
      }
    };

    checkEmailVerified();
  }, []);

  return isVerified;
};
export default useEmailVerification;
