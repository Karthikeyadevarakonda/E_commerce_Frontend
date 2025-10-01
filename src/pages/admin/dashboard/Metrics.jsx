import React, { useEffect, useState, memo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useApi from "../../../utils/useApi";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#A569BD"];

// Memoized KPI Card
const KpiCard = memo(({ title, value }) => (
  <div className="bg-white/80 p-6 rounded-xl shadow flex flex-col backdrop-blur-md">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
));

const Metrics = () => {
  const { fetchData, loading } = useApi(
    "http://localhost:7001/api/admin/metrics"
  );
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      const res = await fetchData("/");
      if (res) setMetrics(res);
    };
    loadMetrics();
  }, []);

  if (loading || !metrics)
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading Metrics...
      </div>
    );

  // Safe number conversions
  const totalRevenue = Number(metrics.totalRevenue || 0);
  const totalOrders = Number(metrics.totalOrders || 0);
  const totalProducts = Number(metrics.totalProducts || 0);

  const pendingDelivery = metrics.ordersByStatus
    .filter((o) => o.status.toLowerCase() !== "completed")
    .reduce((sum, o) => sum + Number(o.count || 0), 0);

  const pieData = metrics.ordersByStatus.map((status) => ({
    name: status.status,
    value: Number(status.count || 0),
  }));

  const topProductData = metrics.topProducts.map((p) => ({
    name: p.productName,
    sold: Number(p.quantitySold || 0),
    revenue: Number(p.price || 100) * Number(p.quantitySold || 0),
  }));

  // Precompute chart cells to reduce re-renders
  const orderStatusCells = pieData.map((_, idx) => (
    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
  ));

  const revenueCells = topProductData.map((_, idx) => (
    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
  ));

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <KpiCard title="Total Orders" value={totalOrders} />
        <KpiCard title="Total Products" value={totalProducts} />
        <KpiCard title="Pending Delivery" value={pendingDelivery} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Status Pie */}
        <div className="bg-white/80 p-6 rounded-xl shadow flex flex-col items-center backdrop-blur-md">
          <h3 className="font-semibold text-gray-700 mb-4">Order Status</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {orderStatusCells}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Composed Chart */}
        <div className="bg-white/80 p-6 rounded-xl shadow backdrop-blur-md">
          <h3 className="font-semibold text-gray-700 mb-4 text-center">
            Top Products
          </h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <ComposedChart data={topProductData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Bar dataKey="sold" fill="#FF8042" />
                <Area dataKey="revenue" fill="#00C49F" stroke="#00C49F" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Pie by Top Products */}
        <div className="bg-white/80 p-6 rounded-xl shadow flex flex-col items-center backdrop-blur-md">
          <h3 className="font-semibold text-gray-700 mb-4">
            Revenue by Top Products
          </h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={topProductData.map((p) => ({
                    name: p.name,
                    value: p.revenue,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {revenueCells}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products Horizontal Scroll */}
      <div className="bg-white/80 p-6 rounded-xl shadow backdrop-blur-md">
        <h3 className="font-semibold text-gray-700 mb-4">Top Products</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {metrics.topProducts.map((product) => (
            <div
              key={product.productId}
              className="min-w-[140px] bg-gray-50/70 rounded-xl shadow p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="h-24 w-24 object-cover rounded-md mb-2"
              />
              <p className="font-medium text-gray-800 text-center">
                {product.productName}
              </p>
              <p className="text-sm text-gray-500">{product.productType}</p>
              <p className="text-pink-500 font-semibold mt-1">
                Sold: {Number(product.quantitySold || 0)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
