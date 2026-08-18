import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-primary-dark">404</div>
        <h1 className="mt-2 text-4xl font-black">We can't find that page.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The link may be broken, or the page moved. Let's get you home.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex rounded-full bg-primary text-primary-foreground hover:bg-primary-dark px-6 py-3 text-sm font-semibold transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
