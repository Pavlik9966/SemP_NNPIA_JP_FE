import React, {useState} from "react";
import "../../public/Styles.css"

interface FloatingButtonProps {
    onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onClick}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            className={`floating-button ${isHovered ? "hovered" : ""}`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >+</button>
    );
};

export default FloatingButton;