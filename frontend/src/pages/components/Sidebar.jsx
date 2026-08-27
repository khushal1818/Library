// import React, { useState } from "react";
// import { sidebarStyle as s } from "../../assets/dummyStyles";
// import {Bell, BookCopy, ChartNoAxesCombined, ChevronRight, ShieldCheck, UserRound} from 'lucide-react';
// import { Link, useLocation } from "react-router-dom";

//   const iconMap = {
//     dashboard: ChartNoAxesCombined,
//     books: BookCopy,
//     alerts: Bell,
//     admin: ShieldCheck,
//     users: UserRound,
//   };

// const Sidebar = ({
//   title,
//   subtitle,
//   badge,
//   navItems,
//   footerItems = [],
//   accent = "user",
// }) => {

//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const badgeStyles = accent === "admin" ? s.badgeAdmin : s.badgeUser;

//   return (
//     <>
//       <button type="button" onClick={() => setOpen(true)}
//         className={s.mobileMenuButton}
//         >
//           <Menu size={18} />
//       </button>

//       <div className={`${s.mobileOverlay} ${
//         open ? s.mobileOverlayOpen : s.mobileOverlayClosed
//       }`}onClick={() => setOpen(false)}
//       />

//       <aside className={`${s.sidebar} ${
//         open ? s.sidebarOpen : s.sidebarClosed}`}>

//         <div className={s.sidebarHeader}>
//           <div className="min-w-0 pr-3">
//             <div className={s.logoWrapper}>
//               {logoSrc ? (
//                 <img src={logoSrc} alt="logo" className={s.logoImage} />
//               ) : (
//                 <BookCopy size={22} />
//               )}
//             </div>
//               <h2 className={s.title}>{title}</h2>
//               <p className={s.subtitle}>{subtitle}</p>
//               {badge && (
//                 <span className={`${s.badgeBase} ${badgeStyles}`}>{badge}</span>
//               )}
//           </div>
//           <button onClick={() => setOpen(false)} type="button"
//             className={s.closeButton}>
//               <X size={18} />

//           </button>
//         </div>

//         <nav className={s.nav}>
//           {navItems.map((item) => {
//             const Icon = iconMap[item.icon] ?? ChevronRight;
//             const active =
//             location.pathname === item.href ||
//             (item.match ? location.pathname.startsWith(item.match) : false);

//               return (
//                 <Link key={item.label} to={item.href} onClick={() => setOpen(false)}
//                 className={`${s.navLink} ${
//                   active ? s.navLinkActive : s.navLinkActive
//                 }`}
//                 >
//                   <span className={`${s.navIconWrapper} ${
//                     active ? s.navIconWrapperActive : s.navIconWrapperActive
//                   }`}
//                   >
//                     <Icon size={18} />
//                   </span>

//                   <span className="min-w-0 flex-1">
//                       <span className={s.navLabel}>{item.label}</span>
//                       <span className={`${s.navDescription} ${
//                         active ? s.navDescriptionActive : s.navDescriptionActive
//                       }`}
//                       >
//                         {item.description}
//                       </span>
//                   </span>

//                   <ChevronRight size={16} className={active ? navChevronActive : s.navChevronInactive}/>
//                 </Link>
//               )

//            })}
//         </nav>

//            <div className={s.footer}>

//            </div>

//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import { sidebarStyles as s } from "../../assets/dummyStyles";

// import {
//   Bell,
//   BookCopy,
//   ChartNoAxesCombined,
//   ChevronRight,
//   ShieldCheck,
//   UserRound,
//   Menu,
//   X,
//   UserPlus,
//   LogIn,
// } from "lucide-react";

// import { Link, useLocation } from "react-router-dom";

// const iconMap = {
//   dashboard: ChartNoAxesCombined,
//   books: BookCopy,
//   alerts: Bell,
//   admin: ShieldCheck,
//   users: UserRound,
// };

// const Sidebar = ({
//   title,
//   subtitle,
//   badge,
//   navItems = [],
//   footerItems = [],
//   accent = "user",
//   logoSrc,
// }) => {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const badgeStyles =
//     accent === "admin" ? s.badgeAdmin : s.badgeUser;

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className={s.mobileMenuButton}
//       >
//         <Menu size={18} />
//       </button>

