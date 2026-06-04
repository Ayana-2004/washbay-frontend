// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi'
// import { FaWhatsapp } from 'react-icons/fa'
// import { FiCheckCircle } from 'react-icons/fi'

// interface ServiceImage { url: string; alt?: string; }
// interface Service { id: string; title: string; description: string; price: number; image?: ServiceImage; }
// interface Testimonial { id: string; name: string; role: string; quote: string; }
// interface GalleryItem { id: string; title: string; description: string; image: { url: string; alt?: string }; }
// // interface PayloadServiceDoc { id: string; title: string; description: string; price: number; image?: { url: string; alt?: string }; }
// interface PayloadTestimonialDoc { id: string; name: string; role: string; quote: string; }
// interface PayloadGalleryDoc { id: string; title: string; description: string; image: { url: string; alt?: string }; }

// const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

// const FALLBACK_SERVICES: Service[] = [
//   { id: "1", title: "Exterior Wash", description: "Remove dirt, dust, mud, and road grime for a spotless finish.", price: 499 },
//   { id: "2", title: "Foam Wash", description: "Deep cleaning with premium foam technology.", price: 599 },
//   { id: "3", title: "Interior Cleaning", description: "Dashboard, seats, mats, and cabin cleaning.", price: 799 },
//   { id: "4", title: "Vacuum Cleaning", description: "Complete dust removal from interiors.", price: 399 },
//   { id: "5", title: "Wax Polish", description: "Restore shine and protect your vehicle paint.", price: 999 },
//   { id: "6", title: "Bike Wash", description: "Professional cleaning for motorcycles and scooters.", price: 199 },
//   { id: "7", title: "SUV & Premium Care", description: "Special care for larger and premium vehicles.", price: 1499 },
// ];

// const FALLBACK_TESTIMONIALS: Testimonial[] = [
//   { id: "1", name: "John Mathew", role: "Exterior Wash Customer", quote: "Excellent service and attention to detail. My car looked better than the day I bought it." },
//   { id: "2", name: "Sarah Joseph", role: "Foam Wash Customer", quote: "Professional team and remarkably quick turnaround. The results exceeded every expectation." },
//   { id: "3", name: "Akhil Raj", role: "Full Detailing Customer", quote: "An outstanding detailing service with results that speak for themselves. Truly exceptional." },
// ];

// // ─── Booking Form ─────────────────────────────────────────
// function BookingForm({ services, cmsUrl }: { services: Service[], cmsUrl: string }) {
//   const [name, setName] = useState('')
//   const [phone, setPhone] = useState('')
//   const [vehicleType, setVehicleType] = useState('')
//   const [selectedService, setSelectedService] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async () => {
//     if (!name || !phone || !vehicleType || !selectedService || !date || !time) {
//       alert('Please fill all fields.')
//       return
//     }
//     setLoading(true)
//     try {
//       await fetch(`${cmsUrl}/api/bookings`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, phone, vehicleType, service: selectedService, date, time, status: 'pending' }),
//       })
//       setSubmitted(true)
//     } catch {
//       alert('Something went wrong. Please try again.')
//     }
//     setLoading(false)
//   }

//   if (submitted) {
//     return (
//       <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--surface)", textAlign: "center" }}>
//         <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚗</div>
//         <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Booking Confirmed!</h3>
//         <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
//           We&apos;ll contact you shortly to confirm your appointment.
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--surface)" }}>
//       <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
//           <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
//           <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
//         </div>
//         <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}
//           style={{ background: "var(--surface-2)", border: "1px solid rgba(232,226,217,0.15)", color: vehicleType ? "#e8e2d9" : "rgba(232,226,217,0.3)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 20px", outline: "none", appearance: "none", cursor: "pointer" }}>
//           <option value="" disabled>Select Vehicle Type</option>
//           {["Sedan", "SUV", "Hatchback", "Bike", "Truck", "Van"].map(v => <option key={v} value={v.toLowerCase()}>{v}</option>)}
//         </select>
//         <select value={selectedService} onChange={e => setSelectedService(e.target.value)}
//           style={{ background: "var(--surface-2)", border: "1px solid rgba(232,226,217,0.15)", color: selectedService ? "#e8e2d9" : "rgba(232,226,217,0.3)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 20px", outline: "none", appearance: "none", cursor: "pointer" }}>
//           <option value="" disabled>Select Service</option>
//           {services.map(s => <option key={s.id} value={s.id}>{s.title} — ₹{s.price.toLocaleString("en-IN")}</option>)}
//         </select>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
//           <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//           <input type="time" value={time} onChange={e => setTime(e.target.value)} />
//         </div>
//         <button onClick={handleSubmit} disabled={loading} className="btn-gold" style={{ width: "100%", textAlign: "center", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}>
//           {loading ? "Confirming..." : "Confirm Booking"}
//         </button>
//       </div>
//     </div>
//   )
// }

