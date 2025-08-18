import { Link, Head } from "@inertiajs/react";
import Preloader from "@/Components/Preloader";
import { Button } from "react-bootstrap";

export default function Welcome() {
  return (
    <>
      <Preloader />
      <Head title="Welcome" />
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="grid grid-cols-4 gap-2">
          <Button className="waves-effect waves-light" variant="primary">
            Primary
          </Button>
          <Button className="waves-effect waves-light" variant="secondary">
            Secondary
          </Button>
          <Button className="waves-effect waves-light" variant="success">
            Success
          </Button>
          <Button className="waves-effect waves-light" variant="warning">
            Warning
          </Button>
          <Button className="waves-effect waves-light" variant="danger">
            Danger
          </Button>
          <Button className="waves-effect waves-light" variant="info">
            Info
          </Button>
          <Button className="waves-effect waves-light" variant="light">
            Light
          </Button>
          <Button className="waves-effect waves-light" variant="dark">
            Dark
          </Button>
          <Button className="waves-effect waves-light" variant="link">
            Link
          </Button>
        </div>
      </div>
    </>
  );
}
