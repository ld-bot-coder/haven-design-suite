import { motion } from "framer-motion";
import {
  Package,
  MessageSquare,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Products",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "New Enquiries",
    value: "48",
    change: "+23%",
    trend: "up",
    icon: MessageSquare,
    color: "bg-sage/10 text-sage",
  },
  {
    title: "Pending Appointments",
    value: "12",
    change: "-5%",
    trend: "down",
    icon: Calendar,
    color: "bg-gold/10 text-gold",
  },
  {
    title: "Monthly Revenue",
    value: "₹24.5L",
    change: "+18%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-terracotta/10 text-terracotta",
  },
];

const chartData = [
  { name: "Jan", enquiries: 30, conversions: 12 },
  { name: "Feb", enquiries: 45, conversions: 18 },
  { name: "Mar", enquiries: 38, conversions: 15 },
  { name: "Apr", enquiries: 52, conversions: 22 },
  { name: "May", enquiries: 48, conversions: 20 },
  { name: "Jun", enquiries: 65, conversions: 28 },
];

const recentEnquiries = [
  {
    id: 1,
    name: "Priya Sharma",
    requirement: "Living room curtains",
    city: "Mumbai",
    status: "new",
  },
  {
    id: 2,
    name: "Rajesh Gupta",
    requirement: "Modular sofa",
    city: "Delhi",
    status: "contacted",
  },
  {
    id: 3,
    name: "Ananya Krishnan",
    requirement: "Bedroom interiors",
    city: "Chennai",
    status: "new",
  },
  {
    id: 4,
    name: "Vikram Patel",
    requirement: "Window blinds",
    city: "Bangalore",
    status: "converted",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-sage" : "text-destructive"
                }`}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <p className="text-3xl font-serif font-semibold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2 admin-card"
        >
          <h3 className="font-serif text-xl mb-6">Enquiries Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="enquiries"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="hsl(var(--sage))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--sage))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="admin-card"
        >
          <h3 className="font-serif text-xl mb-6">Recent Enquiries</h3>
          <div className="space-y-4">
            {recentEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{enquiry.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {enquiry.requirement}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    enquiry.status === "new"
                      ? "bg-primary/10 text-primary"
                      : enquiry.status === "contacted"
                      ? "bg-gold/10 text-gold"
                      : "bg-sage/10 text-sage"
                  }`}
                >
                  {enquiry.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
