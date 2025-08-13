import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const [username, setUsername] = useState<string | null>(null);
    const [permissionLevel, setPermissionLevel] = useState<number | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/user/whoami", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          });
  
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
            setPermissionLevel(Number(data.permissionLevel));
          } else if (response.status === 403) {
            navigate("/forbidden");
          } else {
            navigate("/login");
          }

        } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/login");
        }
      };
  
      fetchUser();
    }, [navigate]);
  
    const logout = async () => {
      try {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setUsername(null);
        setPermissionLevel(null);
        navigate("/login");
      }
    };
  
    return { username, permissionLevel, logout };
}
  