import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { useEffect,useState } from "react";
import { DevTool, } from "@hookform/devtools";

type formValues = {
  username: string;
  email: string;
  channel: string;
  Social:{
    twitter: string,
    facebook:string
  }
  phoneNumbers: string[];
  phNumbers : {
    number: string
  }[]
  age:number;
  dob:Date;
  
};

export const YouTubeForm = () => {
  const form = useForm<formValues>(
    {
      defaultValues: {
        username: "",
        email: "",
        channel: "",
        Social:{
          twitter: "",
          facebook:""
        },
        phoneNumbers: ["",""],
        phNumbers:[{
          number:""
        }],
        age:0,
        dob:new Date(),
        
      },
      mode:"all",
     
    },
  );
  const { register, control, handleSubmit, formState,watch,getValues,setValue,reset} = form;
  const { errors,isDirty,isValid,isSubmitSuccessful } = formState;
  const {fields,append,remove}  = useFieldArray({
    control,
    name: "phNumbers"
  })
  const [renderCount, setRenderCount] = useState(0);

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
    }
  },[isSubmitSuccessful, reset])
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, []);

  const onSubmit = (data: formValues) => {
    console.log(data);
  };
  const handleSetValue = () => {
    setValue("username","",{
      shouldDirty:true,
      shouldValidate:true,
      shouldTouch:true,
      
    })
  }

  const onError = (errors:FieldErrors<formValues>) => {
    console.log("Form Error",errors)
  }
//   useEffect (()=>{
//     const subscription = watch((value) =>{
//     console.log(value);
//   })
//   return ()=>subscription.unsubscribe();
// },[watch])
  const getValue = () => {
    console.log('get values',getValues());
  };
  

  return (
    <div>
      <h1> YouTube  Form {renderCount} </h1>  
      {/* <h1>Watched: {JSON.stringify(watchForm)}</h1> */}
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "invalid email",
              },
              validate: {
                notValid:(fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" || "Enter different mail id"
                  );
                },
                notBlackListed: (fieldValue) => {
                return (!fieldValue.endsWith("@badDomain.com") || "This domain is not supported")
              },
              emailAvailable: async (fieldValue) => {
                const response  = await fetch (`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                const data = await response.json();
                return data.email === fieldValue || "Email already exists"
              },
            },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: { value: true, message: "channel name is required" },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            id="channel"
            {...register("Social.twitter")}
          />
         
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="channel"
            {...register("Social.facebook",{
              disabled: watch("channel") === "",
              required: { value: true, message: "channel name is required" },
            })}
          />
          
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone-number">Primary-Phone-Number</label>
          <input
            type="text"
            id="primary"
            {...register("phoneNumbers.0")}
          />
          
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone-number">Primary-Phone-Number</label>
          <input
            type="text"
            id="secondary"
            {...register("phoneNumbers.1")}
          />
          
        </div>
        <div>
            <label>List of Phone Numbers</label>
            <div>
              {fields.map((field,index)=>{
                return(
                  <div className="form-control" key={field.id}>
                    <input type="text" {...register(`phNumbers.${index}.number` as const)}/>
                    <button type="button" onClick={()=>remove(index)}>Remove</button>
                  </div>
                )
                }) 
              }
            </div>
          </div>
         
       <button type="button" onClick={()=>append({number:""})}>Add</button>
       <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
        
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Age is required" },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">DOB</label>
          <input
        
            type="date"
            id="age"
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "Age is required" },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button disabled ={ !isDirty} type="submit">Submit</button>
        <button type="button" onClick={() => reset()}>Reset</button>
        <button type="button" onClick={getValue}>Get Values</button>
        <button type="button" onClick={handleSetValue}>Set Values</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
