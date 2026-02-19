import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Contoso Ltd.', assigned: 2450, available: 550 },
  { name: 'Fabrikam', assigned: 1800, available: 200 },
  { name: 'Northwind', assigned: 1200, available: 300 },
  { name: 'Adventure', assigned: 980, available: 520 },
  { name: 'Woodgrove', assigned: 750, available: 250 },
];

export function LicenseChart() {
  return (
    <div className="widget col-6">
      <div className="widget-header">
        <h3 className="widget-title">License Consumption by Tenant</h3>
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3F3F3F" />
            <XAxis dataKey="name" tick={{ fill: '#8A8886', fontSize: 11 }} axisLine={{ stroke: '#3F3F3F' }} />
            <YAxis tick={{ fill: '#8A8886', fontSize: 11 }} axisLine={{ stroke: '#3F3F3F' }} />
            <Tooltip
              contentStyle={{ background: '#2D2D2D', border: '1px solid #3F3F3F', borderRadius: 6, color: '#FFFFFF' }}
              labelStyle={{ color: '#00BCF2', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#8A8886' }} />
            <Bar dataKey="assigned" fill="#0078D4" name="Assigned" radius={[4, 4, 0, 0]} />
            <Bar dataKey="available" fill="#00BCF2" name="Available" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
