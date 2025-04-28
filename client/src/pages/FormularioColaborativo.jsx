import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from 'react-router-dom';

export const FormularioColaborativo = () => {

  const location = useLocation();
  const { formId } = location.state || {}; 

  if (!formId) return <div>No hay formulario seleccionado</div>;
    
    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        comentario: ""
      });
    
      useEffect(() => {
        const docRef = doc(db, "formularios", formId);
    
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setFormulario(docSnap.data());
          }
        });
    
        return () => unsubscribe();
      }, []);
    
      const handleChange = async (e) => {
        const { name, value } = e.target;
    
        const nuevoFormulario = {
          ...formulario,
          [name]: value
        };
    
        setFormulario(nuevoFormulario);
        await setDoc(doc(db, "formularios", formId), nuevoFormulario, { merge: true });
      };

    return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2>Formulario colaborativo</h2>
        {/* <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={handleChange}
            style={{ display: "block", marginBottom: "10px", width: "100%", color: "black" }}
        />
        <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formulario.email}
            onChange={handleChange}
            style={{ display: "block", marginBottom: "10px", width: "100%", color: "black" }}
        /> */}
        <textarea
            name="comentario"
            placeholder="Comentario"
            value={formulario.comentario}
            onChange={handleChange}
            style={{ display: "block", marginBottom: "10px", width: "100%", color: "black" }}
        />
    </div>
    );
}
