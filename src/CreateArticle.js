import React, { useState } from 'react';

const CreateArticle = () => {
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ author, setAuthor ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("titre : ", title);
        console.log("content : ", content);
        console.log("author : ", author);
    }

    const handleChange = (event) => {
        console.log("target name : ", event.target.name);
        console.log("target value : ", event.target.value);

        /*if (event.target.name === "title") {
            setTitle(event.target.value);
        } else if (event.target.name === "content") {
            setContent(event.target.value);
        } else {
            setAuthor(event.target.value);
        }*/

        switch(event.target.name) {
            case "title":
                setTitle(event.target.value);
                break;
            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            // no default
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={title}
                placeholder="titre de l'article"
            />
            <textarea
                name="content"
                onChange={handleChange}
                value={content}
                placeholder="contenu de l'article"
            >
            </textarea>
            <input
                type="numner"
                name="author"
                onChange={handleChange}
                value={author}
                placeholder="id de l'auteur"
            />
            <button type="submit">Creér l'article</button>
        </form>
    )
};

export default CreateArticle;