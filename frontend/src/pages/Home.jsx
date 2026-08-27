// import React from "react";
// import Sidebar from "./components/Sidebar";
// import { ArrowRight, BookMarked, ShieldCheck, Users } from "lucide-react";
// import { useAuth } from "../shared/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { homeStyles as s } from "../assets/dummyStyles";

// const navItems = [
//   {
//     label: "Student Dashboard",
//     description: "Open issued books, fines, and profile details",
//     href: "/user/dashboard",
//     match: "/user",
//     icon: "dashboard",
//   },
//   {
//     label: "Admin Dashboard",
//     description: "Manage student issues, returns, and fines",
//     href: "/admin/dashboard",
//     match: "/admin",
//     icon: "admin",
//   },
// ];

// const features = [
//   {
//     icon: BookMarked,
//     title: "Manual book issuing",
//     text: "Track manual book issues, due dates, returns, and dynamic fine calculations in one workflow.",
//   },
//   {
//     icon: Users,
//     title: "Student self-service",
//     text: "Students can review borrowed books, pending fines, academic details, and recent activity quickly.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Admin desk controls",
//     text: "Library staff can manage student records, manual book issues, overdue items, and fine settings from the admin area.",
//   },
// ];

// const Home = () => {
//   const features = [
//     {
//       icon: BookMarked,
//       title: "Manual book issuing",
//       text: "Track manual book issues, due dates, returns, and dynamic fine calculations in one workflow.",
//     },
//     {
//       icon: Users,
//       title: "Student self-service",
//       text: "Students can review borrowed books, pending fines, academic details, and recent activity quickly.",
//     },
//     {
//       icon: ShieldCheck,
//       title: "Admin desk controls",
//       text: "Library staff can manage student records, manual book issues, overdue items, and fine settings from the admin area.",
//     },
//   ];

//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const footerItems = currentUser
//     ? [
//         {
//           label: "Logout",
//           icon: "login",
//           kind: "primary",
//           action: () => {
//             logout();
//             navigate("/");
//           },
//         },
//       ]
//     : [
//         { label: "Login", href: "/login", icon: "login", kind: "primary" },
//         {
//           label: "Sign Up",
//           href: "/signup",
//           icon: "signup",
//           kind: "secondary",
//         },
//       ];

//   return (
//     <div className={s.layoutContainer}>
//       <Sidebar
//         title="ShelfWise"
//         subtitle="Library management portal"
//         badge="Beautiful theme"
//         navItems={navItems}
//         footerItems={footerItems}
//       />

//       <main className={s.mainContent}>
//         <div className={s.innerContainer}>
//           <section className={s.heroSection}>
//             <div>
//               <span className={s.heroBadge}>Library Management website</span>
//               <h1 className={s.heroTitle}>
//                 Manage students, books, returns, and fines in one library
//                 dashboard.
//               </h1>
//               <p className={s.heroText}>
//                 This library management portal gives students a focused
//                 borrowing dashboard and gives admins a practical workspace for
//                 manual criculation, user records and overdue tracking.
//               </p>

//               <div className={s.heroButtons}>
//                 {currentUser ? (
//                   <Link
//                     to={
//                       currentUser.role === "admin"
//                         ? "/admin/dashboard"
//                         : "/user/dashboard"
//                     }
//                     className={s.heroButtonPrimary}
//                   >
//                     GO TO Dashboard
//                     <ArrowRight size={16} />
//                   </Link>
//                 ) : (
//                   <>
//                     <Link to="/signup" className={s.heroButtonPrimary}>
//                       Create Account
//                       <ArrowRight size={16} />
//                     </Link>

//                     <Link to="/login" className={s.heroButtonSecondary}>
//                       Login Now
//                       <ArrowRight size={16} />
//                     </Link>
//                   </>
//                 )}
//               </div>

//               <div className="grid gap-4">
//                 <div className={s.infoCard}>
//                   <p className={s.infoCardLabel}>Library Workflow</p>

