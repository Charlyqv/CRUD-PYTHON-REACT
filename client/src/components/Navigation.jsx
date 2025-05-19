import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./../css/Navigation.css";

export const Navigation = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);
  
    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    // const handleMouseEnter = () => {
    //   setIsCollapsed(false);
    // };
  
    // const handleMouseLeave = () => {
    //   setIsCollapsed(true);
    // };
  
    const menuItems = [
      { icon: "fa-qrcode", text: "Dashboard", path:"/" },
      { icon: "fa-square-check", text: "Validar Certificados", path:"/validar-certificados" },
      { icon: "fa-list-check", text: "Tasks", path:"/tasks" },
      { icon: "fa-list-ol", text: "Lista Formularios", path:"/lista-formulario" },
      // { icon: "fa-book", text: "Formulario", path:"/form" },
      // { icon: "fa-pen", text: "Service" },
      // { icon: "fa-id-card", text: "Contact" },
    ];
  
    return (
      <div className={`wrapper ${isCollapsed ? "hover_collapse" : ""}`}>
        <div className="top_navbar">
          <div className="logo">Foolish Dev</div>
  
          <div className="menu">
            <div className="hamburger" onClick={handleToggle}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
  
        <div className="sidebar">
          <div className="sidebar_inner">
            <ul>
              {menuItems.map((item, index) => (
                <li 
                  key={index}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                >
                  {/* <a href="#">
                    <span className="icon">
                      <i className={`fa ${item.icon}`}></i>
                    </span>
                    <span className="text">{item.text}</span>
                  </a> */}
                  <Link to={item.path}>
                    <span className="icon">
                      <i className={`fa ${item.icon}`}></i>
                    </span>
                    <span className="text">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

//   const wrapperRef = useRef(null);
//   const hamburgerRef = useRef(null);
//   const liRefs = useRef([]);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const hamburger = hamburgerRef.current;

//     // Mouse enter
//     const handleMouseEnter = (li) => {
//       wrapper.classList.remove("hover_collapse");
//     };

//     // Mouse leave
//     const handleMouseLeave = (li) => {
//       wrapper.classList.add("hover_collapse");
//     };

//     // Agrega eventos a cada li
//     liRefs.current.forEach((li) => {
//       li.addEventListener("mouseenter", () => handleMouseEnter(li));
//       li.addEventListener("mouseleave", () => handleMouseLeave(li));
//     });

//     // Click del botón hamburguesa
//     hamburger.addEventListener("click", () => {
//       wrapper.classList.toggle("hover_collapse");
//     });

//     // Limpieza al desmontar
//     return () => {
//       liRefs.current.forEach((li) => {
//         li.removeEventListener("mouseenter", () => handleMouseEnter(li));
//         li.removeEventListener("mouseleave", () => handleMouseLeave(li));
//       });

//       hamburger.removeEventListener("click", () => {
//         wrapper.classList.toggle("hover_collapse");
//       });
//     };
//   }, []);

//   return (
//     <div class="wrapper hover_collapse">

//       <div class="top_navbar">
//         {/* <!-- logo --> */}
//           <div class="logo">Foolish Dev</div>
//         {/* <!-- menu button --> */}
//         <div class="menu">
//           <div class="hamburger">
//           <i class="fas fa-bars"></i>
//           </div>
//         </div>
//       </div>

//       <div class="sidebar">
//         <div class="sidebar_inner">
//           <ul>
//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-qrcode"></i></span>
//             <span class="text">Dashboard</span>
//               </a>
//               </li>

//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-link"></i></span>
//             <span class="text">Shortcuts</span>
//               </a>
//               </li>
//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-eye"></i></span>
//             <span class="text">Overview</span>
//               </a>
//               </li>
//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-book"></i></span>
//             <span class="text">Event</span>
//               </a>
//               </li>
//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-question-circle"></i></span>
//             <span class="text">About</span>
//               </a>
//               </li>
//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-pen"></i></span>
//             <span class="text">Service</span>
//               </a>
//               </li>
//               <li>
//               <a href="#">
//             <span class="icon"><i class="fa fa-id-card"></i></span>
//             <span class="text">Contact</span>
//               </a>
//               </li>
//           </ul>
//         </div>
//       </div>

//     </div>
//     // <div className="flex justify-between py-3">
//     //   <Link to="/tasks"> 
//     //     <h1 className="font-bold text-3x1 mb-4">Task App</h1> 
//     //   </Link>
//     //   <button className="bg-indigo-500 px-3 py-2 rounded-lg">
//     //     <Link to="/tasks-create"> Create Task </Link>
//     //   </button>
//     // </div>
//   )
// }
