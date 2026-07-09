import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="text-center max-w-md px-6">
        <div className="text-8xl font-bold text-navy-200 font-serif mb-4">
          404
        </div>
        <h1 className="text-3xl font-semibold text-navy-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-navy-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
