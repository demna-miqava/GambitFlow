import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

/**
 * Hook to create an authenticated WebSocket URL with Clerk token.
 * Returns null while loading the token, allowing react-use-websocket to wait.
 *
 * @param baseUrl - The base WebSocket URL (without token)
 * @param enabled - Whether the connection should be enabled
 * @returns WebSocket URL with token query parameter, or null
 */
export const useAuthenticatedWebSocketUrl = (
  baseUrl: string | null,
  enabled: boolean = true
): string | null => {
  const { getToken, isSignedIn } = useAuth();
  const [wsUrl, setWsUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!baseUrl || !enabled || !isSignedIn) {
      setWsUrl(null);
      return;
    }

    const buildUrl = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const separator = baseUrl.includes("?") ? "&" : "?";
        setWsUrl(`${baseUrl}${separator}token=${token}`);
      } catch {
        setWsUrl(null);
      }
    };

    buildUrl();
  }, [baseUrl, enabled, isSignedIn, getToken]);

  return wsUrl;
};