//       {/* Mobile Overlay */}
//       <div
//         className={`${s.mobileOverlay} ${
//           open ? s.mobileOverlayOpen : s.mobileOverlayClosed
//         }`}
//         onClick={() => setOpen(false)}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`${s.sidebar} ${
//           open ? s.sidebarOpen : s.sidebarClosed
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className={s.sidebarHeader}>
//           <div className="min-w-0 pr-3">
//             {/* Logo */}
//             <div className={s.logoWrapper}>
//               {logoSrc ? (
//                 <img
//                   src={logoSrc}
//                   alt="logo"
//                   className={s.logoImage}
//                 />
//               ) : (
//                 <BookCopy size={22} />
//               )}
//             </div>

//             {/* Title */}
//             <h2 className={s.title}>{title}</h2>

//             {/* Subtitle */}
//             <p className={s.subtitle}>{subtitle}</p>

//             {/* Badge */}
//             {badge && (
//               <span className={`${s.badgeBase} ${badgeStyles}`}>
//                 {badge}
//               </span>
//             )}
//           </div>

//           {/* Close Button */}
//           <button
//             onClick={() => setOpen(false)}
//             type="button"
//             className={s.closeButton}
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className={s.nav}>
//           {navItems.map((item) => {
//             const Icon =
//               iconMap[item.icon] ?? ChevronRight;

//             const active =
//               location.pathname === item.href ||
//               (item.match
//                 ? location.pathname.startsWith(item.match)
//                 : false);

//             return (
//               <Link
//                 key={item.label}
//                 to={item.href}
//                 onClick={() => setOpen(false)}
//                 className={`${s.navLink} ${
//                   active
//                     ? s.navLinkActive
//                     : s.navLinkInactive
//                 }`}
//               >
//                 {/* Icon */}
//                 <span
//                   className={`${s.navIconWrapper} ${
//                     active
//                       ? s.navIconWrapperActive
//                       : s.navIconWrapperInactive
//                   }`}
//                 >
//                   <Icon size={18} />
//                 </span>

//                 {/* Label + Description */}
//                 <span className="min-w-0 flex-1">
//                   <span className={s.navLabel}>
//                     {item.label}
//                   </span>

//                   {item.description && (
//                     <span
//                       className={`${s.navDescription} ${
//                         active
//                           ? s.navDescriptionActive
//                           : s.navDescriptionInactive
//                       }`}
//                     >
//                       {item.description}
//                     </span>
//                   )}
//                 </span>

