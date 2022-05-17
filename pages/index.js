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
      <section className="grid place-items-center place-content-center h-full w-full   ">
        <div className="flex flex-col items-center bg-white shadow-2xl p-20  rounded">
          <Image width={120} height={120} src="/logo-devter.png" alt="devter" />
          <h1 className="text-blue-800 text-xl font-extrabold mb-0 mt-2">
            Devter
          </h1>
          <h2 className="text-blue-400 text-lg">App de notas con NextJs</h2>
          <div className="mt-2">
            {user === USER_STATES.NOT_LOGGED && (
              <BtnLog handleClick={handleClick} />
            )}
            {/* {user && user.avatar && <Avatar user={user} text={user.username} />} */}
            {user === USER_STATES.NOT_KNOWN && <span>Loading ...</span>}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
