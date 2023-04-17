import React, { useState } from 'react';
import './Alert.css'

export default function Alert({ msg, set, imageId }) {

  const [newName, setNewName] = useState('');

  function handler() {
    set('')
    if (imageId) {
      if(!newName) return;
      document.getElementById(imageId+'0').innerText = newName;
        (async () => {
          const user = await JSON.parse(localStorage.getItem('user'));
          await fetch('http://localhost:3000/dev/images/renameCollection', {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image_id: imageId,
              newName: newName
            })
          })
            .then((response) => response.json())
            .then((val) => {
              console.log("Success:", val);
            })
            .catch((error) => {
              console.error("Error:", error);
            })
        })()
    }
  }
  return (
    <div className='alert-container' id='alert'>
      <div className='alert'>
        <div className='msg'>{msg}</div>
        {imageId && <input onChange={e => setNewName(e.target.value)} placeholder='rename' value={newName} />}
        {msg !== 'wait...' && <buttom onClick={handler} className='ok'>OK</buttom>}
      </div>
    </div>
  );
}
