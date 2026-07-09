"use client";

import { SERVICES } from "@/lib/constants";

export default function AdminServices() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-navy-900">Services</h1>

      <div className="bg-white border-2 border-navy-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-navy-100 bg-navy-50/50">
              <th className="text-left p-4 text-navy-500 font-medium">
                Service
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Slug
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Features
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((service) => (
              <tr
                key={service.slug}
                className="border-b border-navy-100 hover:bg-navy-50/50"
              >
                <td className="p-4">
                  <p className="font-medium text-navy-900">{service.title}</p>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {service.subtitle}
                  </p>
                </td>
                <td className="p-4 text-navy-500 font-mono text-xs">
                  {service.slug}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-navy-50 text-navy-600 px-2 py-0.5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 uppercase tracking-wider">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
