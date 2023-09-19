import {Button, Paper} from "@mui/material";
import {useState} from "react";

function Reel() {

    const [types, setTypes] = useState<string[]>([]);

    return (
        <Paper sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
            borderColor: "#8F9094",
        }} variant='outlined' className='container' >
            <div className='reel' >
                {[...types].map(type => (
                    <Button key={type} >
                        {type}
                    </Button>
                ))}
            </div>
        </Paper>
    );
}

export default Reel;