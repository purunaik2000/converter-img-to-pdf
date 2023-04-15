import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {jsPDF} from 'jspdf';
import Alert from "../components/Alert";
import "./History.css";

export default function History() {
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState("");
  const [history, setHistory] = useState("");
  const [imageId, setImageId] = useState("");
  const [selected, setSelected] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  const url = "http://localhost:3000/dev/images/history";

  function toggleImageCollection(e) {
    let id = e.target.id.slice(0, -1);
    if (!document.getElementById(id).classList.contains('image-show-false')) {
      return document.getElementById(id).classList.add('image-show-false');
    }
    let elemetns = document.getElementsByClassName('images-container');
    for (let element of elemetns) {
      element.classList.add('image-show-false');
    }
    document.getElementById(id).classList.remove('image-show-false');
  }

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }

  async function rename(e, image_id) {
    setImageId(image_id);
    setAlert('Rename');
  }

  async function download(e, image_id){
    const images = history.find(e=>e.image_id===image_id);
    if(images?.urls?.length){
      console.log(images)
        let pdf = new jsPDF('landscape', 'pt', 'a5');
        for(let i=0;i<images.urls.length;i++){
          let base64 = await getBase64FromUrl(images.urls[i].image_url);
          pdf.addImage(base64, 'PNG', 8, 9, 580, 400);
          if(i<images.urls.length-1) pdf.addPage();
        }
        pdf.save('new-pdf.pdf');
      }
  }

  async function downloadSelected(){
    console.log(selected);
    if(selected.length){
        let pdf = new jsPDF('landscape', 'pt', 'a5');
        for(let i=0;i<selected.length;i++){
          let base64 = await getBase64FromUrl(selected[i].image_url);
          pdf.addImage(base64, 'PNG', 8, 9, 580, 400);
          if(i<selected.length-1) pdf.addPage();
        }
        pdf.save('new-pdf.pdf');
      }
      setSelected([]);
      let images = document.getElementsByName('image');
      if(images){
        for(let e of images){
          e.classList.remove('selected');
        }
      }
  }

  async function selectImage(e, index1, index2, image_url_id){
    if(!selected.length){
      setSelected([history[index1].urls[index2]]);
      e.target.classList.add('selected');
      console.log(selected.length);
      return;
    }
    let index = -1;
    for(let i=0;i<selected.length;i++){
      if(selected[i].image_url_id===image_url_id){
        index=i;
        break;
      }
    }
    if(index===-1){
      setSelected([...selected, history[index1].urls[index2]]);
      e.target.classList.add('selected');
    }else{
      let temp = [...selected];
      temp.splice(index, 1);
      setSelected(temp);
      e.target.classList.remove('selected');
    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    if (user && !history) {
      setAlert('wait...');
      (async () => {
        const user = await JSON.parse(localStorage.getItem('user'));
        await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        })
          .then((response) => response.json())
          .then((val) => {
            console.log("Success:", val);
            if (val.status) {
              setHistory(val.data);
            }else setAlert(val.message);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
      })()
      setAlert('')
    }
  }, []);
  return (
    <div className="history">
      {!user && <Navigate to="/login" replace={true} />}
      {user && history && <div>
        <div className="select-container"><div onClick={()=>setIsSelect(!isSelect)} className="select">Select</div>
        <div onClick={downloadSelected} className="select selected-download-btn">Download</div></div>
        {isSelect && 
          history.map((e,ind1)=>{
            return e.urls.map((img, ind2)=>{
              return <img onClick={event=>selectImage(event, ind1, ind2, img.image_url_id)} src={img.image_url} name='image' alt='' />
            })
          })
          }
        {!isSelect &&
          history.map(e => {
            return <div key={e?.image_id} className="inner-container">
              <div className="image-collection">
                <div id={e?.image_id + '0'} onClick={e => toggleImageCollection(e)} >{e.name}</div>
                <div className="collection-btns">
                  <div onClick={event => download(event, e.image_id)} className="download-btn">Download</div>
                  <div onClick={event => rename(event, e.image_id)} className="rename-button">rename</div>
                </div>
              </div>
              <div id={e?.image_id} className="images-container image-show-false">
                {
                  e?.urls?.map(img => {
                    return <div key={img?.image_url_id} className="image-container">
                      <img src={img.image_url} name='image' alt='' />
                      <div>{img.name.length > 17 ? img.name.slice(0, -4).substring(0, 10) + '...' : img.name.slice(0, -4)}</div>
                    </div>
                  })
                }
              </div>
            </div>
          })
        }
      </div>}
      {!history && <div className="no-history">No history available !</div>}
      {alert && <Alert msg={alert} set={setAlert} imageId={imageId} />}
    </div>
  );
}
