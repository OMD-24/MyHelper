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
  HiOutlineCheckBadge,
} from "react-icons/hi2";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  const steps = [
    { num: "01", title: "Post a Task", desc: "Describe what you need help with, set a budget, and post to your community.", icon: "📝", color: "from-primary-500 to-primary-600" },
    { num: "02", title: "Get Responses", desc: "Nearby helpers see your task and send proposals with their rates.", icon: "🤝", color: "from-accent-400 to-accent-500" },
    { num: "03", title: "Get It Done", desc: "Choose the best person, get your task done, and rate the experience.", icon: "✅", color: "from-success-500 to-success-600" },
  ];

  const features = [
    { icon: <HiOutlineMapPin className="w-6 h-6" />, title: "Hyperlocal", desc: "Find help right in your neighborhood within minutes" },
    { icon: <HiOutlineCurrencyRupee className="w-6 h-6" />, title: "Fair Income", desc: "Earn money by helping people near you, on your schedule" },
    { icon: <HiOutlineShieldCheck className="w-6 h-6" />, title: "Verified & Safe", desc: "ID verification, ratings, and reviews for every user" },
    { icon: <HiOutlineUserGroup className="w-6 h-6" />, title: "For Everyone", desc: "Workers, students, homemakers — anyone who can help" },
    { icon: <HiOutlineBolt className="w-6 h-6" />, title: "Urgent Help", desc: "Emergency mode for medical and critical situations" },
    { icon: <HiOutlineDevicePhoneMobile className="w-6 h-6" />, title: "Works Offline", desc: "PWA app that works even on slow 2G networks" },
  ];

  const stats = [
    { value: "10K+", label: "Tasks Done" },
    { value: "5K+", label: "Workers Earning" },
    { value: "50+", label: "Communities" },
    { value: "₹2L+", label: "Income Generated" },
  ];

  return (
    <div className="animate-fade-in">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-700/30 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] -ml-48 -mb-48" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-dark text-white/80 text-[13px] font-semibold px-5 py-2.5 rounded-full mb-8 border border-white/10">
              <HiOutlineHeart className="w-4 h-4 text-accent-400" />
              Built for Social Awareness
              <HiOutlineCheckBadge className="w-4 h-4 text-primary-300" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Turn Free Time
              <br />
              <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-warning-400 bg-clip-text text-transparent">
                Into Income
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-200/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              A community platform where people post everyday tasks and anyone
              nearby can help — earning money while solving real problems.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="group flex items-center gap-2.5 px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-[1.02] transition-all duration-300 text-base"
              >
                Get Started Free
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="flex items-center gap-2 px-8 py-4 glass-dark text-white font-semibold rounded-2xl border border-white/15 hover:border-white/30 hover:bg-white/10 transition-all duration-300 text-base"
              >
                I Have an Account
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z" fill="#FAFAF9" />
          </svg>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-gradient">{s.value}</p>
                <p className="text-[13px] text-surface-400 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[12px] font-bold text-primary-500 uppercase tracking-[0.2em] mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-black text-surface-800 tracking-tight">
            Three Simple Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-white rounded-3xl p-8 border border-surface-100 card-hover group"
            >
              {/* Step number */}
              <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-sm mb-5 shadow-lg shadow-primary-500/15 group-hover:scale-110 transition-transform duration-300`}>
                {step.num}
              </div>
              <span className="text-3xl mb-3 block">{step.icon}</span>
              <h3 className="text-lg font-bold text-surface-800 mb-2">{step.title}</h3>
              <p className="text-[14px] text-surface-400 leading-relaxed">{step.desc}</p>

              {/* Connector line */}
              {i < 2 && (
                <div className="hidden md:block absolute top-12 -right-3 w-6 h-0.5 bg-surface-200" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-white border-y border-surface-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold text-primary-500 uppercase tracking-[0.2em] mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-black text-surface-800 tracking-tight">
              Why Sahayak?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 p-6 rounded-2xl border border-surface-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-100 group-hover:scale-110 transition-all duration-300">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-bold text-surface-800 mb-1">{f.title}</h4>
                  <p className="text-[13px] text-surface-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL IMPACT ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-[2rem] p-10 md:p-16 text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-500/10 rounded-full -ml-30 -mb-30" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />

          <div className="relative">
            <p className="text-[12px] font-bold text-primary-200 uppercase tracking-[0.2em] mb-4">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
              More Than Just an App
            </h2>
            <p className="text-primary-100/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Sahayak bridges the gap between people who need help and those who can
              provide it. We empower daily wage workers, students, and communities with
              dignified income opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["💪 Dignity of Labor", "🤝 Community Bonding", "💰 Financial Inclusion", "🏘️ Self-Reliance"].map((tag) => (
                <span
                  key={tag}
                  className="glass-dark text-white/80 text-[13px] font-semibold px-5 py-2.5 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-surface-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-surface-400 text-lg mb-10 font-medium">
            Join Sahayak today and start building a stronger community.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2.5 px-10 py-4.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-2xl hover:from-accent-400 hover:to-accent-500 transition-all duration-300 text-lg shadow-xl shadow-accent-500/25 hover:shadow-accent-500/40"
          >
            Join Now — It's Free
            <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}