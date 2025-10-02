import { useEffect, useState, memo } from "react";
import ReactECharts from "echarts-for-react";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaBoxOpen,
  FaTruckLoading,
} from "react-icons/fa";
import useApi from "../../../utils/useApi";
import ShimmerMetrics from "./ShimmerMetrics";

const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

const KpiCard = memo(({ title, value, icon: Icon }) => (
  <div className="bg-white py-8 px-4 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition-transform hover:scale-[1.02]">
    <div className="p-3 rounded-full bg-slate-100 text-slate-600 text-xl">
      <Icon />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p> {/* smaller title */}
      <p className="text-xl font-bold text-gray-800">{value}</p>{" "}
      {/* smaller value */}
    </div>
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

  if (loading || !metrics) return <ShimmerMetrics />;

  const totalRevenue = Number(metrics.totalRevenue || 0);
  const totalOrders = Number(metrics.totalOrders || 0);
  const totalProducts = Number(metrics.totalProducts || 0);

  const pendingDelivery = metrics.ordersByStatus
    .filter((o) => o.status.toLowerCase() !== "completed")
    .reduce((sum, o) => sum + Number(o.count || 0), 0);

  const topProductData = metrics.topProducts.map((p) => ({
    name: p.productName,
    sold: Number(p.quantitySold || 0),
    revenue: Number(p.price || 100) * Number(p.quantitySold || 0),
  }));

  // --- Top Products Vertical Bar Chart ---
  const topProductsOption = {
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const p = params[0];
        const data = topProductData[p.dataIndex];
        return `${data.name}<br/>Sold: ${data.sold}<br/>Revenue: ₹${data.revenue}`;
      },
    },
    xAxis: {
      type: "category",
      data: topProductData.map((d) => d.name),
      axisLabel: { rotate: 0, interval: 0, fontSize: 12 },
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: topProductData.map((d, idx) => ({
          value: d.sold,
          itemStyle: { color: COLORS[idx % COLORS.length] },
        })),
        barWidth: 70,
      },
    ],
  };

  // --- Revenue Sparkline ---
  const revenueTrendOption = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: topProductData.map((d) => d.name),
      show: false,
    },
    yAxis: { type: "value", show: false },
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    series: [
      {
        type: "line",
        smooth: true,
        data: topProductData.map((d) => d.revenue),
        lineStyle: { color: "#34D399", width: 2 },
        areaStyle: { color: "rgba(52,211,153,0.3)" },
      },
    ],
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Revenue"
          value={`₹${totalRevenue.toFixed(2)}`}
          icon={FaRupeeSign}
        />
        <KpiCard
          title="Total Orders"
          value={totalOrders}
          icon={FaShoppingCart}
        />
        <KpiCard
          title="Total Products"
          value={totalProducts}
          icon={FaBoxOpen}
        />
        <KpiCard
          title="Pending Delivery"
          value={pendingDelivery}
          icon={FaTruckLoading}
        />
      </div>

      {/* Top Products Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-700 font-semibold mb-4">Top Products Sold</h3>
        <ReactECharts option={topProductsOption} style={{ height: 300 }} />
      </div>

      {/* Revenue Trend Sparkline */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-700 font-semibold mb-4">Revenue Trend</h3>
        <ReactECharts option={revenueTrendOption} style={{ height: 100 }} />
      </div>

      {/* Scrollable Product Cards */}
      <div className="bg-white/90 p-6 rounded-xl shadow">
        <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-4">
          <FaBoxOpen /> Top Products
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {metrics.topProducts.map((product) => (
            <div
              key={product.productId}
              className="min-w-[180px] bg-slate-50/80 rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="h-28 w-28 object-cover rounded-md mb-2"
              />
              <p className="font-medium text-gray-800 text-center">
                {product.productName}
              </p>
              <p className="text-sm text-gray-500">{product.productType}</p>
              <p className="text-slate-700 font-semibold mt-1">
                Sold: {Number(product.quantitySold || 0)} | Revenue: ₹
                {Number(product.price || 100) *
                  Number(product.quantitySold || 0)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
