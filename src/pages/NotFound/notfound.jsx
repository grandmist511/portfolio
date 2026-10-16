import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import "./notfound.css";

function NotFound() {
  return (
    <main className="not-found">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-desc">
        The page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>
      <div className="not-found-actions">
        <Link to="/">
          <Button>
            <Home size={18} />
            Back Home
          </Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
      </div>
    </main>
  );
}

export default NotFound;