// // ─── Review Form ──────────────────────────────────────────
// function ReviewForm({ services, cmsUrl }: { services: Service[], cmsUrl: string }) {
//   const [name, setName] = useState('')
//   const [comment, setComment] = useState('')
//   const [rating, setRating] = useState(0)
//   const [hover, setHover] = useState(0)
//   const [service, setService] = useState('')
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async () => {
//     if (!name || !comment || rating === 0) {
//       alert('Please fill all fields and select a rating.')
//       return
//     }
//     setLoading(true)
//     try {
//       await fetch(`${cmsUrl}/api/testimonials`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, review: comment, rating: String(rating), role: service || 'Customer' }),
//       })
//       setSubmitted(true)
//     } catch {
//       alert('Something went wrong. Please try again.')
//     }
//     setLoading(false)
//   }

//   if (submitted) {
//     return (
//       <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--obsidian)", textAlign: "center" }}>
//         <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
//         <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Thank You!</h3>
//         <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Your review has been submitted successfully.</p>
//       </div>
//     )
//   }

//   return (
//     <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--obsidian)" }}>
//       <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
//         <div>
//           <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>Your Rating *</p>
//           <div style={{ display: "flex", gap: "8px" }}>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
//                 style={{ background: "none", border: "none", cursor: "pointer", fontSize: "2rem", padding: "4px", color: star <= (hover || rating) ? "#c9a84c" : "rgba(232,226,217,0.2)", transition: "color 0.2s, transform 0.2s", transform: star <= (hover || rating) ? "scale(1.2)" : "scale(1)" }}>★</button>
//             ))}
//           </div>
//           {rating > 0 && (
//             <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--gold)", marginTop: "0.5rem", letterSpacing: "0.1em" }}>
//               {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
//             </p>
//           )}
//         </div>
//         <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
//         <select value={service} onChange={e => setService(e.target.value)}
//           style={{ background: "var(--surface-2)", border: "1px solid rgba(232,226,217,0.15)", color: service ? "#e8e2d9" : "rgba(232,226,217,0.3)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 20px", outline: "none", appearance: "none", cursor: "pointer" }}>
//           <option value="">Select Service (Optional)</option>
//           {services.map(s => <option key={s.id} value={`${s.title} Customer`}>{s.title}</option>)}
//         </select>
//         <textarea rows={5} placeholder="Tell us about your experience..." value={comment} onChange={e => setComment(e.target.value)} />
//         <button onClick={handleSubmit} disabled={loading} className="btn-gold" style={{ width: "100%", textAlign: "center", opacity: loading ? 0.7 : 1 }}>
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </div>
//     </div>
//   )
// }

// // ─── Main Page ────────────────────────────────────────────
// export default function Home() {
//   const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
//   const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);

//   // useEffect(() => {
//   //   fetch(`${CMS_URL}/api/services?limit=10&depth=1`)
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       if (data?.docs?.length > 0) {
//   //         setServices(data.docs.map((doc: PayloadServiceDoc) => ({
//   //           id: doc.id, title: doc.title, description: doc.description, price: doc.price,
//   //           image: doc.image ? { url: doc.image.url.startsWith("http") ? doc.image.url : `${CMS_URL}${doc.image.url}`, alt: doc.image.alt || doc.title } : undefined,
//   //         })));
//   //       }
//   //     }).catch(() => {});
//   // }, []);

//   useEffect(() => {
//     fetch(`${CMS_URL}/api/testimonials?limit=10`)
//       .then(res => res.json())
//       .then(data => {
//         if (data?.docs?.length > 0) {
//           setTestimonials(data.docs.map((doc: PayloadTestimonialDoc) => ({
//             id: doc.id, name: doc.name, role: doc.role, quote: doc.quote,
//           })));
//         }
//       }).catch(() => {});
//   }, []);

//   // useEffect(() => {
//   //   fetch(`${CMS_URL}/api/gallery?limit=10&depth=1`)
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       if (data?.docs?.length > 0) {
//   //         setGallery(data.docs.map((doc: PayloadGalleryDoc) => ({
//   //           id: doc.id, title: doc.title, description: doc.description,
//   //           image: { url: doc.image.url.startsWith("http") ? doc.image.url : `${CMS_URL}${doc.image.url}`, alt: doc.image.alt || doc.title },
//   //         })));
//   //       }
//   //     }).catch(() => {});
//   // }, []);

//   return (
//     <main className="min-h-screen" style={{ background: "#080808", color: "#e8e2d9", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         :root {
//           --gold: #c9a84c; --gold-light: #e8d5a0;
//           --obsidian: #080808; --surface: #111111; --surface-2: #161616;
//           --border: rgba(201,168,76,0.2); --text-primary: #e8e2d9;
//           --text-muted: rgba(232,226,217,0.5);
//           --sans: 'Montserrat', sans-serif; --serif: 'Cormorant Garamond', Georgia, serif;
//         }
//         .nav-link { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,226,217,0.65); text-decoration: none; transition: color 0.3s; }
//         .nav-link:hover { color: var(--gold); }
//         .btn-gold { font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; background: var(--gold); color: #080808; padding: 14px 32px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
//         .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
//         .btn-outline { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; background: transparent; color: var(--text-primary); padding: 13px 32px; border: 1px solid rgba(232,226,217,0.3); cursor: pointer; transition: border-color 0.3s, color 0.3s; display: flex; align-items: center; gap: 8px; }
//         .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
//         .service-card { background: var(--surface); border: 1px solid var(--border); transition: border-color 0.4s, transform 0.4s; position: relative; overflow: hidden; }
//         .service-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); transform: translateX(-100%); transition: transform 0.6s; }
//         .service-card:hover::before { transform: translateX(0); }
//         .service-card:hover { border-color: var(--gold); transform: translateY(-4px); }
//         .service-img { width: 100%; height: 200px; object-fit: cover; display: block; filter: brightness(0.85) saturate(0.8); transition: filter 0.4s, transform 0.4s; }
//         .service-card:hover .service-img { filter: brightness(1) saturate(1); transform: scale(1.03); }
//         .stat-number { font-family: var(--serif); font-size: clamp(3rem, 6vw, 5rem); font-weight: 300; color: var(--gold); line-height: 1; letter-spacing: -0.02em; }
//         .testimonial-card { background: var(--surface); border: 1px solid var(--border); padding: 2.5rem; }
//         .overline { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 12px; }
//         .overline::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); flex-shrink: 0; }
//         .price-tag { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.15em; color: var(--gold); margin-top: 1.5rem; display: flex; align-items: center; gap: 8px; }
//         .price-tag::before { content: ''; display: block; width: 20px; height: 1px; background: var(--gold); }
//         input, textarea { background: var(--surface-2); border: 1px solid rgba(232,226,217,0.15); color: var(--text-primary); font-family: var(--sans); font-size: 13px; letter-spacing: 0.05em; padding: 16px 20px; width: 100%; outline: none; transition: border-color 0.3s; }
//         input::placeholder, textarea::placeholder { color: rgba(232,226,217,0.3); text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; }
//         input:focus, textarea:focus { border-color: var(--gold); }
//         .gallery-item { position: relative; overflow: hidden; }
//         .gallery-item img { transition: transform 0.7s ease; }
//         .gallery-item:hover img { transform: scale(1.05); }
//         .gallery-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(to top, rgba(8,8,8,0.95), transparent); }
//         .social-icon { width: 44px; height: 44px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: rgba(232,226,217,0.5); text-decoration: none; transition: border-color 0.3s, color 0.3s, background 0.3s; }
//         .social-icon:hover { border-color: var(--gold); color: var(--gold); }
//       `}</style>

//       {/* ─── NAVBAR ─── */}
//       <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4rem", height: "80px", background: "rgba(8,8,8,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
//         <Image src="/images/washbaylogo-removebg-preview.png" alt="WashBay" width={110} height={42} style={{ objectFit: "contain" }} />
//         <div style={{ display: "flex", gap: "3rem" }}>
//           {[["Home", "#home"], ["Services", "#services"], ["Gallery", "#gallery"], ["About", "#about"], ["Contact", "#contact"]].map(([item, href]) => (
//             <a key={item} href={href} className="nav-link">{item}</a>
//           ))}
//         </div>
//         <a href="#booking" className="btn-gold" style={{ fontSize: "10px", padding: "12px 28px", textDecoration: "none" }}>Book Now</a>
//       </nav>

//       {/* ─── HERO ─── */}
//       <section id="home" style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
//         <Image src="/images/carwashh.png" alt="WashBay Car Wash Balussery" fill priority style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.38) contrast(1.1) saturate(0.85)" }} />
//         <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.2) 100%)", zIndex: 1 }} />
//         <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)", zIndex: 1 }} />
//         <div style={{ position: "relative", zIndex: 2, padding: "0 6rem", maxWidth: "900px" }}>
//           <p className="overline" style={{ marginBottom: "2rem" }}>Premium Car Wash &amp; Detailing Services</p>
//           <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(4rem, 7.5vw, 8rem)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: "#f0ebe3" }}>
//             Give Your Car<span style={{ display: "block", color: "var(--gold)", fontStyle: "italic" }}>The Best Care.</span>
//           </h1>
//           <div style={{ width: "64px", height: "1px", background: "var(--gold)", marginBottom: "2rem" }} />
//           <p style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 300, lineHeight: 1.9, letterSpacing: "0.06em", color: "rgba(232,226,217,0.65)", maxWidth: "480px", marginBottom: "1rem" }}>
//             Professional washing, interior cleaning, foam wash, polishing, and detailing services in Balussery, Kozhikode.
//           </p>
//           <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "6px" }}>
//             <FiMapPin size={14} /> Balussery, Kozhikode
//           </p>
//           <div style={{ display: "flex", gap: "1rem", marginBottom: "5rem", flexWrap: "wrap" }}>
//             <a href="tel:+919876543210" className="btn-gold" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
//               <FiPhone size={14} /> Call Now
//             </a>
//             <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
//               <FaWhatsapp size={16} /> WhatsApp
//             </a>
//             <a href="https://maps.google.com/?q=Balussery,Kozhikode" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
//               <FiMapPin size={14} /> Get Directions
//             </a>
//           </div>
//           <div style={{ display: "flex", gap: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
//             {[["5000+", "Vehicles Serviced"], ["98%", "Satisfaction"], ["5+", "Years"]].map(([num, label]) => (
//               <div key={label}>
//                 <p style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{num}</p>
//                 <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,226,217,0.45)", marginTop: "6px" }}>{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)", zIndex: 2 }} />
//       </section>

//       {/* ─── WELCOME ─── */}
//       <section style={{ padding: "7rem 4rem", background: "var(--surface)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
//           <div>
//             <p className="overline" style={{ marginBottom: "1.5rem" }}>Welcome</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, lineHeight: 1.1, color: "#f0ebe3", marginBottom: "2rem" }}>
//               Welcome to<span style={{ display: "block", fontStyle: "italic", color: "var(--gold)" }}>WashBay</span>
//             </h2>
//             <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
//               At WashBay, we believe every vehicle deserves professional care. Whether it&apos;s a daily commuter, family SUV, luxury car, or bike, our team provides high-quality cleaning services that keep your vehicle looking fresh and well maintained.
//             </p>
//             <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "2rem" }}>
//               Located in Balussery, Kozhikode, WashBay offers professional car washing, interior cleaning, foam wash, polishing, and vehicle detailing services using quality products and modern techniques.
//             </p>
//             <a href="#booking" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>Book a Service</a>
//           </div>
//           <div style={{ position: "relative" }}>
//             <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
//               <Image src="/images/carwashh.png" alt="WashBay Balussery" width={600} height={450} style={{ width: "100%", height: "450px", objectFit: "cover", display: "block", filter: "brightness(0.8) saturate(0.9)" }} />
//             </div>
//             <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "var(--obsidian)", border: "1px solid var(--gold)", padding: "1.5rem 2rem" }}>
//               <p style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--gold)", lineHeight: 1 }}>5+</p>
//               <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "4px" }}>Years of Excellence</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── SERVICES ─── */}
//       <section id="services" style={{ padding: "8rem 4rem", background: "var(--obsidian)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "5rem" }}>
//             <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>What We Offer</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Our Services</h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)" }}>
//             {services.map((service) => (
//               <div key={service.id} className="service-card" style={{ border: "none", borderRadius: 0 }}>
//                 {service.image ? (
//                   <div style={{ overflow: "hidden", height: "200px" }}>
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img src={service.image.url} alt={service.image.alt || service.title} className="service-img" />
//                   </div>
//                 ) : (
//                   <div style={{ height: "200px", background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
//                     <span style={{ fontSize: "2.5rem", opacity: 0.3 }}>🚗</span>
//                   </div>
//                 )}
//                 <div style={{ padding: "2.5rem" }}>
//                   <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "#f0ebe3", marginBottom: "1rem", lineHeight: 1.2 }}>{service.title}</h3>
//                   <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 1.8, color: "var(--text-muted)", letterSpacing: "0.03em" }}>{service.description}</p>
//                   <p className="price-tag">Starting from ₹{service.price.toLocaleString("en-IN")}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── GALLERY ─── */}
//       <section id="gallery" style={{ padding: "8rem 4rem", background: "var(--surface)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ marginBottom: "4rem" }}>
//             <p className="overline" style={{ marginBottom: "1.5rem" }}>Our Work</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Transformation Gallery</h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "var(--border)" }}>
//             {gallery.length > 0 ? gallery.map((item) => (
//               <div key={item.id} className="gallery-item" style={{ background: "var(--obsidian)" }}>
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img src={item.image.url} alt={item.image.alt || item.title} style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} />
//                 <div className="gallery-overlay">
//                   <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "#f0ebe3", marginBottom: "0.4rem" }}>{item.title}</h3>
//                   <p style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{item.description}</p>
//                 </div>
//               </div>
//             )) : (
//               [["Exterior Wash & Shine", "Professional cleaning for a spotless finish."], ["Premium Detailing", "Restoring the original brilliance."]].map(([title, desc]) => (
//                 <div key={title} className="gallery-item" style={{ background: "var(--obsidian)" }}>
//                   <Image src="/images/carwashh.png" alt={title} width={800} height={400} style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} />
//                   <div className="gallery-overlay">
//                     <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "#f0ebe3", marginBottom: "0.4rem" }}>{title}</h3>
//                     <p style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{desc}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       {/* ─── STATS ─── */}
//       <section style={{ padding: "6rem 4rem", background: "var(--obsidian)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
//             {[["5000+", "Vehicles Serviced"], ["98%", "Customer Satisfaction"], ["5+", "Years of Excellence"], ["100%", "Quality Guaranteed"]].map(([num, label], i) => (
//               <div key={label} style={{ padding: "3.5rem 2rem", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
//                 <p className="stat-number">{num}</p>
//                 <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "0.75rem" }}>{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── WHY CHOOSE ─── */}
//       <section style={{ padding: "7rem 4rem", background: "var(--surface)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "5rem" }}>
//             <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Our Promise</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>
//               Why Choose <span style={{ fontStyle: "italic", color: "var(--gold)" }}>WashBay?</span>
//             </h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
//             {[
//               "Modern Equipment",
//               "Quality Cleaning Products",
//               "Experienced Staff",
//               "Affordable Pricing",
//               "Quick Turnaround",
//               "Customer-Focused Service",
//               "Convenient Location in Balussery",
//             ].map((item) => (
//               <div key={item} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", border: "1px solid var(--border)", background: "var(--obsidian)" }}>
//                 <FiCheckCircle size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
//                 <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "#f0ebe3", letterSpacing: "0.05em" }}>{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── ABOUT ─── */}
//       <section id="about" style={{ padding: "8rem 4rem", background: "var(--obsidian)" }}>
//         <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
//           <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>About Us</p>
//           <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3", marginBottom: "2rem" }}>
//             About WashBay <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Balussery</span>
//           </h2>
//           <p style={{ fontFamily: "var(--sans)", fontSize: "14px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
//             Welcome to WashBay, Balussery&apos;s trusted destination for professional car wash and vehicle care services. We are passionate about keeping your vehicles clean, protected, and looking their best.
//           </p>
//           <p style={{ fontFamily: "var(--sans)", fontSize: "14px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "3rem" }}>
//             Whether it&apos;s your family car, SUV, bike, or commercial vehicle, our team provides quality cleaning services using modern equipment and premium cleaning products. At WashBay, we focus on customer satisfaction, attention to detail, and delivering a spotless finish every time.
//           </p>
//           <a href="#booking" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>Visit Us Today</a>
//         </div>
//       </section>

//       {/* ─── TESTIMONIALS ─── */}
//       <section style={{ padding: "8rem 4rem", background: "var(--surface)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "5rem" }}>
//             <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Client Voices</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Trusted By Our Customers</h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)" }}>
//             {testimonials.map((t) => (
//               <div key={t.id} className="testimonial-card" style={{ background: "var(--obsidian)", border: "none", borderRadius: 0 }}>
//                 <p style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 300, fontStyle: "italic", lineHeight: 1.6, color: "rgba(232,226,217,0.8)", marginBottom: "2rem" }}>
//                   &ldquo;{t.quote}&rdquo;
//                 </p>
//                 <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
//                   <div style={{ width: "36px", height: "36px", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                     <span style={{ fontFamily: "var(--serif)", fontSize: "14px", color: "var(--gold)" }}>{t.name[0]}</span>
//                   </div>
//                   <div>
//                     <p style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", color: "#f0ebe3" }}>{t.name}</p>
//                     <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.15em", color: "var(--gold)", marginTop: "2px" }}>{t.role}</p>
//                   </div>
//                   <div style={{ marginLeft: "auto", color: "var(--gold)", fontSize: "14px" }}>★★★★★</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── BOOKING ─── */}
//       <section id="booking" style={{ padding: "8rem 4rem", background: "var(--obsidian)" }}>
//         <div style={{ maxWidth: "720px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "4rem" }}>
//             <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Reserve Your Visit</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Book Your Slot</h2>
//           </div>
//           <BookingForm services={services} cmsUrl={CMS_URL} />
//         </div>
//       </section>

//       {/* ─── REVIEW FORM ─── */}
//       <section style={{ padding: "8rem 4rem", background: "var(--surface)" }}>
//         <div style={{ maxWidth: "640px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "4rem" }}>
//             <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Share Your Experience</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 300, color: "#f0ebe3" }}>Leave a Review</h2>
//           </div>
//           <ReviewForm services={services} cmsUrl={CMS_URL} />
//         </div>
//       </section>

//       {/* ─── SEO LOCATION ─── */}
//       <section style={{ padding: "5rem 4rem", background: "var(--obsidian)", borderTop: "1px solid var(--border)" }}>
//         <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
//           <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Our Location</p>
//           <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 300, color: "#f0ebe3", marginBottom: "1.5rem" }}>
//             Looking for a reliable car wash in Balussery?
//           </h3>
//           <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
//             WashBay serves customers from Balussery and nearby areas including Koorachundu, Naduvannur, Ulliyeri, Atholi, Kakkur, Perambra, and surrounding regions of Kozhikode district. Whether you need a quick wash before a trip or complete vehicle detailing, WashBay offers professional services designed to keep your vehicle clean and protected throughout the year.
//           </p>
//         </div>
//       </section>

//       {/* ─── CONTACT ─── */}
//       <section id="contact" style={{ padding: "8rem 4rem", background: "var(--surface)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ marginBottom: "5rem" }}>
//             <p className="overline" style={{ marginBottom: "1.5rem" }}>Get In Touch</p>
//             <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Contact Us</h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
//             <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
//               {([
//                 [<FiPhone key="phone" size={18} />, "Phone", "+91 98765 43210", "tel:+919876543210"],
//                 [<FaWhatsapp key="wa" size={18} />, "WhatsApp", "+91 98765 43210", "https://wa.me/919876543210"],
//                 [<FiMail key="mail" size={18} />, "Email", "hello@washbay.in", "mailto:hello@washbay.in"],
//                 [<FiMapPin key="map" size={18} />, "Address", "Balussery, Kozhikode, Kerala — 673612", null],
//               ] as [React.ReactNode, string, string, string | null][]).map(([icon, label, value, href]) => (
//                 <div key={label} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }}>
//                   <div style={{ width: "44px", height: "44px", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--gold)" }}>{icon}</div>
//                   <div>
//                     <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "6px" }}>{label}</p>
//                     {href ? (
//                       <a href={href} style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "#f0ebe3", textDecoration: "none", letterSpacing: "0.05em" }}>{value}</a>
//                     ) : (
//                       <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "#f0ebe3", letterSpacing: "0.05em", lineHeight: 1.6 }}>{value}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//               <div>
//                 <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Follow Us</p>
//                 <div style={{ display: "flex", gap: "0.75rem" }}>
//                   <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram"><FiInstagram size={18} /></a>
//                   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook"><FiFacebook size={18} /></a>
//                   <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp"><FaWhatsapp size={18} /></a>
//                 </div>
//               </div>
//             </div>
//             <div style={{ border: "1px solid var(--border)", overflow: "hidden", position: "relative" }}>
//               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15644.728!2d75.8083!3d11.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIxJzAwLjAiTiA3NcKwNDgnMzAuMCJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" width="100%" height="420" style={{ border: 0, display: "block", filter: "grayscale(100%) invert(92%) contrast(83%)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
//               {([
//                 { top: 0, left: 0, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" },
//                 { top: 0, right: 0, borderTop: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" },
//                 { bottom: 0, left: 0, borderBottom: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" },
//                 { bottom: 0, right: 0, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" },
//               ] as React.CSSProperties[]).map((s, i) => (
//                 <div key={i} style={{ position: "absolute", width: "20px", height: "20px", zIndex: 3, ...s }} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── FOOTER ─── */}
//       <footer style={{ background: "var(--obsidian)", borderTop: "1px solid var(--border)" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 4rem 3rem", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "4rem" }}>
//           <div>
//             <Image src="/images/washbaylogo-removebg-preview.png" alt="WashBay" width={180} height={70} style={{ objectFit: "contain", marginBottom: "1.5rem", opacity: 0.9 }} />
//             <p style={{ fontFamily: "var(--sans)", fontSize: "12px", lineHeight: 1.9, letterSpacing: "0.04em", color: "var(--text-muted)", maxWidth: "280px" }}>
//               Premium car wash and detailing services in Balussery, Kozhikode. Crafted for those who demand excellence.
//             </p>
//             <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram"><FiInstagram size={16} /></a>
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook"><FiFacebook size={16} /></a>
//               <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp"><FaWhatsapp size={16} /></a>
//             </div>
//           </div>
//           <div>
//             <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>Quick Links</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//               {[["Home", "#home"], ["Services", "#services"], ["Gallery", "#gallery"], ["About", "#about"], ["Book Now", "#booking"], ["Contact", "#contact"]].map(([link, href]) => (
//                 <a key={link} href={href} style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.08em", color: "var(--text-muted)", textDecoration: "none" }}>{link}</a>
//               ))}
//             </div>
//           </div>
//           <div>
//             <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>Services</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//               {services.slice(0, 6).map(s => (
//                 <a key={s.id} href="#services" style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.08em", color: "var(--text-muted)", textDecoration: "none" }}>{s.title}</a>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div style={{ borderTop: "1px solid var(--border)", padding: "2rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>© 2025 WashBay Balussery. All rights reserved.</p>
//           <a href="https://faircodetech.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", opacity: 0.6 }}>
//             <span style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>Designed &amp; Developed by</span>
//             <Image src="/images/company-logo.webp" alt="Faircode Infotech" width={90} height={24} style={{ objectFit: "contain" }} />
//           </a>
//         </div>
//       </footer>

//     </main>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiMenu, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'

interface ServiceImage { url: string; alt?: string; }
interface Service { id: string; title: string; description: string; price: number; image?: ServiceImage; }
interface Testimonial { id: string; name: string; role: string; quote: string; }
interface GalleryItem { id: string; title: string; description: string; image: { url: string; alt?: string }; }

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

const FALLBACK_SERVICES: Service[] = [
  { id: "1", title: "Exterior Wash", description: "Remove dirt, dust, mud, and road grime for a spotless finish.", price: 499 },
  { id: "2", title: "Foam Wash", description: "Deep cleaning with premium foam technology.", price: 599 },
  { id: "3", title: "Interior Cleaning", description: "Dashboard, seats, mats, and cabin cleaning.", price: 799 },
  { id: "4", title: "Vacuum Cleaning", description: "Complete dust removal from interiors.", price: 399 },
  { id: "5", title: "Wax Polish", description: "Restore shine and protect your vehicle paint.", price: 999 },
  { id: "6", title: "Bike Wash", description: "Professional cleaning for motorcycles and scooters.", price: 199 },
  { id: "7", title: "SUV & Premium Care", description: "Special care for larger and premium vehicles.", price: 1499 },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "John Mathew", role: "Exterior Wash Customer", quote: "Excellent service and attention to detail. My car looked better than the day I bought it." },
  { id: "2", name: "Sarah Joseph", role: "Foam Wash Customer", quote: "Professional team and remarkably quick turnaround. The results exceeded every expectation." },
  { id: "3", name: "Akhil Raj", role: "Full Detailing Customer", quote: "An outstanding detailing service with results that speak for themselves. Truly exceptional." },
];

// ─── Booking Form ─────────────────────────────────────────
function BookingForm({ services, cmsUrl }: { services: Service[], cmsUrl: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !phone || !vehicleType || !selectedService || !date || !time) {
      alert('Please fill all fields.')
      return
    }
    setLoading(true)
    try {
      await fetch(`${cmsUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, vehicleType, service: selectedService, date, time, status: 'pending' }),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--surface)", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚗</div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Booking Confirmed!</h3>
        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          We&apos;ll contact you shortly to confirm your appointment.
        </p>
      </div>
    )
  }

  return (
    <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--surface)" }} className="booking-form-wrap">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div className="form-grid-2">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}
          style={{ background: "var(--surface-2)", border: "1px solid rgba(232,226,217,0.15)", color: vehicleType ? "#e8e2d9" : "rgba(232,226,217,0.3)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 20px", outline: "none", appearance: "none", cursor: "pointer" }}>
          <option value="" disabled>Select Vehicle Type</option>
          {["Sedan", "SUV", "Hatchback", "Bike", "Truck", "Van"].map(v => <option key={v} value={v.toLowerCase()}>{v}</option>)}
        </select>
        <select value={selectedService} onChange={e => setSelectedService(e.target.value)}
          style={{ background: "var(--surface-2)", border: "1px solid rgba(232,226,217,0.15)", color: selectedService ? "#e8e2d9" : "rgba(232,226,217,0.3)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 20px", outline: "none", appearance: "none", cursor: "pointer" }}>
          <option value="" disabled>Select Service</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.title} — ₹{s.price.toLocaleString("en-IN")}</option>)}
        </select>
        <div className="form-grid-2">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        <button onClick={handleSubmit} disabled={loading} className="btn-gold" style={{ width: "100%", textAlign: "center", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  )
}

// ─── Review Form ──────────────────────────────────────────
function ReviewForm({ services, cmsUrl }: { services: Service[], cmsUrl: string }) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [service, setService] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !comment || rating === 0) {
      alert('Please fill all fields and select a rating.')
      return
    }
    setLoading(true)
    try {
      await fetch(`${cmsUrl}/api/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, review: comment, rating: String(rating), role: service || 'Customer' }),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--obsidian)", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Thank You!</h3>
        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Your review has been submitted successfully.</p>
      </div>
    )
  }

  return (
    <div style={{ border: "1px solid var(--border)", padding: "3.5rem", background: "var(--obsidian)" }} className="booking-form-wrap">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>Your Rating *</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "2rem", padding: "4px", color: star <= (hover || rating) ? "#c9a84c" : "rgba(232,226,217,0.2)", transition: "color 0.2s, transform 0.2s", transform: star <= (hover || rating) ? "scale(1.2)" : "scale(1)" }}>★</button>
            ))}
          </div>
          {rating > 0 && (
            <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--gold)", marginTop: "0.5rem", letterSpacing: "0.1em" }}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </p>
          )}
        </div>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <select value={service} onChange={e => setService(e.target.value)}
          style={{ background: "var(--surface-2)", border: "1px solid rgba(232,226,217,0.15)", color: service ? "#e8e2d9" : "rgba(232,226,217,0.3)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 20px", outline: "none", appearance: "none", cursor: "pointer" }}>
          <option value="">Select Service (Optional)</option>
          {services.map(s => <option key={s.id} value={`${s.title} Customer`}>{s.title}</option>)}
        </select>
        <textarea rows={5} placeholder="Tell us about your experience..." value={comment} onChange={e => setComment(e.target.value)} />
        <button onClick={handleSubmit} disabled={loading} className="btn-gold" style={{ width: "100%", textAlign: "center", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────
export default function Home() {
  const [services] = useState<Service[]>(FALLBACK_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [gallery] = useState<GalleryItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${CMS_URL}/api/testimonials?limit=10`)
      .then(res => res.json())
      .then(data => {
        if (data?.docs?.length > 0) {
          setTestimonials(data.docs.map((doc: { id: string; name: string; role: string; quote: string }) => ({
            id: doc.id, name: doc.name, role: doc.role, quote: doc.quote,
          })));
        }
      }).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#080808", color: "#e8e2d9", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #c9a84c; --gold-light: #e8d5a0;
          --obsidian: #080808; --surface: #111111; --surface-2: #161616;
          --border: rgba(201,168,76,0.2); --text-primary: #e8e2d9;
          --text-muted: rgba(232,226,217,0.5);
          --sans: 'Montserrat', sans-serif; --serif: 'Cormorant Garamond', Georgia, serif;
        }
        html { overflow-x: hidden; }
        body { overflow-x: hidden; }

        .nav-link { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,226,217,0.65); text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: var(--gold); }
        .btn-gold { font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; background: var(--gold); color: #080808; padding: 14px 32px; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; text-decoration: none; display: inline-block; }
        .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
        .btn-outline { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; background: transparent; color: var(--text-primary); padding: 13px 32px; border: 1px solid rgba(232,226,217,0.3); cursor: pointer; transition: border-color 0.3s, color 0.3s; display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

        /* ── Navbar ── */
        .navbar { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 0 4rem; height: 80px; background: rgba(8,8,8,0.97); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(201,168,76,0.15); }
        .nav-links { display: flex; gap: 3rem; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--text-primary); padding: 4px; }
        .mobile-menu { display: none; position: fixed; top: 80px; left: 0; right: 0; bottom: 0; background: rgba(8,8,8,0.99); z-index: 49; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; }
        .mobile-menu.open { display: flex; }
        .mobile-menu .nav-link { font-size: 14px; }
        .nav-book-btn { font-size: 10px; padding: 12px 28px; }

        /* ── Hero ── */
        .hero-content { position: relative; z-index: 2; padding: 0 6rem; max-width: 900px; }
        .hero-buttons { display: flex; gap: 1rem; margin-bottom: 5rem; flex-wrap: wrap; }
        .hero-stats { display: flex; gap: 3.5rem; padding-top: 2.5rem; border-top: 1px solid rgba(201,168,76,0.2); }

        /* ── Sections ── */
        .section-pad { padding: 8rem 4rem; }
        .section-pad-sm { padding: 7rem 4rem; }
        .container { max-width: 1200px; margin: 0 auto; }

        /* ── Welcome ── */
        .welcome-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }

        /* ── Services ── */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
        .service-card { background: var(--surface); border: 1px solid var(--border); transition: border-color 0.4s, transform 0.4s; position: relative; overflow: hidden; border: none; border-radius: 0; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); transform: translateX(-100%); transition: transform 0.6s; }
        .service-card:hover::before { transform: translateX(0); }
        .service-card:hover { border-color: var(--gold); transform: translateY(-4px); }
        .service-img { width: 100%; height: 200px; object-fit: cover; display: block; filter: brightness(0.85) saturate(0.8); transition: filter 0.4s, transform 0.4s; }
        .service-card:hover .service-img { filter: brightness(1) saturate(1); transform: scale(1.03); }

        /* ── Stats ── */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .stat-number { font-family: var(--serif); font-size: clamp(3rem, 6vw, 5rem); font-weight: 300; color: var(--gold); line-height: 1; letter-spacing: -0.02em; }

        /* ── Why Choose ── */
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

        /* ── Testimonials ── */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
        .testimonial-card { background: var(--surface); border: 1px solid var(--border); padding: 2.5rem; background: var(--obsidian); border: none; border-radius: 0; }

        /* ── Gallery ── */
        .gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--border); }
        .gallery-item { position: relative; overflow: hidden; background: var(--obsidian); }
        .gallery-item img { transition: transform 0.7s ease; }
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(to top, rgba(8,8,8,0.95), transparent); }

        /* ── Contact ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }

        /* ── Footer ── */
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 4rem; }
        .footer-bottom { border-top: 1px solid var(--border); padding: 2rem 4rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }

        /* ── Forms ── */
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .booking-form-wrap { padding: 3.5rem; }
        input, textarea, select { background: var(--surface-2); border: 1px solid rgba(232,226,217,0.15); color: var(--text-primary); font-family: var(--sans); font-size: 13px; letter-spacing: 0.05em; padding: 16px 20px; width: 100%; outline: none; transition: border-color 0.3s; }
        input::placeholder, textarea::placeholder { color: rgba(232,226,217,0.3); text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; }
        input:focus, textarea:focus { border-color: var(--gold); }

        /* ── Misc ── */
        .overline { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 12px; }
        .overline::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); flex-shrink: 0; }
        .price-tag { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.15em; color: var(--gold); margin-top: 1.5rem; display: flex; align-items: center; gap: 8px; }
        .price-tag::before { content: ''; display: block; width: 20px; height: 1px; background: var(--gold); }
        .social-icon { width: 44px; height: 44px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: rgba(232,226,217,0.5); text-decoration: none; transition: border-color 0.3s, color 0.3s; }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); }

        /* ══════════════════════════════
           TABLET — max 1024px
        ══════════════════════════════ */
        @media (max-width: 1024px) {
          .navbar { padding: 0 2rem; }
          .hero-content { padding: 0 3rem; }
          .section-pad { padding: 6rem 2.5rem; }
          .section-pad-sm { padding: 5rem 2.5rem; }
          .welcome-grid { gap: 3rem; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { border-right: 1px solid var(--border) !important; border-top: 1px solid var(--border); }
          .stats-grid > div:nth-child(4) { border-top: 1px solid var(--border); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: 1fr 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }

        /* ══════════════════════════════
           MOBILE — max 768px
        ══════════════════════════════ */
        @media (max-width: 768px) {
          /* Navbar */
          .navbar { padding: 0 1.25rem; height: 70px; }
          .nav-links { display: none; }
          .nav-book-btn { display: none; }
          .hamburger { display: block; }

          /* Hero */
          .hero-content { padding: 0 1.5rem; max-width: 100%; }
          .hero-buttons { gap: 0.75rem; }
          .hero-buttons a, .hero-buttons button { padding: 12px 20px !important; font-size: 9px !important; }
          .hero-stats { gap: 2rem; flex-wrap: wrap; }

          /* Sections */
          .section-pad { padding: 4rem 1.25rem; }
          .section-pad-sm { padding: 4rem 1.25rem; }

          /* Welcome */
          .welcome-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .welcome-grid > div:last-child { display: none; }

          /* Services */
          .services-grid { grid-template-columns: 1fr; }

          /* Stats */
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stats-grid > div { padding: 2rem 1rem !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { border-right: 1px solid var(--border) !important; border-top: 1px solid var(--border) !important; }
          .stats-grid > div:nth-child(4) { border-top: 1px solid var(--border) !important; }

          /* Why Choose */
          .why-grid { grid-template-columns: 1fr; }

          /* Testimonials */
          .testimonials-grid { grid-template-columns: 1fr; }

          /* Gallery */
          .gallery-grid { grid-template-columns: 1fr; }

          /* Contact */
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .contact-grid > div:last-child { height: 300px; }
          .contact-grid iframe { height: 300px !important; }

          /* Footer */
          .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 1.25rem 2rem !important; }
          .footer-bottom { padding: 1.5rem 1.25rem; flex-direction: column; align-items: flex-start; gap: 1rem; }

          /* Forms */
          .form-grid-2 { grid-template-columns: 1fr; }
          .booking-form-wrap { padding: 1.75rem 1.25rem !important; }
        }

        /* ══════════════════════════════
           SMALL MOBILE — max 480px
        ══════════════════════════════ */
        @media (max-width: 480px) {
          .hero-stats { gap: 1.5rem; }
          .hero-stats > div p:first-child { font-size: 1.6rem !important; }
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <Image src="/images/washbaylogo-removebg-preview.png" alt="WashBay" width={110} height={42} style={{ objectFit: "contain" }} />
        <div className="nav-links">
          {[["Home", "#home"], ["Services", "#services"], ["Gallery", "#gallery"], ["About", "#about"], ["Contact", "#contact"]].map(([item, href]) => (
            <a key={item} href={href} className="nav-link">{item}</a>
          ))}
        </div>
        <a href="#booking" className="btn-gold nav-book-btn" style={{ textDecoration: "none" }}>Book Now</a>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {[["Home", "#home"], ["Services", "#services"], ["Gallery", "#gallery"], ["About", "#about"], ["Contact", "#contact"]].map(([item, href]) => (
          <a key={item} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
        <a href="#booking" className="btn-gold" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Book Now</a>
      </div>

      {/* ─── HERO ─── */}
      <section id="home" style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Image src="/images/carwashh.png" alt="WashBay Car Wash Balussery" fill priority style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.38) contrast(1.1) saturate(0.85)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.2) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)", zIndex: 1 }} />
        <div className="hero-content">
          <p className="overline" style={{ marginBottom: "2rem" }}>Premium Car Wash &amp; Detailing Services</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(3rem, 7.5vw, 8rem)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: "#f0ebe3" }}>
            Give Your Car<span style={{ display: "block", color: "var(--gold)", fontStyle: "italic" }}>The Best Care.</span>
          </h1>
          <div style={{ width: "64px", height: "1px", background: "var(--gold)", marginBottom: "2rem" }} />
          <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 300, lineHeight: 1.9, letterSpacing: "0.06em", color: "rgba(232,226,217,0.65)", maxWidth: "480px", marginBottom: "1rem" }}>
            Professional washing, interior cleaning, foam wash, polishing, and detailing services in Balussery, Kozhikode.
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <FiMapPin size={14} /> Balussery, Kozhikode
          </p>
          <div className="hero-buttons">
            <a href="tel:+919876543210" className="btn-gold" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiPhone size={14} /> Call Now
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <FaWhatsapp size={16} /> WhatsApp
            </a>
            <a href="https://maps.google.com/?q=Balussery,Kozhikode" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <FiMapPin size={14} /> Get Directions
            </a>
          </div>
          <div className="hero-stats">
            {[["5000+", "Vehicles Serviced"], ["98%", "Satisfaction"], ["5+", "Years"]].map(([num, label]) => (
              <div key={label}>
                <p style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{num}</p>
                <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,226,217,0.45)", marginTop: "6px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)", zIndex: 2 }} />
      </section>

      {/* ─── WELCOME ─── */}
      <section className="section-pad-sm" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="welcome-grid">
            <div>
              <p className="overline" style={{ marginBottom: "1.5rem" }}>Welcome</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, lineHeight: 1.1, color: "#f0ebe3", marginBottom: "2rem" }}>
                Welcome to<span style={{ display: "block", fontStyle: "italic", color: "var(--gold)" }}>WashBay</span>
              </h2>
              <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
                At WashBay, we believe every vehicle deserves professional care. Whether it&apos;s a daily commuter, family SUV, luxury car, or bike, our team provides high-quality cleaning services that keep your vehicle looking fresh and well maintained.
              </p>
              <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "2rem" }}>
                Located in Balussery, Kozhikode, WashBay offers professional car washing, interior cleaning, foam wash, polishing, and vehicle detailing services using quality products and modern techniques.
              </p>
              <a href="#booking" className="btn-gold" style={{ textDecoration: "none" }}>Book a Service</a>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
                <Image src="/images/carwashh.png" alt="WashBay Balussery" width={600} height={450} style={{ width: "100%", height: "450px", objectFit: "cover", display: "block", filter: "brightness(0.8) saturate(0.9)" }} />
              </div>
              <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "var(--obsidian)", border: "1px solid var(--gold)", padding: "1.5rem 2rem" }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--gold)", lineHeight: 1 }}>5+</p>
                <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "4px" }}>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="section-pad" style={{ background: "var(--obsidian)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>What We Offer</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Our Services</h2>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                {service.image ? (
                  <div style={{ overflow: "hidden", height: "200px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image.url} alt={service.image.alt || service.title} className="service-img" />
                  </div>
                ) : (
                  <div style={{ height: "200px", background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "2.5rem", opacity: 0.3 }}>🚗</span>
                  </div>
                )}
                <div style={{ padding: "2.5rem" }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "#f0ebe3", marginBottom: "1rem", lineHeight: 1.2 }}>{service.title}</h3>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 1.8, color: "var(--text-muted)", letterSpacing: "0.03em" }}>{service.description}</p>
                  <p className="price-tag">Starting from ₹{service.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="section-pad" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ marginBottom: "4rem" }}>
            <p className="overline" style={{ marginBottom: "1.5rem" }}>Our Work</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Transformation Gallery</h2>
          </div>
          <div className="gallery-grid">
            {gallery.length > 0 ? gallery.map((item) => (
              <div key={item.id} className="gallery-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image.url} alt={item.image.alt || item.title} style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} />
                <div className="gallery-overlay">
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "#f0ebe3", marginBottom: "0.4rem" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{item.description}</p>
                </div>
              </div>
            )) : (
              [["Exterior Wash & Shine", "Professional cleaning for a spotless finish."], ["Premium Detailing", "Restoring the original brilliance."]].map(([title, desc]) => (
                <div key={title} className="gallery-item">
                  <Image src="/images/carwashh.png" alt={title} width={800} height={400} style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} />
                  <div className="gallery-overlay">
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 400, color: "#f0ebe3", marginBottom: "0.4rem" }}>{title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-pad" style={{ background: "var(--obsidian)", padding: "6rem 4rem" }}>
        <div className="container">
          <div className="stats-grid">
            {[["5000+", "Vehicles Serviced"], ["98%", "Customer Satisfaction"], ["5+", "Years of Excellence"], ["100%", "Quality Guaranteed"]].map(([num, label], i) => (
              <div key={label} style={{ padding: "3.5rem 2rem", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
                <p className="stat-number">{num}</p>
                <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "0.75rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ─── */}
      <section className="section-pad-sm" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Our Promise</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>
              Why Choose <span style={{ fontStyle: "italic", color: "var(--gold)" }}>WashBay?</span>
            </h2>
          </div>
          <div className="why-grid">
            {["Modern Equipment", "Quality Cleaning Products", "Experienced Staff", "Affordable Pricing", "Quick Turnaround", "Customer-Focused Service", "Convenient Location in Balussery"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", border: "1px solid var(--border)", background: "var(--obsidian)" }}>
                <FiCheckCircle size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
                <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "#f0ebe3", letterSpacing: "0.05em" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-pad" style={{ background: "var(--obsidian)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>About Us</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3", marginBottom: "2rem" }}>
            About WashBay <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Balussery</span>
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: "14px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
            Welcome to WashBay, Balussery&apos;s trusted destination for professional car wash and vehicle care services. We are passionate about keeping your vehicles clean, protected, and looking their best.
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: "14px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em", marginBottom: "3rem" }}>
            Whether it&apos;s your family car, SUV, bike, or commercial vehicle, our team provides quality cleaning services using modern equipment and premium cleaning products. At WashBay, we focus on customer satisfaction, attention to detail, and delivering a spotless finish every time.
          </p>
          <a href="#booking" className="btn-gold" style={{ textDecoration: "none" }}>Visit Us Today</a>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-pad" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Client Voices</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Trusted By Our Customers</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <p style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 300, fontStyle: "italic", lineHeight: 1.6, color: "rgba(232,226,217,0.8)", marginBottom: "2rem" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--serif)", fontSize: "14px", color: "var(--gold)" }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", color: "#f0ebe3" }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.15em", color: "var(--gold)", marginTop: "2px" }}>{t.role}</p>
                  </div>
                  <div style={{ marginLeft: "auto", color: "var(--gold)", fontSize: "14px" }}>★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOKING ─── */}
      <section id="booking" className="section-pad" style={{ background: "var(--obsidian)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Reserve Your Visit</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Book Your Slot</h2>
          </div>
          <BookingForm services={services} cmsUrl={CMS_URL} />
        </div>
      </section>

      {/* ─── REVIEW FORM ─── */}
      <section className="section-pad" style={{ background: "var(--surface)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Share Your Experience</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#f0ebe3" }}>Leave a Review</h2>
          </div>
          <ReviewForm services={services} cmsUrl={CMS_URL} />
        </div>
      </section>

      {/* ─── SEO LOCATION ─── */}
      <section style={{ padding: "5rem 1.25rem", background: "var(--obsidian)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Our Location</p>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 300, color: "#f0ebe3", marginBottom: "1.5rem" }}>
            Looking for a reliable car wash in Balussery?
          </h3>
          <p style={{ fontFamily: "var(--sans)", fontSize: "13px", lineHeight: 2, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
            WashBay serves customers from Balussery and nearby areas including Koorachundu, Naduvannur, Ulliyeri, Atholi, Kakkur, Perambra, and surrounding regions of Kozhikode district.
          </p>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-pad" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ marginBottom: "5rem" }}>
            <p className="overline" style={{ marginBottom: "1.5rem" }}>Get In Touch</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: "#f0ebe3" }}>Contact Us</h2>
          </div>
          <div className="contact-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {([
                [<FiPhone key="phone" size={18} />, "Phone", "+91 98765 43210", "tel:+919876543210"],
                [<FaWhatsapp key="wa" size={18} />, "WhatsApp", "+91 98765 43210", "https://wa.me/919876543210"],
                [<FiMail key="mail" size={18} />, "Email", "hello@washbay.in", "mailto:hello@washbay.in"],
                [<FiMapPin key="map" size={18} />, "Address", "Balussery, Kozhikode, Kerala — 673612", null],
              ] as [React.ReactNode, string, string, string | null][]).map(([icon, label, value, href]) => (
                <div key={label} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: "44px", height: "44px", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--gold)" }}>{icon}</div>
                  <div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "6px" }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "#f0ebe3", textDecoration: "none", letterSpacing: "0.05em" }}>{value}</a>
                    ) : (
                      <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "#f0ebe3", letterSpacing: "0.05em", lineHeight: 1.6 }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
              <div>
                <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Follow Us</p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram"><FiInstagram size={18} /></a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook"><FiFacebook size={18} /></a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp"><FaWhatsapp size={18} /></a>
                </div>
              </div>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden", position: "relative" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15644.728!2d75.8083!3d11.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIxJzAwLjAiTiA3NcKwNDgnMzAuMCJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" width="100%" height="420" style={{ border: 0, display: "block", filter: "grayscale(100%) invert(92%) contrast(83%)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              {([
                { top: 0, left: 0, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" },
                { top: 0, right: 0, borderTop: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" },
                { bottom: 0, left: 0, borderBottom: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" },
                { bottom: 0, right: 0, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" },
              ] as React.CSSProperties[]).map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "20px", height: "20px", zIndex: 3, ...s }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "var(--obsidian)", borderTop: "1px solid var(--border)" }}>
        <div className="container footer-grid" style={{ padding: "4rem 4rem 3rem" }}>
          <div>
            <Image src="/images/washbaylogo-removebg-preview.png" alt="WashBay" width={180} height={70} style={{ objectFit: "contain", marginBottom: "1.5rem", opacity: 0.9 }} />
            <p style={{ fontFamily: "var(--sans)", fontSize: "12px", lineHeight: 1.9, letterSpacing: "0.04em", color: "var(--text-muted)", maxWidth: "280px" }}>
              Premium car wash and detailing services in Balussery, Kozhikode. Crafted for those who demand excellence.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram"><FiInstagram size={16} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook"><FiFacebook size={16} /></a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp"><FaWhatsapp size={16} /></a>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>Quick Links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[["Home", "#home"], ["Services", "#services"], ["Gallery", "#gallery"], ["About", "#about"], ["Book Now", "#booking"], ["Contact", "#contact"]].map(([link, href]) => (
                <a key={link} href={href} style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.08em", color: "var(--text-muted)", textDecoration: "none" }}>{link}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {services.slice(0, 6).map(s => (
                <a key={s.id} href="#services" style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.08em", color: "var(--text-muted)", textDecoration: "none" }}>{s.title}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>© 2025 WashBay Balussery. All rights reserved.</p>
          <a href="https://faircodetech.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", opacity: 0.6 }}>
            <span style={{ fontFamily: "var(--sans)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>Designed &amp; Developed by</span>
            <Image src="/images/company-logo.webp" alt="Faircode Infotech" width={90} height={24} style={{ objectFit: "contain" }} />
          </a>
        </div>
      </footer>

    </main>
  );
}