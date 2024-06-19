import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "forced-dynamic";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">My Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
