"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Shield, User, ShieldCheck, RotateCcw, Trash2, CheckCircle, XCircle } from "lucide-react";

interface UserRecord {
  id: string;
  name: string | null;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  _count: { accounts: number; sessions: number };
}

interface CustomerRecord {
  email: string;
  name: string;
  phone: string;
  quoteCount: number;
  lastRequest: string;
}

export default function AdminCustomers() {
  const [tab, setTab] = useState<"customers" | "admins">("customers");
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const { getQuotes } = await import("@/actions/admin");
        const result = await getQuotes({ limit: 1000 });
        const quotes = result.quotes as unknown as Array<{
          customerEmail: string; customerName: string; customerPhone: string; createdAt: string;
        }>;
        const grouped: Record<string, CustomerRecord> = {};
        for (const q of quotes) {
          if (!grouped[q.customerEmail]) {
            grouped[q.customerEmail] = { email: q.customerEmail, name: q.customerName, phone: q.customerPhone, quoteCount: 0, lastRequest: q.createdAt };
          }
          grouped[q.customerEmail].quoteCount++;
          if (new Date(q.createdAt) > new Date(grouped[q.customerEmail].lastRequest)) {
            grouped[q.customerEmail].lastRequest = q.createdAt;
          }
        }
        setCustomers(Object.values(grouped));
      } catch { /* ignore */ }
    }

    async function loadUsers() {
      try {
        const { getUsers } = await import("@/actions/admin-crud");
        const data = await getUsers();
        setUsers(data as unknown as UserRecord[]);
      } catch { /* ignore */ }
    }

    loadCustomers();
    loadUsers();
  }, []);

  async function handleAccept(userId: string) {
    setLoading(userId);
    try {
      const { updateUserRole } = await import("@/actions/admin-crud");
      await updateUserRole(userId, "ADMIN");
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: "ADMIN" } : u)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  async function handleReject(userId: string) {
    if (!confirm("Reject and delete this signup request?")) return;
    setLoading(userId);
    try {
      const { deleteUser } = await import("@/actions/admin-crud");
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm("Remove this admin? This cannot be undone.")) return;
    setLoading(userId);
    try {
      const { deleteUser } = await import("@/actions/admin-crud");
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  async function handleDemote(userId: string) {
    setLoading(userId);
    try {
      const { updateUserRole } = await import("@/actions/admin-crud");
      await updateUserRole(userId, "CUSTOMER");
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: "CUSTOMER" } : u)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  const admins = users.filter((u) => u.role === "ADMIN");
  const pending = users.filter((u) => u.role !== "ADMIN");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-900">People</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-navy-100">
        {[
          { id: "customers", label: "Customers", count: customers.length },
          { id: "admins", label: "Team & Admins", count: users.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors ${
              tab === t.id
                ? "border-navy-600 text-navy-600"
                : "border-transparent text-navy-500 hover:text-navy-700"
            }`}
          >
            {t.label}
            <span className="ml-2 text-xs bg-navy-100 text-navy-600 px-1.5 py-0.5">{t.count}</span>
          </button>
        ))}
      </div>

      {tab === "customers" && (
        <div className="bg-white border-2 border-navy-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy-100 bg-navy-50/50">
                <th className="text-left p-4 text-navy-500 font-medium">Name</th>
                <th className="text-left p-4 text-navy-500 font-medium">Email</th>
                <th className="text-left p-4 text-navy-500 font-medium">Phone</th>
                <th className="text-left p-4 text-navy-500 font-medium">Quotes</th>
                <th className="text-left p-4 text-navy-500 font-medium">Last Request</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-navy-500">No customers found.</td></tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.email} className="border-b border-navy-100 hover:bg-navy-50/50">
                    <td className="p-4 font-medium text-navy-900">{c.name}</td>
                    <td className="p-4 text-navy-700">{c.email}</td>
                    <td className="p-4 text-navy-500">{c.phone || "\u2014"}</td>
                    <td className="p-4 text-navy-900 font-medium">{c.quoteCount}</td>
                    <td className="p-4 text-navy-500">{formatDate(c.lastRequest)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "admins" && (
        <div className="space-y-6">
          {/* Pending Signup Requests */}
          {pending.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield size={14} />
                Signup Requests ({pending.length})
              </h3>
              <div className="bg-white border-2 border-navy-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-navy-100 bg-navy-50/50">
                      <th className="text-left p-4 text-navy-500 font-medium">Name</th>
                      <th className="text-left p-4 text-navy-500 font-medium">Email</th>
                      <th className="text-left p-4 text-navy-500 font-medium">Joined</th>
                      <th className="text-left p-4 text-navy-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((u) => (
                      <tr key={u.id} className="border-b border-navy-100 hover:bg-navy-50/50">
                        <td className="p-4 font-medium text-navy-900">{u.name || "\u2014"}</td>
                        <td className="p-4 text-navy-700">{u.email}</td>
                        <td className="p-4 text-navy-500">{formatDate(u.createdAt)}</td>
                        <td className="p-4 flex items-center gap-3">
                          <button
                            onClick={() => handleAccept(u.id)}
                            disabled={loading === u.id}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle size={14} />
                            {loading === u.id ? "Processing..." : "Accept"}
                          </button>
                          <button
                            onClick={() => handleReject(u.id)}
                            disabled={loading === u.id}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pending.length === 0 && (
            <div className="bg-white border-2 border-navy-100 p-8 text-center text-navy-400">
              <Shield size={32} className="mx-auto mb-2 text-navy-200" />
              No pending signup requests.
            </div>
          )}

          {/* Current Admins */}
          <div>
            <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck size={14} />
              Current Admins ({admins.length})
            </h3>
            <div className="bg-white border-2 border-navy-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy-100 bg-navy-50/50">
                    <th className="text-left p-4 text-navy-500 font-medium">Name</th>
                    <th className="text-left p-4 text-navy-500 font-medium">Email</th>
                    <th className="text-left p-4 text-navy-500 font-medium">Role</th>
                    <th className="text-left p-4 text-navy-500 font-medium">Joined</th>
                    <th className="text-left p-4 text-navy-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-navy-500">No admins yet.</td></tr>
                  ) : (
                    admins.map((u) => (
                      <tr key={u.id} className="border-b border-navy-100 hover:bg-navy-50/50">
                        <td className="p-4 font-medium text-navy-900">{u.name || "\u2014"}</td>
                        <td className="p-4 text-navy-700">{u.email}</td>
                        <td className="p-4">
                          <Badge variant="primary">ADMIN</Badge>
                        </td>
                        <td className="p-4 text-navy-500">{formatDate(u.createdAt)}</td>
                        <td className="p-4 flex items-center gap-3">
                          <button
                            onClick={() => handleDemote(u.id)}
                            disabled={loading === u.id}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-400 hover:text-navy-600 transition-colors disabled:opacity-50"
                          >
                            <RotateCcw size={14} />
                            {loading === u.id ? "Processing..." : "Demote"}
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
                            disabled={loading === u.id}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
