import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to Our CRM</h1>
      <p className="mt-4 text-lg">Manage your clients and appointments efficiently.</p>
      <Image
        className="mt-8"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </div>
  );
}
