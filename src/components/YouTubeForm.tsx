
import {useForm}   from "react-hook-form";
import {DevTool} from '@hookform/devtools'
type formValues = {
  username: string,
  email:string, 
  channel:string
}
export const YouTubeForm = () => {
  const form = useForm<formValues>();
  const {register,control,handleSubmit} = form;
const onSubmit = (data:formValues) => {console.log(data)}
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='username'>UserName</label>
            <input type='text'  id='username' {...register('username')} />
            <label htmlFor='email'>Email</label>
            <input type='email' id='email'  {...register('email')} />
            <label htmlFor='channel'>Channel</label>
            <input type='text'  id='channel' {...register('channel')} />
            <button type="submit">Submit</button>

    
        </form>
        <DevTool control={control} />
    </div>
  )
}
