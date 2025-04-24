import Link from "next/link"
import {
  Shield,
  Lock,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Star,
  Users,
  Globe,
  Search,
  FileSearch,
  UserCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>Zentinela</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white">
              Features
            </Link>
            <Link href="#services" className="text-sm font-medium text-white/70 hover:text-white">
              Services
            </Link>
            <Link href="/blog" className="text-sm font-medium text-white/70 hover:text-white">
              Blog
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-white/70 hover:text-white">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium text-white/70 hover:text-white">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/30" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
          <div className="container relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur mb-6">
              <span className="text-primary">New</span>
              <span className="mx-2">|</span>
              <span>Executive Due Diligence OSINT Reports Now Available</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl">
              Advanced Cybersecurity Intelligence for the Modern Enterprise
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-[800px] mb-10">
              Protect your organization with enterprise-grade security intelligence. Uncover digital footprints, assess
              cyber risks, and perform due diligence with our comprehensive OSINT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-white/70">Organizations Protected</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">99.9%</p>
                <p className="text-sm text-white/70">Threat Detection Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
                <p className="text-sm text-white/70">Security Monitoring</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">15+</p>
                <p className="text-sm text-white/70">Years of Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-12 border-y border-white/10 bg-white/5">
          <div className="container">
            <p className="text-center text-sm text-white/50 mb-8">TRUSTED BY LEADING ORGANIZATIONS</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-white/10 rounded-md flex items-center justify-center">
                  <span className="text-white/30 text-xs">LOGO {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Security Intelligence</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our platform provides advanced tools and methodologies to protect your organization from digital threats
                and make informed hiring decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Digital Footprint Analysis</h3>
                <p className="text-white/70">
                  Comprehensive mapping and analysis of online presence across platforms, identifying potential security
                  risks and vulnerabilities.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Breach Detection</h3>
                <p className="text-white/70">
                  Identify exposed credentials and sensitive information through comprehensive scanning of breach
                  databases and dark web sources.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Background Intelligence</h3>
                <p className="text-white/70">
                  Advanced OSINT techniques to verify employment history, assess online reputation, and identify
                  potential risks.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <FileSearch className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Reporting</h3>
                <p className="text-white/70">
                  Comprehensive, easy-to-understand reports with actionable insights, risk scores, and recommendations.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
                <p className="text-white/70">
                  Extensive intelligence gathering across multiple languages, platforms, and regions for comprehensive
                  analysis.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Analysis</h3>
                <p className="text-white/70">
                  Our team of cybersecurity professionals provides context and insights beyond automated tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services/Pricing */}
        <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-black to-primary/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Choose the right level of intelligence for your needs, from basic digital footprint scans to
                comprehensive executive due diligence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Digital Footprint Scan */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col">
                <div className="mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Basic Digital Footprint Scan for Candidates</h3>
                <p className="text-white/70 mb-4">
                  A quick and cost-effective review of a candidate's public online presence.


                </p>
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">Ideal for</p>
                  <p className="font-medium">Entry-level roles, internships, customer-facing positions</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">Turnaround Time</p>
                  <p className="font-medium">2–3 business days</p>
                </div>
                <div className="mb-8">
                  <p className="text-3xl font-bold"></p>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Review of public social media accounts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Assessment of digital professionalism and tone</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Identification of concerning or inappropriate online content</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Basic timeline mapping of digital activity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Public username/email tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Simple, readable report with summary findings</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link href="/signup?plan=basic" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>

              {/* Cyber Risk & Background OSINT Report */}
              <div className="bg-white/10 border border-primary/50 rounded-xl p-8 flex flex-col relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <div className="mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/30">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Cyber Risk & Background OSINT Report</h3>
                <p className="text-white/70 mb-4">
                  A comprehensive view of the candidate's online identity.
                </p>
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">Ideal for</p>
                  <p className="font-medium">
                    Mid- to high-level professionals, remote, finance/tech/legal roles
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">Turnaround Time</p>
                  <p className="font-medium">4–5 business days</p>
                </div>
                <div className="mb-8">
                  <p className="text-3xl font-bold"></p>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Full digital footprint mapping across platforms and aliases</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Social media activity & risk analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Breached data & credential exposure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Forum, Reddit, and username/email tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Domain registration history, public code, app reviews</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>OSINT-based employment verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Summary report with actionable insights and risk score</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link href="/signup?plan=professional" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                  </Link>
                </div>
              </div>

              {/* Executive Due Diligence OSINT Report */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col">
                <div className="mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Executive Due Diligence OSINT Report</h3>
                <p className="text-white/70 mb-4">In-depth due diligence for strategic or sensitive hires.</p>
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">Ideal for</p>
                  <p className="font-medium">C-suite, founders, high-profile or politically exposed hires</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">Turnaround Time</p>
                  <p className="font-medium">5–7 business days</p>
                </div>
                <div className="mb-8">
                  <p className="text-3xl font-bold"></p>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Full audit of digital presence, affiliations, public perception</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Historical online activity analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Media and reputation tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Political/ideological alignment indicators</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Network mapping (public associates, business connections)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Online influence, PR risk, and credibility assessment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Detailed PDF report + optional verbal briefing session</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link href="/signup?plan=enterprise" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our streamlined process makes it easy to get the intelligence you need to make informed decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Choose Your Service</h3>
                <p className="text-white/70">Select the service tier that best fits your needs and requirements.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Provide Information</h3>
                <p className="text-white/70">
                  Share basic details about the subject for our team to begin the investigation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Expert Analysis</h3>
                <p className="text-white/70">
                  Our security professionals conduct a thorough investigation using advanced OSINT techniques.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Receive Report</h3>
                <p className="text-white/70">
                  Get a comprehensive report with actionable insights and recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 md:py-32 bg-white/5">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Organizations across industries trust Zentinela for their security intelligence needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-white/90 mb-6">
                  "Zentinela's Executive Due Diligence report saved us from a potentially disastrous hire. The depth of
                  information they uncovered was impressive and helped us make an informed decision."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-white/50">CHRO, Tech Company</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-white/90 mb-6">
                  "We use Zentinela's Cyber Risk Reports for all our senior hires. The reports are thorough, easy to
                  understand, and have become an essential part of our hiring process."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">MS</span>
                  </div>
                  <div>
                    <p className="font-medium">Michael Smith</p>
                    <p className="text-sm text-white/50">Director of HR, Financial Services</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-white/90 mb-6">
                  "The Basic Digital Footprint Scan is perfect for our needs. It's cost-effective and provides just the
                  right amount of information for our initial screening process."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">AJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-sm text-white/50">Recruitment Manager, Retail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Find answers to common questions about our services and process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">What is OSINT?</h3>
                <p className="text-white/70">
                  OSINT (Open Source Intelligence) refers to intelligence collected from publicly available sources,
                  including social media, websites, forums, and databases. Our experts use ethical OSINT techniques to
                  gather information relevant to security assessments.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">How do you ensure privacy and compliance?</h3>
                <p className="text-white/70">
                  We adhere to strict ethical guidelines and comply with all relevant privacy laws. We only collect
                  publicly available information and ensure all data is handled securely and confidentially.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Can I customize the reports?</h3>
                <p className="text-white/70">
                  Yes, we can tailor our reports to focus on specific areas of concern or interest. Contact our team to
                  discuss your specific requirements and how we can customize our services.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">How quickly can I get a report?</h3>
                <p className="text-white/70">
                  Turnaround times vary by service level, ranging from 2-3 business days for Basic scans to 5-7 business
                  days for Executive Due Diligence reports. Rush options may be available for an additional fee.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">What information do you need to get started?</h3>
                <p className="text-white/70">
                  We typically need basic information such as the subject's name, known email addresses, and social
                  media profiles. Additional information can help improve the accuracy and depth of our reports.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Do you offer ongoing monitoring?</h3>
                <p className="text-white/70">
                  Yes, we offer continuous monitoring services to alert you to new information or changes in a subject's
                  digital footprint. Contact us for details on our monitoring packages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/20 to-black">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Security Intelligence?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10">
              Take the first step toward better security and more informed hiring decisions with Zentinela's
              comprehensive OSINT services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span>Zentinela</span>
              </div>
              <p className="text-white/50 text-sm">Advanced cybersecurity intelligence for the modern enterprise.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#services" className="text-white/50 hover:text-white text-sm">
                    Digital Footprint Scan
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-white/50 hover:text-white text-sm">
                    Cyber Risk Report
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-white/50 hover:text-white text-sm">
                    Executive Due Diligence
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/50 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/50 hover:text-white text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-white text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-white text-sm">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Zentinela. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-white/50 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-white/50 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-white/50 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-white/50 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