//                 {/* Arrow */}
//                 <ChevronRight
//                   size={16}
//                   className={
//                     active
//                       ? s.navChevronActive
//                       : s.navChevronInactive
//                   }
//                 />
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         {footerItems.length > 0 && (
//           <div className={s.footer}>
//             {footerItems.map((item) => {
//               /*
//                * Signup / Login icon
//                */
//               const Icon =
//                 item.icon === "signup"
//                   ? UserPlus
//                   : item.icon === "login"
//                   ? LogIn
//                   : iconMap[item.icon] ?? ChevronRight;

//               /*
//                * Action button
//                * Example:
//                * {
//                *   label: "Logout",
//                *   action: handleLogout,
//                *   kind: "primary"
//                * }
//                */
//               if (item.action) {
//                 return (
//                   <button
//                     key={item.label}
//                     type="button"
//                     onClick={item.action}
//                     className={`${s.footerButton} ${
//                       item.kind === "primary"
//                         ? s.footerButtonPrimary
//                         : s.footerButtonSecondary
//                     }`}
//                   >
//                     <span className={s.footerIconWrapper}>
//                       <Icon size={16} />
//                       <span>{item.label}</span>
//                     </span>

//                     <ChevronRight size={16} />
//                   </button>
//                 );
//               }

//               /*
//                * Normal footer link
//                */
//               const active =
//                 location.pathname === item.href;

//               return (
//                 <Link
//                   key={item.label}
//                   to={item.href}
//                   onClick={() => setOpen(false)}
//                   className={
//                     active
//                       ? s.footerLinkPrimary
//                       : s.footerLinkSecondary
//                   }
//                 >
//                   <span className={s.footerIconWrapper}>
//                     <Icon size={16} />
//                     <span>{item.label}</span>
//                   </span>

//                   <ChevronRight size={16} />
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { sidebarStyles as s } from "../../assets/dummyStyles";

import {
  Bell,
  BookCopy,
  ChartNoAxesCombined,
  ChevronRight,
  ShieldCheck,
  UserRound,
  Menu,
  X,
  UserPlus,
  LogIn,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const iconMap = {
  dashboard: ChartNoAxesCombined,
  books: BookCopy,
  alerts: Bell,
  admin: ShieldCheck,
  users: UserRound,
};

const Sidebar = ({
  title,
  subtitle,
  badge,
  navItems = [],
  footerItems = [],
  accent = "user",
  logoSrc,
}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const badgeStyles = accent === "admin" ? s.badgeAdmin : s.badgeUser;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={s.mobileMenuButton}
      >
        <Menu size={18} />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`${s.mobileOverlay} ${
          open ? s.mobileOverlayOpen : s.mobileOverlayClosed
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`${s.sidebar} ${open ? s.sidebarOpen : s.sidebarClosed}`}
      >
        {/* Header */}
        <div className={s.sidebarHeader}>
          <div className="min-w-0 pr-3">
            {/* Logo */}
            <div className={s.logoWrapper}>
              {logoSrc ? (
                <img src={logoSrc} alt="logo" className={s.logoImage} />
              ) : (
                <BookCopy size={22} />
              )}
            </div>

            {/* Title */}
            <h2 className={s.title}>{title}</h2>

            {/* Subtitle */}
            <p className={s.subtitle}>{subtitle}</p>

            {/* Badge */}
            {badge && (
              <span className={`${s.badgeBase} ${badgeStyles}`}>{badge}</span>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={s.closeButton}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={s.nav}>
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] ?? ChevronRight;

            const active =
              location.pathname === item.href ||
              (item.match ? location.pathname.startsWith(item.match) : false);

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`${s.navLink} ${
                  active ? s.navLinkActive : s.navLinkInactive
                }`}
              >
                {/* Icon */}
                <span
                  className={`${s.navIconWrapper} ${
                    active ? s.navIconWrapperActive : s.navIconWrapperInactive
                  }`}
                >
                  <Icon size={18} />
                </span>

                {/* Label + Description */}
                <span className="min-w-0 flex-1">
                  <span className={s.navLabel}>{item.label}</span>

                  {item.description && (
                    <span
                      className={`${s.navDescription} ${
                        active
                          ? s.navDescriptionActive
                          : s.navDescriptionInactive
                      }`}
                    >
                      {item.description}
                    </span>
                  )}
                </span>

                {/* Arrow */}
                <ChevronRight
                  size={16}
                  className={active ? s.navChevronActive : s.navChevronInactive}
                />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`${s.footer} mt-auto w-full`}>
          {footerItems.map((item) => {
            const Icon =
              item.icon === "signup"
                ? UserPlus
                : item.icon === "login"
                  ? LogIn
                  : (iconMap[item.icon] ?? ChevronRight);

            /* Action Button */
            if (item.action) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className={`
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-3
                    px-3
                    py-3
                    text-left
                    bg-transparent
                    border-0
                    cursor-pointer
                    transition
                    ${
                      item.kind === "primary"
                        ? s.footerButtonPrimary
                        : s.footerButtonSecondary
                    }
                  `}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon size={18} />

                    <span className="truncate">{item.label}</span>
                  </span>

                  <ChevronRight size={17} className="shrink-0" />
                </button>
              );
            }

            /* Normal Login / Signup Link */
            const active = location.pathname === item.href;

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-3
                  px-3
                  py-3
                  no-underline
                  transition
                  ${active ? s.footerLinkPrimary : s.footerLinkSecondary}
                `}
              >
                {/* Icon + Text */}
                <span className="flex items-center gap-3 min-w-0">
                  <Icon size={18} className="shrink-0" />

                  <span className="truncate">{item.label}</span>
                </span>

                {/* Right Arrow */}
                <ChevronRight size={17} className="shrink-0" />
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