//                   <p className={s.infoCardTitle}>
//                     Separate student and admin dashboards built for daily
//                     library operations.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;

import React, { createElement } from "react";
import Sidebar from "./components/Sidebar";
import { ArrowRight, BookMarked, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "../shared/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { homeStyles as s } from "../assets/dummyStyles";

const navItems = [
  {
    label: "Student Dashboard",
    description: "Open issued books, fines, and profile details",
    href: "/user/dashboard",
    match: "/user",
    icon: "dashboard",
  },
  {
    label: "Admin Dashboard",
    description: "Manage student issues, returns, and fines",
    href: "/admin/dashboard",
    match: "/admin",
    icon: "admin",
  },
];

/* ADD THIS */
const features = [
  {
    icon: BookMarked,
    title: "Manual book issuing",
    text: "Track manual book issues, due dates, returns, and dynamic fine calculations in one workflow.",
  },
  {
    icon: Users,
    title: "Student self-service",
    text: "Students can review borrowed books, pending fines, academic details, and recent activity quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Admin desk controls",
    text: "Library staff can manage student records, manual book issues, overdue items, and fine settings from the admin area.",
  },
];

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const footerItems = currentUser
    ? [
        {
          label: "Logout",
          icon: "login",
          kind: "primary",
          action: () => {
            logout();
            navigate("/");
          },
        },
      ]
    : [
        {
          label: "Login",
          href: "/login",
          icon: "login",
          kind: "primary",
        },
        {
          label: "Sign Up",
          href: "/signup",
          icon: "signup",
          kind: "secondary",
        },
      ];

  return (
    <div className={s.layoutContainer}>
      {/* LEFT SIDEBAR */}
      <Sidebar
        title="ShelfWise"
        subtitle="Library management portal"
        badge="Beautiful theme"
        navItems={navItems}
        footerItems={footerItems}
      />

      {/* RIGHT MAIN CONTENT */}
      <main className={s.mainContent}>
        <div className={s.innerContainer}>
          {/* HERO */}
          <section className={s.heroSection}>
            <div className={s.heroGrid}>
              {/* LEFT HERO CONTENT */}
              <div className={s.heroContent}>
                <span className={s.heroBadge}>LIBRARY MANAGEMENT WEBSITE</span>

                <h1 className={s.heroTitle}>
                  Manage students,
                  <br />
                  books, returns, and
                  <br />
                  fines in one library
                  <br />
                  dashboard.
                </h1>

                <p className={s.heroText}>
                  This library management portal gives students a focused
                  borrowing dashboard and gives admins a practical workspace for
                  manual circulation, user records and overdue tracking.
                </p>

                {/* BUTTONS */}
                <div className={s.heroButtons}>
                  {currentUser ? (
                    <Link
                      to={
                        currentUser.role === "admin"
                          ? "/admin/dashboard"
                          : "/user/dashboard"
                      }
                      className={s.heroButtonPrimary}
                    >
                      GO TO Dashboard
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <>
                      <Link to="/signup" className={s.heroButtonPrimary}>
                        Create Account
                        <ArrowRight size={16} />
                      </Link>

                      <Link to="/login" className={s.heroButtonSecondary}>
                        Login Now
                        <ArrowRight size={16} />
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT INFO CARD */}
              <div className={s.heroInfoWrapper}>
                <div className={s.infoCard}>
                  <p className={s.infoCardLabel}>LIBRARY WORKFLOW</p>

                  <p className={s.infoCardTitle}>
                    Separate student and admin dashboards built for daily
                    library operations.
                  </p>

                  <p className={s.infoCardText}>
                    Monitor issue activity, keep profile records updated, and
                    track overdue follow-up without leaving the system.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className={s.featuresGrid}>
            {features.map(({ icon, title, text }) => (
              <article key={title} className={s.featureCard}>
                <span className={s.featureIconWrapper}>
                  {createElement(icon, { size: 22 })}
                </span>

                <h2 className={s.featureTitle}>{title}</h2>

                <p className={s.featureText}>{text}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
