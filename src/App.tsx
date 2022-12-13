import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function App(props: any) {
    const [state, setState] = React.useState<EmamiState>({
        serverUrl: "",
        connectionStatus: false,
        webSocket: null,
        socketMessage: "",
        socketLog: []
    });
    const handleChangeUrl = (ev: React.ChangeEvent<HTMLInputElement>) => {
        state.serverUrl = ev.target.value;
        setState({...state});
    };
    const handleChangeMessage = (ev: React.ChangeEvent<HTMLInputElement>) => {
        state.socketMessage = ev.target.value;
        setState({...state});
    };
    const handleClickBtnConDis = (/*ev: React.MouseEvent<HTMLElement>*/) => {
        try {
            if (!state.connectionStatus) {
                state.webSocket = new WebSocket(state.serverUrl);
                state.webSocket.onopen = (ev1: Event) => {
                    state.connectionStatus = true;
                    /*state.webSocket?.send("{\"type\":\"JoinToServer\",\"content\":\"Mohammad Satar Emami\"}")*/
                    setState({...state});
                };
                state.webSocket.onmessage = (ev1: MessageEvent) => {
                    state.socketLog.push(ev1.data);
                    setState({...state});
                };
                state.webSocket.onclose = (ev1: CloseEvent) => {
                    state.connectionStatus = false;
                    setState({...state});
                };
                state.webSocket.onerror = (ev1: Event) => {
                    state.connectionStatus = false;
                    setState({...state});
                };
            } else {
                state.webSocket?.close()
                state.connectionStatus = false;
            }
        } catch (e) {
            console.log(e)
            state.connectionStatus = false;
        }
        setState({...state});
    };
    const handleClickBtnSend = (/*ev: React.MouseEvent<HTMLElement>*/) => {
        state.webSocket?.send(state.socketMessage)
    };
    return (
        <>
            <div className="container">
                <div className="row p-3">
                    <div className=" col text-center">WebSoket Teast</div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <TextField
                            value={state.serverUrl}
                            fullWidth
                            disabled={state.connectionStatus}
                            label="Websocket Server Url"
                            placeholder="ws://localhost:8080"
                            variant="outlined"
                            onChange={handleChangeUrl}
                        />
                    </div>
                    <div className="col-2 position-relative">
                        <Button
                            onClick={handleClickBtnConDis}
                            className="position-absolute top-50 start-50 translate-middle"
                            fullWidth
                            variant="contained"
                        >
                            {state.connectionStatus ? "Disconnect" : "Connect"}
                        </Button>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col">
                        {JSON.stringify(state, readerInJson)}
                    </div>
                </div>
                <div className="row p-1">
                    <div className="col-10">
                        <TextField
                            label="send Object"
                            fullWidth
                            value={state.socketMessage}
                            disabled={!state.connectionStatus}
                            onChange={handleChangeMessage}
                        />
                    </div>
                    <div className="col-2 position-relative">
                        <Button
                            onClick={handleClickBtnSend}
                            className="position-absolute top-50 start-50 translate-middle"
                            fullWidth
                            disabled={!state.connectionStatus}
                            variant="contained"
                        >
                            Send
                        </Button>
                    </div>
                </div>
                <div className="row p-1">
                    <div className="col">
                        <TextField
                            label="log"
                            multiline
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            value={socketLogString(state.socketLog)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

interface EmamiState {
    serverUrl: string;
    connectionStatus: boolean;
    webSocket: WebSocket | null
    socketMessage: string
    socketLog: string[]
}

function readerInJson(key: any, value: any) {
    if (key === "webSocket") return undefined;
    else if (key === "socketLog") return undefined;
    else if (key === "socketMessage") return undefined;
    else return value;

}

function socketLogString(array: string[]): string {
    let value = ""
    for (let i = 0; i < array.length; i++) {
        value += array[i]
        if (i !== array.length - 1)
            value += "\n"
    }
    return value

}
