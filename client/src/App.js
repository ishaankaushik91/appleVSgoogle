import {CContainer, CCol, CRow, CImage, CButton} from "@coreui/react";
import { useState } from "react";
import Apple from "./assets/Apple.gif";
import Google from "./assets/Google.gif";

function App()
{
    let [apple, setApple] = useState("0%");
    let [google, setGoogle] = useState("0%");

    // Instanciating a new websocket client
    let ws = new WebSocket("ws://192.168.1.101:8000");
    
    // To get message from the server
    ws.onmessage = (event) => {
        if (event.data[0] == "A")
        {
            let whole = event.data.split("=");
            setApple(`${whole[1]}%`);
            
            let k = whole[1].split("%");
            setGoogle(`${100 - k[0]}%`);
        }
        if (event.data[0] == "G")
        {
            let whole = event.data.split("=");
            setGoogle(`${whole[1]}%`);

            let k = whole[1].split("%");
            setApple(`${100 - k[0]}%`);
        }
    };

    // To establish an live connection with server
    ws.onopen = (event) => {
        
    };

    // Apple vote handler
    let AppleHandler = (event) => {
        ws.send("Apple");
    };

    // Google vote handler
    let GoogleHandler = (event) => {
        ws.send("Google");
    };

    return (
        <>
        <center>
            <h3>My mini socket programming project</h3>
        </center>
        <br/><br/>
            <CContainer>
                <CRow>
                    <CCol>
                        <center>
                            <CImage rounded draggable={false} src={Apple} width={300}/>
                            <CImage rounded draggable={false} src={Google} width={300}/>
                        </center>
                    </CCol>

                    <center>
                        <CButton onClick={AppleHandler} style={{marginRight:"25px"}} color="dark">
                            Apple
                        </CButton>

                        <CButton onClick={GoogleHandler} color="info">
                            Google
                        </CButton>
                    </center>

                    <br/>
                    
                    Team Apple {apple} <br/>
                    Team Google {google}
                </CRow>
            </CContainer>
        </>
    );
}

export default App;