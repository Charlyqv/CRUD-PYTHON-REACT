import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const FormularioList = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
      const fetchForms = async () => {
        const querySnapshot = await getDocs(collection(db, "formularios"));
        const formList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setForms(formList);
      };
  
      fetchForms();
    }, []);

    const onSelectForm = () => {
        console.log('Formulario seleccionado');
    };

    const navigate = useNavigate();

    const handleSelectForm = (formId) => {
      navigate('/form', { state: { formId } });
    };    
  
    return (
      <div>
        <h2>Lista de Formularios</h2>
        <ul>
          {forms.map(form => (
            <li key={form.id}>
              <button onClick={() => handleSelectForm(form.id)}>
                {form.id}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}