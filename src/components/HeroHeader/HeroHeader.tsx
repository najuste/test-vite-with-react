import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import getImage from "../../utils/heroHeaderProvider";
import './HeroHeader.css'

export default function HeroHeader() {

    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [imageError, setImageError] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    }

    const getNewImage = ((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setImage(inputValue);
    })

    const setImage = (async (userSearchInput?: string) => {
        setImageError(undefined);
        if (!userSearchInput || !userSearchInput.length) return;
        setLoading(true)
        try {
            const image = await getImage(userSearchInput);
            setImageUrl(image);
        } catch (error) {
            setImageError(String(error));
        } finally {
            setLoading(false);
        }        
    })
    
    useEffect(()=> {
        if (!inputValue.length){
            setImage();
        }  
    }, [inputValue])
    
    const imageStyle = {
        backgroundImage: imageUrl ? `url(${imageUrl})` : `url(https://picsum.photos/1000/300?grayscale)`,
        backgroundSize: 'cover',
        width: "1000px",
        height: "300px",
    }
    return (
        <>
            <div role="img" style={imageStyle}></div>
            <form name="search" onSubmit={getNewImage} className="headerForm">
            <label htmlFor="search">Search for an NASA image</label>
            <input type="text" id="search" data-testid="search" value={inputValue} onChange={handleInputChange}/>
            <label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Go!'}
                </button>
            </label>
            {imageError && <span className="error">{imageError}</span>}
            </form>
        </>
    )
}