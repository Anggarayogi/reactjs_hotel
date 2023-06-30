import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
import Link from "next/link"
 
 const koneksiTamu = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/tamu" 
});

export default function FormTamu() {
    const [statenama, setNama] = useState("");
    const [stateid_book, setid_book] = useState("");
    const [statetgl_ci, settgl_ci] = useState("2018-07-22");
    const [statetgl_co, settgl_co] = useState("2018-07-22");
    const [statektp, setktp] = useState("");
    const [tamu, settamu] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
     
    const [stateedit,setEdit]=useState("hide");

 useEffect(() => {
    async function gettamu() {
      const response = await koneksiTamu.get("/").then(function (axiosResponse) {
          settamu(axiosResponse.data.data); 
   
       })
       .catch(function (error) {   
        alert('error from mahasiswa in api mahasiswa: '+error);
       });;
        }
    gettamu();
  }, []);

 
if(tamu==null){
return(
<div>
  waiting...
</div>
)
}else{

return (
    <center>
    <div className="style0"> 
    <h2>Tabel Input Booking Hotel</h2>
    
        <table border={0} id="tampilantabel">
            <thead>
                <tr>
                  <td><b>Id Booking</b></td> 
                <td><b>Nama</b></td>
                <td><b>Tanggal Check In</b></td>
                <td><b>Tanggal Check Out</b></td>
                <td><b>Foto Ktp</b></td>
                </tr>
            </thead>
            <tbody id="tabeldalam">
            {tamu.map((tam) => 
                <tr>
                    <td>{tam.id_book}</td>
                    <td>{tam.nama}</td>
                    <td>{tam.tgl_ci}</td>
                    <td>{tam.tgl_co}</td>
                    <td><img src={tam.ktp} width="80"/></td>
                </tr>
           )}     
                   </tbody>
          </table>
         
          </div>
          </center>
        )
}
  
  }