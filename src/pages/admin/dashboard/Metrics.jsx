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

const ICON_STYLES = {
  revenue:
    "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md shadow-emerald-200",
  orders:
    "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-md shadow-blue-200",
  products:
    "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md shadow-orange-200",
  pending:
    "bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-md shadow-rose-200",
};

// Updated KpiCard with attractive icons
const KpiCard = memo(({ title, value, icon: Icon, variant }) => (
  <div className="bg-white py-6 px-4 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-transform hover:scale-[1.02] sm:py-8 sm:px-4 sm:rounded-xl">
    <div
      className={`p-4 rounded-full text-xl ${ICON_STYLES[variant]} transition-all duration-300 hover:scale-110`}
    >
      <Icon />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
));

const Metrics = ({ refreshKey }) => {
  const { fetchData, loading } = useApi(
    `${import.meta.env.VITE_BASE_URL}/api/admin/metrics`
  );
  const [metrics, setMetrics] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const loadMetrics = async () => {
      const res = await fetchData("/");
      if (res) setMetrics(res);
    };
    loadMetrics();
  }, [refreshKey]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !metrics) return <ShimmerMetrics />;

  const totalRevenue = Number(metrics.totalRevenue || 0);
  const totalOrders = Number(metrics.totalOrders || 0);
  const totalProducts = Number(metrics.totalProducts || 0);
  const pendingDelivery = metrics.ordersByStatus
    .filter((o) => !["delivered", "canceled"].includes(o.status.toLowerCase()))
    .reduce((sum, o) => sum + Number(o.count || 0), 0);

  const topProductData = metrics.topProducts.map((p) => ({
    name: p.productName,
    sold: Number(p.quantitySold || 0),
    revenue: Number(p.price || 100) * Number(p.quantitySold || 0),
  }));

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
      axisLabel: {
        rotate: isMobile ? 45 : 0, // rotate for mobile
        interval: 0,
        fontSize: isMobile ? 10 : 12,
        formatter: (value) =>
          value.length > 10 ? value.slice(0, 10) + "…" : value, // truncate long names
        margin: 10, // space between labels and axis line
      },
    },
    yAxis: {
      type: "value", // must define yAxis for vertical bars
    },
    series: [
      {
        type: "bar",
        data: topProductData.map((d, idx) => ({
          value: d.sold,
          itemStyle: { color: COLORS[idx % COLORS.length] },
        })),
        barWidth: isMobile ? 30 : 70, // smaller bars on mobile
      },
    ],
    grid: {
      left: 27,
      right: 10,
      top: 20,
      bottom: isMobile ? 60 : 50, // extra space for rotated labels
    },
  };

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
    <div className="space-y-8 sm:p-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      {/* KPI Cards - scrollable row on mobile */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible pb-3 scrollbar-hide">
        <div className="flex-shrink-0 w-64 sm:w-auto">
          <KpiCard
            title="Total Revenue"
            value={`₹${totalRevenue.toFixed(2)}`}
            icon={FaRupeeSign}
            variant="revenue"
          />
        </div>

        <div className="flex-shrink-0 w-64 sm:w-auto">
          <KpiCard
            title="Total Orders"
            value={totalOrders}
            icon={FaShoppingCart}
            variant="orders"
          />
        </div>

        <div className="flex-shrink-0 w-64 sm:w-auto">
          <KpiCard
            title="Total Products"
            value={totalProducts}
            icon={FaBoxOpen}
            variant="products"
          />
        </div>

        <div className="flex-shrink-0 w-64 sm:w-auto">
          <KpiCard
            title="Pending Delivery"
            value={pendingDelivery}
            icon={FaTruckLoading}
            variant="pending"
          />
        </div>
      </div>

      {/* Top Products Bar Chart */}
      <div className=" sm:bg-white sm:p-6 rounded-none sm:rounded-xl overflow-x-auto text-lg sm:text-xl ">
        <h3 className="text-gray-700 font-semibold mb-4 sm:mb-4">
          Top Products Sold
        </h3>
        <div
          style={{ minWidth: isMobile ? topProductData.length * 50 : "100%" }}
        >
          <ReactECharts
            option={topProductsOption}
            style={{ height: 200, width: "100%" }}
          />
        </div>
      </div>

      {/* Revenue Trend Sparkline */}
      <div className="w-full sm:bg-white sm:p-6 rounded-none sm:rounded-xl">
        <h3 className="text-gray-700 font-semibold mb-2 sm:mb-4 text-lg sm:text-xl">
          Revenue Trend
        </h3>
        <ReactECharts
          option={{
            ...revenueTrendOption,
            grid: { left: 0, right: 0, top: 10, bottom: 10 },
            xAxis: {
              ...revenueTrendOption.xAxis,
              axisLabel: { show: true, fontSize: 8, rotate: 30 },
            },
            yAxis: {
              ...revenueTrendOption.yAxis,
              show: true,
              axisLabel: { fontSize: 8 },
            },
            series: revenueTrendOption.series.map((s) => ({
              ...s,
              lineStyle: { width: 2 },
              areaStyle: { opacity: 0.3 },
            })),
          }}
          style={{ width: "100%", height: 130, minWidth: 0 }}
        />
      </div>

      {/* Scrollable Product Cards */}
      <div className="sm:bg-white sm:p-6 sm:rounded-xl sm:shadow-sm">
        <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-2 sm:mb-4 text-lg sm:text-xl">
          <FaBoxOpen /> Top Products
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 sm:overflow-x-auto sm:pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {metrics.topProducts.map((product) => (
            <div
              key={product.productId}
              className="flex flex-row gap-2 sm:gap-0 sm:flex-col items-center sm:items-center bg-transparent sm:bg-slate-50/80 rounded-none sm:rounded-xl p-2 sm:p-4 hover:scale-100 sm:hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="h-30 w-28 object-cover rounded-md mb-0 sm:mb-2"
              />
              <div className="text-center sm:text-center">
                <p className="font-medium text-gray-800 truncate text-sm sm:text-lg">
                  {product.productName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {product.productType}
                </p>
                <p className="text-slate-700 font-semibold mt-1 sm:mt-1 truncate text-sm sm:text-lg">
                  Sold: {Number(product.quantitySold || 0)} | Revenue: ₹
                  {Number(product.price || 100) *
                    Number(product.quantitySold || 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
