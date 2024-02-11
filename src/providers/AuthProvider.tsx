import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type ProfileType = Tables<"profiles"> | null;
type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: ProfileType | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setIsLoggedin: (value: boolean) => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  isLoggedIn: false,
  setIsLoggedin: () => () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      console.log(
        "####################### Starting fetchSession #######################"
      );
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        // fetch profile
        setIsLoggedIn(true);
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
        setIsAdmin(data?.group === "ADMIN");
        console.log("on fetchSession profile: ", profile);
      } else {
        setIsLoggedIn(false);
        setProfile(null);
      }
      setLoading(false);
    };
    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log(
        "####################### Starting Change fetchSession #######################"
      );

      setLoading(true);
      setSession(session);
      console.log("on onAuthStateChange session: ", session);
      if (session) {
        // fetch profile

        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data);
        setIsAdmin(data?.group === "ADMIN");
        console.log("on onAuthStateChange isAdmin: ", isAdmin);
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(true);
        setSession(null);
        setIsLoggedIn(false);
        console.log("Setted session to null");
        setLoading(false);
      }
    });
  }, [isAdmin, isLoggedIn]);

  const setIsLoggedin = (isLoggedin: boolean) => {
    setIsLoggedIn(isLoggedin);
    // if (!isLoggedIn) {
    //   setSession(null);
    // }
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin, isLoggedIn, setIsLoggedin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
