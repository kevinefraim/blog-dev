import Image from "next/image";
import { useEffect } from "react";
import AppLayout from "components/AppLayout.jsx";
import { gitHubLogin } from "fb/client";
import BtnLog from "components/BtnLog.jsx";
import Avatar from "components/Avatar.jsx";
import { useRouter } from "next/router";
import useUser, { USER_STATES } from "hooks/useUser";

const Home = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    gitHubLogin().catch((err) => console.log(err));
  };
  return (
    <AppLayout>
      <div className="h-[100%] flex flex-col justify-center items-center">
        <Image width={125} height={125} src="/logo.png" alt="devter" />
        <h1 className="text-red-800 text-xl font-extrabold mb-0 mt-2">
          BlogDev
        </h1>
        <h2 className="text-red-400 text-lg">Media Blog with NextJs</h2>
        <div className="mt-2">
          {user === USER_STATES.NOT_LOGGED && (
            <BtnLog handleClick={handleClick} />
          )}
          {/* {user && user.avatar && <Avatar user={user} text={user.username} />} */}
          {user === USER_STATES.NOT_KNOWN && <span>Loading ...</span>}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
