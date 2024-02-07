import React from 'react'
import {useForm}   from "react-hook-form";
export const YouTubeForm = () => {
  const form = useForm();
  return (
    <div>
        <form>
            <label htmlFor='userName'>UserName</label>
            <input type='text' name='userName' id='userName' />
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' />
            <label htmlFor='channel'>Channel</label>
            <input type='text' name='channel' id='channel' />
            <button type="submit">Submit</button>

    
        </form>
    </div>
  )
}
