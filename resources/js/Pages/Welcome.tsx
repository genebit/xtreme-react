import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Preloader from "@/Components/Preloader";
import { Button } from "react-bootstrap";
import { notyf } from "@/Utils/constant";

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const showSuccessMessage = () => {
    notyf.success("Welcome to the Laravel application!");
  };

  return (
    <>
      <Preloader />
      <Head title="Welcome" />
      <div className="relative min-h-screen bg-gray-100 bg-center sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div className="p-6 sm:fixed sm:top-0 sm:right-0 text-end">
          {auth.user ? (
            <Link
              href={route("dashboard")}
              className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route("login")}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Log in
              </Link>

              <Link
                href={route("register")}
                className="font-semibold text-gray-600 ms-4 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <div>
          <Button
            variant="primary"
            className="waves-effect waves-light"
            onClick={showSuccessMessage}
          >
            Show Success Message
          </Button>
        </div>
      </div>
    </>
  );
}
