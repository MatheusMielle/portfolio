import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [username, setUsername] = useState<string | null>(null);
  const [permissionLevel, setPermissionLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    let cancelled = false;
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/whoami", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });

        if (response.ok) {
          const data = await response.json();
          if (!cancelled) {
            setUsername(data.username);
            setPermissionLevel(Number(data.permissionLevel));
          }
        } else if (response.status === 403) {
          if (!cancelled) navigate("/forbidden");
        } else {
          if (!cancelled) navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (!cancelled) navigate("/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();
    return () => { cancelled = true; };
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

  return { username, permissionLevel, logout, loading };
}
  