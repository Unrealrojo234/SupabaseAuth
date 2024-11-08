import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_REACT_API_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_API_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//console.log(supabaseK
export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div>
        <h1 style={{ textAlign: "center", color: "green" }}>Tech It Up</h1>
        <div
          style={{
            maxWidth: "32rem",
            display: "block",
            margin: "auto",
            border: "2px solid white",
            padding: "12px",
            borderRadius: "12px",
          }}
        >
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
}
