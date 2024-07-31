import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/register">Register</Link>
      <Link href="/signin">Sign in</Link>
    </main>
  );
}
