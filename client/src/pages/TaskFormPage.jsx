import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { ceateTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast'

export const TaskFormPage = () => {

  const {
    register, 
    handleSubmit , 
    formState:{ errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success('Tarea actualizada',{
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff "
        }
      });
    } else {
      await ceateTask(data);
      toast.success('Tarea creada',{
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff "
        }
      });
    }

    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask(){
      if (params.id) {
       const {
        data: {tittle, description }
      } = await getTask(params.id);
       setValue('tittle', tittle)
       setValue('description', description)
      }
    }
    loadTask();
  }, [])
  

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="title"
          {...register("tittle", { required: true })}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />

        {errors.title && <span>El titulo es requerido</span>}

        <textarea 
          rows="3" 
          placeholder="Description"
          {...register("description", { required: true })}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        ></textarea>
        {errors.description && <span>La descripcion es requerida</span>}

        <button
        className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
      </form>

      {params.id  && (
        <button 
          className='bg-red-500 p-3 rounded-lg w-full mt-3'
          onClick={async () => {
            const accepted = window.confirm('Estas seguro?');
            if(accepted) {
              await deleteTask(params.id);
              toast.success('Tarea eliminada',{
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff "
                }
              });
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}
