import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineBolt,
  HiOutlineMapPin,
  HiOutlineCurrencyRupee,
  HiOutlineHeart,
  HiOutlineArrowRight,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      num: "01",
      title: "Post a Task",
      desc: "Describe what you need help with, set a budget, and post it to your community.",
      icon: "📝",
    },
    {
      num: "02",
      title: "Get Responses",
      desc: "Nearby workers and community members see your task and send proposals.",
      icon: "🤝",
    },
    {
      num: "03",
      title: "Get It Done",
      desc: "Choose the best person, get your task done, and pay securely.",
      icon: "✅",
    },
  ];

  const features = [
    {
      icon: <HiOutlineMapPin className="w-6 h-6" />,
      title: "Hyperlocal",
      desc: "Find help right in your neighborhood",
    },
    {
      icon: <HiOutlineCurrencyRupee className="w-6 h-6" />,
      title: "Fair Income",
      desc: "Earn money by helping people around you",
    },
    {
      icon: <HiOutlineShieldCheck className="w-6 h-6" />,
      title: "Verified & Safe",
      desc: "Ratings, reviews, and identity verification",
    },
    {
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      title: "For Everyone",
      desc: "Workers, students, or anyone who can help",
    },
    {
      icon: <HiOutlineBolt className="w-6 h-6" />,
      title: "Urgent Help",
      desc: "Emergency mode for critical situations",
    },
    {
      icon: <HiOutlineDevicePhoneMobile className="w-6 h-6" />,
      title: "Works Offline",
      desc: "PWA that works even on slow networks",
    },
  ];

  const stats = [
    { value: "10K+", label: "Tasks Completed" },
    { value: "5K+", label: "Workers Earning" },
    { value: "50+", label: "Communities" },
    { value: "₹2L+", label: "Income Generated" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <HiOutlineHeart className="w-4 h-4 text-red-300" />
              Built for Social Awareness
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Turn Your Free Time
              <br />
              <span className="text-accent-400">Into Income</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              A community platform where people post everyday tasks and anyone
              nearby can help — earning money while solving real problems.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-lg"
              >
                Get Started Free
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/20 transition-all text-lg"
              >
                I Have an Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-primary-600">
                  {s.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg">
            Three simple steps to get help or start earning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all group"
            >
              <span className="text-5xl mb-4 block">{step.icon}</span>
              <span className="text-xs font-bold text-primary-400 tracking-widest">
                STEP {step.num}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Why KaamSetu?
            </h2>
            <p className="text-gray-500 text-lg">
              Built with purpose, designed for impact
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Awareness */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              More Than Just an App
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              KaamSetu bridges the gap between people who need help and those who
              can provide it. We empower daily wage workers, students, and communities
              with dignified income opportunities while creating a self-sustaining
              micro-economy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                💪 Dignity of Labor
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                🤝 Community Bonding
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                💰 Financial Inclusion
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
                🏘️ Self-Reliant Society
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join KaamSetu today and start building a stronger community.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-500 transition text-lg shadow-lg"
          >
            Join Now — It's Free
            <HiOutlineArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}