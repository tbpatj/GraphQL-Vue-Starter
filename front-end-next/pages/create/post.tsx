import { useState } from "react";
import PageTransition from "../../components/animation/pageTransition";
import { useMovingSVG } from "../../resources/svgs/usersSVG";
import { createPost } from "../../scripts/Queries/getPosts";

export default function CreatePost() {
    const { usersSVGStart, usersSVGEnd } = useMovingSVG();
    const [textArea, setTextArea] = useState("");
    const [pictureURL, setpictureURL] = useState("");

    function updateTextArea(e) {
        let text = e.target.value;
        setTextArea(text);
    }
    async function submitPost() {
        createPost(textArea, pictureURL, true, "");
    }

    return (
        <>
            <PageTransition startSVG={usersSVGStart} endSVG={usersSVGEnd}>
                <div className="header-spacing"></div>
                <div className="container glass-background">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="picture-url-input">Picture Url</label>
                            <input value={pictureURL} onChange={(e) => setpictureURL(e.target.value)} id="picture-url-input" name="picture-url-input" type="text" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="description-field">Description</label>
                        </div>
                        <div className="col-12">

                            <textarea id="description-field" name="description-field" onChange={updateTextArea} cols={30} rows={10} className="mx-auto">
                                {textArea}
                            </textarea>
                        </div>
                        <div className="col-12">
                            <button onClick={submitPost} className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </>)
}