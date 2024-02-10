import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type ProfileType = {
  group: string;
};
type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: ProfileType | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
        setIsAdmin(data?.group === "ADMIN");

        console.log("on fetchSession profile: ", profile);
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
        console.log("on onAuthStateChange New profile: ", profile);
        setLoading(false);
      }else{
        setLoading(false);
      }
    });
    setIsAdmin(profile?.group === "ADMIN");
    console.log("on onAuthStateChange isAdmin: ", isAdmin);
    setLoading(false);
  }, [isAdmin]);

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
