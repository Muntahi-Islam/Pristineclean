"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare, Users, Clock, TrendingUp, ArrowRight,
  FileSpreadsheet, Activity, DollarSign,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

interface DashboardData {
  totalQuotes: number;
  pendingQuotes: number;
  totalCustomers: number;
  recentQuotes: Array<{
    id: string; requestId: string; customerName: string; customerEmail: string;
    service: string; status: string; createdAt: string;
  }>;
}

const PIE_COLORS = ["#c25a7f", "#f2b3cc", "#853d57", "#f9d5e3"];

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { getDashboardStats } = await import("@/actions/admin");
        const stats = await getDashboardStats();
        if (stats) setData(stats as unknown as DashboardData);
      } catch (e) {
        console.error("Failed to load dashboard:", e);
      }
    }
    load();
  }, []);

  const statusColors: Record<string, "warning" | "success" | "primary" | "ghost"> = {
    PENDING: "warning", REVIEWED: "primary", CONTACTED: "success", CLOSED: "ghost",
  };

  const chartData = [
    { name: "Mon", quotes: 4, customers: 2 },
    { name: "Tue", quotes: 7, customers: 3 },
    { name: "Wed", quotes: 5, customers: 4 },
    { name: "Thu", quotes: 8, customers: 3 },
    { name: "Fri", quotes: 6, customers: 5 },
    { name: "Sat", quotes: 3, customers: 2 },
    { name: "Sun", quotes: 2, customers: 1 },
  ];

  const pieData = [
    { name: "Residential", value: 45 },
    { name: "Commercial", value: 25 },
    { name: "Deep Clean", value: 18 },
    { name: "Other", value: 12 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Dashboard</h1>
          <p className="text-sm text-navy-500 mt-1">
            Welcome back. Here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/quotes">
            <Button variant="primary" size="sm">
              <MessageSquare size={16} className="mr-2" />
              View Quotes
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Quotes", value: data?.totalQuotes ?? 0, icon: MessageSquare, color: "text-navy-600 bg-navy-100", change: "+12%", changeUp: true },
          { label: "Pending", value: data?.pendingQuotes ?? 0, icon: Clock, color: "text-navy-500 bg-navy-100", change: `${data?.pendingQuotes ?? 0} need review`, changeUp: false },
          { label: "Customers", value: data?.totalCustomers ?? 0, icon: Users, color: "text-navy-700 bg-navy-100", change: "+5 new", changeUp: true },
          { label: "Revenue", value: `$${(data?.totalQuotes ?? 0) * 85}`, icon: DollarSign, color: "text-navy-800 bg-navy-100", change: "+18%", changeUp: true },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border-2 border-navy-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-full ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-medium ${stat.changeUp ? "text-navy-600" : "text-navy-500"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
              <p className="text-sm text-navy-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white border-2 border-navy-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Weekly Activity</h3>
            <Activity size={18} className="text-navy-400" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f9d5e3" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#853d57" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#853d57" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 0, border: "2px solid #f9d5e3", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="quotes" fill="#c25a7f" radius={[2, 2, 0, 0]} />
              <Bar dataKey="customers" fill="#f2b3cc" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border-2 border-navy-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Service Distribution</h3>
            <TrendingUp size={18} className="text-navy-400" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 0, border: "2px solid #f9d5e3" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {pieData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-navy-500">
                <div className="w-2.5 h-2.5" style={{ backgroundColor: PIE_COLORS[i] }} />
                {entry.name} ({entry.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Quotes Table */}
      <div className="bg-white border-2 border-navy-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <div className="p-6 border-b-2 border-navy-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-900">Recent Quote Requests</h2>
          <Link href="/admin/quotes" className="text-sm text-navy-600 hover:text-navy-700 font-medium transition-colors">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-navy-100 bg-navy-50/50">
                <th className="text-left p-4 text-navy-500 font-medium">Request ID</th>
                <th className="text-left p-4 text-navy-500 font-medium">Customer</th>
                <th className="text-left p-4 text-navy-500 font-medium">Service</th>
                <th className="text-left p-4 text-navy-500 font-medium">Date</th>
                <th className="text-left p-4 text-navy-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentQuotes?.map((quote) => (
                <tr key={quote.id} className="border-b border-navy-100 hover:bg-navy-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-navy-700">#{quote.requestId.slice(0, 8)}</td>
                  <td className="p-4">
                    <p className="font-medium text-navy-900">{quote.customerName}</p>
                    <p className="text-xs text-navy-500">{quote.customerEmail}</p>
                  </td>
                  <td className="p-4 text-navy-700">{quote.service}</td>
                  <td className="p-4 text-navy-500">{formatDate(quote.createdAt)}</td>
                  <td className="p-4">
                    <Badge variant={statusColors[quote.status] ?? "ghost"}>{quote.status}</Badge>
                  </td>
                </tr>
              ))}
              {(!data?.recentQuotes || data.recentQuotes.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-navy-500">
                    No quotes yet. They will appear here once customers submit requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <Link href="/admin/quotes" className="bg-white border-2 border-navy-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-navy-100 text-navy-600 group-hover:scale-110 transition-transform">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="font-semibold text-navy-900">Manage Quotes</p>
              <p className="text-xs text-navy-500">Review and respond to requests</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/invoices" className="bg-white border-2 border-navy-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-navy-100 text-navy-700 group-hover:scale-110 transition-transform">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <p className="font-semibold text-navy-900">Invoices</p>
              <p className="text-xs text-navy-500">Generate and manage invoices</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/blog" className="bg-white border-2 border-navy-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-navy-100 text-navy-600 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <div>
              <p className="font-semibold text-navy-900">Content</p>
              <p className="text-xs text-navy-500">Manage blog, gallery, FAQs</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
