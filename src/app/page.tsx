import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Hello World</h1>
        <p>GET Request /api/history works</p>
      </div>
    </main>
  );
}
