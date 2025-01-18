import { coverData } from "../types";

function Cover( book: coverData) {
    console.log("the url being tried to render: ",book.coverUrl);
    
    return(
        <div style={{margin: "30px"}}>
            <img width="200" height="300" src={book.coverUrl} style={{borderRadius: "5px"}}/>
            <div style={{width: "200px", display: "flex", flexDirection: "column", textAlign: "left"}}>
                <p style={{fontWeight: "bold", fontSize: "1.1em", marginTop: "10px", marginBottom: "2px"}}>{book.title}</p>
                <p style={{alignSelf: "flex-start", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{book.author}</p>
            </div>
        </div>
    );
}

export default Cover;